'use strict';

const request = require('supertest');
const app = require('../../src/app');

describe('GET /api/hex-to-rgb/:hex (integration)', () => {
  test('returns 200 and RGB for a valid 6-digit hex', async () => {
    const res = await request(app).get('/api/hex-to-rgb/ff8800');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual({
      hex: 'ff8800',
      rgb: { r: 255, g: 136, b: 0 },
    });
  });

  test('accepts a URL-encoded "#" prefix', async () => {
    const res = await request(app).get('/api/hex-to-rgb/%23ff8800');

    expect(res.status).toBe(200);
    expect(res.body.rgb).toEqual({ r: 255, g: 136, b: 0 });
  });

  test('accepts 3-digit shorthand', async () => {
    const res = await request(app).get('/api/hex-to-rgb/f80');

    expect(res.status).toBe(200);
    expect(res.body.rgb).toEqual({ r: 255, g: 136, b: 0 });
  });

  test('is case-insensitive', async () => {
    const res = await request(app).get('/api/hex-to-rgb/FFFFFF');

    expect(res.status).toBe(200);
    expect(res.body.rgb).toEqual({ r: 255, g: 255, b: 255 });
  });

  test.each(['zzzzzz', 'ff', 'ff00ff00', '12345'])(
    'returns 400 and an error message for invalid hex "%s"',
    async (hex) => {
      const res = await request(app).get(`/api/hex-to-rgb/${hex}`);

      expect(res.status).toBe(400);
      expect(res.headers['content-type']).toMatch(/application\/json/);
      expect(res.body).toHaveProperty('error');
      expect(res.body).not.toHaveProperty('rgb');
    }
  );

  test('returns 404 JSON when the hex parameter is missing', async () => {
    const res = await request(app).get('/api/hex-to-rgb/');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not found' });
  });

  test('returns 404 JSON for an unknown route', async () => {
    const res = await request(app).get('/api/unknown');

    expect(res.status).toBe(404);
  });

  test('does not allow POST on the conversion route', async () => {
    const res = await request(app).post('/api/hex-to-rgb/ff8800');

    expect(res.status).toBe(404);
  });
});
