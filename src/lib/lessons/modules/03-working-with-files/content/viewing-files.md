You don't always need to open a text editor to read a file. The terminal has several commands for quickly viewing file contents. The right choice depends on how much of the file you need to see.

```bash
cat notes.txt          # print the entire file
head notes.txt         # print the first 10 lines
tail notes.txt         # print the last 10 lines
head -n 5 notes.txt    # print the first 5 lines
tail -n 3 notes.txt    # print the last 3 lines
```

`cat` (short for concatenate) dumps the entire file to the screen. It's great for short files, but overwhelming for long ones. `head` shows just the beginning and `tail` shows just the end. Both default to 10 lines, but you can specify an exact number with the `-n` flag.

`tail` has a special trick: `tail -f logfile.log` will **follow** the file, showing new lines as they're added in real time. This is invaluable for watching server logs or debugging live systems. Press Ctrl+C to stop following.

> [!TIP]
> Use `cat` for short config files and quick checks. Use `head` when you just want to confirm what's at the top of a file (like checking CSV headers). Use `tail` for log files where the newest entries are at the bottom.

> [!WINDOWS]
> In Command Prompt, `type file.txt` is equivalent to `cat`. PowerShell uses `Get-Content file.txt` (or its alias `cat`). For head/tail equivalents, PowerShell offers `Get-Content file.txt -Head 5` and `Get-Content file.txt -Tail 5`.

There's a changelog file at `projects/CHANGELOG.md` with a lot of entries. You only need to see the first few lines — which command from this lesson is best for that?
