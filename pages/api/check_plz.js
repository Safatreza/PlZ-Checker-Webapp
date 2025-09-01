// Contact details for sales managers
const CONTACTS = {
  'Matthias Herbst': {
    name: 'Matthias Herbst',
    position: 'Sales Manager',
    email: 'matthias.herbst@aboutwater.de'
  },
  'Carmen Berger': {
    name: 'Carmen Berger', 
    position: 'Sales Manager',
    email: 'carmen.berger@aboutwater.de'
  },
  'Anna Kropfitsch': {
    name: 'Anna Kropfitsch',
    position: 'Sales Manager', 
    email: 'anna.kropfitsch@aboutwater.de'
  }
};

/**
 * API endpoint for PLZ validation and person/state mapping
 * @param {NextApiRequest} req - API request object
 * @param {NextApiResponse} res - API response object
 */
export default function handler(req, res) {
  // Only allow GET requests for security
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  
  // Extract and sanitize PLZ and chosen person from query parameters
  const { plz, chosenPerson } = req.query;
  const sanitizedPlz = String(plz || '').trim().replace(/[^\d]/g, '');
  
  // Validate PLZ format: exactly 5 digits
  if (!sanitizedPlz || sanitizedPlz.length !== 5 || !/^\d{5}$/.test(sanitizedPlz)) {
    res.status(400).json({ error: 'Ungültige PLZ. Bitte geben Sie eine 5-stellige Zahl ein.' });
    return;
  }
  
  // Extract first digit for region mapping
  const first = sanitizedPlz[0];
  let person, land;
  
  // New PLZ assignment rules
  if ('0123'.includes(first)) {
    // PLZ 0, 1, 2, 3: Assign to Matthias Herbst
    person = 'Matthias Herbst';
    land = getLandByFirstDigit(first);
  } else if ('45'.includes(first)) {
    // PLZ 4, 5: User chooses between Matthias Herbst and Anna Kropfitsch
    if (!chosenPerson || !['Matthias Herbst', 'Anna Kropfitsch'].includes(chosenPerson)) {
      // Return options for user to choose from
      return res.status(200).json({
        requiresChoice: true,
        options: [
          {
            person: 'Matthias Herbst',
            contact: CONTACTS['Matthias Herbst']
          },
          {
            person: 'Anna Kropfitsch', 
            contact: CONTACTS['Anna Kropfitsch']
          }
        ],
        land: first === '4' ? 'Nordrhein-Westfalen' : 'Nordrhein-Westfalen/Rheinland-Pfalz'
      });
    }
    person = chosenPerson;
    land = first === '4' ? 'Nordrhein-Westfalen' : 'Nordrhein-Westfalen/Rheinland-Pfalz';
  } else if ('67'.includes(first)) {
    // PLZ 6, 7: Assign to Carmen Berger
    person = 'Carmen Berger';
    land = first === '6' ? 'Hessen/Rheinland-Pfalz' : 'Baden-Württemberg';
  } else if ('89'.includes(first)) {
    // PLZ 8, 9: Assign to Anna Kropfitsch
    person = 'Anna Kropfitsch';
    land = first === '8' ? 'Baden-Württemberg/Bayern' : 'Bayern';
  } else {
    // Unmapped PLZ range
    res.status(400).json({ error: 'PLZ nicht zuordenbar.' });
    return;
  }
  
  // Return successful mapping result with contact details
  res.status(200).json({ 
    person, 
    land,
    contact: CONTACTS[person]
  });
}

/**
 * Get German state/region by first digit of PLZ
 * @param {string} firstDigit - First digit of PLZ
 * @returns {string} German state or region name
 */
function getLandByFirstDigit(firstDigit) {
  switch (firstDigit) {
    case '0': return 'Sachsen/Thüringen/Sachsen-Anhalt';
    case '1': return 'Brandenburg/Berlin';
    case '2': return 'Hamburg/Schleswig-Holstein/Mecklenburg-Vorpommern';
    case '3': return 'Niedersachsen/Bremen';
    default: return 'Deutschland';
  }
}
