// 简单的HTTP服务器，用于测试小智同学聊天应用
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const WWW_DIR = path.join(__dirname, 'www');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  
  // 处理根路径
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(WWW_DIR, filePath);
  
  // 防止目录遍历攻击
  if (!filePath.startsWith(WWW_DIR)) {
    res.writeHead(403);
    res.end('禁止访问');
    return;
  }
  
  // 检查文件是否存在
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 文件不存在，返回404
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - 页面未找到</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 50px; }
            h1 { color: #ff6b6b; }
            a { color: #4facfe; text-decoration: none; }
          </style>
        </head>
        <body>
          <h1>404 - 页面未找到</h1>
          <p>请求的页面不存在。</p>
          <p><a href="/">返回首页</a></p>
        </body>
        </html>
      `);
      return;
    }
    
    // 获取文件扩展名并设置Content-Type
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // 读取文件并发送
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('服务器错误');
        return;
      }
      
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📁 静态文件目录: ${WWW_DIR}`);
  console.log('🎯 小智同学聊天应用已启动！');
  console.log('👉 在浏览器中打开: http://localhost:3000');
  console.log('📱 专为中国小学生设计的智能学习助手');
  console.log('🔄 按 Ctrl+C 停止服务器');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
