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
    case 'Carmen Bergar':
      return '#1e40af'; // blue
    case 'Mattias Herbst':
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
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    // Reset previous results and errors
    setResult(null);
    setError('');
    
    // Client-side validation
    if (!validatePlz(plz)) {
      setError('Bitte geben Sie eine gültige 5-stellige PLZ ein.');
      return;
    }
    
    setLoading(true);
    try {
      // Secure URL parameter construction
      const params = new URLSearchParams({ plz });
      
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
        // Validate API response structure before using
        if (data && typeof data.person === 'string' && typeof data.land === 'string') {
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
              <div className="company-name">aboutwater GmbH</div>
              <div className="company-tagline">making water your water</div>
            </div>
          </div>
          <nav className="nav-links">
            <a href="mailto:safat.majumder@aboutwater.de" className="nav-link">
              Contact: safat.majumder@aboutwater.de
            </a>
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
                    <div className="result-value">{result.person}</div>
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