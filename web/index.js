const http = require('http');
const fs = require('fs');
const url = require('url');
const cp = require('child_process');

var port = 80;
var server = http.createServer((req, res) => {
  var myUrl = url.parse(req.url);
  var path = myUrl.pathname.substring(1) || 'index.html';
  var type = getType(path.substring(path.lastIndexOf('.') + 1));

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset="UTF-8"'
      });
      res.write(err.message);
    } else {
      res.writeHead(200, {
        'Content-Type': type
      });
      res.write(data);
    }

    res.end();
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`服务器运行在 http://127.0.0.1`);
  cp.exec('start chrome http://127.0.0.1');
});

function getType(ext) {
  var type = null;
  switch (ext) {
    case 'html':
    case 'htm':
      type = 'text/html; charset=UTF-8';
      break;
    case 'js':
      type = 'application/javascript; charset="UTF-8"';
      break;
    case 'css':
      type = 'text/css; charset="UTF-8"';
      break;
    case 'txt':
      type = 'text/plain; charset="UTF-8"';
      break;
    case 'json':
      type = 'application/json; charset="UTF-8"';
      break;
    case 'manifest':
      type = 'text/cache-manifest; charset="UTF-8"';
      break;
    case 'png':
      type = 'image/png';
      break;
    case 'gif':
      type = 'image/gif';
      break;
    case 'jpg':
      type = 'image/jpeg';
      break;
    case 'jpeg':
      type = 'image/jpeg';
      break;
    case 'svg':
      type = 'image/svg+xml';
      break;
    default:
      type = 'application/octet-stream';
      break;
  }
  return type;
}
