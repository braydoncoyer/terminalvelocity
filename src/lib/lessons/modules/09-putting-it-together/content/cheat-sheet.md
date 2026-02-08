Congratulations on completing Terminal Velocity! Below is a comprehensive reference of everything you've learned. Bookmark this page, print it out, or screenshot it. This is your terminal cheat sheet -- the commands and patterns that will serve you every day as a developer.

## Navigation

```bash
pwd                         # Print working directory (where am I?)
cd dirname                  # Change into a directory
cd ..                       # Go up one level
cd ../..                    # Go up two levels
cd ~                        # Go to home directory
cd -                        # Go to previous directory
cd /                        # Go to root directory
ls                          # List files in current directory
ls -l                       # Long format (permissions, size, date)
ls -a                       # Show hidden files (dotfiles)
ls -la                      # Long format + hidden files
ls -R                       # List recursively (all subdirectories)
```

## File Operations

```bash
touch file.txt              # Create an empty file
mkdir dirname               # Create a directory
mkdir -p a/b/c              # Create nested directories
cp source dest              # Copy a file
cp -r srcdir/ destdir/      # Copy a directory recursively
mv oldname newname          # Rename (or move) a file
mv file.txt dir/            # Move file into a directory
rm file.txt                 # Delete a file (permanent!)
rm -r dirname/              # Delete a directory and contents
rmdir empty-dir/            # Delete an empty directory only
```

## Viewing Files

```bash
cat file.txt                # Print entire file
head file.txt               # Print first 10 lines
head -n 5 file.txt          # Print first 5 lines
tail file.txt               # Print last 10 lines
tail -n 5 file.txt          # Print last 5 lines
tail -f logfile.log         # Follow a file (live updates)
less file.txt               # Scrollable file viewer (q to quit)
```

## Keyboard Shortcuts

```bash
Tab                         # Autocomplete file/command names
Up Arrow                    # Previous command from history
Down Arrow                  # Next command from history
Ctrl + C                    # Cancel current command
Ctrl + L                    # Clear the screen
Ctrl + A                    # Jump to beginning of line
Ctrl + E                    # Jump to end of line
Ctrl + W                    # Delete word before cursor
Ctrl + U                    # Delete from cursor to start of line
Ctrl + K                    # Delete from cursor to end of line
Ctrl + R                    # Reverse search command history
```

## Piping & Redirection

```bash
command > file.txt          # Redirect output to file (overwrite)
command >> file.txt         # Append output to file
command1 | command2         # Pipe: send output to next command
grep "pattern" file.txt     # Search for text in a file
grep -i "pattern" file.txt  # Case-insensitive search
grep -c "pattern" file.txt  # Count matching lines
wc -l file.txt              # Count lines
wc -w file.txt              # Count words
sort file.txt               # Sort lines alphabetically
sort -n file.txt            # Sort numerically
sort -r file.txt            # Sort in reverse order
uniq                        # Remove adjacent duplicate lines
uniq -c                     # Count occurrences of each line
```

## Common Pipe Patterns

```bash
cat file | grep "term"                  # Search a file
ls dir/ | wc -l                         # Count files in directory
cat file | sort | uniq                  # Get unique sorted lines
cat file | sort | uniq -c | sort -rn    # Frequency count (most common first)
grep "ERROR" log.txt | wc -l            # Count errors in a log
cat data.csv | head -n 1                # View CSV headers
```

## Environment Variables

```bash
echo $HOME                  # Print home directory path
echo $PATH                  # Print executable search path
echo $USER                  # Print current username
MY_VAR="hello"              # Set a shell variable
export MY_VAR="hello"       # Set an environment variable
env                         # List all environment variables
which command               # Show where a command lives in PATH
```

## Getting Help

```bash
command --help              # Quick usage summary
man command                 # Full manual page (q to quit)
which command               # Find where a command is installed
type command                # Show what type of command it is
```

## Pro Tips

> [!TIP]
> Use Tab completion aggressively. Type the first few characters and press Tab -- the terminal will complete the rest. Double-tap Tab to see all possible completions. This alone will double your speed.

> [!TIP]
> Use `history | grep "something"` to search your command history. Find that complicated command you ran two days ago without remembering the exact syntax.

> [!TIP]
> Use `!!` to repeat the last command. Forgot to type `sudo`? Just run `sudo !!` to re-run the last command with elevated privileges.

> [!TIP]
> Create aliases for commands you type frequently. Add `alias ll='ls -la'` to your shell configuration file (`.bashrc` or `.zshrc`) to save keystrokes every day.

You now have the foundation to be productive in the terminal. These commands cover 90% of day-to-day developer terminal usage. The remaining 10% you'll pick up naturally as you encounter new tools and workflows. The most important thing is to keep practicing -- open a terminal, explore your filesystem, and build the muscle memory. You've got this.
