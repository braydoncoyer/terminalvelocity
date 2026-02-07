import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Terminal Cheat Sheet | Terminal Velocity",
  description:
    "A comprehensive terminal command reference covering navigation, file operations, keyboard shortcuts, piping, and more.",
};

const sections = [
  {
    title: "Navigation",
    commands: [
      ["pwd", "Print working directory (where am I?)"],
      ["cd dirname", "Change into a directory"],
      ["cd ..", "Go up one level"],
      ["cd ~", "Go to home directory"],
      ["cd -", "Go to previous directory"],
      ["cd /", "Go to root directory"],
      ["ls", "List files in current directory"],
      ["ls -l", "Long format (permissions, size, date)"],
      ["ls -a", "Show hidden files (dotfiles)"],
      ["ls -la", "Long format + hidden files"],
      ["ls -R", "List recursively (all subdirectories)"],
    ],
  },
  {
    title: "File Operations",
    commands: [
      ["touch file.txt", "Create an empty file"],
      ["mkdir dirname", "Create a directory"],
      ["mkdir -p a/b/c", "Create nested directories"],
      ["cp source dest", "Copy a file"],
      ["cp -r srcdir/ destdir/", "Copy a directory recursively"],
      ["mv oldname newname", "Rename (or move) a file"],
      ["mv file.txt dir/", "Move file into a directory"],
      ["rm file.txt", "Delete a file (permanent!)"],
      ["rm -r dirname/", "Delete a directory and contents"],
      ["rmdir empty-dir/", "Delete an empty directory only"],
    ],
  },
  {
    title: "Viewing Files",
    commands: [
      ["cat file.txt", "Print entire file"],
      ["head file.txt", "Print first 10 lines"],
      ["head -n 5 file.txt", "Print first 5 lines"],
      ["tail file.txt", "Print last 10 lines"],
      ["tail -n 5 file.txt", "Print last 5 lines"],
      ["less file.txt", "Scrollable file viewer (q to quit)"],
    ],
  },
  {
    title: "Keyboard Shortcuts",
    commands: [
      ["Tab", "Autocomplete file/command names"],
      ["Up Arrow", "Previous command from history"],
      ["Ctrl + C", "Cancel current command"],
      ["Ctrl + L", "Clear the screen"],
      ["Ctrl + A", "Jump to beginning of line"],
      ["Ctrl + E", "Jump to end of line"],
      ["Ctrl + W", "Delete word before cursor"],
      ["Ctrl + U", "Delete from cursor to start of line"],
      ["Ctrl + K", "Delete from cursor to end of line"],
      ["Ctrl + R", "Reverse search command history"],
      ["Alt + F", "Move cursor forward one word"],
      ["Alt + B", "Move cursor backward one word"],
    ],
  },
  {
    title: "Piping & Redirection",
    commands: [
      ["command > file.txt", "Redirect output to file (overwrite)"],
      ["command >> file.txt", "Append output to file"],
      ["command1 | command2", "Pipe: send output to next command"],
      ['grep "pattern" file', "Search for text in a file"],
      ['grep -i "pattern" file', "Case-insensitive search"],
      ['grep -c "pattern" file', "Count matching lines"],
      ["wc -l file.txt", "Count lines"],
      ["wc -w file.txt", "Count words"],
      ["sort file.txt", "Sort lines alphabetically"],
      ["sort -n file.txt", "Sort numerically"],
      ["uniq", "Remove adjacent duplicate lines"],
      ["uniq -c", "Count occurrences of each line"],
    ],
  },
  {
    title: "Search & Find",
    commands: [
      ['find . -name "*.txt"', "Find files by name pattern"],
      ["find . -type d", "Find directories only"],
      ["which command", "Show where a command is installed"],
    ],
  },
  {
    title: "Environment Variables",
    commands: [
      ["echo $HOME", "Print home directory path"],
      ["echo $PATH", "Print executable search path"],
      ["echo $USER", "Print current username"],
      ['export VAR="value"', "Set an environment variable"],
    ],
  },
  {
    title: "Power User",
    commands: [
      ["*.txt", "Wildcard: match any .txt files"],
      ["file{1..5}.txt", "Brace expansion: file1.txt through file5.txt"],
      ["$(command)", "Command substitution: use output as argument"],
      ["cmd1 && cmd2", "Run cmd2 only if cmd1 succeeds"],
      ["cmd1 || cmd2", "Run cmd2 only if cmd1 fails"],
      ["!!", "Repeat last command"],
      ["!$", "Last argument of previous command"],
      ['alias ll="ls -la"', "Create a shortcut for a command"],
    ],
  },
  {
    title: "Getting Help",
    commands: [
      ["command --help", "Quick usage summary"],
      ["man command", "Full manual page (q to quit)"],
    ],
  },
];

export default function CheatSheetPage() {
  return (
    <div className="min-h-screen bg-bg-0 text-fg">
      {/* Screen header (hidden in print) */}
      <header className="border-b border-bg-3 px-6 py-4 print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/learn"
            className="flex items-center gap-2 text-fg hover:text-accent transition-colors"
          >
            <span className="text-accent font-mono text-lg font-bold">
              &gt;_
            </span>
            <span className="font-semibold text-sm tracking-tight">
              Terminal Velocity
            </span>
          </Link>
          <PrintButton />
        </div>
      </header>

      {/* Print-only title */}
      <div className="hidden print:block print:mb-4 print:text-center">
        <h1 className="text-2xl font-bold">Terminal Velocity Cheat Sheet</h1>
        <p className="text-sm text-fg-muted mt-1">
          terminalvelocitycourse.com
        </p>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-8 print:p-0 print:max-w-none">
        <div className="mb-8 print:hidden">
          <h1 className="text-2xl font-bold text-fg">Terminal Cheat Sheet</h1>
          <p className="mt-2 text-sm text-fg-muted">
            A comprehensive reference for every command and shortcut covered in
            the course. Click &ldquo;Save as PDF&rdquo; to download.
          </p>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 print:columns-2 print:gap-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="mb-6 break-inside-avoid rounded-lg border border-bg-3 bg-bg-1 p-4 print:border-gray-300 print:bg-white print:p-3"
            >
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-accent print:text-black">
                {section.title}
              </h2>
              <table className="w-full text-xs">
                <tbody>
                  {section.commands.map(([cmd, desc]) => (
                    <tr
                      key={cmd}
                      className="border-b border-bg-3/50 last:border-0 print:border-gray-200"
                    >
                      <td className="py-1 pr-3 font-mono text-fg align-top whitespace-nowrap print:text-black">
                        {cmd}
                      </td>
                      <td className="py-1 text-fg-muted print:text-gray-600">
                        {desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-fg-muted print:mt-4">
          <p>Terminal Velocity &mdash; terminalvelocitycourse.com</p>
        </div>
      </main>
    </div>
  );
}
