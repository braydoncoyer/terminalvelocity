Your terminal prompt — the text that appears before every command — is controlled by a variable called **PS1** (Prompt String 1). By changing PS1, you can display exactly the information you want: your username, current directory, git branch, time, or even colors and icons.

In Bash, PS1 uses special escape sequences that start with a backslash. Here are the most common ones:

```bash
\u    → username          (e.g., braydon)
\h    → hostname          (e.g., macbook)
\w    → current directory  (e.g., ~/projects)
\W    → basename only      (e.g., projects)
\d    → date              (e.g., Mon Jan 15)
\t    → time (24h)        (e.g., 14:30:00)
\$    → $ for user, # for root
```

Here are some example PS1 values and the prompts they produce:

```bash
# Simple: just shows directory and $
PS1="\w \$ "
# Result: ~/projects $

# Classic: user@host with directory
PS1="\u@\h:\w\$ "
# Result: braydon@macbook:~/projects$

# Minimal: just an arrow
PS1="→ "
# Result: →

# With timestamp
PS1="[\t] \w \$ "
# Result: [14:30:00] ~/projects $
```

You can also add **colors** to your prompt using ANSI escape codes. The syntax is verbose but the results are worth it. Colors are wrapped in `\[` and `\]` to tell Bash they're non-printing characters (so line wrapping works correctly).

```bash
# Green username, blue directory, reset color at end
PS1="\[\033[32m\]\u\[\033[0m\]:\[\033[34m\]\w\[\033[0m\]\$ "
# Result: braydon:~/projects$ (with green user and blue path)
```

> [!TIP]
> You don't need to memorize color codes. Most developers use a prompt framework that handles this for you. But understanding that PS1 is just a variable helps you troubleshoot when things look wrong.

**Oh My Zsh** is the most popular Zsh framework. It provides over 150 themes, hundreds of plugins, and sensible defaults. Installation is a single command, and switching themes is as easy as changing one line in your `.zshrc`.

```bash
# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Change theme in ~/.zshrc
ZSH_THEME="agnoster"     # popular powerline-style theme
ZSH_THEME="robbyrussell" # the default, clean and minimal
ZSH_THEME="spaceship"    # feature-rich with git, node, docker info
```

**Starship** is a newer, cross-shell prompt written in Rust. It works with Bash, Zsh, Fish, PowerShell, and more. It's fast, minimal by default, and highly configurable through a simple TOML file. It auto-detects your project context and shows relevant info (git branch, Node version, Python environment, etc.).

```bash
# Install Starship
curl -sS https://starship.rs/install.sh | sh

# Add to end of ~/.bashrc or ~/.zshrc
eval "$(starship init bash)"   # for Bash
eval "$(starship init zsh)"    # for Zsh

# Configure in ~/.config/starship.toml
# https://starship.rs/config/
```

Try using `echo` to see what the current PS1 value looks like. You can also try setting PS1 to see how it changes the prompt (though the effect is simulated here).

```bash
echo $PS1
```
