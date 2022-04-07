const https = require('https');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');
const fs = require('fs');

const server = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
});

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

  /* Parse req body */
  jsonBody(req, res, (error, body) => {
    if (error) {
      console.log('Error: ', error);
    } else {
      services.createUser(body.username);
    }
  });

  res.end('Served with HTTPS!!!');
});

const PORT = 443;

server.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT} - 'Hello there...'`)
);
