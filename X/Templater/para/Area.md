---
created: '[[<% tp.file.creation_date("YYYY-MM-DD") %>]]'
modified:
---

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "remaining", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "completed", withContainer: true})
```

> [!EXAMPLE] ☑️ <js-todo-callout></js-todo-callout>

---

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"goals", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-goal", withContainer: true })
```

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"notes", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-note", withContainer:true })
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "remaining", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "completed", withContainer: true})
```

> [!EXAMPLE] ☑️ <js-todo-callout></js-todo-callout>

---

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"goals", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-goal", withContainer: true })
```

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"notes", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-note", withContainer:true })
```
