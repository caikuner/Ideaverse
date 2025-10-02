---
created: '<% tp.file.title %>'
modified:
---

⏮️<% tp.user.dailyZoomOutRibbon(tp.file.title) %>⏭️

⬅️<% tp.user.dailyNextPrevRibbon(tp.file.title) %>➡️

---

<% tp.user.dailyDateInfo(tp.file.title) %>

---

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "overdue", onDate: "<% tp.file.title %> " , scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "due", onDate: "<% tp.file.title %> " , scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "scheduled", onDate: "<% tp.file.title %> " , scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/habits")
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "ongoing", onDate:"<% tp.file.title %> ", scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "completed", onDate: "<% tp.file.title %> ", scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/meetings", {type: "scheduled", onDate: "<% tp.file.title %> ", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/meetings", {type: "scheduled", onDate: "<% tp.file.title %> ", forceFormat: "isoWeek", withContainer: true})
```

---

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"notes-created", onDate: "<% tp.file.title %>", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/links", {type:"notes-updated", onDate: "<% tp.file.title %> ", withContainer: true})
```

---

<% tp.user.render('dailyReview', tp.app) %>

---

```dataviewjs
await dv.view("scripts/dataview/views/tasks", {type: "due", onDate: "<% tp.file.title %> ", forceFormat: "isoWeek", scope: "all", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/goals", {type: "ongoing", withContainer: true})
```

```dataviewjs
await dv.view("scripts/dataview/views/projects", {type: "ongoing", withContainer: true})
```
