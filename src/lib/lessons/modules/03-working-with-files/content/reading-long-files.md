When a file is too long for `cat` to display cleanly, `less` is the answer. It opens the file in a scrollable viewer, letting you move up and down at your own pace. Unlike `cat`, which floods the screen, `less` shows one page at a time.

```bash
less server.log        # open a file in the pager

# Inside less:
# Space / f    → next page
# b            → previous page
# j / ↓        → scroll down one line
# k / ↑        → scroll up one line
# /pattern     → search for text
# n            → next search match
# q            → quit
```

The name `less` is a play on words — it's the improved successor to an older command called `more` (which could only scroll forward). The joke is "less is more." The `less` pager is used throughout the terminal — it's the same viewer that opens when you run `man` to read manual pages.

One of the most useful features of `less` is searching. Press `/` followed by a word or pattern, then Enter. The viewer will jump to the first match and highlight it. Press `n` to jump to the next match, or `N` to go to the previous one. This makes finding information in large files fast.

> [!TIP]
> If you want line numbers, open the file with `less -N server.log`. The `-N` flag shows line numbers in the left margin, which is helpful when discussing code with teammates ("look at line 47").

There's a long server log at `projects/server.log`. Open it in a scrollable viewer and browse through it. Press `q` when you're done.
