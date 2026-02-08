One of the biggest misconceptions about the terminal is that experts memorize everything.

**They don’t!**

The real skill is knowing _how_ to look things up quickly. The terminal includes built-in documentation, and learning to use it will save you countless trips to a search engine.

There are two main ways to get help.

## Quick Help: `--help`

Most modern commands support a `--help` option. This prints a short summary of how the command works, including available options and arguments.

```bash
ls --help
```

From earlier lessons, this follows the normal command structure:

```bash
command [options] [arguments]
```

Here:

- `ls` → command
- `--help` → option that asks the command to explain itself

Use this when you want a fast overview!

<br>

## Detailed Help: `man`

The `man` command (short for manual) opens a full manual page for a command.

```bash
man ls
```

> [!TIP]
> When you're inside a manual page, you can use the arrow keys to scroll, and press `q` to quit:

Manual pages usually include:

- Full descriptions
- All available options
- Examples
- Related commands
- Edge cases

<br>

> [!TIP]
> When you’re unsure about a command:
>
> Try `--help` first for a quick overview.
> Use `man` when you need deeper detail.

Building this habit early makes learning new commands dramatically faster.

> [!POWERTIP]
> Inside a man page:
>
> Press `/` to search
> Type a word and press `Enter`
> Press `n` to jump to the next match

<br>

## Try It

Using one of the methods described above, look up how the `ls` command works. Explore the output and see what information is available.
