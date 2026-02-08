Sometimes you need to interrupt what the terminal is doing. Maybe a command is running longer than expected, you want to cancel what you're typing, or you just want a clean screen. The terminal has a set of control shortcuts that act as emergency buttons.

```bash
Ctrl+C    Cancel the current command or running process
Ctrl+D    Send EOF (End of File) — closes the shell if the line is empty
Ctrl+Z    Suspend the current process (move it to background)
Ctrl+L    Clear the screen (same as typing 'clear')
```

**Ctrl+C** is your most important escape hatch. If a command is running too long, producing endless output, or you just changed your mind, Ctrl+C sends an interrupt signal that stops the process immediately. You can also use it to clear a partially typed command without running it.

**Ctrl+D** sends an "end of file" signal. If your command line is empty, it will close your terminal session (like typing `exit`). If a program is waiting for input (like `cat` with no arguments), Ctrl+D tells it you're done providing input.

**Ctrl+Z** suspends a running process and puts it in the background. The process isn't killed — it's paused. You can resume it with the `fg` command (foreground) or let it run in the background with `bg`. This is useful when you're in the middle of something (like editing a file with `nano`) and need to quickly run another command.

**Ctrl+L** clears the screen without erasing your command history. It's identical to running `clear`, but faster since you don't have to type anything. Many developers press Ctrl+L habitually before running important commands so the output is easy to read.

> [!TIP]
> Ctrl+C and Ctrl+L are the two most-used control shortcuts. Commit them to muscle memory first. Ctrl+C = "stop everything" and Ctrl+L = "clean slate."

> [!WARNING]
> Be careful with Ctrl+D on an empty prompt — it will close your terminal session. If you accidentally start closing a shell, most terminals will warn you or require pressing it twice.

Your terminal already has some output from earlier commands. Practice: clear the screen (you learned two ways to do it), then use `echo` to print a message and see clean output on a fresh start.
