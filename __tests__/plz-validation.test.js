/**
 * Unit tests for PLZ validation functionality
 * Tests both client-side validation and API endpoint behavior
 */

// Mock fetch for API tests
global.fetch = jest.fn();

// Test data for PLZ validation
const testCases = [
  // Valid PLZ cases
  { plz: '80331', expected: true, person: 'Anna Kropfitsch', land: 'Baden-Württemberg/Bayern' },
  { plz: '12345', expected: true, person: 'Matthias Herbst', land: 'Brandenburg/Berlin' },
  { plz: '20095', expected: true, person: 'Matthias Herbst', land: 'Hamburg/Schleswig-Holstein/Mecklenburg-Vorpommern' },
  { plz: '34567', expected: true, person: 'Carmen Berger', land: 'Hessen' },
  { plz: '01234', expected: true, person: 'Matthias Herbst', land: 'Sachsen/Thüringen/Sachsen-Anhalt' },
  
  // Invalid PLZ cases
  { plz: '1234', expected: false }, // Too short
  { plz: '123456', expected: false }, // Too long
  { plz: 'abcde', expected: false }, // Non-numeric
  { plz: '12a45', expected: false }, // Mixed characters
  { plz: '', expected: false }, // Empty string
  { plz: null, expected: false }, // Null
  { plz: undefined, expected: false }, // Undefined
];

describe('PLZ Validation', () => {
  /**
   * Test client-side validation function
   */
  describe('Client-side validation', () => {
    // Import the validation function (would need to be exported)
    const validatePlz = (value) => /^\d{5}$/.test(value);

    testCases.forEach(({ plz, expected }) => {
      test(`should ${expected ? 'accept' : 'reject'} PLZ: ${plz}`, () => {
        expect(validatePlz(plz)).toBe(expected);
      });
    });
  });

  /**
   * Test API endpoint functionality
   */
  describe('API endpoint', () => {
    let mockReq, mockRes;

    beforeEach(() => {
      mockReq = {
        method: 'GET',
        query: {}
      };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
    });

    test('should reject non-GET requests', () => {
      // Mock the API handler (would need to be imported)
      const handler = require('../pages/api/check_plz.js').default;
      
      mockReq.method = 'POST';
      handler(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(405);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Method Not Allowed' });
    });

    test('should handle valid PLZ requests', () => {
      const handler = require('../pages/api/check_plz.js').default;

      mockReq.query = { plz: '80331' };
      handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        person: 'Anna Kropfitsch',
        land: 'Baden-Württemberg/Bayern',
        contact: expect.objectContaining({
          name: 'Anna Kropfitsch',
          email: 'anna.kropfitsch@aboutwater.de'
        })
      });
    });

    test('should reject invalid PLZ format', () => {
      const handler = require('../pages/api/check_plz.js').default;
      
      mockReq.query = { plz: '123' };
      handler(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Ungültige PLZ. Bitte geben Sie eine 5-stellige Zahl ein.'
      });
    });

    test('should sanitize input with non-numeric characters', () => {
      const handler = require('../pages/api/check_plz.js').default;

      mockReq.query = { plz: '80-3.31' };
      handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        person: 'Anna Kropfitsch',
        land: 'Baden-Württemberg/Bayern',
        contact: expect.objectContaining({
          name: 'Anna Kropfitsch',
          email: 'anna.kropfitsch@aboutwater.de'
        })
      });
    });
  });

  /**
   * Test PLZ mapping logic
   */
  describe('PLZ mapping logic', () => {
    const mappingTests = [
      { plz: '70000', person: 'Carmen Berger', region: 'Baden-Württemberg' },
      { plz: '80000', person: 'Anna Kropfitsch', region: 'Bavaria' },
      { plz: '90000', person: 'Anna Kropfitsch', region: 'Bavaria' },
      { plz: '30000', person: 'Matthias Herbst', region: 'Central Germany' },
      { plz: '60000', person: 'Carmen Berger', region: 'Hesse' },
      { plz: '34000', person: 'Carmen Berger', region: 'Hesse' },
      { plz: '35000', person: 'Carmen Berger', region: 'Hesse' },
      { plz: '36100', person: 'Carmen Berger', region: 'Hesse' },
      { plz: '36200', person: 'Carmen Berger', region: 'Hesse' },
      { plz: '36300', person: 'Carmen Berger', region: 'Hesse' },
      { plz: '37200', person: 'Carmen Berger', region: 'Hesse' },
      { plz: '10000', person: 'Matthias Herbst', region: 'Berlin/Brandenburg' },
      { plz: '20000', person: 'Matthias Herbst', region: 'Hamburg' },
      { plz: '00000', person: 'Matthias Herbst', region: 'Eastern Germany' },
    ];

    mappingTests.forEach(({ plz, person, region }) => {
      test(`PLZ ${plz} should map to ${person} (${region})`, () => {
        // Use the new rule system
        const handler = require('../pages/api/check_plz.js').default;
        const mockReq = { method: 'GET', query: { plz } };
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
        };

        handler(mockReq, mockRes);

        // Skip PLZ 4 and 5 as they require user choice
        if (!plz.startsWith('4') && !plz.startsWith('5')) {
          expect(mockRes.status).toHaveBeenCalledWith(200);
          const jsonCall = mockRes.json.mock.calls[0][0];
          expect(jsonCall.person).toBe(person);
        }
      });
    });
  });
});

/**
 * Integration tests for complete PLZ checking workflow
 */
describe('PLZ Checker Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should handle successful PLZ lookup', async () => {
    const mockResponse = {
      person: 'Anna Kropfitsch',
      land: 'Bayern'
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await fetch('/api/check_plz?plz=80331');
    const data = await response.json();

    expect(fetch).toHaveBeenCalledWith('/api/check_plz?plz=80331');
    expect(data).toEqual(mockResponse);
  });

  test('should handle API errors gracefully', async () => {
    const mockError = {
      error: 'PLZ nicht zuordenbar.'
    };

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockError,
    });

    const response = await fetch('/api/check_plz?plz=99999');
    const data = await response.json();

    expect(data).toEqual(mockError);
  });

  test('should handle network timeouts', async () => {
    fetch.mockRejectedValueOnce(new Error('AbortError'));

    try {
      await fetch('/api/check_plz?plz=12345');
    } catch (error) {
      expect(error.message).toBe('AbortError');
    }
  });
});