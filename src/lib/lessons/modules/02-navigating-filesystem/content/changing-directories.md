Now that you understand the filesystem is a tree of directories, it's time to start moving through it. The command for that is `cd` — short for **change directory**. Give it a destination, and it moves you there.

```bash
cd projects
```

That's it. `cd` followed by the name of the directory you want to enter. Once you run it, your **working directory** changes — and that changes everything. When you run `ls`, it shows the contents of wherever you are now. When you create a file, it's created here. Your location is the context for every command you run.

```bash
cd projects
ls
# now shows what's inside projects/, not your home directory
```

> [!TIP]
> Get into the habit of running `ls` before `cd` — look around to see what directories are available, then move into one. It's a natural pair.

You already know a command that tells you exactly where you are. Use it after moving — it's the best way to confirm you arrived where you intended.

Use `cd` to navigate into the `projects/api` directory, then verify your location.
