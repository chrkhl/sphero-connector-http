const request = require('supertest');
const { startServer } = require('../src/server');

const connector = {
  wake: jest.fn(),
  sleep: jest.fn(),
  setMainLedColor: jest.fn()
};

describe('server', () => {
  beforeEach(() => {
    connector.wake.mockReset();
    connector.sleep.mockReset();
    connector.setMainLedColor.mockReset();
  });

  describe('POST /wake', () => {
    it('calls connector.wake', async () => {
      connector.wake.mockReturnValue(200);
      const app = startServer(connector);

      await request(app).post('/wake');

      expect(connector.wake).toHaveBeenCalledTimes(1);
    });

    it('returns status code from connector.wake', async () => {
      connector.wake.mockReturnValue(200);
      const app = startServer(connector);
      const response = await request(app).post('/wake');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /sleep', () => {
    it('calls connector.sleep', async () => {
      connector.sleep.mockReturnValue(200);
      const app = startServer(connector);

      await request(app).post('/sleep');

      expect(connector.sleep).toHaveBeenCalledTimes(1);
    });

    it('returns status code from connector.sleep', async () => {
      connector.sleep.mockReturnValue(200);
      const app = startServer(connector);
      const response = await request(app).post('/sleep');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /main-led-color/random', () => {
    it('calls connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const app = startServer(connector);

      await request(app).post('/main-led-color/random');

      expect(connector.setMainLedColor).toHaveBeenCalledTimes(1);
      expect(connector.setMainLedColor).toHaveBeenCalledWith(expect.any(String));
    });

    it('returns status code from connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const app = startServer(connector);
      const response = await request(app).post('/main-led-color/random');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /main-led-color/hex', () => {
    it('calls connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const app = startServer(connector);
      const color = '#ACADDB';

      await request(app).
        post('/main-led-color/hex').
        send({ color }).
        set('Content-Type', 'application/json');

      expect(connector.setMainLedColor).toHaveBeenCalledTimes(1);
      expect(connector.setMainLedColor).toHaveBeenCalledWith(color);
    });

    it('returns status code from connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const app = startServer(connector);
      const color = '#ACADDB';
      const response = await request(app).
        post('/main-led-color/hex').
        send({ color }).
        set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
    });
  });
});
