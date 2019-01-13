const cosmiconfig = require('cosmiconfig');
const { readConnectOnStartConfig } = require('./sphero-connector');

const isPortValid = port => {
  if (typeof port !== 'number') {
    return false;
  }

  return port >= 3000 && port <= 40000;
};

const readConnectorConfig = async () => {
  const foundConfig = await cosmiconfig('sphero-connector', { searchPlaces: [ 'package.json' ]}).search();

  if (!foundConfig || !foundConfig.config) {
    throw new Error(`config 'sphero-connector' not found in package.json`);
  }

  if (foundConfig.config.type !== 'http') {
    throw new Error(`'sphero-connector' type is not set to 'http'`);
  }

  const port = foundConfig.config.port || 3000;

  if (!isPortValid(port)) {
    throw new Error('port is invalid (must be a number between 3000 and 40000)');
  }

  return {
    port,
    connectOnStart: readConnectOnStartConfig(foundConfig.config)
  };
};

module.exports = { read: readConnectorConfig };
