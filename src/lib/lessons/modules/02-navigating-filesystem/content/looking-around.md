You already know `ls` lists files, but plain `ls` only shows the basics. The real power comes from its flags. The most important ones are `-l` (long format with details), `-a` (show hidden files), and `-h` (human-readable file sizes). You can combine them freely.

```bash
ls         # basic listing
ls -l      # long format: permissions, size, date
ls -a      # show ALL files including hidden ones
ls -la     # long format + hidden files
ls -lah    # long format + hidden + human-readable sizes
```

Hidden files in Linux and macOS start with a dot (`.`). They're hidden by default to reduce clutter — you don't usually need to see configuration files like `.gitconfig` or `.bashrc` in a normal listing. But when you do need them, `-a` reveals everything.

The long format (`-l`) shows you the file type, permissions, owner, group, size, modification date, and name. It looks dense at first, but you'll learn to read it quickly. The first character tells you if it's a file (`-`) or directory (`d`).

> [!TIP]
> Many developers alias `ls -la` to something shorter, like `ll`. You'll learn about aliases in a later module. For now, get comfortable typing the full command.

There are hidden files in your home directory. Using what you learned above, reveal them.
