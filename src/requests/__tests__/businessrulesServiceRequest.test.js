import businessRulesServiceRequest from '../businessRulesServiceRequest';
import mockBusinessRulesServiceRequest from '../__mocks__/mockBusinessRulesServiceRequest';

describe('businessRulesServiceRequest', () => {
  test('makes axios request to businessrulesservice.com with provided userId', async () => {
    const status = 200;
    const userId = 12345;
    const permittedStreams = 3;

    mockBusinessRulesServiceRequest(status, userId, permittedStreams);

    const response = await businessRulesServiceRequest(userId);

    expect(response.data).toEqual({ userId, permittedStreams });
  });
});
