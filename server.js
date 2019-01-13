const express = require('express');
const colorConvert = require('color-convert');
const bodyParser = require('body-parser');

const getRandomColorValue = () => Math.floor(Math.random() * Math.floor(255));

const startServer = (connector, port) => {
  const app = express();

  app.use(bodyParser.json());

  app.post('/wake', (req, res) => {
    connector.wake();
    res.sendStatus(200);
  });

  app.post('/sleep', (req, res) => {
    connector.sleep();
    res.sendStatus(200);
  });

  app.post('/main-led-color/random', (req, res) => {
    const red = getRandomColorValue();
    const green = getRandomColorValue();
    const blue = getRandomColorValue();

    connector.setMainLedColor(red, green, blue);
    res.sendStatus(200);
  });

  app.post('/main-led-color/hex', (req, res) => {
    const [ red, green, blue ] = colorConvert.hex.rgb(req.body.color);

    connector.setMainLedColor(red, green, blue);

    res.sendStatus(200);
  });

  app.listen(port);
};

module.exports = startServer;
