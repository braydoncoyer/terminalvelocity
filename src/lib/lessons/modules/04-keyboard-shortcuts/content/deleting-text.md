Backspace deletes one character at a time. That's fine for a typo, but when you need to delete an entire word, clear the beginning of a line, or chop off everything after the cursor, there are much faster shortcuts.

```bash
Ctrl+W    Delete the word before the cursor
Ctrl+U    Clear everything from cursor to the start of the line
Ctrl+K    Clear everything from cursor to the end of the line
```

**Ctrl+W** is the one you'll use most. It deletes the word immediately before the cursor. Pressed repeatedly, it chews through the command word by word from right to left. This is far faster than holding Backspace.

**Ctrl+U** clears everything from the cursor to the beginning of the line. This is perfect when you've typed a command you've changed your mind about — instead of holding Backspace, one keystroke wipes it clean. **Ctrl+K** does the opposite: it clears from the cursor to the end of the line, which is useful when you want to keep the beginning of a command but replace the arguments.

> [!TIP]
> Deleted text with Ctrl+W, Ctrl+U, and Ctrl+K isn't gone forever — it's saved to a "kill ring." You can paste it back with **Ctrl+Y**. This makes these shortcuts act like cut-and-paste for the command line.

The terminal is pre-loaded with a broken command: `cat projects/api/servre.js`. Notice the typo? The filename should be `server.js`, not `servre.js`. Use the shortcuts you just learned to fix it, then press Enter.

> [!WARNING]
> Be careful with Ctrl+U in the middle of a long command — it will delete everything to the left of your cursor. If you accidentally clear something, remember Ctrl+Y can paste it back.
