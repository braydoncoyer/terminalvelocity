Every file and folder on your computer lives inside a single tree structure. At the very top is the **root directory**, written as `/`. Everything — your documents, your programs, even the operating system itself — branches off from this single root.

Inside the root you'll find standard directories that each have a purpose. `/bin` holds essential programs (like `ls` and `cd`). `/etc` stores system configuration files. `/usr` contains user-installed software. `/var` keeps variable data like logs. `/tmp` is for temporary files that can be safely deleted on reboot. And `/home` is where each user gets their own personal directory.

```bash
/              ← root (the very top)
├── bin/        ← essential programs
├── etc/        ← system configuration
├── home/       ← user home directories
│   └── user/   ← your home directory (~)
├── tmp/        ← temporary files
├── usr/        ← user-installed software
└── var/        ← logs, caches, variable data
```

Your **home directory** is your personal space. It's usually at `/home/your-username`, and you can refer to it with the shorthand `~` (tilde). When you open a fresh terminal, you almost always start here.

> [!TIP]
> Think of the filesystem like an upside-down tree. The root is at the top and branches grow downward. Every path starts from root and follows branches down to the file or directory you want.

> [!WINDOWS]
> On Windows, the root of each drive is a letter like `C:\`. There's no single root — each drive is its own tree. In WSL, the Linux filesystem starts at `/` and your Windows drives are accessible at `/mnt/c/`, `/mnt/d/`, etc.

Let's explore the root. Run `ls /` to see what directories live at the top level of the filesystem.

```bash
ls /
```
