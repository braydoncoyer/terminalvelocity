Every time you open a terminal, the shell loads a set of **environment variables** — named values that store configuration about your system, your user account, and how programs should behave. Think of them as the settings panel for your terminal session. Programs read these variables to figure out things like where to find commands, who is logged in, and what your home directory is.

Environment variables are written in ALL_CAPS by convention. You reference them with a `$` prefix. Some of the most important ones include `$HOME` (your home directory), `$USER` (your username), and `$PATH` (where the shell looks for commands). These are set automatically when you log in, and nearly every tool on your system relies on them.

```bash
echo $HOME      # Prints your home directory
echo $USER      # Prints your username
echo $PATH      # Prints the list of directories searched for commands
```

The `echo` command prints text to the screen, but when you give it a variable name starting with `$`, the shell **expands** that variable into its value before echo ever sees it. So `echo $HOME` doesn't literally print the text "$HOME" — it prints something like `/home/user`.

> [!TIP]
> You can see all environment variables at once by running `env` or `printenv` in a real terminal. It's a long list, but scanning it teaches you a lot about how your system is configured.

> [!WINDOWS]
> On Windows, environment variables use `%VARIABLE%` syntax in Command Prompt (e.g., `echo %PATH%`) and `$env:VARIABLE` in PowerShell (e.g., `$env:PATH`). In WSL, the Linux `$VARIABLE` syntax works as shown here.

Try printing some environment variables. Run `echo $PATH` or `echo $HOME` to see what your shell knows about your system.

```bash
echo $PATH
```
