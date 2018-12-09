import axios from 'axios';
import mockUsers from './__mocks__/mockUsers';

const userStatsServiceRequest = (userId) => {
  const mockedUser = mockUsers.find(user => user.userId == userId); // eslint-disable-line eqeqeq

  if (mockedUser !== undefined) {
    return mockedUser.userStatsResponse;
  }

  return axios.get(`https://userstatsservice.com/${userId}/streams`);
};

export default userStatsServiceRequest;
