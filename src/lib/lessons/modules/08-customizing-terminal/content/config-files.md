Every time you open a terminal, your shell reads one or more configuration files before it shows you a prompt. These files are where your aliases, PATH changes, custom functions, and environment variables live. Understanding which file loads when is the key to customizing your terminal reliably.

The two most common shells are **Bash** and **Zsh**. macOS switched its default shell from Bash to Zsh in 2019 (Catalina), while most Linux distributions still default to Bash. Each shell has its own set of config files, but they follow similar patterns.

For **Bash**, there are two main files. `~/.bash_profile` runs when you start a **login shell** — the first terminal session you open, or when you SSH into a server. `~/.bashrc` runs for every new **interactive non-login shell** — like opening a new tab in your terminal. A common pattern is to have `.bash_profile` source `.bashrc` so your settings are consistent everywhere.

```bash
# Inside ~/.bash_profile — source .bashrc so settings work everywhere
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

For **Zsh**, life is simpler. `~/.zshrc` runs for every interactive shell session — login or not. This is the one file you'll edit most often if you use Zsh. There's also `~/.zprofile` (similar to `.bash_profile`) and `~/.zshenv` (which runs for *every* shell, even scripts), but `.zshrc` is the star.

> [!TIP]
> Not sure which shell you're running? Type `echo $SHELL` in your terminal. You'll see something like `/bin/zsh` or `/bin/bash`.

These config files are hidden — their names start with a dot. That's why you won't see them with a plain `ls`. You need `ls -a` to reveal them. Let's look at the simulated config files in this lesson. Try viewing the contents of `.bashrc` or `.zshrc` using `cat`.

```bash
cat .bashrc
cat .zshrc
```

> [!WINDOWS]
> Windows doesn't use .bashrc or .zshrc. PowerShell uses a profile script located at `$PROFILE` (usually `~\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`). You can find its path by running `echo $PROFILE` in PowerShell. If you're using WSL, your Linux shell config files work exactly as described here.
