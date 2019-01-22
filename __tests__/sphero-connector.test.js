const connector = require('../src/sphero-connector');
const core = require('sphero-connector-core');

jest.mock('noble');

jest.mock('sphero-connector-core', () => ({
  connectSpheroMini: jest.fn(),
  connectSpheroMiniWithName: jest.fn(),
  connectLightningMcQueen: jest.fn(),
  connectR2D2: jest.fn(),
  connectR2Q5: jest.fn(),
  connectBB9E: jest.fn(),
  connectToy: jest.fn(),
  wake: jest.fn(),
  sleep: jest.fn(),
  setMainLedColor: jest.fn()
}));

describe('sphero-connector', () => {
  const exampleToy = {
    wake: jest.fn(),
    sleep: jest.fn(),
    setMainLedColor: jest.fn()
  };

  beforeEach(() => {
    core.connectSpheroMini.mockReset();
    core.connectSpheroMiniWithName.mockReset();
    core.connectLightningMcQueen.mockReset();
    core.connectR2D2.mockReset();
    core.connectR2Q5.mockReset();
    core.connectBB9E.mockReset();
    core.connectToy.mockReset();
    core.wake.mockReset();
    core.sleep.mockReset();
    core.setMainLedColor.mockReset();
    exampleToy.wake.mockReset();
    exampleToy.sleep.mockReset();
    exampleToy.setMainLedColor.mockReset();
  });

  describe('connectSpheroMini', () => {
    it('returns status code 404 when no toy found', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      expect(await connector.connectSpheroMini()).toBe(404);
    });

    it('returns status code 500 when toy scanning throws error', async () => {
      core.connectSpheroMini.mockRejectedValue(null);
      expect(await connector.connectSpheroMini()).toBe(500);
    });

    it('returns status code 200 when toy found', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      expect(await connector.connectSpheroMini()).toBe(200);
    });
  });

  describe('connectSpheroMiniWithName', () => {
    it('returns status code 404 when no toy found', async () => {
      core.connectSpheroMiniWithName.mockResolvedValue(null);
      expect(await connector.connectSpheroMiniWithName('SM-0815')).toBe(404);
    });

    it('returns status code 500 when toy scanning throws error', async () => {
      core.connectSpheroMiniWithName.mockRejectedValue(null);
      expect(await connector.connectSpheroMiniWithName('SM-0815')).toBe(500);
    });

    it('returns status code 200 when toy found', async () => {
      core.connectSpheroMiniWithName.mockResolvedValue(exampleToy);
      expect(await connector.connectSpheroMiniWithName('SM-0815')).toBe(200);
    });
  });

  describe('connectLightningMcQueen', () => {
    it('returns status code 404 when no toy found', async () => {
      core.connectLightningMcQueen.mockResolvedValue(null);
      expect(await connector.connectLightningMcQueen()).toBe(404);
    });

    it('returns status code 500 when toy scanning throws error', async () => {
      core.connectLightningMcQueen.mockRejectedValue(null);
      expect(await connector.connectLightningMcQueen()).toBe(500);
    });

    it('returns status code 200 when toy found', async () => {
      core.connectLightningMcQueen.mockResolvedValue(exampleToy);
      expect(await connector.connectLightningMcQueen()).toBe(200);
    });
  });

  describe('connectR2D2', () => {
    it('returns status code 404 when no toy found', async () => {
      core.connectR2D2.mockResolvedValue(null);
      expect(await connector.connectR2D2()).toBe(404);
    });

    it('returns status code 500 when toy scanning throws error', async () => {
      core.connectR2D2.mockRejectedValue(null);
      expect(await connector.connectR2D2()).toBe(500);
    });

    it('returns status code 200 when toy found', async () => {
      core.connectR2D2.mockResolvedValue(exampleToy);
      expect(await connector.connectR2D2()).toBe(200);
    });
  });

  describe('connectR2Q5', () => {
    it('returns status code 404 when no toy found', async () => {
      core.connectR2Q5.mockResolvedValue(null);
      expect(await connector.connectR2Q5()).toBe(404);
    });

    it('returns status code 500 when toy scanning throws error', async () => {
      core.connectR2Q5.mockRejectedValue(null);
      expect(await connector.connectR2Q5()).toBe(500);
    });

    it('returns status code 200 when toy found', async () => {
      core.connectR2Q5.mockResolvedValue(exampleToy);
      expect(await connector.connectR2Q5()).toBe(200);
    });
  });

  describe('connectBB9E', () => {
    it('returns status code 404 when no toy found', async () => {
      core.connectBB9E.mockResolvedValue(null);
      expect(await connector.connectBB9E()).toBe(404);
    });

    it('returns status code 500 when toy scanning throws error', async () => {
      core.connectBB9E.mockRejectedValue(null);
      expect(await connector.connectBB9E()).toBe(500);
    });

    it('returns status code 200 when toy found', async () => {
      core.connectBB9E.mockResolvedValue(exampleToy);
      expect(await connector.connectBB9E()).toBe(200);
    });
  });

  describe('connectToy', () => {
    it('returns status code 404 when no toy found', async () => {
      core.connectToy.mockResolvedValue(null);
      expect(await connector.connectToy('SpheroMini', 'SM-0815')).toBe(404);
    });

    it('returns status code 500 when toy scanning throws error', async () => {
      core.connectToy.mockRejectedValue(null);
      expect(await connector.connectToy('SpheroMini', 'SM-0815')).toBe(500);
    });

    it('returns status code 200 when toy found', async () => {
      core.connectToy.mockResolvedValue(exampleToy);
      expect(await connector.connectToy('SpheroMini', 'SM-0815')).toBe(200);
    });
  });

  describe('wake', () => {
    it('returns status code 404 when no toy connected', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      await connector.connectSpheroMini();

      expect(connector.wake()).toBe(404);
    });

    it('returns status code 500 when toy connected and wake throws error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      exampleToy.wake.mockImplementation(() => {
        throw new Error();
      });
      await connector.connectSpheroMini();

      expect(connector.wake()).toBe(500);
    });

    it('returns status code 200 when toy connected and wake does not throw error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      await connector.connectSpheroMini();

      expect(connector.wake()).toBe(200);
    });
  });

  describe('sleep', () => {
    it('returns status code 404 when no toy connected', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      await connector.connectSpheroMini();

      expect(connector.sleep()).toBe(404);
    });

    it('returns status code 500 when toy connected and sleep throws error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      exampleToy.sleep.mockImplementation(() => {
        throw new Error();
      });
      await connector.connectSpheroMini();

      expect(connector.sleep()).toBe(500);
    });

    it('returns status code 200 when toy connected and sleep does not throw error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      await connector.connectSpheroMini();

      expect(connector.sleep()).toBe(200);
    });
  });

  describe('setMainLedColor', () => {
    it('returns status code 404 when no toy connected', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      await connector.connectSpheroMini();

      expect(connector.setMainLedColor('#ACADDB')).toBe(404);
    });

    it('returns status code 500 when toy connected and setMainLedColor throws error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      exampleToy.setMainLedColor.mockImplementation(() => {
        throw new Error();
      });
      await connector.connectSpheroMini();

      expect(connector.setMainLedColor('#ACADDB')).toBe(500);
    });

    it('returns status code 200 when toy connected and setMainLedColor does not throw error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      await connector.connectSpheroMini();

      expect(connector.setMainLedColor('#ACADDB')).toBe(200);
    });
  });
});
