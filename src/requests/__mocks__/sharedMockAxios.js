import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const sharedMockAxios = new MockAdapter(axios);

export default sharedMockAxios;
