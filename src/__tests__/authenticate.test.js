import authenticated from '../authenticated';

describe('authenticated', () => {
  test('returns true for successful users', () => {
    const userSuccessful = authenticated('12345');

    expect(userSuccessful).toEqual(true);
  });

  test('returns false for unsuccessful users', () => {
    const userUnsuccessful = authenticated('23456');

    expect(userUnsuccessful).toEqual(false);
  });
});
