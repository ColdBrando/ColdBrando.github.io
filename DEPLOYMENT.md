# 部署指南

本文档说明如何手动构建和部署个人网站到 GitHub Pages。

## 项目结构

```
personal-website/
├── articles/           # 博客文章源文件（Markdown格式）
├── public/            # 静态资源
├── scripts/           # 构建脚本（包含文章生成器）
├── src/               # React 源代码
├── dist/              # 构建输出目录（自动生成）
├── package.json       # 项目配置
└── vite.config.ts     # Vite 配置
```

## 本地开发

### 1. 安装依赖（首次运行）

```bash
cd /Users/wengyiming/personal-website
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看网站

## 发布新文章

### 步骤 1：编写文章

在 `articles/` 目录下创建新的 Markdown 文件，命名格式：`数字-标题.md`

例如：`7-new-article.md`

### 步骤 2：添加文章信息

文章开头需要包含以下元数据：

```markdown
---
title: 文章标题
date: 2026-01-19
description: 文章简介
---

# 正文内容
```

### 步骤 3：构建并部署

```bash
npm run deploy
```

这个命令会自动：
1. 生成文章数据
2. 构建项目
3. 创建 `404.html`（解决 GitHub Pages 路由问题）
4. 部署到 GitHub Pages

## 完整部署流程

### 方式 1：一键部署（推荐）

```bash
cd /Users/wengyiming/personal-website
npm run deploy
```

### 方式 2：分步部署

如果需要调试，可以分步执行：

```bash
# 1. 生成文章数据
npm run generate-articles

# 2. 构建项目
npm run build

# 3. 检查构建结果（可选）
ls -la dist/
# 应该看到：404.html, index.html, assets/, vite.svg

# 4. 部署到 GitHub Pages
npx gh-pages -d dist
```

## 常见问题排查

### 问题 1：刷新页面后 404

**症状**：首页正常，但访问 `/blog/xxx` 刷新后显示 404

**原因**：GitHub Pages 不支持 SPA 客户端路由

**解决方案**：确保 `dist/404.html` 存在

```bash
# 检查 404.html 是否存在
ls -la dist/404.html

# 如果不存在，手动创建
cp dist/index.html dist/404.html

# 重新部署
npx gh-pages -d dist
```

### 问题 2：文章没有显示

**原因**：文章数据没有生成

**解决方案**：

```bash
npm run generate-articles
npm run build
npm run deploy
```

### 问题 3：构建失败

**检查清单**：

```bash
# 1. 检查 Node.js 版本（建议 v18+）
node --version

# 2. 清理缓存重新安装
rm -rf node_modules package-lock.json
npm install

# 3. 清理构建目录
rm -rf dist
npm run build
```

### 问题 4：部署后网站没更新

**原因**：GitHub Pages 需要时间更新（通常 1-5 分钟）

**解决方案**：
- 等待几分钟
- 清除浏览器缓存
- 检查 GitHub 仓库的 `gh-pages` 分支是否有更新

## 验证部署

部署完成后，访问以下链接验证：

- 首页：https://coldbrando.github.io/
- 任意文章链接（测试刷新）：https://coldbrando.github.io/blog/6-building-with-claude

## 快速命令参考

```bash
# 开发
npm run dev

# 生成文章
npm run generate-articles

# 构建
npm run build

# 本地预览构建结果
npm run preview

# 完整部署
npm run deploy

# 仅部署已有的构建
npx gh-pages -d dist

# 代码检查
npm run lint
```

## 注意事项

1. **文章命名**：必须以数字开头，如 `1-title.md`，数字用于排序
2. **路由问题**：`404.html` 是必须的，不要删除 `postbuild` 脚本
3. **构建输出**：`dist/` 目录是自动生成的，不要手动修改
4. **GitHub 分支**：部署内容会推送到 `gh-pages` 分支，主分支保持源代码

## 紧急恢复

如果部署完全失败，可以：

1. 手动构建：
```bash
npm run build
cp dist/index.html dist/404.html
```

2. 手动上传到 GitHub Pages 仓库
3. 或者在 GitHub 仓库设置中切换到 `gh-pages` 分支查看是否有问题

## 联系

如有问题，检查：
- GitHub Actions 构建日志
- 浏览器控制台错误
- `npm run build` 输出
