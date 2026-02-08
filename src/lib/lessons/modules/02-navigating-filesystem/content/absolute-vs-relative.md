There are two ways to refer to any file or directory: **absolute paths** and **relative paths**. An absolute path starts from the root (`/`) and spells out the entire route — like a full street address. A relative path starts from wherever you are right now — like saying "two doors down."

```bash
# Absolute path — always starts with /
/home/user/projects/webapp/index.html

# Relative paths — depend on your current directory
projects/webapp/index.html    # from /home/user
./webapp/index.html            # from /home/user/projects
../api/server.js               # go up one level, then into api
```

The dot shortcuts are essential. A single dot `.` means "the current directory." Two dots `..` mean "the parent directory" (one level up). So `./projects` is the same as `projects` — both point to the projects folder relative to where you are. And `../` takes you up a level before going somewhere else.

When should you use which? Relative paths are shorter and more convenient for nearby files. Absolute paths are unambiguous — they work the same no matter where you are. In scripts, absolute paths are usually safer. In day-to-day terminal use, relative paths are faster.

> [!TIP]
> If you're ever unsure whether a path is right, tab completion can help. Start typing the path and press Tab — the shell will auto-complete if it finds a match, confirming the path exists.

Practice both styles. Navigate to the `webapp/src` directory using an absolute path, then use a relative path to go somewhere else.
