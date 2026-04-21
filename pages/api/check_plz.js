import { CONTACTS, findPlzRule, CONFIG } from '../../config/plzConfig';
import { GermanAddressProcessor } from '../../utils/germanAddressProcessor';

// Serverless function configuration for Vercel
export const config = {
  maxDuration: 30
};

const addressProcessor = new GermanAddressProcessor();

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: CONFIG.ERROR_MESSAGES.METHOD_NOT_ALLOWED });
      return;
    }

    const { plz, input, chosenPerson } = req.query;

    // Accept either ?input=<raw address or PLZ> or legacy ?plz=<digits>
    let sanitizedPlz;
    let processingMeta = {};

    if (input !== undefined) {
      const parseResult = await addressProcessor.processAddress(String(input || '').trim());
      sanitizedPlz = parseResult.plz;
      processingMeta = {
        processingSource: parseResult.source,
        processingConfidence: parseResult.confidence,
        detectedCity: parseResult.city,
        originalInput: String(input || '').trim()
      };
    } else {
      sanitizedPlz = String(plz || '').trim().replace(/[^\d]/g, '');
    }

    // Validate PLZ format: exactly 5 digits
    if (!sanitizedPlz || sanitizedPlz.length !== 5 || !/^\d{5}$/.test(sanitizedPlz)) {
      const errorMsg = input !== undefined && processingMeta.processingSource
        ? addressProcessor.getErrorMessage({ source: processingMeta.processingSource, city: processingMeta.detectedCity })
        : CONFIG.ERROR_MESSAGES.INVALID_PLZ;
      res.status(400).json({ error: errorMsg });
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
          extractedPlz: sanitizedPlz,
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
          land: typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land,
          ...processingMeta
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
        contact: chosenContact,
        extractedPlz: sanitizedPlz,
        ...processingMeta
      });
    }

    const person = rule.person;
    const contact = CONTACTS[person];
    if (!contact) {
      throw new Error(`Invalid contact configuration for: ${person}`);
    }

    const land = typeof rule.land === 'function' ? rule.land(sanitizedPlz[0]) : rule.land;

    res.status(200).json({
      person,
      land,
      contact,
      extractedPlz: sanitizedPlz,
      ...processingMeta
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
