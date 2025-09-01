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
  const [plz, setPlz] = useState(''); // Current PLZ input value
  const [result, setResult] = useState(null); // API response with person/land data
  const [error, setError] = useState(''); // Error message to display
  const [loading, setLoading] = useState(false); // Loading state during API call
  const [choiceOptions, setChoiceOptions] = useState(null); // Options for user choice (PLZ 4/5)
  
  // Contact dropdown states
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

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
    
    // Client-side validation
    if (!validatePlz(plz)) {
      setError('Bitte geben Sie eine gültige 5-stellige PLZ ein.');
      return;
    }
    
    setLoading(true);
    try {
      // Secure URL parameter construction
      const params = new URLSearchParams({ plz });
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

  // Memoized input change handler
  const handleInputChange = useCallback((e) => {
    setPlz(e.target.value.replace(/[^0-9]/g, ''));
  }, []);

  return (
    <div>
      {/* Professional Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <img src="/Logo.png" alt="AboutWater Logo" />
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
              Geben Sie eine deutsche Postleitzahl ein, um den zuständigen Bearbeiter zu ermitteln
            </p>
          </div>

          <form onSubmit={handleSubmit} className="plz-form">
            <div className="input-group">
              <label htmlFor="plz-input" className="input-label">
                Postleitzahl (PLZ)
              </label>
              <input
                id="plz-input"
                type="text"
                inputMode="numeric"
                maxLength={5}
                pattern="[0-9]{5}"
                title="Bitte geben Sie eine 5-stellige PLZ ein"
                placeholder="z.B. 80331"
                value={plz}
                onChange={handleInputChange}
                className="input-field"
                autoComplete="postal-code"
                aria-describedby={error ? 'error-message' : 'input-hint'}
                required
              />
              <div id="input-hint" className="input-hint">
                Nur deutsche Postleitzahlen (5 Ziffern)
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
                <div className="plz-display">PLZ: {plz}</div>
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
                <div className="plz-display">PLZ: {plz}</div>
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
            <div className="info-item">
              <div className="info-item-title">Sofortige Ergebnisse</div>
              <div className="info-item-description">
                Keine Wartezeit - die Zuordnung erfolgt in Echtzeit und liefert sofort die gewünschten Informationen.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}