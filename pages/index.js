import React, { useState, useCallback, useMemo } from 'react';

/**
 * Returns avatar background color based on the responsible person
 * @param {string} person - Name of the responsible person
 * @returns {string} CSS color value
 */
const getPersonColor = (person) => {
  switch (person) {
    case 'Anna Kropfitsch':
      return '#059669'; // emerald
    case 'Carmen Berger':
      return '#1e40af'; // blue
    case 'Matthias Herbst':
      return '#ea580c'; // orange
    default:
      return '#64748b'; // slate
  }
};

/**
 * Returns person initials for avatar
 * @param {string} person - Name of the responsible person
 * @returns {string} Person initials
 */
const getPersonInitials = (person) => {
  return person.split(' ').map(name => name[0]).join('');
};

/**
 * Main PLZ Router component - Professional design
 * Provides form interface for postal code validation and displays results
 */
export default function Home() {
  // State management for form and API interactions
  const [plz, setPlz] = useState(''); // Current PLZ or address input value
  const [result, setResult] = useState(null); // API response with person/land data
  const [error, setError] = useState(''); // Error message to display
  const [loading, setLoading] = useState(false); // Loading state during API call
  const [choiceOptions, setChoiceOptions] = useState(null); // Options for user choice (PLZ 4/5)
  
  // Contact dropdown states
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  /**
   * Comprehensive German city-to-PLZ mapping database
   */
  const GERMAN_CITIES = {
    // Major German cities with their PLZ ranges
    'münchen': ['80331', '80333', '80335', '80337', '80339', '80469', '80538', '80636', '80687', '80689', '80796', '80797', '80798', '80799', '80801', '80802', '80803', '80804', '80805', '80807', '80809', '80992', '80993', '80995', '81241', '81243', '81245', '81247', '81249', '81369', '81371', '81373', '81375', '81377', '81379', '81475', '81476', '81477', '81479', '81539', '81541', '81543', '81545', '81547', '81549', '81667', '81669', '81671', '81673', '81675', '81677', '81679', '81735', '81737', '81739', '81825', '81827', '81829', '81925', '81927', '81929'],
    'berlin': ['10115', '10117', '10119', '10178', '10179', '10243', '10245', '10247', '10249', '10317', '10318', '10319', '10365', '10367', '10369', '10405', '10407', '10409', '10435', '10437', '10439', '10551', '10553', '10555', '10557', '10559', '10585', '10587', '10589', '10623', '10625', '10627', '10629', '10707', '10709', '10711', '10713', '10715', '10717', '10719', '10777', '10779', '10781', '10783', '10785', '10787', '10789', '10823', '10825', '10827', '10829', '10961', '10963', '10965', '10967', '10969', '10997', '10999', '12043', '12045', '12047', '12049', '12051', '12053', '12055', '12057', '12059', '12099', '12101', '12103', '12105', '12107', '12109', '12157', '12159', '12161', '12163', '12165', '12167', '12169', '12203', '12205', '12207', '12209', '12247', '12249', '12277', '12279', '12305', '12307', '12309', '12351', '12353', '12355', '12357', '12359', '12435', '12437', '12439', '12487', '12489', '12524', '12526', '12527', '12555', '12557', '12559', '12587', '12589', '12623', '12627', '12629', '12679', '12681', '12683', '12685', '12687', '12689', '13051', '13053', '13055', '13057', '13059', '13086', '13088', '13089', '13125', '13127', '13129', '13156', '13158', '13159', '13187', '13189', '13347', '13349', '13351', '13353', '13355', '13357', '13359', '13403', '13405', '13407', '13409', '13435', '13437', '13439', '13465', '13467', '13469', '13503', '13505', '13507', '13509', '13581', '13583', '13585', '13587', '13589', '13591', '13593', '13595', '13597', '13599', '13627', '13629', '14050', '14052', '14053', '14055', '14057', '14059', '14109', '14129', '14163', '14165', '14167', '14169', '14193', '14195', '14197', '14199'],
    'hamburg': ['20095', '20097', '20099', '20144', '20146', '20148', '20149', '20253', '20255', '20257', '20259', '20354', '20355', '20357', '20359', '20457', '20459', '20535', '20537', '20539', '20537', '20539', '21073', '21075', '21077', '21079', '21107', '21109', '21129', '21131', '21149', '21217', '21218', '21220', '21224', '21244', '21246', '21255', '21256', '21258', '21279', '21335', '21337', '21339', '21357', '21365', '21382', '21385', '21391', '21394', '21395', '21407', '21409', '21423', '21435', '21465', '21481', '21483', '21502', '21521', '21522', '21524', '21529', '21614', '21635', '21680', '22041', '22043', '22045', '22047', '22049', '22081', '22083', '22085', '22087', '22089', '22111', '22113', '22115', '22117', '22119', '22143', '22145', '22147', '22149', '22159', '22161', '22175', '22177', '22179', '22297', '22299', '22301', '22303', '22305', '22307', '22309', '22335', '22337', '22339', '22359', '22361', '22393', '22395', '22397', '22399', '22415', '22417', '22419', '22453', '22455', '22457', '22459', '22523', '22525', '22527', '22529', '22547', '22549', '22559', '22587', '22589', '22605', '22607', '22609', '22761', '22763', '22765', '22767', '22769', '22880', '22927', '22929'],
    'köln': ['50667', '50668', '50670', '50672', '50674', '50676', '50677', '50678', '50679', '50733', '50735', '50737', '50739', '50823', '50825', '50827', '50829', '50859', '50931', '50933', '50935', '50937', '50939', '50968', '50969', '50996', '50997', '50999', '51061', '51063', '51065', '51067', '51069', '51103', '51105', '51107', '51109', '51143', '51145', '51147', '51149'],
    'frankfurt': ['60306', '60308', '60311', '60313', '60314', '60316', '60318', '60320', '60322', '60325', '60326', '60327', '60329', '60385', '60386', '60388', '60389', '60431', '60433', '60435', '60437', '60439', '60486', '60487', '60488', '60489', '60528', '60529', '60594', '60596', '60598', '60599'],
    'stuttgart': ['70173', '70174', '70176', '70178', '70180', '70182', '70184', '70186', '70188', '70190', '70191', '70192', '70193', '70195', '70197', '70199', '70327', '70329', '70374', '70376', '70378', '70435', '70437', '70439', '70469', '70499', '70563', '70565', '70567', '70569', '70597', '70599', '70619', '70629', '70734', '70736', '70794', '70839'],
    'düsseldorf': ['40210', '40211', '40212', '40213', '40215', '40217', '40219', '40221', '40223', '40225', '40227', '40229', '40233', '40235', '40237', '40239', '40468', '40470', '40472', '40474', '40476', '40477', '40479', '40489', '40545', '40547', '40549', '40591', '40593', '40595', '40597', '40599', '40625', '40627', '40629', '40699'],
    'dortmund': ['44135', '44137', '44139', '44141', '44143', '44145', '44147', '44149', '44225', '44227', '44263', '44265', '44267', '44269', '44287', '44289', '44309', '44319', '44328', '44339', '44357', '44369', '44379', '44388', '44532', '44534', '44536', '44575', '44577', '44579', '44581', '44623', '44625', '44627', '44629', '44649', '44651', '44653', '44655', '44657', '44659', '44661', '44663', '44665', '44667', '44687', '44689', '44691', '44693', '44795', '44797', '44799', '44801', '44803', '44805', '44807', '44809'],
    'essen': ['45127', '45129', '45131', '45133', '45134', '45136', '45138', '45141', '45143', '45145', '45147', '45149', '45219', '45221', '45223', '45225', '45227', '45239', '45257', '45259', '45276', '45277', '45279', '45307', '45309', '45326', '45327', '45329', '45355', '45357', '45359', '45472', '45473', '45475', '45481', '45525', '45527', '45529', '45549', '45657', '45659', '45661', '45663', '45665', '45699'],
    'nürnberg': ['90402', '90403', '90408', '90409', '90411', '90419', '90427', '90429', '90431', '90439', '90441', '90443', '90449', '90451', '90453', '90455', '90459', '90461', '90469', '90471', '90473', '90478', '90480', '90482', '90489', '90491', '90513', '90515', '90518', '90522', '90559', '90574', '90587', '90596'],
    'bremen': ['28195', '28199', '28203', '28205', '28207', '28209', '28211', '28213', '28215', '28217', '28219', '28237', '28259', '28277', '28279', '28307', '28309', '28325', '28327', '28329', '28334', '28355', '28357', '28359', '28361', '28719', '28755', '28757', '28759'],
    'hannover': ['30159', '30161', '30163', '30165', '30167', '30169', '30171', '30173', '30175', '30177', '30179', '30419', '30449', '30451', '30453', '30455', '30457', '30459', '30519', '30521', '30539', '30559', '30625', '30627', '30629', '30655', '30657', '30659', '30669', '30823', '30827', '30851', '30853', '30855', '30880', '30890', '30900', '30916', '30918', '30952', '30966']
  };

  /**
   * Enhanced address parsing for German addresses
   * @param {string} input - Address string or PLZ
   * @returns {object} {plz: string, confidence: string, source: string}
   */
  const parseGermanAddress = useCallback((input) => {
    if (!input) return { plz: '', confidence: 'none', source: 'empty' };
    
    const cleanInput = input.trim().toLowerCase();
    
    // 1. Check if input is already a 5-digit PLZ
    const directPlzMatch = cleanInput.match(/^\d{5}$/);
    if (directPlzMatch) {
      return { plz: directPlzMatch[0], confidence: 'high', source: 'direct_plz' };
    }
    
    // 2. Extract PLZ from address with explicit PLZ:
    // "Dachauer Straße 25, 80331 München" or "Hauptstraße 15, 80331" 
    const explicitPlzMatch = cleanInput.match(/\b(\d{5})\b/);
    if (explicitPlzMatch) {
      return { plz: explicitPlzMatch[1], confidence: 'high', source: 'explicit_plz' };
    }
    
    // 3. City-based PLZ determination for addresses without PLZ:
    // "Dachauer Straße 25, München" or "Hauptstraße 15, Berlin"
    // First check for city names after comma (more accurate)
    const cityAfterCommaMatch = cleanInput.match(/,\s*([a-zäöüß\s]+)$/i);
    if (cityAfterCommaMatch) {
      const cityName = cityAfterCommaMatch[1].trim().toLowerCase();
      for (const [city, plzList] of Object.entries(GERMAN_CITIES)) {
        if (city === cityName) {
          return { plz: plzList[0], confidence: 'medium', source: `parsed_city_${city}` };
        }
      }
    }
    
    // Then check for city names anywhere in the input (less specific)
    for (const [city, plzList] of Object.entries(GERMAN_CITIES)) {
      if (cleanInput.includes(city)) {
        // Return the most central/common PLZ for the city
        const centralPlz = plzList[0]; // First PLZ is usually central
        return { plz: centralPlz, confidence: 'medium', source: `city_${city}` };
      }
    }
    
    // 4. No PLZ found
    
    return { plz: '', confidence: 'none', source: 'unknown' };
  }, []);

  /**
   * Simple wrapper to maintain compatibility
   * @param {string} input - Address string or PLZ
   * @returns {string} Extracted PLZ or empty string
   */
  const extractPlz = useCallback((input) => {
    const result = parseGermanAddress(input);
    return result.plz;
  }, [parseGermanAddress]);
  
  /**
   * Validates PLZ format (5 digits) - memoized for performance
   * @param {string} value - PLZ to validate
   * @returns {boolean} True if valid PLZ format
   */
  const validatePlz = useCallback((value) => /^\d{5}$/.test(value), []);

  /**
   * Handles form submission and API call - memoized to prevent unnecessary re-renders
   * @param {Event} e - Form submit event
   */
  const handleSubmit = useCallback(async (e, chosenPerson = null) => {
    e.preventDefault();
    // Reset previous results and errors
    setResult(null);
    setError('');
    setChoiceOptions(null);
    
    // Parse German address or PLZ
    const parseResult = parseGermanAddress(plz);
    const extractedPlz = parseResult.plz;
    
    // Client-side validation with enhanced error messages
    if (!validatePlz(extractedPlz)) {
      if (parseResult.confidence === 'none') {
        if (parseResult.source === 'unknown') {
          setError('Stadt nicht erkannt. Bitte geben Sie eine bekannte deutsche Stadt oder PLZ ein (z.B. München, Berlin, Hamburg).');
        } else {
          setError('Bitte geben Sie eine gültige deutsche Postleitzahl oder vollständige Adresse ein.');
        }
      } else {
        setError('Ungültige PLZ gefunden. Bitte überprüfen Sie Ihre Eingabe.');
      }
      return;
    }
    
    setLoading(true);
    try {
      // Secure URL parameter construction
      const params = new URLSearchParams({ plz: extractedPlz });
      if (chosenPerson) {
        params.append('chosenPerson', chosenPerson);
      }
      
      // Setup request timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      // Make API request with timeout handling
      const res = await fetch(`/api/check_plz?${params}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const data = await res.json();
      if (res.ok) {
        if (data.requiresChoice) {
          // PLZ 4 or 5: Show choice options
          setChoiceOptions(data);
        } else if (data && typeof data.person === 'string' && typeof data.land === 'string') {
          // Regular result with assigned person
          setResult(data);
        } else {
          setError('Ungültige Antwort vom Server.');
        }
      } else {
        // Handle API error responses
        setError(data?.error || 'Unbekannter Fehler.');
      }
    } catch (err) {
      // Handle different error types
      if (err.name === 'AbortError') {
        setError('Anfrage-Timeout. Bitte versuchen Sie es erneut.');
      } else {
        setError('Serverfehler. Bitte versuchen Sie es später erneut.');
      }
    }
    setLoading(false);
  }, [plz, validatePlz]);
  
  // Handle user choice for PLZ 4/5
  const handlePersonChoice = useCallback((chosenPerson) => {
    const fakeEvent = { preventDefault: () => {} };
    handleSubmit(fakeEvent, chosenPerson);
  }, [handleSubmit]);

  // Memoized input change handler - now accepts full addresses
  const handleInputChange = useCallback((e) => {
    setPlz(e.target.value); // Allow all characters for address input
  }, []);

  return (
    <div>
      {/* Professional Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <img src="/aboutwater_Brand-Mark_Blue-Sapphire.png" alt="AboutWater Logo" />
            </div>
            <div className="logo-text">
              <div className="company-name">aboutwater</div>
              <div className="company-tagline">making water your water</div>
            </div>
          </div>
          <nav className="nav-links">
            <div className="contact-buttons">
              <div className="contact-dropdown-container">
                <button 
                  className="contact-btn"
                  onClick={() => {
                    setShowSupportDropdown(!showSupportDropdown);
                    setShowContactDropdown(false);
                  }}
                  aria-expanded={showSupportDropdown}
                  aria-haspopup="true"
                >
                  Support
                  <span className={`dropdown-arrow ${showSupportDropdown ? 'open' : ''}`}>▼</span>
                </button>
                {showSupportDropdown && (
                  <div className="contact-dropdown">
                    <a href="mailto:safat.majumder@aboutwater.de" className="dropdown-item">
                      safat.majumder@aboutwater.de
                    </a>
                  </div>
                )}
              </div>
              
              <div className="contact-dropdown-container">
                <button 
                  className="contact-btn"
                  onClick={() => {
                    setShowContactDropdown(!showContactDropdown);
                    setShowSupportDropdown(false);
                  }}
                  aria-expanded={showContactDropdown}
                  aria-haspopup="true"
                >
                  Contact
                  <span className={`dropdown-arrow ${showContactDropdown ? 'open' : ''}`}>▼</span>
                </button>
                {showContactDropdown && (
                  <div className="contact-dropdown">
                    <div className="dropdown-item">
                      <div className="contact-info">
                        <div className="contact-line">
                          📞 +49 (0)89 / 95 45 93 - 0
                        </div>
                        <div className="contact-line">
                          <a href="mailto:info@aboutwater.de">
                            ✉️ info@aboutwater.de
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">PLZ Router</h1>
          <p className="hero-subtitle">
            Deutsche Postleitzahlen schnell und präzise zuordnen
          </p>
          <p className="hero-description">
            Ermitteln Sie sofort den zuständigen Ansprechpartner und das Bundesland für jede deutsche Postleitzahl.
          </p>
        </section>

        {/* PLZ Checker Card */}
        <section className="plz-checker-card">
          <div className="card-header">
            <h2 className="card-title">PLZ-Prüfung</h2>
            <p className="card-subtitle">
              Geben Sie eine deutsche Postleitzahl oder vollständige Adresse ein, um den zuständigen Bearbeiter zu ermitteln
            </p>
          </div>

          <form onSubmit={handleSubmit} className="plz-form">
            <div className="input-group">
              <label htmlFor="plz-input" className="input-label">
                Postleitzahl (PLZ) oder Adresse
              </label>
              <input
                id="plz-input"
                type="text"
                title="Bitte geben Sie eine deutsche PLZ oder vollständige Adresse ein"
                placeholder="z.B. 80331 oder Hauptstraße 15, München"
                value={plz}
                onChange={handleInputChange}
                className="input-field"
                autoComplete="address-line1"
                aria-describedby={error ? 'error-message' : 'input-hint'}
                required
              />
              <div id="input-hint" className="input-hint">
                Nur deutsche Postleitzahlen und Adressen
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              aria-describedby={loading ? 'loading-text' : undefined}
            >
              {loading ? (
                <>
                  <span className="loading-spinner" aria-hidden="true"></span>
                  <span id="loading-text">Wird geprüft...</span>
                </>
              ) : (
                'PLZ Prüfen'
              )}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="error-card" id="error-message" role="alert">
              <span className="error-icon" role="img" aria-label="Fehler">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Choice Options Display for PLZ 4/5 */}
          {choiceOptions && (
            <div className="choice-card" role="region" aria-label="Ansprechpartner wählen">
              <div className="choice-header">
                <div className="choice-status">
                  <span role="img" aria-label="Wahl erforderlich">🤔</span>
                  Ansprechpartner wählen
                </div>
                <div className="plz-display">PLZ: {extractPlz(plz)}</div>
              </div>
              <div className="choice-content">
                <p className="choice-description">
                  Für diese PLZ können Sie zwischen zwei Ansprechpartnern wählen:
                </p>
                <div className="choice-options">
                  {choiceOptions.options.map((option, index) => (
                    <button
                      key={index}
                      className="choice-option"
                      onClick={() => handlePersonChoice(option.person)}
                    >
                      <div 
                        className="person-avatar"
                        style={{
                          backgroundColor: getPersonColor(option.person)
                        }}
                      >
                        {getPersonInitials(option.person)}
                      </div>
                      <div className="choice-option-content">
                        <div className="choice-option-name">{option.contact.name}</div>
                        <div className="choice-option-position">{option.contact.position}</div>
                        <div className="choice-option-contact">{option.contact.email}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="result-card" role="region" aria-label="Suchergebnis">
              <div className="result-header">
                <div className="result-status">
                  <span role="img" aria-label="Erfolg">✅</span>
                  PLZ erfolgreich zugeordnet
                </div>
                <div className="plz-display">PLZ: {extractPlz(plz)}</div>
              </div>
              <div className="result-content">
                <div className="result-item">
                  <div className="result-label">Zuständiger Bearbeiter</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div 
                      className="person-avatar"
                      style={{
                        backgroundColor: getPersonColor(result.person)
                      }}
                    >
                      {getPersonInitials(result.person)}
                    </div>
                    <div className="person-details">
                      <div className="result-value">{result.contact?.name || result.person}</div>
                      <div className="result-position">{result.contact?.position}</div>
                    </div>
                  </div>
                </div>
                <div className="result-item">
                  <div className="result-label">Kontakt</div>
                  <div className="contact-details">
                    <div className="contact-line">
                      <span role="img" aria-label="E-Mail">📧</span>
                      <a href={`mailto:${result.contact?.email}`}>{result.contact?.email}</a>
                    </div>
                  </div>
                </div>
                <div className="result-item">
                  <div className="result-label">Region / Bundesland</div>
                  <div className="result-value">{result.land}</div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Information Section */}
        <section className="info-section">
          <h3 className="info-title">Wie funktioniert der PLZ Router?</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-item-title">Schnelle Zuordnung</div>
              <div className="info-item-description">
                Basierend auf der ersten Ziffer der PLZ erfolgt eine automatische Zuordnung zu den entsprechenden Regionen und Ansprechpartnern.
              </div>
            </div>
            <div className="info-item">
              <div className="info-item-title">Deutschlandweite Abdeckung</div>
              <div className="info-item-description">
                Alle deutschen Postleitzahlen von 01000 bis 99999 werden unterstützt und den entsprechenden Bundesländern zugeordnet.
              </div>
            </div>
            <div className="info-item">
              <div className="info-item-title">Zuverlässige Daten</div>
              <div className="info-item-description">
                Die Zuordnung basiert auf dem offiziellen deutschen Postleitzahlen-System und wird regelmäßig aktualisiert.
              </div>
            </div>
          </div>
          <div className="info-footer">
            <div className="info-footer-text">Sofortige Ergebnisse</div>
          </div>
        </section>
      </main>
    </div>
  );
}