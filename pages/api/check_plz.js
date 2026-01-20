import { CONTACTS, findPlzRule, CONFIG } from '../../config/plzConfig';

// Serverless function configuration for Vercel
export const config = {
  maxDuration: 30
};

/**
 * API endpoint for PLZ validation and person/state mapping
 * Enhanced with multi-digit prefix support for precise PLZ routing
 *
 * @param {NextApiRequest} req - API request object
 * @param {NextApiResponse} res - API response object
 */
export default function handler(req, res) {
  try {
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
      // Validate rule has options array
      if (!rule.options || !Array.isArray(rule.options)) {
        throw new Error('Invalid rule configuration: missing options array');
      }

      // PLZ 4 or 5: User chooses between specified options
      if (!chosenPerson || !rule.options.includes(chosenPerson)) {
        // Return options for user to choose from
        return res.status(200).json({
          requiresChoice: true,
          options: rule.options.map(personName => {
            const contact = CONTACTS[personName];
            if (!contact) {
              throw new Error(`Invalid contact configuration for: ${personName}`);
            }
            return {
              person: personName,
              contact
            };
          }),
          land: typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land
        });
      }

      // User has made a valid choice - validate contact exists
      const chosenContact = CONTACTS[chosenPerson];
      if (!chosenContact) {
        res.status(400).json({ error: 'Ungültige Personenauswahl.' });
        return;
      }

      const land = typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land;
      return res.status(200).json({
        person: chosenPerson,
        land,
        contact: chosenContact
      });
    }

    // Handle standard assignment rules
    const person = rule.person;

    // Validate contact exists
    const contact = CONTACTS[person];
    if (!contact) {
      throw new Error(`Invalid contact configuration for: ${person}`);
    }

    const land = typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land;

    // Return successful mapping result with contact details
    res.status(200).json({
      person,
      land,
      contact
    });
  } catch (error) {
    // Log error for debugging (removed in production via next.config.js)
    console.error('API Error:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      plz: req.query.plz
    });

    // Return generic error to client
    res.status(500).json({
      error: CONFIG.ERROR_MESSAGES.SERVER_ERROR,
      timestamp: new Date().toISOString()
    });
  }
}
