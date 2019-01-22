const express = require('express');
const colorConvert = require('color-convert');
const bodyParser = require('body-parser');

const getRandomColorValue = () => Math.floor(Math.random() * Math.floor(255));

const startServer = (connector, port) => {
  const app = express();

  app.use(bodyParser.json());

  app.post('/connect', async (req, res) => {
    console.log(`[sphero-http-connector] /connect (type: ${req.body.type}, name: ${req.body.name})`);
    const status = await connector.connectToy(req.body.type, req.body.name);

    res.sendStatus(status);
  });

  app.post('/wake', (req, res) => {
    console.log(`[sphero-http-connector] /wake`);
    const status = connector.wake();

    res.sendStatus(status);
  });

  app.post('/sleep', (req, res) => {
    console.log(`[sphero-http-connector] /sleep`);
    const status = connector.sleep();

    res.sendStatus(status);
  });

  app.post('/main-led-color/random', (req, res) => {
    console.log(`[sphero-http-connector] /main-led-color/random`);
    const red = getRandomColorValue();
    const green = getRandomColorValue();
    const blue = getRandomColorValue();
    const hexColor = colorConvert.rgb.hex(red, green, blue);

    const status = connector.setMainLedColor(hexColor);

    res.sendStatus(status);
  });

  app.post('/main-led-color/hex', (req, res) => {
    console.log(`[sphero-http-connector] /main-led-color/hex (${req.body.color})`);
    const status = connector.setMainLedColor(req.body.color);

    res.sendStatus(status);
  });

  app.listen(port);
  console.log(`[sphero-http-connector] running on port ${port}`);

  return app;
};

module.exports = {
  startServer
};
