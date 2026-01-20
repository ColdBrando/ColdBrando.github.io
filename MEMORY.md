# Claude Memory - 个人博客项目

> **重要提示**：本文档用于记录项目结构和关键信息，避免每次对话都重新探索，节省 token 和时间。

---

## 项目基本信息

- **项目名称**：personal-website
- **项目路径**：`/Users/wengyiming/personal-website`
- **部署域名**：https://coldbrando.github.io
- **GitHub用户名**：ColdBrando
- **部署平台**：GitHub Pages

---

## 技术栈

- **前端框架**：React 19
- **语言**：TypeScript
- **构建工具**：Vite
- **路由**：React Router 7
- **国际化**：react-i18next
- **样式**：纯CSS（无第三方框架）
- **部署**：gh-pages

---

## 项目结构

```
personal-website/
├── src/
│   ├── articles/              # 文章源文件（Markdown）
│   │   ├── article-slug-1/
│   │   │   ├── en.md          # 英文版
│   │   │   └── zh.md          # 中文版
│   │   └── article-slug-2/
│   │       ├── en.md
│   │       └── zh.md
│   ├── data/
│   │   ├── articles.ts        # 文章类型定义
│   │   └── articles-data.generated.ts  # 自动生成的文章数据
│   ├── components/            # React组件
│   ├── pages/                 # 页面组件
│   ├── locales/               # 国际化翻译文件
│   │   ├── en.json
│   │   └── zh.json
│   ├── App.tsx                # 主应用（路由配置）
│   └── main.tsx               # 入口文件
├── scripts/
│   ├── generate-articles.js   # 文章生成脚本
│   └── crypto.js              # 加密工具（付费文章）
├── public/                    # 静态资源
├── BLOG_GUIDE.md             # 博客使用指南
├── MEMORY.md                 # 本文件（项目记忆）
└── package.json
```

---

## 发布文章流程

### 方式一：使用Claude发布（推荐）

1. **告诉 Claude 要发布的文章内容**
2. Claude 会自动：
   - 在 `src/articles/` 创建新目录
   - 生成 `en.md` 和 `zh.md` 两个文件
   - 更新 `scripts/generate-articles.js` 配置
   - 运行 `npm run deploy` 自动部署

### 方式二：手动发布

1. **创建文章目录**
   ```bash
   mkdir -p src/articles/your-article-slug
   ```

2. **编写文章**
   - 创建 `src/articles/your-article-slug/zh.md`（中文）
   - 创建 `src/articles/your-article-slug/en.md`（英文）
   - 文章格式：Markdown，第一行是 `# 标题`

3. **配置元数据**
   编辑 `scripts/generate-articles.js`：
   ```javascript
   const articlesConfig = {
     'your-article-slug': {
       date: '2026-01-20',
       tags: ['AI', 'Tech'],
       readTime: 10,      // 阅读时间（分钟）
       isPaid: false,     // 是否付费
     },
   };
   ```

4. **生成文章数据**
   ```bash
   npm run generate-articles
   ```

5. **部署**
   ```bash
   npm run deploy
   ```

---

## 文章元数据配置

### 位置
`scripts/generate-articles.js` 中的 `articlesConfig` 对象

### 字段说明
- **key**: 文章目录名（slug）
- **date**: 发布日期（YYYY-MM-DD）
- **tags**: 标签数组，用于分类和筛选
- **readTime**: 阅读时间（分钟）
- **isPaid**: 是否为付费文章（true=加密内容，false=免费）

### 示例
```javascript
'ai-era-containers': {
  date: '2026-01-20',
  tags: ['AI', 'Agent', 'Container', 'Future', 'Paradigm Shift'],
  readTime: 10,
  isPaid: false,
}
```

---

## 文章自动生成机制

### 工作原理
1. 扫描 `src/articles/` 目录下的所有子目录
2. 读取每个目录中的 `en.md` 和 `zh.md`
3. 从 Markdown 中提取：
   - **标题**：第一个 `#` 标题
   - **摘要**：标题后的第一段文字
   - **内容**：完整 Markdown 内容
4. 根据 `isPaid` 决定是否加密内容
5. 生成 `src/data/articles-data.generated.ts`

### 自动执行
- `npm run build` 前自动执行（prebuild hook）
- `npm run deploy` 时自动执行

---

## 图片插入

### 推荐图片源
- **Unsplash**: `https://images.unsplash.com/photo-xxx?w=1200&h=600&fit=crop`
- 支持的参数：
  - `w`: 宽度
  - `h`: 高度
  - `fit=crop`: 裁剪模式

### Markdown 语法
```markdown
![图片描述](https://images.unsplash.com/photo-xxx?w=1200&h=600&fit=crop)
```

### 文章中的图片建议
- 文章开头：主题相关的大图（1200x600）
- 章节分隔：概念图或对比图
- 每篇文章建议：3-5张图片

---

## 常用命令

