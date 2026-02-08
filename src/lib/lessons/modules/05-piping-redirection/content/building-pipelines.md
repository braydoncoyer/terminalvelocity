You've piped two commands together. But there's no limit — you can chain three, four, or more commands in a single pipeline. Each command takes the output of the previous one, transforms it, and passes the result along. This is where the terminal starts to feel like a superpower.

```bash
# Find the top 3 most frequent visitors
sort visitors.csv | uniq -c | sort -rn | head -n 3

# Count how many ERROR lines are in the log
cat server.log | grep "ERROR" | wc -l

# Extract emails from column 3 of a CSV, sort, and deduplicate
cat contacts.csv | cut -d"," -f3 | sort | uniq
```

The trick to building pipelines is to think about it step by step. Start with the raw data source (a file or command output). Then ask: what do I need to do to this data? Filter it? Sort it? Count it? Extract a column? Each operation becomes one stage in the pipeline, connected by `|`.

A good debugging technique: build your pipeline one stage at a time. First run just `cat data.csv` to see the raw data. Then add `| grep "sales"` and check the output. Then add `| wc -l` to get the count. At each stage you can see exactly what the data looks like before adding the next transformation.

> [!TIP]
> There's no prize for building the longest pipeline. If a three-command pipeline answers your question, stop there. Readability matters even in the terminal. That said, a well-crafted pipeline that replaces a 20-line script is a thing of beauty.

You have a `sales.csv` file with transaction records. Build a multi-stage pipeline (at least 3 commands) to process it. For example, extract the product names, sort them, and count the unique products.

```bash
cat sales.csv | grep -v "product" | sort | uniq -c | sort -rn
```

> [!WINDOWS]
> Long pipelines work in PowerShell too, though the syntax is different. The mental model is the same: each `|` feeds data from one command into the next. PowerShell's object-based piping can actually be more readable for complex chains.
