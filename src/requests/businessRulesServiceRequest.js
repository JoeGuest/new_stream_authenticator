import axios from 'axios';
import mockUsers from './__mocks__/mockUsers';

const businessRulesServiceRequest = (userId) => {
  const mockedUser = mockUsers.find(user => user.userId == userId); // eslint-disable-line eqeqeq

  if (mockedUser !== undefined) {
    return mockedUser.businessRulesResponse;
  }

  return axios.get(`https://businessrulesservice.com/${userId}/rules`);
};

export default businessRulesServiceRequest;
