const http = require("http");
const axios = require("axios");
const url = require("url");
require("dotenv").config();

const hostname = "127.0.0.1";
const port = 5000;

async function getData(filters) {
  try {
    response = await axios.get(
      `${process.env.CRYPTO_API_HOST}/v1/cryptocurrency/listings/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY,
        },
      }
    );
    return response.data;
  } catch (e) {
    return e;
  }
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
  } else {
    const queryObject = url.parse(req.url, true).query;
    getData(queryObject)
      .then((responseData) => {
        const jsonContent = JSON.stringify(responseData.data);
        res.statusCode = 200;
        res.end(jsonContent);
      })
      .catch((err) => {
        const jsonContent = JSON.stringify(err);
        res.statusCode = 500;
        res.end(jsonContent);
      });
  }
});

server.listen(port, hostname, () => {
  console.log(`server running: http://${hostname}:${port}/`);
});
