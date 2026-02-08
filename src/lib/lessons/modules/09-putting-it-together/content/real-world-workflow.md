Everything you've learned — navigation, file operations, piping, redirection — comes together in real developer workflows. In this lesson you'll step into a realistic scenario: you've just joined a project and need to investigate a production issue. A user reported errors, and your job is to find out what's going wrong.

The project directory contains source code, configuration, and a `logs/` folder with an `access.log` file. The log is filled with INFO, WARN, and ERROR lines. Your mission: navigate to the project, search the logs for errors, save those errors to a file, and count how many there are. This is exactly how developers debug production issues every day.

```bash
# Step 1: Navigate to the project
cd webapp

# Step 2: Search the logs for errors
grep "ERROR" logs/access.log

# Step 3: Save errors to a file
grep "ERROR" logs/access.log > errors.txt

# Step 4: Count the errors
wc -l errors.txt
```

Notice how each step builds on skills from a different module. Navigation from Module 2. Reading files and `grep` from Modules 3 and 5. Redirection from Module 5. Counting with `wc` from Module 5 again. None of these steps are complicated on their own — the power is in combining them into a coherent workflow.

> [!TIP]
> In real life, you'd often pipe these together: `grep "ERROR" logs/access.log | tee errors.txt | wc -l`. The `tee` command saves to a file AND passes output through the pipe. But don't worry about doing everything in one line — clarity beats cleverness.

Complete all four goals below: navigate to the project, search the logs, save the errors to a file, and count them. Take it step by step, just like you would on the job.

> [!WINDOWS]
> This workflow translates directly to Windows. In PowerShell: `Set-Location webapp`, `Select-String 'ERROR' logs/access.log`, `Select-String 'ERROR' logs/access.log | Out-File errors.txt`, and `(Get-Content errors.txt).Count`. Same logic, different syntax.
