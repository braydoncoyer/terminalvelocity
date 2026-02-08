The `touch` command creates a new, empty file. If the file already exists, it updates the file's modification timestamp without changing its contents. The name comes from the idea of "touching" a file to update its date, but in practice, everyone uses it to create new files.

```bash
touch newfile.txt              # create a single file
touch index.html style.css     # create multiple files at once
touch projects/app.js          # create a file inside a directory
```

You can create multiple files in one command by listing them all as arguments. This is a common pattern when setting up a new project — create all your starter files in one shot. Note that the directory must already exist; `touch` creates files, not directories.

> [!TIP]
> You can also create files by redirecting output into them (like `echo "hello" > file.txt`), but `touch` is the clearest way to express "I want an empty file to exist." It's also safe — it never overwrites existing content.

> [!WINDOWS]
> Windows Command Prompt doesn't have `touch`. The closest equivalent is `type nul > newfile.txt`. PowerShell offers `New-Item newfile.txt -ItemType File`. In WSL, `touch` works as shown.

You have a `projects` directory ready to go. Use `touch` to create a file called `hello.txt` inside it.
