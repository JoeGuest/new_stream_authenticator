const authenticated = (userId) => {
  if (userId === '12345') {
    return true;
  }
  throw new Error('max_stream_limit_reached');
};

export default authenticated;
