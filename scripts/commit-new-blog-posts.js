#!/usr/bin/env node

import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');
const blogDir = 'src/content/blog';

function git(args, opts = {}) {
  return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf-8', ...opts });
}

function listNewBlogPosts() {
  // -z: NUL-separated, unquoted paths — plain \n output C-quotes non-ASCII
  // filenames (core.quotePath default), which would fail the .md filter below
  const output = git(['ls-files', '-z', '--others', '--exclude-standard', '--', blogDir]);
  return output
    .split('\0')
    .filter(line => line.endsWith('.md'));
}

function titleFromPath(path) {
  const filename = path.split('/').pop();
  return filename.replace(/\.md$/, '');
}

function buildCommitMessages(paths) {
  const titles = paths.map(titleFromPath);
  if (titles.length === 1) {
    return { subject: `docs: add blog post "${titles[0]}"`, body: null };
  }
  const subject = `docs: add ${titles.length} new blog posts`;
  const body = titles.map(t => `- ${t}`).join('\n');
  return { subject, body };
}

function main() {
  console.log('🎮 Checking for new blog posts...');
  console.log(`📂 Scanning: ${blogDir}`);
  console.log('');

  const newPosts = listNewBlogPosts();

  if (newPosts.length === 0) {
    console.log('⚠️  No new blog posts to commit');
    return;
  }

  for (const path of newPosts) {
    console.log(`✅ New post: ${titleFromPath(path)}`);
  }
  console.log('');

  git(['add', '--', ...newPosts]);

  const { subject, body } = buildCommitMessages(newPosts);
  const commitArgs = ['commit', '-m', subject];
  if (body) commitArgs.push('-m', body);

  try {
    git(commitArgs, { stdio: ['ignore', 'inherit', 'inherit'] });
  } catch (error) {
    console.error('❌ git commit failed');
    process.exit(error.status ?? 1);
  }

  console.log('');
  console.log(`🎯 Committed ${newPosts.length} new blog post${newPosts.length === 1 ? '' : 's'}`);

  console.log('🚀 Pushing to remote...');
  try {
    git(['push'], { stdio: ['ignore', 'inherit', 'inherit'] });
  } catch (error) {
    console.error('❌ git push failed — commit is local, run `git push` manually once resolved');
    process.exit(error.status ?? 1);
  }
  console.log('✅ Push complete');
}

main();
