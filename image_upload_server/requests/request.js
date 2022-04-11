/*

    Currently set to https!

*/

const https = require('https');

const data = JSON.stringify({
  username: 'jonny1',
  password: '123456',
});

const options = {
  hostname: 'localhost',
  port: 433,
  path: '/users',
  method: 'POST', //To make PUT/DELETE REQUESTS -> just change method here and make sure you have an appropriate route in server
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    Authorization: Buffer.from('myUsername' + ':' + 'myPassword').toString(
      'base64'
    ),
  },
};

const request = https.request(options, (response) => {
  console.log(`Status Code: ${response.statusCode}`);
  console.log(response.headers);

  response.on('data', (chunk) => {
    console.log('This is a chunk \n');
    console.log(chunk.toString());
  });
});

request.on('error', (error) => console.log('Error: ', error));

request.write(data);

request.end();

/* FYI GET METHOD - more simple */
// const request = http.get(
//   {
//     hostname: 'www.google.com',
//   },
//   (response) => {
//     console.log(`Status Code: ${response.statusCode}`);
//     console.log(response.headers);

//     response.on('data', (chunk) => {
//       console.log('This is a chunk \n');
//       console.log(chunk.toString());
//     });
//   }
// );

// request.on('error', () => console.log('Error: ', error));

/* .get method automatically closes request - no need to end */
