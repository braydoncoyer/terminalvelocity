The Home and End keys work great, but not every keyboard has them (especially on laptops and compact keyboards). The terminal has dedicated shortcuts that keep your fingers on the home row: **Ctrl+A** jumps to the start of the line, and **Ctrl+E** jumps to the end.

```bash
Ctrl+A    Jump to the beginning of the line
Ctrl+E    Jump to the end of the line
```

These shortcuts come from Emacs, one of the oldest text editors. They're baked into almost every terminal, every shell, and most text input fields on macOS. Once you learn them, you'll use them everywhere — not just in the terminal.

> [!TIP]
> Memory trick: **A** is the first letter of the alphabet, so Ctrl+A goes to the **start**. **E** stands for **End**. These two shortcuts alone will save you more time than any other pair.

Here's a practical exercise. The terminal is pre-loaded with `cat /etc/hosts`. Use **Ctrl+A** to jump to the beginning, type `sudo ` before it, and press Enter.

> [!WINDOWS]
> Ctrl+A and Ctrl+E work in Bash and Zsh on Linux and macOS. In PowerShell, Home and End serve the same purpose. If you're using WSL, the Bash shortcuts work as expected.
