When you type a command like `ls` or `git`, how does the shell know where that program lives on your system? It doesn't search your entire hard drive — that would be painfully slow. Instead, it checks a specific list of directories, and that list is stored in the `$PATH` environment variable.

`$PATH` contains a colon-separated list of directories. When you type a command, the shell walks through each directory in order, looking for an executable file with that name. The first match wins. If no directory in PATH contains the command, you get the dreaded "command not found" error.

```bash
echo $PATH
# Output might look like:
# /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

The `which` command tells you exactly where a command lives. Running `which ls` shows the full path to the `ls` executable. This is invaluable for debugging — if a command isn't behaving as expected, `which` tells you which version is actually being run.

```bash
which ls
# /bin/ls
```

> [!TIP]
> If you install a new tool and the terminal says "command not found," the fix is almost always adding the tool's directory to your PATH. Installers usually do this automatically, but knowing how PATH works helps you fix it when they don't.

In a real terminal, you can add to PATH like this: `export PATH="$PATH:/new/directory"`. This appends a new directory to the end of the list. Adding it to the beginning (`export PATH="/new/directory:$PATH"`) gives it higher priority.

> [!WINDOWS]
> Windows uses semicolons instead of colons to separate PATH entries (e.g., `C:\Windows;C:\Program Files\Git\bin`). You can edit PATH through System Properties > Environment Variables, or in PowerShell with `$env:Path`. In WSL, the Linux colon-separated format applies.

Try using `which` to find where a command is located, and `echo $PATH` to see all the directories your shell searches.

```bash
which echo
echo $PATH
```
