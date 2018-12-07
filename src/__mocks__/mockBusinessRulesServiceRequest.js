import sharedMockAxios from './sharedMockAxios';

const mockBusinessRulesServiceRequest = (status, userId, permittedStreams) => {
  sharedMockAxios.onGet(`https://businessrulesservice.com/${userId}/rules`)
    .reply(status, { userId, permittedStreams });
};

export default mockBusinessRulesServiceRequest;
