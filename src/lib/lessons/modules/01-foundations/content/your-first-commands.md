Every developer uses a small set of commands constantly.

These are your **orientation commands** — they answer the basic questions:

- Where am I?
- Who am I?
- How do I talk to the terminal?

> [!TIP]
> One important idea:
>
> Your terminal session is always “standing” somewhere in the filesystem. Every command you run happens relative to that location. Learning how to check your position is one of the most important early skills.

Let’s look at four foundational commands:

```bash
pwd         # Print Working Directory — shows where you are
whoami      # Prints your username
echo "Hi!"  # Prints text back to the screen
clear       # Clears the terminal screen
```

## `pwd` — Where am I?

`pwd` stands for print working directory.

It shows the full path of the folder you’re currently in. Think of it like checking the street sign for your current location.

You’ll use this constantly, especially when navigating or debugging.

<br>

## `whoami` — Who is running this command?

`whoami` prints your current username.

This becomes especially useful when:

-Working on remote servers

- Using Docker containers
- Switching between accounts
- Debugging permission issues

<br>

## `echo` — Send text to the terminal

`echo` prints whatever you pass to it.

From earlier lessons, this follows the standard command pattern:

```bash
command [options] [arguments]
```

Example:

```bash
echo "Hello world"
```

In this example:

- `echo` → command
- `"Hello world"` → argument

`echo` is heavily used in scripts, debugging, and automation.

<br>

## `clear` — Reset visual clutter

`clear` wipes the terminal screen.

> [!TIP]
> Important:
>
> It does not delete your command history. It only scrolls old content out of view!

## Try It

Now put what you've learned into practice. Can you:

- Check what directory you're currently in
- Find out which user is logged in
- Print a message of your choice to the screen
- Clean up the terminal

> [!TIP]
> Each section above introduced a command for one of these tasks. Look back if you need a refresher!
