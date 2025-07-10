const http = require('http');
const url = require('url');

const PORT = 8080;

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Health check
  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  // Collect endpoints
  if (pathname === '/collect' || pathname === '/g/collect') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      console.log('📦 Received data at /collect:', body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'received' }));
    });
    return;
  }

  // Allow GTM to handle preview/debug
  if (pathname.startsWith('/gtm/')) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Preview OK');
  }

  // Default
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('GTM Server Running');
});

server.listen(PORT, () => {
  console.log(`🚀 GTM Server listening on port ${PORT}`);
});
