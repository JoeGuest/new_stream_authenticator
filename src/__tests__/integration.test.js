import request from 'supertest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import app from '../app';

describe('get /authenticate/:userId', () => {
  let response;
  let userId;

  const authenticateRequest = () => request(app).get(`/authenticate/${userId}`);

  describe('user is able to authenticate new stream', () => {
    beforeEach(async () => {
      const mockedAxios = new MockAdapter(axios);
      mockedAxios.onGet('https://userstatsservice.com/12345/streams').reply(200, { userId: 12345, activeStreams: 2 });

      userId = 12345;
      response = await authenticateRequest();
    });

    test('responds with status 200', () => {
      expect(response.statusCode).toBe(200);
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
      const mockedAxios = new MockAdapter(axios);
      mockedAxios.onGet('https://userstatsservice.com/12345/streams').reply(200, { userId: 23456, activeStreams: 3 });

      userId = 23456;
      response = await authenticateRequest();
    });

    test('responds with status 401 unauthorized', () => {
      expect(response.statusCode).toBe(401);
    });

    test('responds with failure body', () => {
      const failureBody = {
        authenticated: false,
        userId: '23456',
        message: 'max_stream_limit_reached',
      };

      expect(response.body).toEqual(failureBody);
    });
  });
});
