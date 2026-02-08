The blinking cursor at the start of each line isn’t just waiting for input — it’s also showing you information!

The text before the cursor is called the **prompt**. It usually includes your username, computer name, and current directory.

Example:

```bash
user@hostname:~/projects $
```

In this example:

- `user` → your username
- `hostname` → your computer’s name
- `~/projects` → the directory you’re currently in
- `$` → indicates you’re running as a normal user
- `~` is shorthand for your home directory.

<br>

If you ever see a `#` instead of `$`, you’re likely running as the **root** (administrator) user.

> [!WARNING]
>
> Root can bypass normal permission checks, which means it can modify or delete almost anything on the system. When working as root, double-check commands before pressing `Enter`!

Prompts are not standardized. They can look very different depending on your operating system, shell, and configuration. The important thing is learning how to recognize the pieces of information they show you.

One useful habit is verifying what your prompt is showing.

The directory shown in your prompt should match your actual location. This is a quick way to confirm where you are before running commands.

> [!TIP]
> The prompt is fully customizable. Many developers add colors, Git branch info, or other details.
>
> You'll learn how to customize your prompt in a later module.

## Try It

Your prompt says you're in a certain directory. Using a command you learned in an earlier lesson, verify that's correct.
