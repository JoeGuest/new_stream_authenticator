import axios from 'axios';

const businessRulesServiceRequest = userId => axios.get(`https://businessrulesservice.com/${userId}/rules`);

export default businessRulesServiceRequest;
