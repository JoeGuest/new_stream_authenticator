import sharedMockAxios from './sharedMockAxios';

const mockBusinessRulesService = (status, userId, permittedStreams) => {
  sharedMockAxios.onGet(`https://businessrulesservice.com/${userId}/rules`)
    .reply(status, { userId, permittedStreams });
};

export default mockBusinessRulesService;
