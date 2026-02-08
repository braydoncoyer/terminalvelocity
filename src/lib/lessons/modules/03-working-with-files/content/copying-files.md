`cp` (copy) duplicates a file from one location to another. The original stays untouched and a new copy is created at the destination. You need two arguments: the source (what to copy) and the destination (where to put it).

```bash
cp original.txt copy.txt              # copy to a new name
cp config.json backups/config.json    # copy to another directory
cp -r src/ src-backup/                # copy an entire directory
```

By default, `cp` only works on individual files. To copy a directory and everything inside it, you need the `-r` flag (recursive). Without `-r`, trying to copy a directory will give you an error. This is a safety measure — copying a large directory tree is a significant operation, so the terminal makes you be explicit about it.

Be careful: if the destination file already exists, `cp` will **overwrite** it without warning. If you want to be prompted before overwriting, use `cp -i` (interactive mode). For critical files, this extra safety check is worth the extra keystroke.

> [!TIP]
> Creating backups before making changes is a great habit. A quick `cp config.json config.json.bak` before editing gives you an easy way to restore the original if something goes wrong.

> [!WINDOWS]
> In Command Prompt, `copy file.txt dest.txt` copies files and `xcopy /s source dest` copies directories. PowerShell uses `Copy-Item source.txt dest.txt` and `Copy-Item -Recurse src/ dest/`. In WSL, `cp` works as shown.

There's an important configuration file that needs a backup. Copy `projects/config.json` into the `backups` directory.
