import authenticated from '../authenticated';

describe('authenticated', () => {
  test('returns true for successful users', () => {
    const userSuccessful = authenticated('12345');

    expect(userSuccessful).toEqual(true);
  });

  test('throws error with message for unsuccessful users', () => {
    expect(() => authenticated('23456')).toThrow(Error('max_stream_limit_reached'));
  });
});
