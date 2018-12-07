import sharedMockAxios from './sharedMockAxios';

const mockBusinessRulesServiceConnector = (status, userId, permittedStreams) => {
  sharedMockAxios.onGet(`https://businessrulesservice.com/${userId}/rules`)
    .reply(status, { userId, permittedStreams });
};

export default mockBusinessRulesServiceConnector;
