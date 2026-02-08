Moving one character at a time is precise but slow. Moving to the start or end is fast but imprecise. The sweet spot is **word-by-word navigation** — jumping across whole words to get close to where you need to edit, then fine-tuning with arrow keys.

```bash
Alt+F / Alt+Right    Move forward one word
Alt+B / Alt+Left     Move backward one word
```

**Alt+F** (or **Alt+Right**) moves the cursor forward to the end of the next word, and **Alt+B** (or **Alt+Left**) moves it backward to the beginning of the previous word. A "word" in terminal terms is a sequence of characters separated by spaces or special characters.

> [!TIP]
> Memory trick: **F** for **Forward**, **B** for **Backward**. If Alt+F and Alt+B don't work in your terminal, try **Alt+Right** and **Alt+Left** instead — most macOS terminals support both. In iTerm2, you may need to go to Profiles > Keys and set the Option key to Esc+.

The terminal is pre-loaded with a command that lists `style.css`, but you actually want to see `index.html`. Use **Alt+B** (or **Alt+Left**) to jump back to the filename, replace it with `index.html`, and press Enter.

Word movement is especially useful when you have long file paths or multiple arguments. Instead of arrow-keying 40 characters to change one directory name, you can jump 3-4 words and be right where you need to be.

> [!WINDOWS]
> In PowerShell and Windows Terminal, Ctrl+Left and Ctrl+Right move by word instead of Alt+F/Alt+B. In WSL, the Alt shortcuts work as described.
