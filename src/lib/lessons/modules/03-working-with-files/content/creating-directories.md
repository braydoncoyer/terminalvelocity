`mkdir` (make directory) creates a new folder. By itself, it can only create one level at a time — the parent directory must already exist. If you try `mkdir a/b/c` and `a/b` doesn't exist yet, you'll get an error.

```bash
mkdir photos                     # create a single directory
mkdir -p projects/webapp/src     # create the entire path at once
```

The `-p` flag (for "parents") is the solution. It creates every directory in the path that doesn't exist yet, and silently succeeds if they already do. This is the flag you'll use most of the time — it's safer and more convenient.

This is especially useful when setting up project structures. Instead of creating each folder one at a time, you can build the entire tree in a single command. Many developers keep a set of `mkdir -p` commands in their project setup scripts.

> [!TIP]
> Get in the habit of always using `mkdir -p`. It never hurts when the path already exists, and it saves you from errors when it doesn't. Think of the -p as a safety net.

> [!WINDOWS]
> In Command Prompt, `mkdir a\b\c` already creates the full path by default — no flag needed. PowerShell's `New-Item -ItemType Directory -Path a/b/c` also creates parent directories. In WSL, use `mkdir -p` as shown.

Create the nested directory structure `projects/webapp/src/components`. You'll need to create multiple levels at once.
