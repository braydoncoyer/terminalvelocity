If you find yourself typing the same long command over and over, **aliases** are the answer. An alias is a custom shortcut that expands into a longer command. Instead of typing `ls -la --color=auto` every time, you can create an alias like `ll` that does the same thing in two keystrokes.

You create an alias with the `alias` command. The syntax is `alias name='command'`. Once defined, typing the alias name runs the full command. Aliases are one of the first things experienced developers set up when configuring a new machine.

```bash
alias ll='ls -la'           # Detailed file listing
alias gs='git status'        # Quick git status
alias ..='cd ..'             # Go up one directory
alias cls='clear'            # Shorter clear command
```

Like variables set with `export`, aliases created in the terminal only last for the current session. To make them permanent, you add them to your shell's configuration file (`~/.bashrc`, `~/.zshrc`, etc.). Many developers maintain a collection of aliases they carry from machine to machine.

> [!TIP]
> To see all your current aliases, just type `alias` with no arguments. To remove an alias, use `unalias name`. If an alias conflicts with a real command, you can bypass it by using the full path (e.g., `/bin/ls`) or prefixing with a backslash (`\ls`).

Some popular aliases used by developers worldwide include shortcuts for git commands (`alias gc='git commit'`), navigation (`alias projects='cd ~/projects'`), and safety nets (`alias rm='rm -i'` to always confirm before deleting).

> [!WINDOWS]
> PowerShell uses `Set-Alias` (e.g., `Set-Alias ll Get-ChildItem`) or functions for more complex aliases. Command Prompt uses `doskey` (e.g., `doskey ll=dir /a $*`). In WSL, the bash `alias` command works as shown.

Try creating an alias. Use `alias` to define a shortcut for any command you like. For example, create an alias for a directory listing.

```bash
alias ll='ls -la'
```
