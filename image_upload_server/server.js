const http = require('http');
const url = require('url');
const services = require('./services');

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

  const body = [];
  http.request
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      const parsedJSON = JSON.parse(Buffer.concat(body));
      const newUser = parsedJSON[0]['userName'];
      services.createUser(newUser);
    });
});

server.listen(8080);
