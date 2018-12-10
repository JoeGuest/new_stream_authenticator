import authenticationService from '../authenticationService';
import userStatsServiceRequest from '../../requests/userStatsServiceRequest';
import businessRulesServiceRequest from '../../requests/businessRulesServiceRequest';

jest.mock('../../requests/userStatsServiceRequest');
jest.mock('../../requests/businessRulesServiceRequest');

describe('authenticationService', () => {
  let userId;
  let userStreams;
  let permittedStreams;

  test('returns successful response with error message for axios failure calls', async () => {
    userId = 12345;
    permittedStreams = 3;

    userStatsServiceRequest.mockImplementation(() => { throw new Error('Request failed with status code 404'); });
    businessRulesServiceRequest.mockResolvedValue({ data: { userId, permittedStreams } });

    const userSuccessfulWithError = await authenticationService('12345');

    expect(userSuccessfulWithError).toEqual({ userId: '12345', authenticated: true, errorMessage: 'Request failed with status code 404' });
  });

  test('returns successful response for users able to initialize a new stream', async () => {
    userId = 12345;
    userStreams = 2;
    permittedStreams = 3;

    userStatsServiceRequest.mockResolvedValue({ data: { userId, userStreams } });
    businessRulesServiceRequest.mockResolvedValue({ data: { userId, permittedStreams } });

    const userSuccessful = await authenticationService('12345');

    expect(userSuccessful).toEqual({ userId: '12345', authenticated: true });
  });

  test('returns error for users unable to initialize a new stream', async () => {
    userId = 23456;
    userStreams = 3;
    permittedStreams = 3;

    userStatsServiceRequest.mockResolvedValue({ data: { userId, userStreams } });
    businessRulesServiceRequest.mockResolvedValue({ data: { userId, permittedStreams } });

    try {
      await authenticationService('23456');
    } catch (error) {
      expect(error).toEqual(Error('Max stream limit reached'));
    }
  });

  test('calls userStatsServiceRequest and businessRulesServiceRequest with userId', async () => {
    userId = 12345;
    userStreams = 2;
    permittedStreams = 3;

    userStatsServiceRequest.mockResolvedValue({ data: { userId, userStreams } });
    businessRulesServiceRequest.mockResolvedValue({ data: { userId, permittedStreams } });

    await authenticationService('12345');

    expect(userStatsServiceRequest).toHaveBeenCalledWith('12345');
    expect(businessRulesServiceRequest).toHaveBeenCalledWith('12345');
  });

  test('returns successful response for demo user 123', async () => {
    const userSuccessful = await authenticationService('123');

    expect(userSuccessful).toEqual({ userId: '123', authenticated: true });
  });

  test('returns error for demo user 987', async () => {
    try {
      await authenticationService('987');
    } catch (error) {
      expect(error).toEqual(Error('Max stream limit reached'));
    }
  });
});
