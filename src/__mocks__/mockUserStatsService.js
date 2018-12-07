import sharedMockAxios from './sharedMockAxios';

const mockUserStatsService = (status, userId, activeStreams) => {
  sharedMockAxios.onGet(`https://userstatsservice.com/${userId}/streams`)
    .reply(status, { userId, activeStreams });
};

export default mockUserStatsService;
