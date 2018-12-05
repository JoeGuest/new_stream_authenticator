import request from 'supertest';
import app from './app';

describe('get /authenticate', () => {
  let response;

  beforeEach(async () => {
    response = await request(app).get('/authenticate');
  });

  test('responds with status 200', () => {
    expect(response.statusCode).toBe(200);
  });

  test('responds with body "authenticated: true"', () => {
    expect(response.body).toEqual({ authenticated: true });
  });
});
