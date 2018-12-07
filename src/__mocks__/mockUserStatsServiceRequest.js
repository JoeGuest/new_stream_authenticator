import sharedMockAxios from './sharedMockAxios';

const mockUserStatsServiceRequest = (status, userId, activeStreams) => {
  sharedMockAxios.onGet(`https://userstatsservice.com/${userId}/streams`)
    .reply(status, { userId, activeStreams });
};

export default mockUserStatsServiceRequest;
