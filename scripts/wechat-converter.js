import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import hljs from 'highlight.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 微信公众号样式
const WECHAT_STYLES = `
<style>
  .wechat-preview {
    max-width: 677px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.8;
    color: #333;
    font-size: 16px;
  }

  .wechat-preview h1 {
    font-size: 28px;
    font-weight: bold;
    margin: 40px 0 20px;
    color: #000;
    text-align: center;
    line-height: 1.4;
  }

  .wechat-preview h2 {
    font-size: 22px;
    font-weight: bold;
    margin: 30px 0 15px;
    color: #000;
    border-left: 4px solid #07c160;
    padding-left: 12px;
  }

  .wechat-preview h3 {
    font-size: 18px;
    font-weight: bold;
    margin: 25px 0 12px;
    color: #333;
  }

  .wechat-preview p {
    margin: 15px 0;
    text-align: justify;
  }

  .wechat-preview blockquote {
    margin: 20px 0;
    padding: 12px 20px;
    background: #f7f7f7;
    border-left: 4px solid #07c160;
    color: #666;
    font-style: italic;
  }

  .wechat-preview code {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: "Courier New", Consolas, Monaco, monospace;
    font-size: 14px;
    color: #d63384;
  }

  .wechat-preview pre {
    margin: 20px 0;
    padding: 15px;
    background: #f6f8fa;
    border-radius: 5px;
    overflow-x: auto;
  }

  .wechat-preview pre code {
    background: transparent;
    padding: 0;
    color: #333;
    font-size: 13px;
    line-height: 1.6;
  }

  .wechat-preview img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px auto;
    border-radius: 4px;
  }

  .wechat-preview table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
  }

  .wechat-preview table th,
  .wechat-preview table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  .wechat-preview table th {
    background: #f5f5f5;
    font-weight: bold;
  }

  .wechat-preview ul,
  .wechat-preview ol {
    margin: 15px 0;
    padding-left: 30px;
  }

  .wechat-preview li {
    margin: 8px 0;
  }

  .wechat-preview hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 30px 0;
  }

  .wechat-preview a {
    color: #07c160;
    text-decoration: none;
  }

  .wechat-preview strong {
    font-weight: bold;
    color: #000;
  }

  /* 代码高亮样式 - 微信公众号兼容版 */
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0;
    background: transparent;
    color: #333;
  }

  .hljs-comment,
  .hljs-quote {
    color: #998;
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #333;
    font-weight: bold;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: #008080;
  }

  .hljs-string,
  .hljs-doctag {
    color: #d14;
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #900;
    font-weight: bold;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: #458;
    font-weight: bold;
  }

  .hljs-tag,
  .hljs-name,
  .hljs-attribute {
    color: #000080;
    font-weight: normal;
  }

  .hljs-regexp,
  .hljs-link {
    color: #009926;
  }

  .hljs-symbol,
  .hljs-bullet {
    color: #990073;
  }

  .hljs-built_in,
  .hljs-builtin-name {
    color: #0086b3;
  }

  .hljs-meta {
    color: #999;
    font-weight: bold;
  }

  .hljs-deletion {
    background: #fdd;
  }

  .hljs-addition {
    background: #dfd;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    background: #07c160;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    z-index: 1000;
  }

  .copy-btn:hover {
    background: #06ad56;
  }

  .copy-btn.copied {
    background: #059045;
  }

  .author-info {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    color: #666;
    font-size: 14px;
  }
</style>
`;

// 配置 marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error('代码高亮失败:', err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
});

// 转换 Markdown 到微信公众号格式
function convertToWechat(markdown) {
  const html = marked.parse(markdown);
  return html;
}

// 生成预览页面
function generatePreviewPage(title, content) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${WECHAT_STYLES}
</head>
<body>
  <button class="copy-btn" onclick="copyContent()">复制内容</button>
  <div class="wechat-preview" id="content">
    ${content}
  </div>

  <script>
    function copyContent() {
      const content = document.getElementById('content');
      const range = document.createRange();
      range.selectNode(content);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      try {
        document.execCommand('copy');
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '已复制！';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.textContent = '复制内容';
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        alert('复制失败，请手动复制');
      }

      window.getSelection().removeAllRanges();
    }
  </script>
</body>
</html>`;
}

// 主函数
function convertArticle(articlePath, outputPath) {
  try {
    // 读取 Markdown 文件
    const markdown = fs.readFileSync(articlePath, 'utf-8');

    // 提取标题
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : '未命名文章';

    // 转换为 HTML
    const htmlContent = convertToWechat(markdown);

    // 生成预览页面
    const previewPage = generatePreviewPage(title, htmlContent);

    // 写入输出文件
    fs.writeFileSync(outputPath, previewPage, 'utf-8');

    console.log(`✅ 转换成功！`);
    console.log(`📄 标题: ${title}`);
    console.log(`📂 预览文件: ${outputPath}`);
    console.log(`\n💡 下一步：`);
    console.log(`   1. 在浏览器中打开预览文件`);
    console.log(`   2. 点击右上角"复制内容"按钮`);
    console.log(`   3. 粘贴到微信公众号编辑器\n`);

    return outputPath;
  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    throw error;
  }
}

// 命令行使用
if (process.argv.length >= 3) {
  const inputPath = process.argv[2];
  const defaultOutput = inputPath.replace('.md', '-wechat.html');

  // 如果提供了第三个参数，使用它作为输出路径
  const outputPath = process.argv[3] || defaultOutput;

  convertArticle(inputPath, outputPath);
}

export { convertArticle, convertToWechat, generatePreviewPage };
