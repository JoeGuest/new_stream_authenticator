/* eslint-disable prefer-const */
import userStatsServiceRequest from '../requests/userStatsServiceRequest';
import businessRulesServiceRequest from '../requests/businessRulesServiceRequest';

const authenticationService = async (userId) => {
  let userStatsResponse;
  let businessRulesResponse;
  let authenticationServiceResponse = {
    userId,
    authenticated: true,
  };

  try {
    [
      userStatsResponse,
      businessRulesResponse,
    ] = await Promise.all([
      userStatsServiceRequest(userId),
      businessRulesServiceRequest(userId),
    ]);
    if (userStatsResponse.data.activeStreams >= businessRulesResponse.data.permittedStreams) {
      authenticationServiceResponse.authenticated = false;
      authenticationServiceResponse.errorMessage = 'Max stream limit reached';
    }
  } catch (error) {
    authenticationServiceResponse.errorMessage = error.message;

    return authenticationServiceResponse;
  }

  return authenticationServiceResponse;
};

export default authenticationService;
