# 指导原则：Obsidian 个人知识管理 (PKM) - Ideaverse

欢迎来到 Ideaverse，这是一个基于 Obsidian 和 "Linking Your Thinking" (LYT) 方法论构建的个人知识管理系统。作为 AI 助手，您的目标是帮助维护和扩展这个知识库。

注意：尽量以中文回答。

## 核心架构与理念

这个知识库遵循 **ACE 文件夹框架** 和 **内容地图 (MOCs)** 的理念。

1. **ACE 文件夹框架**:
   - `Atlas/`: 存放核心的“内容地图”(MOCs)、关键概念和常青笔记。这是知识网络的顶层入口。
   - `Calendar/`: 用于存放日记、周期性回顾和任何与时间相关的笔记。
   - `Efforts/`: 管理正在进行中的项目或“努力”。这里的笔记通常是面向目标的。
   - `Codeverse/`: 一个专门用于存放代码、技术笔记和面试准备的区域。
   - `X/`: 包含辅助性内容，如模板 (`X/Templates`)、脚本 (`X/scripts`) 和附件 (`X/Assets`)。

2. **内容地图 (MOCs)**:
   - MOCs 是特殊的 Markdown 文件，它们作为相关主题笔记的索引和聚合器。例如 `Ideaverse Map.md`。
   - 它们通过 `[[WikiLinks]]` 将离散的笔记连接成网络，是导航和发现知识的关键。
   - 在创建新笔记时，应考虑将其链接到相关的 MOC 中。

## 关键工作流程

### 1. 创建新笔记

- **使用模板**: 所有新笔记都应基于 `X/Templates/` 目录下的模板创建。例如，创建一篇关于算法的笔记，应使用 `Codeverse,Algo.md` 模板。
- **YAML Frontmatter**: 每篇笔记都必须包含 YAML frontmatter，用于元数据管理。关键字段包括：
  - `tags`: 用于分类，支持 Dataview 查询 (例如 `#algo`, `#handcode`)。
  - `up`: 链接到更高层次的 MOC 或相关父笔记。
  - `related`: 链接到其他相关笔记。
  - `created`/`modified`: 记录时间戳。

### 2. 链接笔记

- **双向链接**: 积极使用 `[[WikiLinks]]` 来链接相关概念。这是知识库的核心价值所在。
- **上下文链接**: 在创建或编辑笔记时，思考它能与哪些现有笔记产生关联，并添加链接。

### 3. 使用 Dataview

- 本知识库大量使用 **Dataview** 插件来动态查询和展示笔记。
- 您可以在 MOCs 或主页 (`Home.md`) 中看到类似代码块：

  ```dataview
  TABLE rank, tags
  FROM #handcode
  WHERE !startswith(file.path, "X/")
  SORT rank DESC
  ```

- 在添加新笔记时，正确使用 `tags` 和其他元数据，以确保它们能被 Dataview 正确索引。

### 4. 脚本和自动化

- `X/scripts/templater/` 目录下的 JavaScript 文件是为 **Templater** 插件编写的辅助脚本。
- 这些脚本用于自动化笔记的创建和元数据的填充。除非需要修改模板功能，否则通常不需要直接编辑它们。

## 示例：添加一篇新的手写代码笔记

1. **选择模板**: 使用 `X/Templates/Codeverse,Handcode.md` 模板。
2. **创建文件**: 在 `Codeverse/Codebase/` 目录下创建一个新文件，例如 `array.sort.js.md`。
3. **填充内容**:
   - 在 YAML frontmatter 中，添加 `tags: [handcode, array]` 和 `up: [[03 前端和代码MOC ⭐️]]`。
   - 在文件正文中，编写代码实现和相关解释。
4. **更新 MOC**: 在 `03 前端和代码MOC ⭐️.md` 文件中，添加一个指向新文件 `[[array.sort.js]]` 的链接。
