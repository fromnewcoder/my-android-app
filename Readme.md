# 小智同学 - 小学生智能助手聊天应用

## 项目概述
这是一个专为中国小学生设计的智能助手聊天应用，运行在安卓平板上。应用提供人机对话功能，帮助小学生解答各学科问题，包括语文、数学、英语、科学等。

## 功能特点
- 🎯 **智能对话**：模拟AI助手回答小学生问题
- 📚 **学科覆盖**：支持语文、数学、英语、科学等学科
- 🎨 **友好界面**：适合小学生的色彩和交互设计
- 💾 **本地存储**：聊天记录自动保存
- ⚡ **快速响应**：预置常见问题快捷按钮
- 📱 **平板优化**：针对安卓平板优化的界面布局

## 技术栈
- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **框架**：Capacitor (跨平台移动应用框架)
- **构建工具**：Node.js, npm
- **目标平台**：Android 5.0+ (API 21+)

## 开发环境要求
- Node.js (v14 或更高版本)
- Android Studio 已安装
- Java JDK 11 或更高版本

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器（Web测试）
```bash
npm run dev
```
然后在浏览器中打开：http://localhost:3000

### 3. 同步到Android平台
```bash
# 添加Android平台（如果尚未添加）
npx cap add android

# 同步Web资源到Android
npx cap sync android

# 在Android Studio中打开项目
npx cap open android
```

### 4. 在Android Studio中运行
1. 选择设备（模拟器或物理平板）
2. 点击绿色"运行"按钮（或按 Shift+F10）
3. 等待应用安装并启动

## 项目结构
```
my-android-app/
├── www/                    # Web资源文件
│   ├── index.html         # 主页面
│   ├── style.css          # 样式文件
│   └── app.js             # 主JavaScript文件
├── android/               # Android平台代码
├── capacitor.config.json  # Capacitor配置
├── package.json           # 项目依赖和脚本
└── index.js              # 开发服务器
```

## 配置说明

### Capacitor配置 (capacitor.config.json)
```json
{
  "appId": "com.xiaozhi.student",
  "appName": "小智同学",
  "webDir": "www",
  "bundledWebRuntime": false,
  "android": {
    "minWebViewVersion": 55,
    "allowMixedContent": true,
    "webContentsDebuggingEnabled": true
  }
}
```

### 模拟AI回复系统
应用内置了针对小学生问题的智能回复系统，支持：
- **数学问题**：加减乘除计算、数学概念解释
- **科学问题**：自然现象、动物植物、物理化学基础
- **语文问题**：成语故事、汉字学习、阅读建议
- **英语问题**：基础单词、日常用语、学习技巧

## 功能扩展指南

### 1. 添加新的问题类型
在 `www/app.js` 的 `generateBotResponse` 函数中添加新的问题类型判断逻辑。

### 2. 修改界面样式
编辑 `www/style.css` 文件，调整颜色、布局和动画效果。

### 3. 集成真实AI模型
后续可将 `generateBotResponse` 函数替换为调用真实大模型API：
```javascript
// 示例：调用AI API
async function getAIResponse(message) {
  const response = await fetch('https://api.ai-service.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      message: message,
      user: 'primary_student'
    })
  });
  return await response.json();
}
```

## 常见问题

### 1. 服务器无法启动
- 检查端口3000是否被占用
- 确保Node.js已正确安装

### 2. Android构建失败
- 确认Android Studio和SDK已安装
- 检查JAVA_HOME环境变量设置
- 运行 `npx cap sync android` 重新同步

### 3. 应用界面显示不正常
- 清除浏览器缓存或应用数据
- 重新运行 `npx cap copy android`

## 后续优化方向

1. **真实AI集成**：接入大语言模型API提供更智能的回复
2. **语音功能**：添加语音输入和输出，方便低年级学生使用
3. **家长控制**：添加家长监控和内容过滤功能
4. **学习进度跟踪**：记录学生的学习问题和进步情况
5. **多语言支持**：扩展支持其他语言

## 构建发布版本

### 生成APK文件
在Android Studio中：
1. Build > Generate Signed Bundle / APK
2. 选择APK，创建或选择密钥库
3. 选择构建类型（Release）
4. 生成的APK位于：`android/app/build/outputs/apk/release/`

### 应用商店发布
1. 准备应用图标、截图和描述
2. 注册Google Play开发者账号
3. 在Google Play Console创建应用并上传APK
4. 通过审核后即可发布

## 许可证
本项目仅供学习使用，可用于教育目的。
