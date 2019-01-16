const connector = require('../../sphero-connector-core/index.js');

let connectedToy = null;

const isToyConnected = () => Boolean(connectedToy);

const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

const safeConnect = async connectAction => {
  try {
    connectedToy = await connectAction();

    return isToyConnected() ? statusOK : statusNotFound;
  } catch (error) {
    console.error('connect failed', error);

    return statusError;
  }
};

const safeToyAction = toyAction => {
  if (!isToyConnected()) {
    return statusNotFound;
  }

  try {
    toyAction();

    return statusOK;
  } catch (error) {
    console.error('toy action failed', error);

    return statusError;
  }
};

const connectSpheroMini = async () => await safeConnect(connector.connectSpheroMini);

const connectSpheroMiniWithName = async name => {
  const connectAction = async () => await connector.connectSpheroMiniWithName(name);

  return await safeConnect(connectAction);
};

const connectLightningMcQueen = async () => await safeConnect(connector.connectLightningMcQueen);

const connectR2D2 = async () => await safeConnect(connector.connectR2D2);

const connectBB9E = async () => await safeConnect(connector.connectBB9E);

const connectToy = async (toyType, toyName) => {
  const connectAction = async () => await connector.connectToy(toyType, toyName);

  return await safeConnect(connectAction);
};

const wake = () => safeToyAction(() => connectedToy.wake());

const sleep = () => safeToyAction(() => connectedToy.sleep());

const setMainLedColor = hexColor => {
  const toyAction = () => {
    connectedToy.wake();
    connectedToy.setMainLedColor(hexColor);
  };

  return safeToyAction(toyAction);
};

module.exports = {
  connectSpheroMini,
  connectSpheroMiniWithName,
  connectBB9E,
  connectR2D2,
  connectLightningMcQueen,
  connectToy,
  wake,
  sleep,
  setMainLedColor,
  isToyConnected,
  isToySupported: connector.isToySupported,
  readConnectOnStartConfig: connector.readConnectOnStartConfig
};
