Pressing Up through dozens of commands to find the one you want is tedious. **Ctrl+R** opens a reverse incremental search — you type a few characters and the terminal instantly shows the most recent command matching what you've typed.

```bash
Ctrl+R        Start reverse history search
(type text)   Narrows the search as you type
Ctrl+R again  Jump to the next older match
Enter         Run the displayed command
Esc           Exit search and keep the command on the prompt
Ctrl+G        Cancel search and return to empty prompt
```

When you press Ctrl+R, the prompt changes to show `(reverse-i-search)`. As you type characters, the terminal searches backward through history for the most recent command containing that text. If the first match isn't what you want, press Ctrl+R again to jump to the next older match.

Once you see the command you want, press **Enter** to run it immediately, or press **Esc** (or the Right arrow) to place it on your command line so you can edit it before running.

> [!TIP]
> Ctrl+R is a game-changer once it becomes muscle memory. You only need to remember 2-3 characters from a long command to find it instantly. Try to use it every time you think "I ran that command recently..."

Your terminal already has some history, including `echo searching is powerful`. Press **Ctrl+R**, type a few letters like `search`, and press Enter when it finds the match. If you want, run a few more commands first to push it further back — Ctrl+R will find it no matter how far back it is.
