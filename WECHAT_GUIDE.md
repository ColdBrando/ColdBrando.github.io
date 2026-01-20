# 微信公众号文章转换工具使用指南

> 本地离线工具，无需注册登录，一键转换 Markdown 到微信公众号格式

---

## 快速开始

### 方法1：使用 npm 命令（推荐）

```bash
# 转换单篇文章
npm run wechat src/articles/your-article/zh.md

# 指定输出文件
npm run wechat src/articles/your-article/zh.md output.html
```

### 方法2：直接运行脚本

```bash
node scripts/wechat-converter.js src/articles/your-article/zh.md
```

---

## 转换流程

### 步骤1：转换 Markdown

```bash
npm run wechat src/articles/ai-era-containers/zh-wechat.md
```

输出：
```
✅ 转换成功！
📄 标题: AI时代容器技术的命运：从流量平台到基础设施的范式转移
📂 预览文件: src/articles/ai-era-containers/zh-wechat-wechat.html

💡 下一步：
   1. 在浏览器中打开预览文件
   2. 点击右上角"复制内容"按钮
   3. 粘贴到微信公众号编辑器
```

### 步骤2：预览效果

```bash
# macOS
open src/articles/ai-era-containers/zh-wechat-wechat.html

# Windows
start src/articles/ai-era-containers/zh-wechat-wechat.html

# Linux
xdg-open src/articles/ai-era-containers/zh-wechat-wechat.html
```

### 步骤3：复制到公众号

1. 在浏览器中打开预览文件
2. 点击右上角绿色按钮 **"复制内容"**
3. 打开微信公众号编辑器
4. 粘贴（Cmd+V 或 Ctrl+V）

---

## 功能特性

### ✅ 支持的 Markdown 语法

- **标题**：`#` `##` `###` 自动转换为对应样式
- **段落**：自动段落间距
- **列表**：有序列表、无序列表
- **引用**：`>` 转换为绿色边框引用块
- **代码**：
  - 行内代码：`` `code` ``
  - 代码块：``` ```javascript ``` ```
  - 自动语法高亮（支持 180+ 种语言）
- **表格**：GitHub Flavored Markdown 表格
- **图片**：自动适配宽度
- **链接**：自动识别
- **粗体/斜体**：`**粗体**` `*斜体*`

### ✅ 样式定制

工具内置了微信公众号优化样式：

- ✅ 标题居中大号字体
- ✅ 二级标题左侧绿色边框
- ✅ 引用块灰色背景 + 绿色左边框
- ✅ 代码块灰色背景 + 语法高亮
- ✅ 表格边框 + 表头灰色背景
- ✅ 图片自适应宽度
- ✅ 行高 1.8（适合手机阅读）

### ✅ 代码高亮

支持 180+ 种编程语言的语法高亮：

- JavaScript / TypeScript
- Python
- Java
- Go
- Rust
- C/C++
- Shell / Bash
- SQL
- JSON / YAML
- 等等...

---

## 文件命名规范

### 推荐的文件组织

```
src/articles/your-article/
├── zh.md              # 博客中文版
├── en.md              # 博客英文版
├── zh-wechat.md       # 公众号中文版（可选）
└── zh-wechat-wechat.html  # 转换后的预览文件
```

### 为什么需要 -wechat.md？

公众号版本通常需要：

1. **移除内部链接**：博客链接在公众号中无效
2. **添加作者信息**：在文末添加作者介绍
3. **优化图片**：调整图片大小或位置
4. **添加引导**：如"关注"、"点赞"等提示

你可以：
- 复制 `zh.md` 为 `zh-wechat.md`
- 手动调整内容
- 然后转换

或者直接转换 `zh.md`，效果也不错。

---

## 示例对比

### Markdown 输入

```markdown
# 标题

## 二级标题

这是一段**粗体**文字和*斜体*文字。

> 这是引用内容

\`\`\`javascript
function hello() {
  console.log("Hello World");
}
\`\`\`

| 列1 | 列2 |
|-----|-----|
| A   | B   |
```

