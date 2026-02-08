You know how to `cd` into directories. But `cd` has several shortcuts that experienced developers use constantly — ways to jump up, go home, or bounce back to where you were.

```bash
cd ..                # go up one level
cd ../..             # go up two levels
cd ~                 # jump straight home
cd /                 # jump to the root
cd -                 # go back to the previous directory
```

The `cd -` shortcut is a hidden gem. It takes you back to wherever you were before your last `cd`. It's like an "undo" for navigation — perfect for bouncing between two directories while working.

Running `cd` with no arguments is the same as `cd ~` — it always takes you home. This is a quick escape when you're deep in the filesystem and want to reset. From home, you can navigate anywhere with confidence.

> [!TIP]
> You can chain `..` to climb multiple levels: `cd ../../..` goes up three directories. Combine this with a path to go up and then down: `cd ../../other-project/src`.

> [!WINDOWS]
> In Command Prompt, `cd ..` works the same way. But to change drives you need to type the drive letter (like `D:`). In PowerShell, `cd ~` works, and `cd -` is available in newer versions. WSL behaves identically to Linux.

Time to practice. There's a `components` directory nested deep inside the webapp project. Find your way to it, then head back home.
