---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`

## Your task

Create a single git commit following industry best practices and the Conventional Commits specification.

### Commit Message Requirements

**Use Conventional Commits format:**
```
<type>: <description>

[optional body]
```

**Commit Types:**
- `feat:` - New features or functionality
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting, whitespace, semicolons (no logic changes)
- `refactor:` - Code restructuring without behavior changes
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks, dependencies, build system

**The Seven Universal Rules:**
1. **Limit subject to 50 characters** (soft limit, 72 hard max)
2. **Capitalize first letter only** (no ALL CAPS, proper nouns OK)
3. **No ending punctuation** (no periods, exclamation marks)
4. **Use imperative mood** ("add" not "added", "fix" not "fixed")
5. **Blank line between subject and body** (if body needed)
6. **Wrap body at 72 characters**
7. **Focus on what and why, not how**

### Analysis Instructions

1. **Identify the primary change type** from the git diff
2. **Detect scope** if changes are focused on specific component/area
3. **Write imperative description** answering "If applied, this commit will..."
4. **Include body for complex changes** explaining motivation and context
5. **Single logical change** - if multiple unrelated changes, ask user to stage separately

### Examples

✅ **Good:**
```
feat: add user authentication system
fix: resolve memory leak in image processing
docs: update installation guide for Node.js 18+
```

❌ **Bad:**
```
Added new feature (past tense)
fix bug (too vague)
feat: add comprehensive user authentication system with OAuth2, JWT tokens, session management and error handling (too long)
```