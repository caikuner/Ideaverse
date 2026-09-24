---
tags: [todo]
up:
related:
rank:
created: 2025-05-21
modified: 2025-07-10
---

[Code Review Guide](https://roadmap.sh/code-review)
[Code Review Best Practices](https://roadmap.sh/best-practices/code-review)

Code Review 是保证代码质量的关键环节，重点关注以下方面可显著提升审查效率和质量：

---

### **一、代码功能性**

1. **正确性验证**
   - 是否完整实现了需求功能？
   - 边界条件是否处理（如空值、极值、异常输入）？

   ```javascript
   // 错误示例：未处理空数组
   function getLastItem(arr) {
     return arr[arr.length - 1];
   }
   ```

2. **副作用检查**
   - 是否意外修改了外部状态？
   - 全局变量/缓存的使用是否合理？

---

### **二、代码质量**

1. **可读性**
   - 命名是否清晰表达意图？（避免 `data1`, `temp` 等模糊命名）
   - 函数是否遵循单一职责原则？

   ```javascript
   // 好命名示例
   function calculateCartTotal(cartItems) { … }
   ```

2. **复杂度控制**
   - 函数圈复杂度是否过高（建议 ≤10）？
   - 嵌套层级是否过深（建议 ≤3 层）？

   ```javascript
   // 坏实践：多层嵌套
   if (user) {
     if (user.isActive) {
       // …
     }
   }
   ```

3. **重复代码**
   - 是否有可提取的公共逻辑？
   - 使用工具检测重复率（如 SonarQube）

---

### **三、工程化规范**

1. **依赖管理**
   - 是否引入不必要的依赖？
   - 版本是否锁定（避免 `^1.0.0` 导致自动升级）？

   ```json
   // 推荐：精确版本
   "dependencies": {
     "lodash": "4.17.21"
   }
   ```

2. **性能影响**
   - 是否存在内存泄漏风险（如未清理的监听器）？
   - 大数据量操作是否使用防抖/节流？

   ```javascript
   // 错误示例：未清除定时器
   useEffect(() => {
     const timer = setInterval(() => {…}, 1000);
     return () => clearInterval(timer); // 必须清理！
   }, []);
   ```

---

### **四、安全与兼容性**

1. **安全漏洞**
   - 用户输入是否经过校验/转义？
   - 敏感信息是否硬编码？

   ```javascript
   // 危险示例：直接拼接SQL
   `SELECT * FROM users WHERE id = ${userInput}`;
   ```

2. **浏览器兼容性**
   - 是否使用未支持的 API（如 IE 不支持的 `fetch`）？
   - 是否需要添加 Polyfill？
3. 性能问题？
4. 可观测性？ （指标、日志、监控）

---

### **五、测试覆盖**

1. **单元测试**
   - 新增代码是否包含测试用例？
   - 关键路径覆盖率是否达标？

   ```javascript
   // 测试用例示例
   test("should return 0 when input is empty array", () => {
     expect(getLastItem([])).toBeUndefined();
   });
   ```

2. **影响性评估**
   - 修改是否影响现有功能？
   - 是否需要更新文档？

---

### **六、Code Review 实操技巧**

1. **审查优先级排序**
   - 关键路径代码 > 工具类代码
   - 高风险修改 > 样式调整

2. **高效沟通方式**
   - 使用 **" 建议性问题 "** 表述：
     ❌ " 你这写法有问题 "
     ✅ " 是否考虑用 `map` 替代 `forEach` 以便链式调用？"

3. **工具辅助**
   - 使用 GitHub / GitLab 的 Review 功能标记具体行
   - 结合 CI 自动化检查（ESLint/TypeScript 校验）

---

### **七、避免常见误区**

1. **过度审查**
   - 不要纠结于个人编码风格差异（如分号是否使用）
   - 通过 Prettier/ESLint 自动化解决格式问题

2. **拖延审查**
   - 小型 PR（建议 ≤400 行）更易高效审查
   - 设定 SLA（如 24 小时内响应）

3. **情绪化反馈**
   - 聚焦代码而非开发者本人
   - 对事不对人原则

---

通过关注这些要点，Code Review 既能提升代码质量，又能成为团队知识共享的契机。建议结合团队实际情况制定检查清单（Checklist），并定期复盘优化流程。
