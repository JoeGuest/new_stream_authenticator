const unsuccessfulResponse = (res, userId, message) => {
  res.status(401).send({
    authenticated: false,
    userId,
    message,
  });
};

export default unsuccessfulResponse;
