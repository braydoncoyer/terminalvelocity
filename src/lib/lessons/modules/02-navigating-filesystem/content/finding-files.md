When you know a file exists somewhere but can't remember where, `find` is your search tool. It walks through a directory tree and prints every file or directory matching your criteria. It's one of the most powerful commands in the terminal.

```bash
find . -name "README.md"       # find by exact name
find . -name "*.js"            # find by pattern (all .js files)
find . -type d -name "src"     # find directories named "src"
find / -type f -name ".env"    # search the entire filesystem
```

The first argument to `find` is where to start searching. A dot `.` means "start from here" (the current directory). You can also give an absolute path like `/home/user`. The `-name` flag matches filenames, and `-type` filters by type — `f` for files, `d` for directories.

Another useful command is `which`. It tells you the full path of a command's executable. Running `which ls` shows you where the `ls` program lives on disk. This is handy for debugging path issues or figuring out which version of a tool you're running.

```bash
which ls
# /bin/ls

which node
# /usr/local/bin/node
```

> [!TIP]
> Use quotes around patterns with wildcards (like "*.js") to prevent the shell from expanding them before find sees them. Without quotes, the shell might try to match *.js in your current directory first.

> [!WINDOWS]
> Windows uses `dir /s /b filename` for recursive searches, or `where` instead of `which`. PowerShell offers `Get-ChildItem -Recurse -Filter "*.js"`. In WSL, `find` and `which` work as shown.

There's a hidden configuration file called `.secret-config` buried somewhere in the projects directory. Track it down.
