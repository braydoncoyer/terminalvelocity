This is the final challenge. You have a `challenge/` directory with a realistic project structure — nested folders, hidden files, data files, and more. Your mission has five objectives that draw from everything you've learned across all modules. There are no step-by-step instructions this time. You know enough to figure it out.

Here's what you need to accomplish:

1. **Find the hidden file** — There's a file called `.secret-key` buried somewhere in the nested directories. Use `ls -a` or `find` to track it down.
2. **Create a new directory** — Create a directory called `challenge/results` to store your work.
3. **Copy a file** — Copy `challenge/data.csv` into your new `challenge/results` directory.
4. **Use piping** — Use a pipe to process some data (for example, `cat` the CSV and `grep` for specific entries, or `sort` and `uniq` the data).
5. **Navigate deep** — `cd` into the `challenge/config/settings` directory.

```bash
# Some commands that might help:
ls -la challenge/               # see what's inside (including hidden)
ls -aR challenge/               # recursive listing to find hidden files
find challenge/ -name ".*"      # find hidden files
mkdir challenge/results         # create a new directory
cp challenge/data.csv challenge/results/data.csv
cat challenge/data.csv | sort
cd challenge/config/settings
```

The five goals can be completed in any order. Take your time, explore the filesystem, and use everything you've learned. If you get stuck, try `ls` to look around, `pwd` to check where you are, and `cd ..` to back up.

> [!TIP]
> Remember: hidden files start with a dot (.) and only show up when you use `ls -a`. The `find` command with `-name ".*"` is a quick way to locate hidden files in a directory tree. Don't forget `ls -aR` for a recursive listing that includes hidden files.

> [!WINDOWS]
> On Windows, hidden files have a "hidden" attribute rather than a dot prefix. In PowerShell, `Get-ChildItem -Force -Recurse` reveals hidden items. In WSL, hidden files follow the Linux dot convention.
