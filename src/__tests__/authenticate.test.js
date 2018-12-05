import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import authenticated from '../authenticated';

describe('authenticated', () => {
  test('throws error with message for unsuccessful users', async () => {
    expect.assertions(1);

    try {
      await authenticated('23456');
    } catch (error) {
      expect(error).toEqual(Error('max_stream_limit_reached'));
    }
  });

  test.only('returns successful response for users able to initialize a new stream', async () => {
    const mockedAxios = new MockAdapter(axios);

    mockedAxios.onGet('https://userstatsservice.com/12345/streams').reply(200, { userId: 12345, activeStreams: 2 });

    const userSuccessful = await authenticated('12345');

    expect(userSuccessful).toEqual({ userId: 12345, activeStreams: 2 });
  });
});
