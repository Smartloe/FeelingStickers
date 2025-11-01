# FeelingStickers - 心情便签墙

抖音热门具有自动动画效果的便签墙，便签会自动排列成爱心形状并循环展示动画效果。

## ✨ 功能特点

- **自动循环动画**：便签自动排列成爱心形状，保持3秒后散开消失，重新浮现
- **柔和过渡效果**：所有动画都使用平滑的缓动函数，视觉效果舒适
- **响应式设计**：适配各种屏幕尺寸
- **背景音乐**：内置背景音乐播放控制
- **网格背景**：优雅的网格背景设计

## 🎬 动画序列

1. **排列阶段**：便签自动移动到爱心形状位置（1秒）
2. **保持阶段**：爱心形状保持展示（3秒）
3. **散开阶段**：便签散开到屏幕边缘并淡出（1秒）
4. **重现阶段**：便签重新浮现到随机位置（1秒）

整个动画循环无缝衔接，持续展示。

## 🛠️ 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **样式方案**：Tailwind CSS
- **图标库**：Lucide React
- **状态管理**：React Hooks

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── StickyNote.jsx  # 便签组件
│   ├── GridBackground.jsx # 网格背景组件
│   └── MusicControlPanel.jsx # 音乐控制面板
├── hooks/              # 自定义 Hooks
│   ├── useAudioManager.js # 音频管理
│   └── useStickyNotes.js  # 便签状态管理
├── pages/
│   └── Index.jsx       # 主页面
└── main.jsx           # 应用入口
```

## 🎨 自定义配置

### 修改便签数量

在 `src/pages/Index.jsx` 中修改初始便签数量：

```javascript
// 创建初始便签数量
for (let i = 0; i < 15; i++) {
  // ...
}
```

### 调整动画时长

在 `src/pages/Index.jsx` 中修改动画时长：

```javascript
// 排列动画时间：1000ms
// 保持时间：3000ms  
// 散开动画时间：1000ms
// 重现动画时间：1000ms
```

### 修改爱心大小

在 `arrangeInHeartShape` 函数中调整：

```javascript
const heartSize = Math.min(window.innerWidth, window.innerHeight) * 0.4;
```

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**体验地址**：启动开发服务器后访问 http://localhost:8081/
