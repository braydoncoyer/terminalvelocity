The terminal is exceptionally good at processing text. Four commands form the core of this capability: `grep` searches for patterns, `wc` counts things, `sort` orders lines, and `uniq` removes duplicates. Each is simple alone, but combined through pipes they can answer surprisingly complex questions about your data.

```bash
grep "error" log.txt          # find lines containing "error"
grep -i "error" log.txt       # case-insensitive search
grep -c "error" log.txt       # count matching lines
wc -l data.txt                # count lines in a file
sort names.txt                # sort lines alphabetically
sort -r names.txt             # sort in reverse order
uniq visitors.txt             # remove adjacent duplicate lines
sort visitors.txt | uniq -c   # count occurrences of each line
```

`grep` is arguably the most-used text processing command. Its name comes from "Global Regular Expression Print" — it searches through text and prints lines that match a pattern. The `-i` flag makes it case-insensitive, and `-c` makes it count matches instead of printing them. You'll use `grep` constantly for searching log files, filtering command output, and finding specific data.

`sort` and `uniq` are best friends. `sort` arranges lines alphabetically (or numerically with `-n`), and `uniq` removes consecutive duplicates. The critical detail: `uniq` only removes *adjacent* duplicates, so always pipe through `sort` first. The `-c` flag on `uniq` is incredibly useful — it prefixes each line with the number of times it appeared, giving you a frequency count.

> [!TIP]
> The pattern `sort | uniq -c | sort -rn` is a terminal classic. It finds unique entries, counts how many times each appears, then sorts by count in descending order. This answers questions like "what are the most common entries in this data?"

There's a file called `visitors.txt` that contains a log of website visitors — many of them visited multiple times. Use `sort` and `uniq` together to find the unique visitors.

```bash
sort visitors.txt | uniq
```

> [!WINDOWS]
> PowerShell equivalents: `Select-String` replaces `grep`, `Measure-Object -Line` replaces `wc -l`, `Sort-Object` replaces `sort`, and `Get-Unique` replaces `uniq`. The concepts carry over perfectly.
