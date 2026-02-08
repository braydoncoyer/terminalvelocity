**Command substitution** lets you use the output of one command as an argument to another. It's like nesting functions in programming — the inner command runs first, its output replaces the expression, and then the outer command runs with that result. This is one of the most powerful features of the shell.

The modern syntax is `$(command)`. The shell runs whatever is inside the parentheses, captures the output, and substitutes it in place. You'll also see the older backtick syntax `` `command` ``, which does the same thing but is harder to read and can't be nested easily.

```bash
# Store today's date in a file name
touch "backup_$(date +%Y-%m-%d).tar"

# Count files in a directory
echo "There are $(ls | wc -l) files here"

# Use current directory in a message
echo "You are in: $(pwd)"
```

Command substitution is everywhere in shell scripting. It's used for dynamic file names, building complex commands, assigning command output to variables (`CURRENT_DIR=$(pwd)`), and much more. Once you understand it, you'll start seeing opportunities to use it everywhere.

> [!TIP]
> Always prefer `$(command)` over backticks. The dollar-paren syntax is easier to read, nests cleanly (`$(echo $(pwd))`), and is the modern standard. Backticks are considered legacy style.

> [!WARNING]
> Our terminal simulator has limited support for command substitution. In a real terminal, `$(command)` works everywhere. For this lesson, focus on understanding the concept and practice using `echo` to print output.

> [!WINDOWS]
> PowerShell uses a similar concept with `$(expression)` inside double-quoted strings, e.g., `"Current dir: $(Get-Location)"`. Command Prompt doesn't support command substitution directly — you'd use `for /f` loops instead. WSL supports `$(command)` natively.

Let's practice with what our simulator supports. Run `echo` with a message — in a real terminal, you could embed commands inside it with `$()`. Try running `echo hello world` and `pwd` to see output you could combine with substitution.

```bash
echo "hello from the terminal"
pwd
```
