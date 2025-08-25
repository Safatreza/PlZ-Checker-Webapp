import React, { useState } from 'react';

const getColor = (person) => {
  switch (person) {
    case 'Anna Kropfitsch':
      return '#e3fcec'; // greenish
    case 'Carmen Bergar':
      return '#e3e9fc'; // blueish
    case 'Mattias Herbst':
      return '#fce3e3'; // reddish
    default:
      return '#f5f5f5';
  }
};

export default function Home() {
  const [plz, setPlz] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Unique Browser ID for this project
  const projectId = 'plz-checker-webapp-2024';
  const browserId = `${projectId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const validatePlz = (value) => /^\d{5}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError('');
    if (!validatePlz(plz)) {
      setError('Bitte geben Sie eine gültige 5-stellige PLZ ein.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/check_plz?plz=' + plz);
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Unbekannter Fehler.');
      }
    } catch (err) {
      setError('Serverfehler. Bitte versuchen Sie es später erneut.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="main-container">
      {/* AboutWater Logo */}
      <div className="aboutwater-header">
        <div className="logo-icon"></div>
        <div className="logo-text">
          <span className="logo-main-text">aboutwater</span>
          <span className="logo-tagline">making water your water.</span>
        </div>
      </div>
      
      <h1>PLZ Router</h1>
      <div className="project-info">
        Project ID: {projectId} | Browser ID: {browserId}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          pattern="[0-9]{5}"
          title="Bitte geben Sie eine 5-stellige PLZ ein"
          placeholder="PLZ eingeben (z.B. 80331)"
          value={plz}
          onChange={e => setPlz(e.target.value.replace(/[^0-9]/g, ''))}
          className="plz-input"
        />
        <button
          type="submit"
          className="water-button"
          disabled={loading}
        >
          {loading ? 'Prüfe...' : 'Check'}
        </button>
      </form>
      {error && (
        <div className="error-card">
          <span role="img" aria-label="Fehler">❌</span> {error}
        </div>
      )}
      {result && (
                <div className="result-card" style={{
          background: getColor(result.person)
        }}>
          <span className="emoji">
            {result.person === 'Anna Kropfitsch' && '👩‍💼'}
            {result.person === 'Carmen Bergar' && '👩‍💼'}
            {result.person === 'Mattias Herbst' && '🧑‍💼'}
          </span>
          <div className="person-name">{result.person}</div>
          <div className="land-info">{result.land}</div>
        </div>
      )}
      </div>
    </div>
  );
} 