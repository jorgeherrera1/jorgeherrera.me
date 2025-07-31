#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
function loadEnvLocal() {
  const envPath = join(__dirname, '..', '.env.local');
  if (!existsSync(envPath)) {
    console.error('❌ .env.local file not found. Please create it with OBSIDIAN_BLOG_PATH variable.');
    process.exit(1);
  }
  
  const envContent = readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
        process.env[key.trim()] = value.trim();
      }
    }
  }
}

// Convert filename to web-friendly format
function convertFilename(filename) {
  const nameWithoutExt = basename(filename, extname(filename));
  return nameWithoutExt
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '.md';
}

// Sync blog files
function syncBlogFiles() {
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
  
  // Ensure target directory exists
  if (!existsSync(targetPath)) {
    mkdirSync(targetPath, { recursive: true });
  }
  
  console.log('🎮 Starting blog sync...');
  console.log(`📂 Source: ${obsidianPath}`);
  console.log(`📂 Target: ${targetPath}`);
  console.log('');
  
  let syncedCount = 0;
  let skippedCount = 0;
  
  try {
    const files = readdirSync(obsidianPath);
    const markdownFiles = files.filter(file => extname(file).toLowerCase() === '.md');
    
    if (markdownFiles.length === 0) {
      console.log('⚠️  No markdown files found in Obsidian blog folder');
      return;
    }
    
    for (const file of markdownFiles) {
      const sourcePath = join(obsidianPath, file);
      const targetFilename = convertFilename(file);
      const targetFilePath = join(targetPath, targetFilename);
      
      try {
        const sourceStats = statSync(sourcePath);
        const content = readFileSync(sourcePath, 'utf-8');
        
        // Check if target file exists and compare modification times
        let shouldSync = true;
        if (existsSync(targetFilePath)) {
          const targetStats = statSync(targetFilePath);
          if (sourceStats.mtime <= targetStats.mtime) {
            shouldSync = false;
          }
        }
        
        if (shouldSync) {
          writeFileSync(targetFilePath, content, 'utf-8');
          console.log(`✅ Synced: ${file} → ${targetFilename}`);
          syncedCount++;
        } else {
          console.log(`⏭️  Skipped: ${file} (no changes)`);
          skippedCount++;
        }
      } catch (error) {
        console.error(`❌ Error syncing ${file}:`, error.message);
      }
    }
    
    console.log('');
    console.log(`🎯 Sync complete! Synced: ${syncedCount}, Skipped: ${skippedCount}`);
    
  } catch (error) {
    console.error('❌ Error reading Obsidian blog folder:', error.message);
    process.exit(1);
  }
}

// Run the sync
syncBlogFiles();