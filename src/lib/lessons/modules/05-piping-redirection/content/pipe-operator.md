Redirection sends output to a file. But what if you want to send one command's output directly into *another command* as input? That's what the **pipe operator** `|` does. It connects the stdout of one command to the stdin of the next, creating a chain.

```bash
ls | grep ".txt"          # list files, then filter for .txt
cat names.txt | sort       # read file, then sort the lines
ls -la | head -n 5         # list files in detail, show only first 5
```

The pipe is the vertical bar character `|` (usually Shift + Backslash on most keyboards). The command on the left runs first, and its output flows into the command on the right. Think of it as literally piping water from one container to the next — the output of the first command pours into the input of the second.

This is one of the most powerful ideas in the terminal: small, focused commands that each do one thing well, connected together to accomplish complex tasks. Instead of needing one monolithic command that lists files AND filters by name, you combine `ls` (which lists) with `grep` (which filters). Each command stays simple; the pipe makes them powerful together.

> [!TIP]
> The Unix philosophy in one sentence: "Write programs that do one thing and do it well, and write programs to work together." The pipe operator is what makes working together possible.

Your workspace has a directory full of different file types. Use `ls` piped to `grep` to filter and find only the JavaScript files.

```bash
ls project/ | grep ".js"
```

> [!WINDOWS]
> PowerShell also uses `|` for piping, but it pipes *objects* rather than plain text. The concept is the same: chain commands together so the output of one feeds into the next. For example: `Get-ChildItem | Where-Object { $_.Extension -eq '.js' }`.
