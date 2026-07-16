// 极简静态文件服务器 —— 仅用于本地预览龙母庙云游网站
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 8000;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const fp = path.join(root, p);
  if (!fp.startsWith(root)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found: ' + p); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => {
  console.log('龙母庙云游网站本地预览已启动：');
  console.log('  http://localhost:' + port + '/');
  console.log('按 Ctrl+C 停止。');
});