### 公众号输出

- ✅ 大标题居中显示
- ✅ 二级标题带绿色边框
- ✅ 粗体和斜体正确渲染
- ✅ 引用块灰色背景 + 绿色左边框
- ✅ 代码块灰色背景 + 语法高亮
- ✅ 表格带边框和表头背景

---

## 常见问题

### Q1: 代码复制到公众号后格式乱了？

**A**: 可能原因：
- 代码块太长，公众号自动换行
- 使用了不支持的语法（如 emoji 表情）

**解决方法**：
- 缩短代码行，每行不超过 50 个字符
- 移除特殊字符

### Q2: 图片在公众号中显示不出来？

**A**:
- 图片必须是外链（http/https 开头）
- 本地图片无法直接显示

**解决方法**：
- 使用图床（如七牛云、阿里云 OSS）
- 或者在公众号后台上传图片，然后替换链接

### Q3: 表格显示不正常？

**A**:
- 公众号对复杂表格支持有限
- 建议使用简单表格

**解决方法**：
- 避免合并单元格
- 避免嵌套表格
- 使用简单结构

### Q4: 想要自定义样式？

**A**: 可以编辑 `scripts/wechat-converter.js` 中的 `WECHAT_STYLES` 变量：

```javascript
const WECHAT_STYLES = `
<style>
  .wechat-preview h2 {
    border-left: 4px solid #07c160;  /* 修改这里改颜色 */
    padding-left: 12px;
  }
</style>
`;
```

---

## 高级用法

### 批量转换多篇文章

创建一个批处理脚本：

```bash
# convert-all.sh
for file in src/articles/*/zh-wechat.md; do
  echo "转换: $file"
  npm run wechat "$file"
done
```

### 自定义输出目录

```bash
node scripts/wechat-converter.js \
  src/articles/ai-era-containers/zh-wechat.md \
  /tmp/wechat-preview.html
```

### 集成到发布流程

更新 `package.json`：

```json
{
  "scripts": {
    "pub:wechat": "npm run wechat src/articles/your-article/zh-wechat.md"
  }
}
```

使用：

```bash
npm run pub:wechat
```

---

## 技术实现

### 依赖库

- **marked**: Markdown 解析器
- **highlight.js**: 代码语法高亮

### 核心功能

1. **Markdown 解析**：使用 marked 将 MD 转换为 HTML
2. **代码高亮**：使用 highlight.js 为代码块添加高亮
3. **样式注入**：生成带微信公众号优化样式的 HTML
4. **一键复制**：浏览器端 JavaScript 实现复制功能

---

## 对比其他方案

| 方案 | 优点 | 缺点 |
|------|------|------|
| **本工具** | ✅ 本地离线<br>✅ 无需注册<br>✅ 完全可控<br>✅ 免费 | ⚠️ 需要技术背景<br>⚠️ 需要手动操作 |
| Markdown Nice | ✅ 在线使用<br>✅ 主题丰富 | ❌ 需要注册<br>❌ 依赖第三方<br>❌ 内容上传 |
| 135编辑器 | ✅ 功能强大<br>✅ 模板丰富 | ❌ 需要注册<br>❌ 手动排版<br>❌ 时间成本高 |

---

## 更新日志

### v1.0.0 (2026-01-20)

- ✅ 基础 Markdown 转 HTML
- ✅ 代码语法高亮
- ✅ 公众号优化样式
- ✅ 一键复制功能
- ✅ 命令行工具

---

## 后续优化计划

- [ ] 支持自定义主题配置
- [ ] 支持图片自动上传到图床
- [ ] 支持更多公众号特效
- [ ] 提供 GUI 界面
- [ ] 支持批量转换

---

**最后更新**：2026-01-20
**维护者**：Claude Code + 用户协作
