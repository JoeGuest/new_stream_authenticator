import request from 'supertest';
import mockUserStatsServiceRequest from '../requests/__mocks__/mockUserStatsServiceRequest';
import mockBusinessRulesServiceRequest from '../requests/__mocks__/mockBusinessRulesServiceRequest';
import sharedMockAxios from '../requests/__mocks__/sharedMockAxios';

import app from '../app';

describe('get /authenticate/:userId', () => {
  let response;
  let status;
  let userId;
  let userStreams;
  let permittedStreams;

  const authenticateRequest = () => request(app).get(`/authenticate/${userId}`);

  describe('user is able to authenticate new stream', () => {
    describe('when calls to services are successful', () => {
      beforeEach(async () => {
        status = 200;
        userId = 12345;
        userStreams = 2;
        permittedStreams = 3;

        mockUserStatsServiceRequest(status, userId, userStreams);
        mockBusinessRulesServiceRequest(status, userId, permittedStreams);

        response = await authenticateRequest();
      });

      afterEach(() => {
        sharedMockAxios.reset();
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

    describe('when calls to external services are unsuccessful', () => {
      beforeEach(async () => {
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
          errorMessage: 'Request failed with status code 404',
        };

        expect(response.body).toEqual(successBody);
      });
    });
  });

  describe('user is unable to authenticate new stream', () => {
    beforeEach(async () => {
      status = 200;
      userId = 23456;
      userStreams = 3;
      permittedStreams = 3;

      mockUserStatsServiceRequest(status, userId, userStreams);
      mockBusinessRulesServiceRequest(status, userId, permittedStreams);

      response = await authenticateRequest();
    });

    afterEach(() => {
      sharedMockAxios.reset();
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
