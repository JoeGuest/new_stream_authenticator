import userStatsServiceRequest from '../requests/userStatsServiceRequest';
import businessRulesServiceRequest from '../requests/businessRulesServiceRequest';

const authenticationService = async (userId) => {
  try {
    let userStatsResponse;
    let businessRulesResponse;

    if (userId === '123') {
      userStatsResponse = { data: { activeStreams: 1 } };
      businessRulesResponse = { data: { permittedStreams: 3 } };
    } else if (userId === '987') {
      userStatsResponse = { data: { activeStreams: 3 } };
      businessRulesResponse = { data: { permittedStreams: 3 } };
    } else {
      [
        userStatsResponse,
        businessRulesResponse,
      ] = await Promise.all([
        userStatsServiceRequest(userId),
        businessRulesServiceRequest(userId),
      ]);
    }

    if (userStatsResponse.data.activeStreams >= businessRulesResponse.data.permittedStreams) {
      throw new Error('Max stream limit reached');
    }

    return { userId, authenticated: true };
  } catch (error) {
    throw error;
  }
};

export default authenticationService;
