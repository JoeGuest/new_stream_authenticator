import request from 'supertest';
import app from '../app';

describe('get /authenticate/:userId', () => {
  let response;
  let userId;

  const authenticateRequest = () => request(app).get(`/authenticate/${userId}`);

  test('responds with status 200', async () => {
    userId = 12345;

    response = await authenticateRequest();

    expect(response.statusCode).toBe(200);
  });

  describe('user is able to authenticate new stream', () => {
    beforeEach(async () => {
      userId = 12345;
      response = await authenticateRequest();
    });

    test('responds with success body', () => {
      const successBody = {
        authenticated: true,
        userId: '12345',
      };

      expect(response.body).toEqual(successBody);
    });
  });

  describe('user is unable to authenticate new stream', () => {
    beforeEach(async () => {
      userId = 23456;
      response = await authenticateRequest();
    });

    test('responds with failure body', () => {
      const failureBody = {
        authenticated: false,
        userId: '23456',
      };

      expect(response.body).toEqual(failureBody);
    });
  });
});
