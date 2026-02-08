In earlier lessons, you learned to create aliases with `alias name='command'` and modify your PATH with `export PATH="/new/path:$PATH"`. But those changes vanish the moment you close the terminal. To make them permanent, you need to add them to your shell config file.

The process is straightforward: open your config file (`~/.bashrc` for Bash or `~/.zshrc` for Zsh) in a text editor, add your alias or export line, save the file, and then either restart your terminal or run `source ~/.bashrc` (or `source ~/.zshrc`) to reload it.

```bash
# Step 1: Open the file in your editor
nano ~/.bashrc        # or: code ~/.bashrc, vim ~/.bashrc

# Step 2: Add your aliases and PATH entries
alias projects="cd ~/projects"
alias serve="python3 -m http.server"
export PATH="$HOME/.npm-global/bin:$PATH"

# Step 3: Save and reload
source ~/.bashrc
```

> [!TIP]
> Keep your config file organized. Group aliases together, PATH entries together, and add comments explaining what each section does. Future-you will thank present-you.

A common best practice is to separate your customizations into their own file and source it from your main config. For example, you might create `~/.bash_aliases` for all your aliases and add `source ~/.bash_aliases` to your `.bashrc`. This keeps things clean and modular.

```bash
# In ~/.bashrc — source a separate aliases file
if [ -f ~/.bash_aliases ]; then
    source ~/.bash_aliases
fi
```

When adding to **PATH**, order matters. Directories listed first take priority. If you have a custom version of a tool in `~/.local/bin`, putting it at the front of PATH ensures your version runs instead of the system default.

```bash
# Your custom tools take priority over system defaults
export PATH="$HOME/.local/bin:$PATH"

# Append instead (system tools take priority)
export PATH="$PATH:/opt/new-tool/bin"
```

> [!WARNING]
> Be careful not to overwrite PATH entirely. Always include `$PATH` in your export so you don't lose access to essential system commands. Writing `export PATH="/my/dir"` without `$PATH` would make most commands stop working.

In our simulated terminal, we can't edit files with a text editor, but we can examine a `.bashrc` to see how these entries look in practice. Use `cat` to view the config file below.

```bash
cat .bashrc
```
