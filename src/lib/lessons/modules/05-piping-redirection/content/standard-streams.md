Every command in the terminal communicates through three invisible channels called **standard streams**. Understanding these streams is the key to unlocking one of the terminal's most powerful features: connecting commands together.

**Standard input (stdin)** is the channel through which a command receives data — usually from your keyboard. **Standard output (stdout)** is where a command sends its results — usually printed to your screen. **Standard error (stderr)** is a separate channel for error messages, also printed to your screen by default but kept logically separate from normal output.

```bash
Keyboard ──→ [stdin]  ──→ ┌─────────┐ ──→ [stdout] ──→ Screen
                          │ Command │
                          └─────────┘ ──→ [stderr] ──→ Screen
```

Why does this matter? Because once you understand that commands take input and produce output through these channels, you can start *rewiring* them. You can send a command's output into a file instead of the screen. You can feed one command's output as input to another. You can even separate error messages from normal output. This is the foundation of everything you'll learn in this module.

> [!TIP]
> Think of stdin, stdout, and stderr like plumbing. By default the pipes connect your keyboard to commands and commands to your screen. But you can reroute those pipes to go anywhere — into files, into other commands, or even into nothing at all.

Let's see streams in action. The `echo` command writes to stdout — it takes the text you give it and sends it to the screen. The `cat` command reads a file and sends its contents to stdout. Try both commands below.

```bash
echo "Hello from stdout!"
cat message.txt
```

> [!WINDOWS]
> Windows has the same concept of standard streams. In PowerShell, commands output objects to a pipeline (stdout equivalent) and errors go to an error stream (stderr equivalent). The core idea is identical across platforms.
