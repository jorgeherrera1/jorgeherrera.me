#!/usr/bin/env node

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  utimesSync,
} from 'fs';
import { extname, join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { slug } from 'github-slugger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BACKUP_EXTENSION = '.sync-backup';

// Load environment variables from .env.local (Node 22+ built-in parser)
function loadEnvLocal() {
  const envPath = join(__dirname, '..', '.env.local');
  if (!existsSync(envPath)) {
    console.error('❌ .env.local file not found. Please create it with OBSIDIAN_BLOG_PATH variable.');
    process.exit(1);
  }
  process.loadEnvFile(envPath);
}

// List top-level markdown files keyed by their github-slugger slug — the same
// identity Astro's glob loader uses for entry IDs, so an Obsidian file named
// "Title verbatim.md" and a Level Editor file named "Title-verbatim.md" are
// recognized as the same post.
function listMarkdownBySlug(dir) {
  const posts = new Map();
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || entry.name.startsWith('.')) continue;
    const ext = extname(entry.name);
    if (ext.toLowerCase() !== '.md') continue;
    const id = slug(entry.name.slice(0, -ext.length));
    const existing = posts.get(id);
    if (existing) {
      throw new Error(
        `Slug collision in ${dir}: "${existing.name}" and "${entry.name}" both map to "${id}". ` +
        'Rename or merge them before syncing.'
      );
    }
    const path = join(dir, entry.name);
    posts.set(id, { name: entry.name, path, mtimeMs: statSync(path).mtimeMs });
  }
  return posts;
}

function sameBytes(pathA, pathB) {
  return readFileSync(pathA).equals(readFileSync(pathB));
}

// copyFileSync + utimesSync so mtimes keep reflecting real edits (the conflict
// tie-breaker) instead of the moment the sync ran
function copyPreservingTime(source, target) {
  copyFileSync(source, target);
  const { atime, mtime } = statSync(source);
  utimesSync(target, atime, mtime);
}

/**
 * Two-way, additive sync between two flat directories of markdown posts.
 * Never deletes: a post that exists on only one side is copied to the other.
 * When both sides have the same post (matched by slug) with different
 * content, the newer mtime wins — the vault wins exact ties — and the losing
 * version is kept next to the winner as `<file>.md.sync-backup` before being
 * overwritten, so no bytes are ever lost silently.
 */
export function syncBlog({ sourceDir, targetDir, log = console.log }) {
  if (!existsSync(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }
  mkdirSync(targetDir, { recursive: true });

  const vault = listMarkdownBySlug(sourceDir);
  const repo = listMarkdownBySlug(targetDir);
  const summary = {
    toRepo: [],
    toVault: [],
    updatedRepo: [],
    updatedVault: [],
    unchanged: [],
    backups: [],
    failures: [],
  };

  const attempt = (name, action) => {
    try {
      action();
    } catch (error) {
      summary.failures.push(name);
      log(`❌ Error syncing ${name}: ${error.message}`);
    }
  };

  for (const [id, vaultPost] of vault) {
    const repoPost = repo.get(id);
    if (!repoPost) {
      attempt(vaultPost.name, () => {
        copyPreservingTime(vaultPost.path, join(targetDir, vaultPost.name));
        summary.toRepo.push(vaultPost.name);
        log(`✅ Vault → repo: ${vaultPost.name}`);
      });
    } else if (sameBytes(vaultPost.path, repoPost.path)) {
      summary.unchanged.push(vaultPost.name);
    } else if (vaultPost.mtimeMs >= repoPost.mtimeMs) {
      attempt(repoPost.name, () => {
        const backup = repoPost.path + BACKUP_EXTENSION;
        copyPreservingTime(repoPost.path, backup);
        copyPreservingTime(vaultPost.path, repoPost.path);
        summary.updatedRepo.push(repoPost.name);
        summary.backups.push(backup);
        log(`⚠️  Conflict on "${repoPost.name}": vault is newer — repo version saved as ${backup}`);
      });
    } else {
      attempt(vaultPost.name, () => {
        const backup = vaultPost.path + BACKUP_EXTENSION;
        copyPreservingTime(vaultPost.path, backup);
        copyPreservingTime(repoPost.path, vaultPost.path);
        summary.updatedVault.push(vaultPost.name);
        summary.backups.push(backup);
        log(`⚠️  Conflict on "${vaultPost.name}": repo is newer — vault version saved as ${backup}`);
      });
    }
  }

  for (const [id, repoPost] of repo) {
    if (vault.has(id)) continue;
    attempt(repoPost.name, () => {
      copyPreservingTime(repoPost.path, join(sourceDir, repoPost.name));
      summary.toVault.push(repoPost.name);
      log(`✅ Repo → vault: ${repoPost.name}`);
    });
  }

  return summary;
}

// Level Editor posts land on GitHub main, not in the working tree — warn (but
// don't auto-pull: a mid-sync merge conflict would be worse) when they're
// missing locally. Running anyway is safe because the sync never deletes.
function warnIfBehindOrigin() {
  const repoRoot = join(__dirname, '..');
  try {
    execFileSync('git', ['fetch', '--quiet', 'origin', 'main'], { cwd: repoRoot });
    const behind = execFileSync(
      'git',
      ['rev-list', '--count', 'HEAD..origin/main', '--', 'src/content/blog'],
      { cwd: repoRoot, encoding: 'utf-8' }
    ).trim();
    if (behind !== '0') {
      console.warn(`⚠️  origin/main has ${behind} blog commit(s) you don't have locally.`);
      console.warn('   Run `git pull` so Level Editor posts can sync into the vault, then re-run.');
      console.warn('');
    }
  } catch {
    console.log('ℹ️  Could not check origin/main for new blog posts (offline?) — continuing.');
    console.log('');
  }
}

function main() {
  loadEnvLocal();

  const obsidianPath = process.env.OBSIDIAN_BLOG_PATH;
  if (!obsidianPath) {
    console.error('❌ OBSIDIAN_BLOG_PATH not found in .env.local');
    process.exit(1);
  }

  if (!existsSync(obsidianPath)) {
    console.error(`❌ Obsidian blog path does not exist: ${obsidianPath}`);
    process.exit(1);
  }

  const targetPath = join(__dirname, '..', 'src', 'content', 'blog');

  console.log('🎮 Starting two-way blog sync...');
  console.log(`📂 Vault: ${obsidianPath}`);
  console.log(`📂 Repo:  ${targetPath}`);
  console.log('');

  warnIfBehindOrigin();

  let summary;
  try {
    summary = syncBlog({ sourceDir: obsidianPath, targetDir: targetPath });
  } catch (error) {
    console.error(`❌ Sync aborted: ${error.message}`);
    process.exit(1);
  }

  console.log('');
  console.log(
    `🎯 Sync complete! Vault → repo: ${summary.toRepo.length} new, ${summary.updatedRepo.length} updated · ` +
    `Repo → vault: ${summary.toVault.length} new, ${summary.updatedVault.length} updated · ` +
    `Unchanged: ${summary.unchanged.length}`
  );
  if (summary.backups.length > 0) {
    console.log(
      `⚠️  ${summary.backups.length} conflict backup(s) written — review them, merge anything worth keeping, ` +
      `then delete the ${BACKUP_EXTENSION} files.`
    );
  }
  if (summary.failures.length > 0) {
    console.error(`❌ ${summary.failures.length} file(s) failed to sync`);
    process.exit(1);
  }
}

// Run only when executed directly (`npm run sync-blog`), not when imported by tests
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main();
}
