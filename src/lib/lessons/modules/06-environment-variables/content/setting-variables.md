You're not limited to the built-in variables — you can create your own. There are two kinds of variables in the shell: **shell variables** (local to your current session) and **environment variables** (available to your session *and* any programs you launch from it). The difference matters when you run scripts or other programs that need access to your values.

To create a shell variable, just assign it: `GREETING=hello`. No spaces around the `=` sign — this is a common mistake. To promote it to a full environment variable (so child processes can see it), use `export`: `export GREETING=hello`. Once set, you reference it with `$GREETING`.

```bash
export MY_NAME="terminal learner"
echo $MY_NAME
```

Variables set this way only last for the current session. When you close the terminal, they're gone. To make variables permanent, you'd add the `export` line to a configuration file like `~/.bashrc` or `~/.zshrc` — but that's a topic for a later module.

> [!TIP]
> Remember: no spaces around the equals sign. `MY_VAR="hello"` works. `MY_VAR = "hello"` does not — the shell thinks you're trying to run a command called MY_VAR with arguments = and hello.

> [!WARNING]
> Be careful not to overwrite important system variables like PATH or HOME. If you accidentally clear PATH, your shell won't be able to find any commands until you fix it or open a new terminal.

> [!WINDOWS]
> In PowerShell, you set variables with `$MyVar = "value"` (spaces are fine). To set a persistent environment variable, use `[Environment]::SetEnvironmentVariable("MY_VAR", "value", "User")`. In Command Prompt, use `set MY_VAR=value` for the session or `setx MY_VAR value` for persistence.

Try it yourself. Use `export` to create a variable, then use `echo` with a `$` prefix to read it back.

```bash
export FAVORITE_COLOR="blue"
echo $FAVORITE_COLOR
```
