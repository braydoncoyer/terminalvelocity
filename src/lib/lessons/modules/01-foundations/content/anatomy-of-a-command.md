Most terminal commands follow the same general structure:

```bash
command [options] [arguments]
```

- The **command** is the program you want to run (like `ls` to list files).
- **Options** (also called flags) change how the command behaves. They usually start with `-` or `--`.
- **Arguments** tell the command what to operate on (like a file, folder, or path).

Example:

```bash
ls -l -a
```

This lists files using:

- `-l` → long (detailed) format

- `-a` → show hidden files

Many commands let you combine single-letter options:

```bash
ls -la
```

Same result. Fewer keystrokes.

Some commands also support long-form options:

```bash
ls --all
```

Both styles are common.

> [!TIP]
> Think of it like a sentence:
> The **command** is the verb ("list")
> The **flags** are adverbs ("in detail")
> The **argument** is the noun ("this folder")

Let’s try a real example.

Run this command to list all files (including hidden ones) in your home directory:

```bash
ls -la ~
```

> [!TIP]
> `~` is a shortcut that means “your home folder.” It works across macOS, Linux, and WSL.

> [!WINDOWS]
> In **Command Prompt**, the rough equivalent is:
> `dir /a`
>
> In **PowerShell:**
> `Get-ChildItem -Force`
>
> In WSL, `ls -la` works exactly like Linux.