```bash
# 开发环境
npm run dev

# 构建生产版本
npm run build

# 生成文章数据
npm run generate-articles

# 一键部署到 GitHub Pages
npm run deploy

# 转换文章到微信公众号格式
npm run wechat src/articles/your-article/zh.md
```

---

## 微信公众号文章转换

### 工具位置
`scripts/wechat-converter.js`

### 快速使用

```bash
# 转换文章到微信公众号格式
npm run wechat src/articles/ai-era-containers/zh-wechat.md

# 打开生成的预览文件
open src/articles/ai-era-containers/zh-wechat-wechat.html
```

### 使用流程

1. **转换文章**
   ```bash
   npm run wechat src/articles/your-article/zh.md
   ```

2. **预览效果**
   - 在浏览器中打开生成的 `.html` 文件
   - 检查格式、样式、代码高亮

3. **复制到公众号**
   - 点击预览页面右上角"复制内容"按钮
   - 粘贴到微信公众号编辑器

### 功能特性

- ✅ 支持所有 Markdown 语法
- ✅ 代码语法高亮（180+ 语言）
- ✅ 公众号优化样式
- ✅ 表格、引用、列表
- ✅ 一键复制
- ✅ 本地离线，无需注册

### 详细文档

完整使用指南：查看 `WECHAT_GUIDE.md`

### 文件组织建议

```
src/articles/your-article/
├── zh.md              # 博客中文版
├── en.md              # 博客英文版
├── zh-wechat.md       # 公众号中文版（可选，移除内部链接）
└── zh-wechat-wechat.html  # 转换后的预览文件
```

### 依赖包

- `marked`: Markdown 解析
- `highlight.js`: 代码高亮

---

## 注意事项

### 1. 域名问题
- **正确域名**：https://coldbrando.github.io
- **错误域名**：https://winterbrand.github.io（已修复）
- 所有文章链接和引用请使用 `coldbrando`

### 2. 文章命名
- 目录名使用 kebab-case：`ai-era-containers`
- 避免使用数字前缀（脚本会自动处理）
- 目录名即为文章 ID 和 URL 路径

### 3. 双语要求
- 每篇文章必须同时提供 `zh.md` 和 `en.md`
- 否则生成脚本会报警告并跳过

### 4. 文章排序
- 自动按 `date` 字段降序排列
- 新文章在前

---

## 已发布文章

| 文章ID | 标题（中文） | 日期 | 标签 | 付费 |
|--------|-------------|------|------|------|
| ai-era-containers | AI时代容器技术的命运 | 2026-01-20 | AI, Agent, Container | 否 |
| domestic-ai-api | AI API商用全景指南 | 2026-01-19 | AI, API, LLM | 否 |
| building-with-claude | 与Claude Code共建个人网站 | 2026-01-16 | AI, Claude Code | 否 |
| print-stability | 打印稳定性研究 | 2026-01-14 | Print, Stability | 是 |
| edge-computing | 边缘计算架构 | 2026-01-15 | Architecture, Cloud | 否 |
| dda-architecture | DDA架构设计 | 2026-01-12 | DDD, Android | 是 |
| distributed-systems | 分布式系统设计 | 2026-01-10 | Distributed Systems | 是 |

---

## Claude 工作流优化

### 当用户要求"发布文章"时（标准流程）
1. 直接创建 `src/articles/article-slug/` 目录
2. 生成 `zh.md` 和 `en.md`
3. 更新 `scripts/generate-articles.js`
4. 运行 `npm run deploy`
5. **自动转换微信公众号版本**：
   - 运行 `npm run wechat src/articles/article-slug/zh-wechat.md`
   - 自动打开预览页面
6. **不需要**：搜索项目结构、阅读配置文件

### 当用户要求"修改文章"时
1. 直接读取 `src/articles/article-slug/zh.md` 或 `en.md`
2. 使用 Edit 工具修改
3. 重新部署
4. **不需要**：重新探索项目结构

### ⚠️ 重要：发布文章后自动执行微信转换

**每次发布文章后，自动执行**：
```bash
# 1. 创建公众号专用版本（如果有特殊优化需求）
cp src/articles/article-slug/zh.md src/articles/article-slug/zh-wechat.md

# 2. 转换并打开预览
npm run wechat src/articles/article-slug/zh-wechat.md
open src/articles/article-slug/zh-wechat-wechat.html
```

**默认行为**：
- 如果没有 `zh-wechat.md`，直接转换 `zh.md`
- 转换完成后自动打开预览
- 用户可以直接复制到公众号

---

## 快速参考

### 文章示例路径
```
src/articles/ai-era-containers/
├── en.md
└── zh.md
```

### 文章配置示例
```javascript
// scripts/generate-articles.js
'your-slug': {
  date: '2026-01-20',
  tags: ['Tag1', 'Tag2'],
  readTime: 5,
  isPaid: false,
}
```

### 部署命令
```bash
cd /Users/wengyiming/personal-website
npm run deploy
```

---

**最后更新**：2026-01-20
**维护者**：Claude Code + 用户协作
