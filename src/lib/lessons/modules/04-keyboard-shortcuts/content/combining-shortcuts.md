Individual shortcuts are useful, but real power comes from combining them into a fluid editing workflow. An experienced terminal user edits a command line the way a pianist plays chords — multiple shortcuts in quick succession, each one building on the last.

Here's a typical scenario: you need to run a complex command, but you've made a mistake in the middle. Watch how shortcuts chain together:

```bash
# Scenario: You typed this, but the path is wrong:
git commit -m "updated teh database migration"

# Fix workflow:
# 1. Ctrl+A      → jump to start
# 2. Alt+F x3    → jump forward 3 words to reach "-m"
# 3. Alt+F       → jump forward to the quote
# 4. Right Arrow  → enter the quoted text
# 5. Alt+F       → move to 'teh'
# 6. Ctrl+W      → delete 'teh'
# 7. Type 'the'  → insert correct word
# 8. Enter       → run the corrected command
```

Let's break down the most useful shortcut combinations for common tasks:

```bash
Replace a word:          Alt+B, Ctrl+W, type new word
Prepend sudo:            Ctrl+A, type 'sudo '
Change last argument:    Ctrl+E, Ctrl+W, type new arg
Clear and retype:        Ctrl+U (or Ctrl+C for new prompt)
Cut end, paste later:    Ctrl+K, edit, Ctrl+Y
```

> [!TIP]
> The cut/paste pair of Ctrl+K and Ctrl+Y (or Ctrl+U and Ctrl+Y) is incredibly powerful. You can cut a section of a command, rearrange things, and paste it back. It's like clipboard for your command line.

Your challenge: the terminal is pre-loaded with a rough draft of a deploy command. It has the wrong environment, the wrong branch, and a typo in `--verbse`. Use shortcuts to fix all three issues. Your final command should contain `deploy --env production --branch main --verbose`.
