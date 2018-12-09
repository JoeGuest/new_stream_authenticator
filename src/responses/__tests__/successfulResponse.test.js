import successfulResponse from '../successfulResponse';

describe('successfulResponse', () => {
  test('sends a response with 200 status and successful body', () => {
    const errorMessage = 'I am an error!';
    const userId = 12345;
    const res = {};
    const statusResponse = {};
    res.status = jest.fn().mockReturnValue(statusResponse);
    statusResponse.send = jest.fn();

    successfulResponse(res, userId, errorMessage);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(statusResponse.send).toHaveBeenCalledWith({ authenticated: true, userId: 12345, errorMessage: 'I am an error!' });
  });
});
