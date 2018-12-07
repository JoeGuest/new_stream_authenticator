import businessRulesServiceConnector from '../businessRulesServiceConnector';
import mockBusinessRulesServiceConnector from '../../__mocks__/mockBusinessRulesServiceConnector';

describe('businessRulesServiceConnector', () => {
  test('makes axios request to businessrulesservice.com with provided userId', async () => {
    const status = 200;
    const userId = 12345;
    const permittedStreams = 3;

    mockBusinessRulesServiceConnector(status, userId, permittedStreams);

    const response = await businessRulesServiceConnector(userId);

    expect(response.data).toEqual({ userId, permittedStreams });
  });
});
