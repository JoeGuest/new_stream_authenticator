import axios from 'axios';

const authenticated = async (userId) => {
  try {
    const userStatsResponse = await axios.get(`https://userstatsservice.com/${userId}/streams`);

    if (userStatsResponse.data.activeStreams >= 3) {
      throw new Error('Max stream limit reached');
    }

    return {
      userId: userStatsResponse.data.userId,
      activeStreams: userStatsResponse.data.activeStreams,
    };
  } catch (error) {
    throw error;
  }
};

export default authenticated;
