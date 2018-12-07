import request from 'supertest';
import mockUserStatsServiceConnector from '../__mocks__/mockUserStatsServiceConnector';
import mockBusinessRulesServiceConnector from '../__mocks__/mockBusinessRulesServiceConnector';

import app from '../app';

describe('get /authenticate/:userId', () => {
  let response;
  let status;
  let userId;
  let userStreams;
  let permittedStreams;

  const authenticateRequest = () => request(app).get(`/authenticate/${userId}`);

  describe('user is able to authenticate new stream', () => {
    beforeEach(async () => {
      status = 200;
      userId = 12345;
      userStreams = 2;
      permittedStreams = 3;

      mockUserStatsServiceConnector(status, userId, userStreams);
      mockBusinessRulesServiceConnector(status, userId, permittedStreams);

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
      status = 200;
      userId = 23456;
      userStreams = 3;
      permittedStreams = 3;

      mockUserStatsServiceConnector(status, userId, userStreams);
      mockBusinessRulesServiceConnector(status, userId, permittedStreams);

      response = await authenticateRequest();
    });

    test('responds with status 401 unauthorized', () => {
      expect(response.statusCode).toBe(401);
    });

    test('responds with failure body', () => {
      const failureBody = {
        authenticated: false,
        userId: '23456',
        message: 'Max stream limit reached',
      };

      expect(response.body).toEqual(failureBody);
    });
  });
});
