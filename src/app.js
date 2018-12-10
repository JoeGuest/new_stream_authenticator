import express from 'express';
import authenticationService from './services/authenticationService';
import successfulResponse from './responses/successfulResponse';
import unsuccessfulResponse from './responses/unsuccessfulResponse';

const app = express();

app.get('/authenticate/:userId', async (req, res) => {
  const { params: { userId } } = req;

  try {
    const authResponse = await authenticationService(userId);

    return authResponse.authenticated
      ? successfulResponse(res, userId, authResponse.errorMessage)
      : unsuccessfulResponse(res, userId, authResponse.errorMessage);
  } catch (error) {
    return unsuccessfulResponse(res, userId, error.message);
  }
});

export default app;
