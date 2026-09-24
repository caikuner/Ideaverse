---
status: ongoing
deadline:
achieved:
created: '[[<% tp.file.creation_date("YYYY-MM-DD") %>]]'
modified:
---

---

```dataviewjs
await dv.view('scripts/dataview/views/progress-bar', {type: "linked-completed-projects", withContainer: true})
```

---

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"projects", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/button", {command: "add-project"  })
```
