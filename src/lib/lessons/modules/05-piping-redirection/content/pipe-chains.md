Now that you know how the pipe works, let's look at the combinations developers use every day. These patterns are so common they'll become second nature. Each one pairs a data-producing command with a data-processing command.

```bash
cat server.log | grep "ERROR"    # find error lines in a log
ls Documents/ | wc -l            # count files in a directory
cat names.txt | sort | uniq      # sort names and remove duplicates
```

`cat | grep` is the classic "search a file" pattern. `cat` dumps the file contents and `grep` filters for lines matching a pattern. `ls | wc -l` counts items in a directory — `wc` stands for "word count" and the `-l` flag tells it to count lines instead. Since `ls` outputs one item per line when piped, this effectively counts files and directories.

`sort | uniq` is a powerful duo for cleaning up data. `sort` arranges lines in alphabetical order, and `uniq` removes consecutive duplicate lines. Since `uniq` only removes *adjacent* duplicates, you almost always sort first. Together they answer questions like "what are the unique entries in this list?"

> [!TIP]
> The `wc` command has several useful flags: `-l` counts lines, `-w` counts words, and `-c` counts bytes (characters). The `-l` flag is by far the most common — counting lines is surprisingly useful for everything from checking file lengths to counting search results.

A reports directory has been set up with a bunch of files. Use `ls` piped to `wc -l` to count how many files are in the directory.

```bash
ls reports/ | wc -l
```

> [!WINDOWS]
> PowerShell equivalents: `Get-Content log.txt | Select-String 'ERROR'` replaces `cat | grep`. `(Get-ChildItem).Count` counts files without piping. The logic is the same even though the syntax differs.
