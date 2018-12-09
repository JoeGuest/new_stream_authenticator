import express from 'express';
import authenticationService from './services/authenticationService';
import successfulResponse from './responses/successfulResponse';
import unsuccessfulResponse from './responses/unsuccessfulResponse';

const app = express();

app.get('/authenticate/:userId', async (req, res) => {
  const { params: { userId } } = req;

  try {
    await authenticationService(userId);
    successfulResponse(res, userId);
  } catch (error) {
    if (error.response || error.request) {
      successfulResponse(res, userId, error.message);
    } else {
      unsuccessfulResponse(res, userId, error.message);
    }
  }
});

export default app;
