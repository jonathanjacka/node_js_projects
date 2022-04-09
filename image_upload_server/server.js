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

    //image upload
  } else if (req.method === 'POST' && parsedUrl.pathname === '/upload') {
    const form = new formidable.IncomingForm({
      uploadDir: __dirname + '/images/imageUploads',
      keepExtensions: true,
      multiples: true,
      maxFileSize: 5 * 1024 * 1024,
      encoding: 'utf-8',
      maxFields: 20,
    });

    //formidable functionality - check docs
    form
      .parse(req)
      .on('fileBegin', (name, file) => console.log('File Upload beginning...'))
      .on('file', (name, file) =>
        console.log('Field and File Pair have been received!')
      )
      .on('field', (name, value) =>
        console.log('Field Received: \n', name, value)
      )
      .on('progress', (bytesReceived, bytesExpected) => {
        console.log(bytesReceived + ' / ' + bytesExpected);
      })
      .on('error', (error) => {
        console.error('Error in upload: ', error);
        req.resume();
      })
      .on('aborted', () => console.error('Error: Upload aborted by the user!'))
      .on('end', () => {
        console.log('Done - Upload complete!');
        res.end('Success!');
      });
  } else {
    fs.createReadStream('./index.html').pipe(res);
  }
});

const PORT = 8080;

server.listen(PORT, () =>
  console.log(`Server is listening on PORT: ${PORT} - 'Hello there...'`)
);
