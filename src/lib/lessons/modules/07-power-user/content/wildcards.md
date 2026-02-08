Typing file names one by one gets tedious fast. **Wildcards** (also called **globbing patterns**) let you match multiple files with a single expression. The shell expands the pattern into all matching file names before the command even runs. It's like a search filter built right into the command line.

The two most common wildcards are `*` and `?`. The asterisk `*` matches **any number of characters** (including zero). The question mark `?` matches exactly **one character**. You can combine them with regular text to build precise patterns.

```bash
ls *.txt        # All files ending in .txt
ls image?.png   # image1.png, image2.png, but not image10.png
ls *.js         # All JavaScript files
ls test_*       # All files starting with "test_"
```

Wildcards are expanded by the shell, not by the command itself. So `ls *.txt` and `cat *.txt` and `rm *.txt` all use the same pattern matching — the shell finds the matches and passes the file names as arguments. This is why wildcards work with virtually every command.

> [!TIP]
> Be cautious with `rm *` — it deletes every file in the current directory. Always double-check your pattern with `ls` first. Running `ls *.log` before `rm *.log` shows you exactly what will be deleted.

> [!WARNING]
> Our terminal simulator uses `find` for glob matching rather than direct shell expansion. Use `find . -name "*.txt"` to search for patterns. In a real terminal, `ls *.txt` works directly.

> [!WINDOWS]
> In Command Prompt, wildcards work with `dir` (e.g., `dir *.txt`) but not all commands. PowerShell supports wildcards more broadly with `Get-ChildItem *.txt` or `ls *.txt`. In WSL, wildcards work exactly as shown here.

This workspace has a mix of file types. Try using a wildcard pattern to find all the `.txt` files. Use `find . -name "*.txt"` to search for them.

```bash
find . -name "*.txt"
```
