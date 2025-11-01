# GitHub Pages 部署指南

## 部署步骤

### 1. 启用 GitHub Pages
1. 访问您的 GitHub 仓库：https://github.com/Smartloe/FeelingStickers
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

### 2. 触发首次部署
1. 推送代码到 main 分支
```bash
git add .
git commit -m "feat: add GitHub Pages deployment"
git push origin main
```

### 3. 查看部署状态
1. 在 GitHub 仓库中点击 **Actions** 选项卡
2. 查看 **Deploy to GitHub Pages** 工作流运行状态
3. 等待部署完成（约 2-5 分钟）

### 4. 访问在线演示
部署完成后，您的应用将在以下地址可用：
**https://smartloe.github.io/FeelingStickers/**

## 部署配置说明

### GitHub Actions 工作流
- 位置：`.github/workflows/deploy.yml`
- 触发条件：推送到 main 分支
- 构建配置：使用 `vite.config.gh-pages.js`

### Vite 配置
- base URL: `/FeelingStickers/`（匹配仓库名称）
- 输出目录：`dist/`
- 简化配置，移除了美团无代码平台的特定配置

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本兼容性
   - 确认所有依赖正确安装

2. **页面空白**
   - 确认 base URL 配置正确
   - 检查控制台错误信息

3. **资源加载失败**
   - 确认静态资源路径正确
   - 检查构建输出文件

### 手动测试构建
```bash
npm run build:gh-pages
```
构建完成后检查 `dist/` 目录中的文件

## 更新部署
每次推送到 main 分支都会自动触发重新部署，无需手动操作。

## 自定义域名（可选）
如果您有自定义域名，可以在 GitHub Pages 设置中添加。
