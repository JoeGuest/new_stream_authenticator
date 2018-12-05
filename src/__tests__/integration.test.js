import request from 'supertest';
import app from '../app';

describe('get /authenticate/:userId', () => {
  let response;
  const userId = 12345;

  beforeEach(async () => {
    response = await request(app).get(`/authenticate/${userId}`);
  });

  test('responds with status 200', () => {
    expect(response.statusCode).toBe(200);
  });

  test('responds with expected body', () => {
    const expectedBody = {
      authenticated: true,
      userId: '12345'
    }

    expect(response.body).toEqual(expectedBody);
  });
});
