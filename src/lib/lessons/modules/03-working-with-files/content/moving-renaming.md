`mv` (move) serves double duty: it moves files to a new location *and* renames them. In fact, renaming is just moving a file to the same directory with a different name. One command, two jobs.

```bash
mv old-name.txt new-name.txt           # rename a file
mv report.txt Documents/               # move to another directory
mv draft.txt Documents/final.txt       # move AND rename in one step
```

Unlike `cp`, `mv` doesn't leave the original behind. The file is gone from its old location and appears at the new one. This makes it perfect for organizing files — moving downloads into the right folders, renaming files to follow a convention, or restructuring a project.

Just like `cp`, `mv` will overwrite the destination without warning if a file with that name already exists. Use `mv -i` to get a confirmation prompt before overwriting. This is especially important when moving files into a directory that might already contain a file with the same name.

> [!WARNING]
> There's no `mv` undo. Once a file is moved or renamed, the original path is gone. Double-check your destination before pressing Enter, especially when renaming files in bulk.

> [!TIP]
> A common workflow: download a file, rename it to something meaningful, then move it to the right place. You can do the rename and move in a single `mv` command.

There's a file called `draft-report.txt` in your home directory. It needs to be filed away as `report.txt` inside `Documents`. Can you do both the move and rename in a single command?
