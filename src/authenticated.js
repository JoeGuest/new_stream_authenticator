import axios from 'axios';

const authenticated = async (userId) => {
  try {
    const [userStatsResponse, businessRulesResponse] = await Promise.all([axios.get(`https://userstatsservice.com/${userId}/streams`), axios.get(`https://businessrulesservice.com/${userId}/rules`)]);

    if (userStatsResponse.data.activeStreams >= businessRulesResponse.data.permittedStreams) {
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
