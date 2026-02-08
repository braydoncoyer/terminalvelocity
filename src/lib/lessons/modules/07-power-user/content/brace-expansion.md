**Brace expansion** is a shell feature that generates multiple strings from a single pattern. Instead of typing three separate commands to create three files, you can do it in one shot. It's one of those features that, once you learn it, you'll wonder how you ever lived without.

There are two forms. **List expansion** uses comma-separated values: `{a,b,c}` expands to `a b c`. **Range expansion** uses two dots: `{1..5}` expands to `1 2 3 4 5`. You can combine these with surrounding text to generate complex patterns.

```bash
# List expansion
touch file_{a,b,c}.txt       # Creates file_a.txt, file_b.txt, file_c.txt

# Range expansion
touch report_{1..5}.md       # Creates report_1.md through report_5.md

# Combine with paths
mkdir -p src/{components,utils,hooks}  # Three subdirectories in one command
```

Brace expansion happens *before* wildcard expansion and is performed by the shell itself, not the command. This means it works with any command — `touch`, `mkdir`, `cp`, `echo`, anything. It's purely a text substitution: the shell replaces the brace expression with the expanded list, then runs the resulting command.

> [!TIP]
> You can preview what brace expansion produces by using `echo`. Running `echo file_{a,b,c}.txt` prints "file_a.txt file_b.txt file_c.txt" without creating anything. It's a great way to test your pattern before committing to it.

> [!WARNING]
> Our terminal simulator does not support brace expansion natively. In a real terminal, you'd use these patterns directly. For practice here, we'll create files individually with `touch` to build the same muscle memory.

> [!WINDOWS]
> Brace expansion is not available in Command Prompt or PowerShell natively. PowerShell uses different approaches like `1..5 | ForEach-Object { New-Item "file_$_.txt" }`. In WSL or Git Bash on Windows, brace expansion works just like on Linux.

Since our simulator doesn't support brace expansion, let's practice the underlying skill — creating multiple files efficiently. Use `touch` to create three files: `file_a.txt`, `file_b.txt`, and `file_c.txt`. In a real terminal, you'd type `touch file_{a,b,c}.txt` to do this in one command.

```bash
touch file_a.txt
touch file_b.txt
touch file_c.txt
```
