import { CONTACTS, findPlzRule, CONFIG } from '../../config/plzConfig';

/**
 * API endpoint for PLZ validation and person/state mapping
 * Enhanced with multi-digit prefix support for precise PLZ routing
 *
 * @param {NextApiRequest} req - API request object
 * @param {NextApiResponse} res - API response object
 */
export default function handler(req, res) {
  // Only allow GET requests for security
  if (req.method !== 'GET') {
    res.status(405).json({ error: CONFIG.ERROR_MESSAGES.METHOD_NOT_ALLOWED });
    return;
  }

  // Extract and sanitize PLZ and chosen person from query parameters
  const { plz, chosenPerson } = req.query;
  const sanitizedPlz = String(plz || '').trim().replace(/[^\d]/g, '');

  // Validate PLZ format: exactly 5 digits
  if (!sanitizedPlz || sanitizedPlz.length !== 5 || !/^\d{5}$/.test(sanitizedPlz)) {
    res.status(400).json({ error: CONFIG.ERROR_MESSAGES.INVALID_PLZ });
    return;
  }

  // Find matching PLZ rule using the new configuration system
  const rule = findPlzRule(sanitizedPlz);

  if (!rule) {
    // No matching rule found
    res.status(400).json({ error: CONFIG.ERROR_MESSAGES.PLZ_NOT_ASSIGNABLE });
    return;
  }

  // Handle rules that require user choice
  if (rule.requiresChoice) {
    // PLZ 4 or 5: User chooses between specified options
    if (!chosenPerson || !rule.options.includes(chosenPerson)) {
      // Return options for user to choose from
      return res.status(200).json({
        requiresChoice: true,
        options: rule.options.map(personName => ({
          person: personName,
          contact: CONTACTS[personName]
        })),
        land: typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land
      });
    }

    // User has made a valid choice
    const land = typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land;
    return res.status(200).json({
      person: chosenPerson,
      land,
      contact: CONTACTS[chosenPerson]
    });
  }

  // Handle standard assignment rules
  const person = rule.person;
  const land = typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land;

  // Return successful mapping result with contact details
  res.status(200).json({
    person,
    land,
    contact: CONTACTS[person]
  });
}
