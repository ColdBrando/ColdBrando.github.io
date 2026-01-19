# 博客文章管理指南

## 📁 文章目录结构

```
src/articles/
├── 1-edge-computing/
│   ├── en.md    # 英文版本
│   └── zh.md    # 中文版本
├── 2-react-typescript/
│   ├── en.md
│   └── zh.md
└── 3-distributed-systems/
    ├── en.md
    └── zh.md
```

## ✍️ 如何添加新文章

### 1. 创建文章目录

在 `src/articles/` 下创建新目录，格式为 `序号-文章标识`：

```bash
mkdir src/articles/4-your-article
```

### 2. 创建中英文 Markdown 文件

在目录中创建两个文件：
- `en.md` - 英文版本
- `zh.md` - 中文版本

### 3. 配置文章元数据

编辑 `scripts/generate-articles.js`，在 `articlesConfig` 中添加配置：

```javascript
const articlesConfig = {
  // ... 现有文章
  '4-your-article': {
    date: '2026-01-20',
    tags: ['React', 'Tutorial'],
    readTime: 5,  // 预估阅读时间（分钟）
  },
};
```

### 4. 写文章内容

在 `.md` 文件中用 Markdown 语法写作：

```markdown
# 文章标题

正文内容...

## 二级标题

- 列表项 1
- 列表项 2

\```typescript
// 代码块
const example = "Hello World";
\```
```

### 5. 生成并部署

```bash
npm run deploy
```

构建过程会自动：
1. 读取所有 `.md` 文件
2. 提取标题和摘要
3. 生成文章数据
4. 构建网站
5. 部署到 GitHub Pages

## 📝 文章命名规则

- 文件夹名：`序号-英文标识`
  - 序号：按发布顺序递增（1, 2, 3...）
  - 标识：小写字母和连字符
- 示例：`4-react-hooks`, `5-vue-comparison`

## 🎯 最佳实践

1. **标题提取**：脚本的第一个 `#` 标题会被用作文章标题
2. **摘要生成**：标题后的第一段文字会被用作摘要（150字符）
3. **代码高亮**：使用语言标识（如 \`\`\`typescript）
4. **图片资源**：放在 `public/images/` 目录，引用时用 `/images/xxx.png`

## 🔧 手动触发文章生成

如果只想生成文章数据而不部署：

```bash
npm run generate-articles
```

## ⚙️ 工作流程

```bash
# 1. 创建新文章目录和 .md 文件
mkdir src/articles/4-new-article
vim src/articles/4-new-article/en.md
vim src/articles/4-new-article/zh.md

# 2. 更新文章配置
vim scripts/generate-articles.js

# 3. 生成文章数据
npm run generate-articles

# 4. 本地预览
npm run dev

# 5. 部署
npm run deploy
```

## 📊 文章排序

文章按 `date` 字段自动排序（新文章在前），无需手动调整。
