const http = require('http');
const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('GTM Server Running');
});

server.listen(PORT, () => {
  console.log(`GTM Server listening on port ${PORT}`);
});
