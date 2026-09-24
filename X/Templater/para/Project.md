---
status: ongoing
priority:
goal: "[[]]"
deadline:
completed:
created: '[[<% tp.file.creation_date("YYYY-MM-DD") %>]]'
modified:
---

---

> [!SUMMARY]+
> %%OVERVIEW%%
> → %%OUTCOME%%

```dataviewjs
await dv.view('scripts/dataview/views/progress-bar', {type: "completed-tasks", withContainer: true})
```

---

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "remaining", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-task", withContainer: true })
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "all-completed", withContainer: true})
```

> [!EXAMPLE] ☑️ <js-todo-callout></js-todo-callout>

---

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"notes", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-note" })
```
