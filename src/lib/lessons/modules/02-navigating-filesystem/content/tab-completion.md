If you take one habit away from this entire course, make it this: **press Tab**. Tab completion is the terminal's auto-complete. Start typing a file or directory name, press Tab, and the shell fills in the rest. It's faster than typing, and it eliminates typos.

```bash
cd pro<Tab>        →  cd projects/
cd projects/web<Tab>  →  cd projects/webapp/
ls Doc<Tab>        →  ls Documents/
```

If there are multiple matches, pressing Tab twice shows you all the options. For example, if you have `projects/` and `photos/`, typing `cd p` and pressing Tab twice will list both. Type one more letter to disambiguate (`cd pr<Tab>`) and it completes to `projects/`.

Tab completion works for more than just file paths. It also completes command names, environment variables, and even git branches (in shells with enhanced completion). The deeper you get into the terminal, the more you'll rely on it.

> [!TIP]
> Pro tip: Tab doesn't just save keystrokes — it *validates* your path as you type. If Tab doesn't complete anything, the path probably doesn't exist. Use it as a check while navigating.

> [!WINDOWS]
> Tab completion works in PowerShell and the newer Windows Terminal. In the old Command Prompt, Tab cycles through matches one at a time instead of showing all options. WSL supports full bash-style tab completion.

Try navigating around using Tab to complete directory names. Type `cd` followed by the first few letters of a directory, then press Tab to auto-complete.
