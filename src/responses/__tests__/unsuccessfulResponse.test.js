import unsuccessfulResponse from '../unsuccessfulResponse';

describe('unsuccessfulResponse', () => {
  test('sends a response with 200 status and successful body', () => {
    const message = 'this is a message!';
    const userId = 12345;
    const res = {};
    const statusResponse = {};
    res.status = jest.fn().mockReturnValue(statusResponse);
    statusResponse.send = jest.fn();

    unsuccessfulResponse(res, userId, message);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(statusResponse.send).toHaveBeenCalledWith({ authenticated: false, message: 'this is a message!', userId: 12345 });
  });
});
