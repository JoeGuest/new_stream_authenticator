import axios from 'axios';

const businessRulesServiceResponse = userId => axios.get(`https://businessrulesservice.com/${userId}/rules`);

export default businessRulesServiceResponse;
