const http = require('http');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');

const server = http.createServer();

/* REQUEST */
server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  /* GET image meta data */
  if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;

    const metadata = services.fetchImageMetadata(id);
    console.log('MetaData: ', metadata);

    const headers = req.headers;
    console.log(headers);

    /* POST new user */
  } else if (req.method === 'POST' && parsedUrl.pathname === '/users') {
    jsonBody(req, res, (error, body) => {
      if (error) {
        console.log('Error: ', error);
      } else {
        services.createUser(body.username);
      }
    });
  } else {
    res.writeHead(404, {
      'X-Powered-By': 'Node',
      'Content-Type': 'application/json',
    });
    res.end();
  }
});

const PORT = 8080;

server.listen(PORT, () =>
  console.log(`Server is listening on PORT: ${PORT} - 'Hello there...'`)
);
