import authenticated from '../authenticated';
import mockUserStatsService from '../__mocks__/mockUserStatsService';
import mockBusinessRulesService from '../__mocks__/mockBusinessRulesService';

describe('authenticated', () => {
  test('throws error for axios request failures', async () => {
    expect.assertions(1);

    try {
      await authenticated('12345');
    } catch (error) {
      expect(error).toEqual(Error('Request failed with status code 404'));
    }
  });

  test('returns successful response for users able to initialize a new stream', async () => {
    const status = 200;
    const userId = 12345;
    const userStreams = 2;
    const permittedStreams = 3;

    mockUserStatsService(status, userId, userStreams);
    mockBusinessRulesService(status, userId, permittedStreams);

    const userSuccessful = await authenticated('12345');

    expect(userSuccessful).toEqual({ userId: 12345, activeStreams: 2 });
  });

  test('returns error for users unable to initialize a new stream', async () => {
    const status = 200;
    const userId = 23456;
    const userStreams = 3;
    const permittedStreams = 3;

    mockUserStatsService(status, userId, userStreams);
    mockBusinessRulesService(status, userId, permittedStreams);

    try {
      await authenticated('23456');
    } catch (error) {
      expect(error).toEqual(Error('Max stream limit reached'));
    }
  });
});
