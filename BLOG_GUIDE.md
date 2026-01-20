# 博客使用指南

## 添加新文章

编辑 `src/data/articles.ts`，添加新文章到 `articles` 数组：

```typescript
{
  id: '4', // 唯一 ID
  title: '你的文章标题',
  excerpt: '文章简介（显示在列表页）',
  content: `
# 文章标题

文章正文内容，支持 Markdown 格式...

## 二级标题

- 列表项 1
- 列表项 2
  `,
  date: '2026-01-20',
  tags: ['标签1', '标签2'],
  readTime: 5, // 阅读时间（分钟）
}
```

## 部署更新

```bash
# 1. 构建并部署
npm run deploy

# 2. 等待 1-2 分钟，访问网站
# https://coldbrando.github.io
```

## 当前页面

- **首页** (`/`) - 展示精选文章
- **文章列表** (`/blog`) - 所有文章
- **文章详情** (`/blog/:id`) - 文章内容

## 技术栈

- React 19
- TypeScript
- Vite
- React Router 7
- CSS (无第三方 CSS 框架)

## 项目结构

```
src/
├── data/
│   └── articles.ts       # 文章数据
├── pages/
│   ├── Home.tsx          # 首页
│   ├── BlogList.tsx      # 文章列表
│   └── BlogPost.tsx      # 文章详情
├── components/           # 可复用组件
├── hooks/               # 自定义 Hooks
├── utils/               # 工具函数
├── types/               # TypeScript 类型
├── App.tsx              # 主应用（路由配置）
└── main.tsx             # 入口文件
```

## 下一步可扩展

- [ ] 添加搜索功能
- [ ] 添加标签过滤
- [ ] 添加暗色模式
- [ ] 添加评论功能
- [ ] 接入 Markdown 解析器
- [ ] 添加代码高亮
- [ ] 添加 RSS 订阅
- [ ] 优化 SEO
