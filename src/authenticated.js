import axios from 'axios';

const authenticated = async (userId) => {
  try {
    const userStatsResponse = await axios.get(`https://userstatsservice.com/${userId}/streams`);

    return {
      userId: userStatsResponse.data.userId,
      activeStreams: userStatsResponse.data.activeStreams,
    };
  } catch (error) {
    throw new Error('max_stream_limit_reached');
  }
};

export default authenticated;
