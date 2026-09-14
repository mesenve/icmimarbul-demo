const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'dist');
const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };

http.createServer((request, response) => {
  const pathname = request.url === '/' ? 'index.html' : decodeURIComponent(request.url).replace(/^\/+/, '');
  const file = path.join(root, pathname);
  if (!file.startsWith(root)) { response.writeHead(403); response.end(); return; }
  fs.readFile(file, (error, data) => {
    response.writeHead(error ? 404 : 200, { 'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream' });
    response.end(error ? 'Not found' : data);
  });
}).listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));
