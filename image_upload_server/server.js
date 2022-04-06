const http = require('http');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');

const server = http.createServer();

/* REQUEST */
server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;

    const metadata = services.fetchImageMetadata(id);
    console.log('MetaData: ', metadata);

    const headers = req.headers;
    console.log(headers);
  }

  jsonBody(req, res, (error, body) => {
    if (error) {
      console.log('Error: ', error);
    } else {
      services.createUser(body.username);
    }
  });
});

server.listen(8080);
