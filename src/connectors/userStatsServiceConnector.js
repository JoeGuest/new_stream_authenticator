import axios from 'axios';

const userStatsServiceResponse = userId => axios.get(`https://userstatsservice.com/${userId}/streams`);

export default userStatsServiceResponse;
