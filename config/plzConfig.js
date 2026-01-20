/**
 * PLZ Router Configuration
 * Centralized configuration for PLZ mappings, contact information, and person data
 */

// Contact details for sales managers
export const CONTACTS = {
  'Matthias Herbst': {
    name: 'Matthias Herbst',
    position: 'Sales Manager',
    email: 'matthias.herbst@aboutwater.de',
    color: '#ea580c', // orange
    initials: 'MH'
  },
  'Carmen Berger': {
    name: 'Carmen Berger',
    position: 'Sales Manager',
    email: 'carmen.berger@aboutwater.de',
    color: '#1e40af', // blue
    initials: 'CB'
  },
  'Anna Kropfitsch': {
    name: 'Anna Kropfitsch',
    position: 'Sales Manager',
    email: 'anna.kropfitsch@aboutwater.de',
    color: '#059669', // emerald
    initials: 'AK'
  }
};

/**
 * PLZ Mapping Rules Configuration
 * Rules are evaluated in order from most specific (longest prefix) to least specific
 */
export const PLZ_RULES = [
  // Most specific rules first (3-digit prefixes for Carmen Berger)
  {
    prefixes: ['361', '362', '363'],
    person: 'Carmen Berger',
    land: 'Hessen',
    description: 'Hessen region (361-363)'
  },
  {
    prefixes: ['372'],
    person: 'Carmen Berger',
    land: 'Hessen',
    description: 'Hessen region (372)'
  },

  // 2-digit prefixes for Carmen Berger
  {
    prefixes: ['34'],
    person: 'Carmen Berger',
    land: 'Hessen',
    description: 'Hessen region (34xxx)'
  },
  {
    prefixes: ['35'],
    person: 'Carmen Berger',
    land: 'Hessen',
    description: 'Hessen region (35xxx)'
  },

  // Single-digit prefixes
  {
    prefixes: ['0'],
    person: 'Matthias Herbst',
    land: 'Sachsen/Thüringen/Sachsen-Anhalt',
    description: 'Eastern Germany'
  },
  {
    prefixes: ['1'],
    person: 'Matthias Herbst',
    land: 'Brandenburg/Berlin',
    description: 'Berlin/Brandenburg region'
  },
  {
    prefixes: ['2'],
    person: 'Matthias Herbst',
    land: 'Hamburg/Schleswig-Holstein/Mecklenburg-Vorpommern',
    description: 'Northern Germany'
  },
  {
    prefixes: ['3'],
    person: 'Matthias Herbst',
    land: 'Niedersachsen/Bremen',
    description: 'Northwestern Germany'
  },
  {
    prefixes: ['4', '5'],
    requiresChoice: true,
    options: ['Matthias Herbst', 'Anna Kropfitsch'],
    land: (first) => first === '4' ? 'Nordrhein-Westfalen' : 'Nordrhein-Westfalen/Rheinland-Pfalz',
    description: 'Choice required: NRW region'
  },
  {
    prefixes: ['6'],
    person: 'Carmen Berger',
    land: 'Hessen/Rheinland-Pfalz',
    description: 'Hessen/Rheinland-Pfalz region'
  },
  {
    prefixes: ['7'],
    person: 'Carmen Berger',
    land: 'Baden-Württemberg',
    description: 'Baden-Württemberg region'
  },
  {
    prefixes: ['8'],
    person: 'Anna Kropfitsch',
    land: 'Baden-Württemberg/Bayern',
    description: 'Southern Germany'
  },
  {
    prefixes: ['9'],
    person: 'Anna Kropfitsch',
    land: 'Bayern',
    description: 'Bavaria region'
  }
];

/**
 * Get person color for avatar display
 * @param {string} person - Name of the responsible person
 * @returns {string} CSS color value
 */
export const getPersonColor = (person) => {
  return CONTACTS[person]?.color || '#64748b'; // slate as fallback
};

/**
 * Get person initials for avatar display
 * @param {string} person - Name of the responsible person
 * @returns {string} Person initials
 */
export const getPersonInitials = (person) => {
  return CONTACTS[person]?.initials || person.split(' ').map(name => name[0]).join('');
};

/**
 * Find the matching PLZ rule for a given PLZ
 * @param {string} plz - 5-digit PLZ
 * @returns {object|null} Matching rule or null
 */
export const findPlzRule = (plz) => {
  if (!plz || plz.length !== 5) return null;

  // Check rules in order (most specific first)
  for (const rule of PLZ_RULES) {
    for (const prefix of rule.prefixes) {
      if (plz.startsWith(prefix)) {
        return rule;
      }
    }
  }

  return null;
};

/**
 * Configuration constants
 */
export const CONFIG = {
  API_TIMEOUT: 10000, // 10 seconds
  DEFAULT_FALLBACK_COLOR: '#64748b', // slate
  ERROR_MESSAGES: {
    INVALID_PLZ: 'Ungültige PLZ. Bitte geben Sie eine 5-stellige Zahl ein.',
    PLZ_NOT_ASSIGNABLE: 'PLZ nicht zuordenbar.',
    SERVER_ERROR: 'Serverfehler. Bitte versuchen Sie es später erneut.',
    REQUEST_TIMEOUT: 'Anfrage-Timeout. Bitte versuchen Sie es erneut.',
    INVALID_RESPONSE: 'Ungültige Antwort vom Server.',
    METHOD_NOT_ALLOWED: 'Method Not Allowed'
  }
};
