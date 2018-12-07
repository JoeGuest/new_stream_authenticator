import userStatsServiceResponse from '../connectors/userStatsServiceConnector';
import businessRulesServiceResponse from '../connectors/businessRulesServiceConnector';

const authenticationService = async (userId) => {
  try {
    const [
      userStatsResponse,
      businessRulesResponse,
    ] = await Promise.all([
      userStatsServiceResponse(userId),
      businessRulesServiceResponse(userId),
    ]);

    if (userStatsResponse.data.activeStreams >= businessRulesResponse.data.permittedStreams) {
      throw new Error('Max stream limit reached');
    }

    return { userId, authenticated: true };
  } catch (error) {
    throw error;
  }
};

export default authenticationService;
