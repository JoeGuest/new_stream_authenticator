import userStatsServiceRequest from '../userStatsServiceRequest';
import mockUserStatsServiceRequest from '../__mocks__/mockUserStatsServiceRequest';

describe('userStatsServiceRequest', () => {
  test('makes axios request to businessrulesservice.com with provided userId', async () => {
    const status = 200;
    const userId = 12345;
    const activeStreams = 3;

    mockUserStatsServiceRequest(status, userId, activeStreams);

    const response = await userStatsServiceRequest(userId);

    expect(response.data).toEqual({ userId, activeStreams });
  });
});
