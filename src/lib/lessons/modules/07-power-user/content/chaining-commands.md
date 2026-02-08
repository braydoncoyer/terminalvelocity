So far, you've been running one command at a time. But the shell lets you **chain multiple commands** on a single line using special operators. This is incredibly useful for multi-step tasks — create a directory and immediately move into it, compile code and run it, or download a file and extract it, all in one line.

There are three main chaining operators. **`&&`** (AND) runs the second command only if the first one succeeds. **`||`** (OR) runs the second command only if the first one fails. **`;`** (semicolon) runs the second command no matter what. Each has a distinct purpose.

```bash
# AND — second runs only if first succeeds
mkdir my-project && cd my-project

# OR — second runs only if first fails
cd my-project || echo "Directory doesn't exist"

# Semicolon — always runs both
echo "Starting..." ; ls
```

The `&&` operator is the most commonly used. The classic pattern `mkdir my-project && cd my-project` is something you'll type hundreds of times as a developer. It's safe because if `mkdir` fails (maybe the directory already exists), the `cd` won't execute and you won't get a confusing error.

> [!TIP]
> You can chain more than two commands: `mkdir build && cd build && touch index.html && echo 'done'`. Each `&&` acts as a checkpoint — if any step fails, the rest are skipped.

> [!WARNING]
> Our terminal simulator may not support `&&`, `||`, or `;` operators directly. In a real terminal, these work on every major shell. For practice, we'll run the commands individually to achieve the same result.

> [!WINDOWS]
> Command Prompt uses `&&` and `||` just like bash. PowerShell uses `-and` and `-or` in conditionals, or `;` to separate commands on one line. The `&&` operator was added to PowerShell 7. In WSL, all chaining operators work as shown.

Let's practice the most common pattern: creating a directory and moving into it. Run `mkdir my-project` first, then `cd my-project`. In a real terminal, you'd combine these as `mkdir my-project && cd my-project`.

```bash
mkdir my-project
cd my-project
```
