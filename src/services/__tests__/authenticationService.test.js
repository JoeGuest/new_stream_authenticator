import authenticationService from '../authenticationService';
import userStatsServiceResponse from '../../connectors/userStatsServiceConnector';
import businessRulesServiceResponse from '../../connectors/businessRulesServiceConnector';

jest.mock('../../connectors/userStatsServiceConnector');
jest.mock('../../connectors/businessRulesServiceConnector');

describe('authenticationService', () => {
  let userId;
  let userStreams;
  let permittedStreams;

  test('throws error for axios request failures', async () => {
    userId = 12345;
    permittedStreams = 3;

    expect.assertions(1);

    userStatsServiceResponse.mockImplementation(() => { throw new Error('Request failed with status code 404'); });
    businessRulesServiceResponse.mockResolvedValue({ data: { userId, permittedStreams } });

    try {
      await authenticationService('12345');
    } catch (error) {
      expect(error).toEqual(Error('Request failed with status code 404'));
    }
  });

  test('returns successful response for users able to initialize a new stream', async () => {
    userId = 12345;
    userStreams = 2;
    permittedStreams = 3;

    userStatsServiceResponse.mockResolvedValue({ data: { userId, userStreams } });
    businessRulesServiceResponse.mockResolvedValue({ data: { userId, permittedStreams } });

    const userSuccessful = await authenticationService('12345');

    expect(userSuccessful).toEqual({ userId: '12345', authenticated: true });
  });

  test('returns error for users unable to initialize a new stream', async () => {
    userId = 23456;
    userStreams = 3;
    permittedStreams = 3;

    userStatsServiceResponse.mockResolvedValue({ data: { userId, userStreams } });
    businessRulesServiceResponse.mockResolvedValue({ data: { userId, permittedStreams } });

    try {
      await authenticationService('23456');
    } catch (error) {
      expect(error).toEqual(Error('Max stream limit reached'));
    }
  });

  test('calls userStatsServiceResponse and businessRulesServiceResponse with userId', async () => {
    userId = 12345;
    userStreams = 2;
    permittedStreams = 3;

    userStatsServiceResponse.mockResolvedValue({ data: { userId, userStreams } });
    businessRulesServiceResponse.mockResolvedValue({ data: { userId, permittedStreams } });

    await authenticationService('12345');

    expect(userStatsServiceResponse).toHaveBeenCalledWith('12345');
    expect(businessRulesServiceResponse).toHaveBeenCalledWith('12345');
  });
});
