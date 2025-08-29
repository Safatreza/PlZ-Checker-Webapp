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
  
  // Extract and sanitize PLZ from query parameters
  const { plz } = req.query;
  const sanitizedPlz = String(plz || '').trim().replace(/[^\d]/g, '');
  
  // Validate PLZ format: exactly 5 digits
  if (!sanitizedPlz || sanitizedPlz.length !== 5 || !/^\d{5}$/.test(sanitizedPlz)) {
    res.status(400).json({ error: 'Ungültige PLZ. Bitte geben Sie eine 5-stellige Zahl ein.' });
    return;
  }
  // Extract first digit for region mapping
  const first = sanitizedPlz[0];
  let person, land;
  
  // Map PLZ first digit to responsible person and region
  // Based on German postal code system
  if ('789'.includes(first)) {
    // Southern Germany: Bavaria, Baden-Württemberg
    person = 'Anna Kropfitsch';
    land = 'Bayern';
  } else if ('356'.includes(first)) {
    // Central Germany: Hesse, Rhineland-Palatinate, Saarland
    person = 'Carmen Bergar';
    land = 'Hessen';
  } else if ('124'.includes(first)) {
    // Northern/Eastern Germany regions
    person = 'Mattias Herbst';
    land = first === '1' ? 'Brandenburg/Berlin' : (first === '2' ? 'Hamburg/Schleswig-Holstein' : 'Niedersachsen/Bremen');
  } else if (first === '0') {
    // Eastern Germany: Former GDR states
    person = 'Mattias Herbst';
    land = 'Sachsen/Thüringen/Sachsen-Anhalt';
  } else {
    // Unmapped PLZ range
    res.status(400).json({ error: 'PLZ nicht zuordenbar.' });
    return;
  }
  // Return successful mapping result
  res.status(200).json({ person, land });
}
