So far you've been typing commands and pressing Enter. But what happens when you type a long command and realize there's a typo near the beginning? You *could* hold Backspace and retype everything, but that's slow and frustrating. Learning to move your cursor efficiently through a command is the first step toward real terminal speed.

The most basic cursor movement uses the **Left** and **Right arrow keys**. Each press moves the cursor one character in that direction. This lets you position the cursor exactly where you need to make an edit, insert text, or delete a character.

```bash
Left Arrow   Move cursor one character left
Right Arrow  Move cursor one character right
Home         Jump to the beginning of the line
End          Jump to the end of the line
```

The **Home** key jumps your cursor all the way to the beginning of the line, and the **End** key jumps it to the end. These are great when you need to make a quick edit at either end of a long command without arrow-keying across the entire line.

> [!TIP]
> Start building the habit now: whenever you need to fix something at the start of a command, reach for Home instead of holding the Left arrow. It feels minor, but the seconds add up to minutes every day.

Time to practice. The terminal is pre-loaded with a long command, but there's a typo at the very beginning — `ehco` instead of `echo`. Use the **Home** key (or **Left arrow**) to move your cursor to the start, fix the typo, and press Enter.
