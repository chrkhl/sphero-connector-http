const cosmiconfig = require('cosmiconfig');
const { readConnectorConfig } = require('../src/config-reader');

jest.mock('cosmiconfig', () => jest.fn());

describe('config-reader', () => {
  describe('readConnectorConfig', () => {
    beforeEach(() => {
      cosmiconfig.mockReset();
    });

    it('calls cosmiconfig with expected parameters', async () => {
      cosmiconfig.mockReturnValue({
        search: () => null
      });
      try {
        await readConnectorConfig();
      } catch (error) {} // eslint-disable-line

      expect(cosmiconfig).toHaveBeenCalledWith('sphero-connector', { searchPlaces: [ 'package.json' ]});
    });

    it('throws error when config not found', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => null
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('config \'sphero-connector\' not found in package.json');
    });

    it('throws error when config missed property config', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({})
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('config \'sphero-connector\' not found in package.json');
    });

    it('throws error when configured type is not http', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'carrierPigeon'
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe(`'sphero-connector' type is not set to 'http'`);
    });

    it('throws error when port is not a number', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'http',
            port: '0815'
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('port is invalid (must be a number between 3000 and 40000)');
    });

    it('throws error when port is lower than 3000', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'http',
            port: 2999
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('port is invalid (must be a number between 3000 and 40000)');
    });

    it('throws error when port is above 40.000', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'http',
            port: 40001
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('port is invalid (must be a number between 3000 and 40000)');
    });

    it('returns expected object for port 3001', async () => {
      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'http',
            port: 3001
          }
        })
      });

      const actual = await readConnectorConfig();
      const expected = {
        port: 3001,
        connectOnStart: null
      };

      expect(actual).toEqual(expected);
    });

    it('returns expected object with default port 3000 when no other port configured', async () => {
      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'http'
          }
        })
      });

      const actual = await readConnectorConfig();
      const expected = {
        port: 3000,
        connectOnStart: null
      };

      expect(actual).toEqual(expected);
    });
  });
});
