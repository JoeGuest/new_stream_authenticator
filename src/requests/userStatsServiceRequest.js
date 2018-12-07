import axios from 'axios';

const userStatsServiceRequest = userId => axios.get(`https://userstatsservice.com/${userId}/streams`);

export default userStatsServiceRequest;
