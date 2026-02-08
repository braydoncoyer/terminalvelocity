Beyond arrow keys and Ctrl+R, the shell provides special shortcuts called **bang commands** (because they use the `!` character). These let you reference and reuse parts of your previous commands without navigating through history.

```bash
!!     Repeat the entire last command
!$     Reuse the last argument of the previous command
!n     Repeat command number n from history (e.g., !42)
!abc   Repeat the most recent command starting with "abc"
```

The most common use of `!!` is retrying a command with `sudo`. You run something, it says "Permission denied," and you type `sudo !!` to instantly rerun it with elevated privileges. This is so common that experienced users do it reflexively.

```bash
$ cat /etc/shadow
Permission denied
$ sudo !!
sudo cat /etc/shadow
```

`!$` grabs just the last argument from your previous command. This is perfect when you're working with the same file across multiple commands — view it, then edit it, then move it, all without retyping the path.

```bash
$ ls projects/webapp/index.html
$ cat !$
# expands to: cat projects/webapp/index.html
```

> [!TIP]
> When you press Enter, the terminal shows you the expanded command so you can see exactly what ran. If you're ever unsure what a bang shortcut will expand to, check your `history` first to see what's there.

Your terminal already has some history. Try using a bang shortcut in your next command. For example, type `sudo !!` to rerun the last command with sudo, or `echo !$` to reuse the last argument from the previous command.
