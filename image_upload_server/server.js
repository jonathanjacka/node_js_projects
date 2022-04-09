const http = require('http');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');
const fs = require('fs');
const formidable = require('formidable');

const server = http.createServer();

/* REQUEST */
server.on('request', (req, res) => {
  req.on('error', (error) => {
    console.error('request error: ', error.message);
  });

  res.on('error', (error) => {
    console.error('response error: ', error.message);
    res.statusCode = 500;
    res.write('An error has occurred...');
    res.end();
  });

  const parsedUrl = url.parse(req.url, true);

  /* GET image meta data */
  if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;

    const metadata = services.fetchImageMetadata(id);

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    const serializedJSON = JSON.stringify(metadata);
    res.write(serializedJSON);
    res.end();

    /* POST new user */
  } else if (req.method === 'POST' && parsedUrl.pathname === '/users') {
    jsonBody(req, res, (error, body) => {
      if (error) {
        console.log('Error: ', error);
      } else {
        services.createUser(body.username);
      }
    });
  } else if (req.method === 'POST' && parsedUrl.pathname === '/upload') {
    const form = new formidable.IncomingForm({
      uploadDir: __dirname + '/images/imageUploads',
      keepExtensions: true,
      multiples: true,
      maxFileSize: 5 * 1024 * 1024,
    });
    form.parse(req, (error, fields, files) => {
      if (error) {
        console.log('Error in form: ', error);
        res.statusCode = 500;
        res.end('Image upload failed...');
      }
      console.log('Fields: ', fields, '\nFiles: ', files);
      res.statusCode = 200;
      res.end('Upload success!');
    });
  } else {
    fs.createReadStream('./index.html').pipe(res);
  }

  //TODO:
  //Add error handling for req and res
});

const PORT = 8080;

server.listen(PORT, () =>
  console.log(`Server is listening on PORT: ${PORT} - 'Hello there...'`)
);
