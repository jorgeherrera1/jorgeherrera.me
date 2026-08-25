// 🧪 Verification tests for the two-way blog sync.
// The core guarantee under test: the sync is ADDITIVE — a file that exists on
// only one side appears on the other, and nothing is ever deleted or silently
// overwritten, in either direction. Runs entirely against temp directories.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync, utimesSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { syncBlog } from './sync-blog.js';

const OLDER = new Date('2026-01-01T00:00:00Z');
const NEWER = new Date('2026-02-01T00:00:00Z');
const noop = () => {};

function makeDirs() {
  return {
    vault: mkdtempSync(join(tmpdir(), 'sync-vault-')),
    repo: mkdtempSync(join(tmpdir(), 'sync-repo-')),
  };
}

function write(dir, name, content, mtime = OLDER) {
  const path = join(dir, name);
  writeFileSync(path, content);
  utimesSync(path, mtime, mtime);
  return path;
}

function read(dir, name) {
  return readFileSync(join(dir, name), 'utf-8');
}

function names(dir) {
  return readdirSync(dir).sort();
}

function run(vault, repo) {
  return syncBlog({ sourceDir: vault, targetDir: repo, log: noop });
}

test('vault-only file is copied to the repo, vault untouched', () => {
  const { vault, repo } = makeDirs();
  const path = write(vault, 'New vault post.md', '---\ntitle: New vault post\n---\nhello', OLDER);
  write(repo, 'Existing repo post.md', 'repo content');

  const summary = run(vault, repo);

  assert.deepEqual(summary.toRepo, ['New vault post.md']);
  assert.equal(read(repo, 'New vault post.md'), '---\ntitle: New vault post\n---\nhello');
  assert.equal(read(vault, 'New vault post.md'), '---\ntitle: New vault post\n---\nhello');
  assert.equal(statSync(path).mtimeMs, OLDER.getTime());
  assert.ok(names(repo).includes('Existing repo post.md'), 'pre-existing repo file must survive');
});

test('repo-only file (Level Editor post) is copied to the vault, repo untouched', () => {
  const { vault, repo } = makeDirs();
  const path = write(repo, 'Web authored post.md', 'written on my phone', OLDER);
  write(vault, 'Existing vault post.md', 'vault content');

  const summary = run(vault, repo);

  assert.deepEqual(summary.toVault, ['Web authored post.md']);
  assert.equal(read(vault, 'Web authored post.md'), 'written on my phone');
  assert.equal(read(repo, 'Web authored post.md'), 'written on my phone');
  assert.equal(statSync(path).mtimeMs, OLDER.getTime());
  assert.ok(names(vault).includes('Existing vault post.md'), 'pre-existing vault file must survive');
});

test('identical file on both sides is a no-op', () => {
  const { vault, repo } = makeDirs();
  const vaultPath = write(vault, 'Same post.md', 'same bytes', OLDER);
  const repoPath = write(repo, 'Same post.md', 'same bytes', NEWER);

  const summary = run(vault, repo);

  assert.deepEqual(summary.unchanged, ['Same post.md']);
  assert.equal(summary.backups.length, 0);
  assert.equal(statSync(vaultPath).mtimeMs, OLDER.getTime(), 'vault file must not be rewritten');
  assert.equal(statSync(repoPath).mtimeMs, NEWER.getTime(), 'repo file must not be rewritten');
});

test('conflict: newer vault edit wins, repo bytes kept in a backup', () => {
  const { vault, repo } = makeDirs();
  write(vault, 'Post.md', 'vault edit', NEWER);
  write(repo, 'Post.md', 'repo edit', OLDER);

  const summary = run(vault, repo);

  assert.deepEqual(summary.updatedRepo, ['Post.md']);
  assert.equal(read(repo, 'Post.md'), 'vault edit');
  assert.equal(read(repo, 'Post.md.sync-backup'), 'repo edit', 'losing bytes must survive in the backup');
  assert.equal(read(vault, 'Post.md'), 'vault edit', 'winning side must be untouched');
  assert.ok(!names(vault).includes('Post.md.sync-backup'));
});

