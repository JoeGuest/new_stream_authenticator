import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockedAxios = new MockAdapter(axios);

const mockUserStatsService = (status, userId, activeStreams) => {
  mockedAxios.onGet('https://userstatsservice.com/12345/streams')
    .reply(status, { userId, activeStreams });
};

export default mockUserStatsService;
