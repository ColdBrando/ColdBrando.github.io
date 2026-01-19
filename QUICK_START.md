# 📝 博客写作快速指南

## 快速开始

### 1. 创建新文章

```bash
# 创建文章目录（序号递增）
mkdir src/articles/4-your-article

# 创建中英文文件
vim src/articles/4-your-article/en.md
vim src/articles/4-your-article/zh.md
```

### 2. 配置文章信息

编辑 `scripts/generate-articles.js`，添加：

```javascript
'4-your-article': {
  date: '2026-01-20',
  tags: ['React', 'Tutorial'],
  readTime: 5,
},
```

### 3. 写文章

在 `.md` 文件中用 Markdown 写作：

```markdown
# 文章标题（会被自动提取）

这是摘要（会被自动提取）

正文内容...

## 小节标题

- 列表项

\`\`\`typescript
代码块
\`\`\`
```

### 4. 预览并部署

```bash
npm run deploy
```

就这么简单！✨

---

## 文章目录结构

```
src/articles/
├── 1-edge-computing/
│   ├── en.md  # 英文
│   └── zh.md  # 中文
├── 2-react-typescript/
│   ├── en.md
│   └── zh.md
└── 3-distributed-systems/
    ├── en.md
    └── zh.md
```

---

## 自动化功能

✅ **自动提取**：从 Markdown 提取标题和摘要
✅ **自动排序**：按日期自动排序
✅ **中英文切换**：点击按钮立即切换
✅ **代码高亮**：支持多种语言
✅ **一键部署**：`npm run deploy`

---

## 常用 Markdown 语法

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 列表

```markdown
- 无序列表项
  - 嵌套项

1. 有序列表项
2. 第二项
```

### 代码块

``````markdown
\```typescript
const greeting: string = "Hello";
console.log(greeting);
\```
``````

### 强调

```markdown
**粗体**
*斜体*
`代码`
```

### 链接

```markdown
[链接文字](https://example.com)
```

---

## 预览本地效果

```bash
npm run dev
```

访问 http://localhost:5173

---

## 技术栈

- **React 19** + **TypeScript** - 框架
- **Vite** - 构建工具
- **React Router** - 路由
- **react-i18next** - 国际化
- **react-markdown** - Markdown 渲染
- **GitHub Pages** - 托管
