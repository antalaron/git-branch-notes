# Git Branch Notes VS Code Extension

Take personal, branch-specific notes in Markdown format, stored privately inside your local `.git/branch-notes/` directory.

## Features
- Open a note tied to the current Git branch
- Notes stored as `.git/branch-notes/{sha1(branch)}.md`
- Trigger via:
  - macOS: `Cmd+K Cmd+N`
  - Linux/Windows: `Ctrl+K Ctrl+N`
- Notes are not tracked by Git (safe for local use)

## Usage
While inside a Git repository:
- Open any file
- Press the shortcut: `Cmd+K Cmd+N` or `Ctrl+K Ctrl+N`
- A Markdown note for the current branch opens or is created if missing

## File Location
Notes are saved as:
```
.git/branch-notes/{branch-name}.md
```

## License
MIT
