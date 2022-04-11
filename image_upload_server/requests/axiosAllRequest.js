const axios = require('axios');
const fs = require('fs');

const getSomeData = () => axios.get('http://localhost:8080/metadata?id=1');

axios
  .all([
    axios.get('http://localhost:8080/metadata?id=1'),
    axios.get('http://localhost:8080/metadata?id=1'),
    axios.get('http://localhost:8080/metadata?id=1'),
    getSomeData(),
  ])
  .then((resArray) => {
    resArray.forEach((entry) => console.log(entry.data.description));
  })
  .catch((error) => console.log(error));
