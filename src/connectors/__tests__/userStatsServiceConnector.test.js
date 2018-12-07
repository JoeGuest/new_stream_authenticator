import userStatsServiceConnector from '../userStatsServiceConnector';
import mockUserStatsServiceConnector from '../../__mocks__/mockUserStatsServiceConnector';

describe('userStatsServiceConnector', () => {
  test('makes axios request to businessrulesservice.com with provided userId', async () => {
    const status = 200;
    const userId = 12345;
    const activeStreams = 3;

    mockUserStatsServiceConnector(status, userId, activeStreams);

    const response = await userStatsServiceConnector(userId);

    expect(response.data).toEqual({ userId, activeStreams });
  });
});
