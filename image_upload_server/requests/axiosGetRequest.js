const axios = require('axios');
const fs = require('fs');

axios({
  method: 'GET',
  url: 'http://www.google.com',
  responseType: 'stream',
})
  .then((res) => {
    res.data.pipe(fs.createWriteStream('heyGoogle.html'));
  })
  .catch((err) => {
    console.log(error);
  });

/* Convenience GET method below */

// axios
//   .get('http://www.google.com')
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(error);
//   });
