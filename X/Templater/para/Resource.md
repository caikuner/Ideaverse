---
created: '[[<% tp.file.creation_date("YYYY-MM-DD") %>]]'
modified:
---

---

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "remaining", withContainer: true })
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "completed", withContainer: true})
```

> [!EXAMPLE] ☑️ <js-todo-callout></js-todo-callout>

---

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"notes", withContainer: true})
```
