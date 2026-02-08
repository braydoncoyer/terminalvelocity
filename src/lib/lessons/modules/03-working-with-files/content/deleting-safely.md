Deleting files in the terminal is permanent. There is no Recycle Bin, no Trash, no undo. When you run `rm`, the file is gone. This makes the terminal incredibly efficient — and demands respect. Always pause before deleting to make sure you're targeting the right files.

```bash
rm file.txt                  # delete a single file
rm file1.txt file2.txt       # delete multiple files
rm -r old-project/           # delete a directory and its contents
rmdir empty-folder/          # delete an empty directory only
```

`rm` removes files. To remove a directory and everything inside it, you need `rm -r` (recursive). If you only want to remove an *empty* directory, `rmdir` is a safer choice — it refuses to delete a directory that still has files in it, acting as a safety check.

> [!WARNING]
> Never run `rm -rf /` or `rm -rf ~`. The `-rf` combination means "recursive" and "force" — it deletes everything without asking for confirmation. Pointed at root or home, it will destroy your entire system. Some systems have safeguards, but don't count on them. Always double-check the path.

For safer deletion, use `rm -i` which asks for confirmation before each file. It's slower, but it can save you from accidental data loss. Many experienced developers alias `rm` to `rm -i` as a default safety net.

> [!TIP]
> Before deleting with `rm -r`, run `ls` on the directory first to see what's inside. This two-second check can prevent catastrophic mistakes. Another safe pattern: move files to a "trash" directory first, then delete the trash later.

> [!WINDOWS]
> In Command Prompt, `del file.txt` deletes files and `rmdir /s folder` deletes directories. PowerShell uses `Remove-Item file.txt` and `Remove-Item -Recurse folder/`. Unlike the terminal, Windows does sometimes send files to the Recycle Bin.

Time to clean up. Delete the file `temp-notes.txt` and remove the empty `old-builds` directory. Remember: there's a safer command for removing empty directories than `rm -r`.
