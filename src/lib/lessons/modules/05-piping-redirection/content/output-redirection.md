By default, every command's output goes to your screen. But what if you want to save it? The **redirect operator** `>` takes stdout and sends it to a file instead. If the file doesn't exist, it creates one. If it does exist, it **overwrites** the contents completely.

```bash
echo "first line" > output.txt     # creates file (or overwrites)
echo "second line" >> output.txt   # appends to the file
cat output.txt                     # see both lines
```

The single `>` is like a fresh start — it replaces everything in the file with the new output. The double `>>` is the **append operator** — it adds to the end of the file without touching what's already there. This distinction is critical. Using `>` when you meant `>>` will destroy the file's previous contents.

Redirection works with any command, not just `echo`. You could run `ls > filelist.txt` to save a directory listing, or `cat notes.txt > backup.txt` to copy a file's contents. Anywhere stdout goes to the screen, you can redirect it to a file instead.

> [!WARNING]
> Be careful with `>`. Running `echo "oops" > important-data.txt` will erase everything in that file and replace it with "oops". Always double-check the filename before using `>`. When in doubt, use `>>` to append instead.

> [!TIP]
> A useful trick: `> file.txt` with no command empties a file without deleting it. This is handy for clearing log files while keeping the file in place so other programs that reference it aren't disrupted.

Let's practice. Use `echo` with the `>` operator to create a file called `greeting.txt`, then use `>>` to append a second line to it.

```bash
echo "Hello, world!" > greeting.txt
echo "Welcome to piping & redirection." >> greeting.txt
```

> [!WINDOWS]
> Windows Command Prompt uses the same `>` and `>>` operators for redirection. PowerShell also supports them, plus `Out-File` and `Add-Content` cmdlets for more control. The concepts transfer directly.