test('conflict: newer repo edit wins, vault bytes kept in a backup', () => {
  const { vault, repo } = makeDirs();
  write(vault, 'Post.md', 'vault edit', OLDER);
  write(repo, 'Post.md', 'repo edit', NEWER);

  const summary = run(vault, repo);

  assert.deepEqual(summary.updatedVault, ['Post.md']);
  assert.equal(read(vault, 'Post.md'), 'repo edit');
  assert.equal(read(vault, 'Post.md.sync-backup'), 'vault edit', 'losing bytes must survive in the backup');
  assert.equal(read(repo, 'Post.md'), 'repo edit', 'winning side must be untouched');
  assert.ok(!names(repo).includes('Post.md.sync-backup'));
});

test('conflict with equal mtimes: vault wins the tie', () => {
  const { vault, repo } = makeDirs();
  write(vault, 'Post.md', 'vault edit', OLDER);
  write(repo, 'Post.md', 'repo edit', OLDER);

  const summary = run(vault, repo);

  assert.deepEqual(summary.updatedRepo, ['Post.md']);
  assert.equal(read(repo, 'Post.md'), 'vault edit');
  assert.equal(read(repo, 'Post.md.sync-backup'), 'repo edit');
});

test('slug collision across sides: verbatim and hyphenated filenames are the same post', () => {
  const { vault, repo } = makeDirs();
  write(vault, 'Cursor 2.0 is solid.md', 'same bytes');
  write(repo, 'Cursor-2.0-is-solid.md', 'same bytes');

  const summary = run(vault, repo);

  assert.deepEqual(summary.unchanged, ['Cursor 2.0 is solid.md']);
  assert.deepEqual(names(vault), ['Cursor 2.0 is solid.md'], 'no duplicate created in the vault');
  assert.deepEqual(names(repo), ['Cursor-2.0-is-solid.md'], 'no duplicate created in the repo');
});

test('slug collision with differing content syncs in place without renaming', () => {
  const { vault, repo } = makeDirs();
  write(vault, 'Cursor 2.0 is solid.md', 'vault edit', NEWER);
  write(repo, 'Cursor-2.0-is-solid.md', 'repo edit', OLDER);

  const summary = run(vault, repo);

  assert.deepEqual(summary.updatedRepo, ['Cursor-2.0-is-solid.md']);
  assert.equal(read(repo, 'Cursor-2.0-is-solid.md'), 'vault edit', 'content flows into the existing filename');
  assert.equal(read(repo, 'Cursor-2.0-is-solid.md.sync-backup'), 'repo edit');
  assert.ok(!names(repo).includes('Cursor 2.0 is solid.md'), 'no rename, no duplicate');
});

test('regression: an empty vault never wipes the repo', () => {
  const { vault, repo } = makeDirs();
  write(repo, 'Post one.md', 'content one');
  write(repo, 'Post two.md', 'content two');

  const summary = run(vault, repo);

  assert.deepEqual(names(repo), ['Post one.md', 'Post two.md'], 'every repo post must survive');
  assert.equal(read(repo, 'Post one.md'), 'content one');
  assert.equal(read(repo, 'Post two.md'), 'content two');
  assert.equal(summary.toVault.length, 2, 'repo posts flow into the empty vault instead');
});

test('two same-slug files on one side abort the sync before any writes', () => {
  const { vault, repo } = makeDirs();
  write(vault, 'Foo Bar.md', 'one');
  write(vault, 'Foo-Bar.md', 'two');
  write(repo, 'Existing.md', 'repo content');

  assert.throws(() => run(vault, repo), /Slug collision/);
  assert.deepEqual(names(vault), ['Foo Bar.md', 'Foo-Bar.md'], 'vault untouched');
  assert.deepEqual(names(repo), ['Existing.md'], 'repo untouched');
  assert.equal(read(repo, 'Existing.md'), 'repo content');
});

test('non-markdown files, dotfiles, and subdirectories are ignored', () => {
  const { vault, repo } = makeDirs();
  write(vault, 'notes.txt', 'not a post');
  write(vault, '.hidden.md', 'dotfile');
  mkdirSync(join(vault, 'attachments'));
  write(join(vault, 'attachments'), 'nested.md', 'nested post');
  write(vault, 'Real post.md', 'real content');

  const summary = run(vault, repo);

  assert.deepEqual(summary.toRepo, ['Real post.md']);
  assert.deepEqual(names(repo), ['Real post.md']);
});
