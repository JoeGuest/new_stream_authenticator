import authenticated from '../authenticated';
import mockUserStatsService from '../__mocks__/mockUserStatsService';

describe('authenticated', () => {
  test('throws error with message for unsuccessful users', async () => {
    expect.assertions(1);

    try {
      await authenticated('23456');
    } catch (error) {
      expect(error).toEqual(Error('max_stream_limit_reached'));
    }
  });

  test('returns successful response for users able to initialize a new stream', async () => {
    const status = 200;
    const userId = 12345;
    const userStreams = 2;

    mockUserStatsService(status, userId, userStreams);

    const userSuccessful = await authenticated('12345');

    expect(userSuccessful).toEqual({ userId: 12345, activeStreams: 2 });
  });
});
