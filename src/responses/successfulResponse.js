const successfulResponse = (res, userId, errorMessage) => {
  res.status(200).send({
    authenticated: true,
    userId,
    errorMessage,
  });
};

export default successfulResponse;
