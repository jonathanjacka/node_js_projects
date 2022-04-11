const axios = require('axios');
const fs = require('fs');

axios({
  method: 'POST',
  url: 'http://localhost:8080/users',
  data: {
    username: 'FirstnameLastname',
  },
  transformRequest: (data, headers) => {
    const newData = { username: data.username + ' 2022!' };
    return JSON.stringify(newData);
  },
})
  .then((res) => {
    //unecessary, as there is nothing returned in response as per server
    res.data.pipe(fs.createWriteStream('users.html'));
  })
  .catch((err) => {
    console.log(err);
  });
