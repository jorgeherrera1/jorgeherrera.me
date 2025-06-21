---
title: Syntax Highlighting Test Article
date: "2024-01-01"
tags:
  - Development
  - Testing
---

This is a test article to verify syntax highlighting functionality across different programming languages.

## JavaScript Example

```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return { message: `Welcome, ${name}` };
}

const user = 'Developer';
greetUser(user);
```

## TypeScript Example

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
```

## CSS Example

```css
.article-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
}

.code-block {
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
}
```

## HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Article</title>
</head>
<body>
  <article>
    <h1>Article Title</h1>
    <p>Article content goes here.</p>
  </article>
</body>
</html>
```

This test article should demonstrate proper syntax highlighting for multiple languages.