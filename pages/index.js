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
    <div style={{ minHeight: '100vh', background: '#f7fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Aboutwater Logo */}
      <a href="#" className="aboutwater-logo">
        <div className="logo-icon"></div>
        <div className="logo-text">
          <span className="logo-main-text">aboutwater</span>
          <span className="logo-tagline">making water your water.</span>
        </div>
      </a>
      
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>PLZ Router</h1>
      <div style={{ fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' }}>
        Project ID: {projectId} | Browser ID: {browserId}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320, maxWidth: '90vw' }}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          pattern="[0-9]{5}"
          title="Bitte geben Sie eine 5-stellige PLZ ein"
          placeholder="PLZ eingeben (z.B. 80331)"
          value={plz}
          onChange={e => setPlz(e.target.value.replace(/[^0-9]/g, ''))}
          style={{ padding: 12, fontSize: 18, borderRadius: 6, border: '1px solid #ccc', outline: 'none' }}
        />
        <button
          type="submit"
          style={{ padding: 12, fontSize: 18, borderRadius: 6, background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
          disabled={loading}
        >
          {loading ? 'Prüfe...' : 'Check'}
        </button>
      </form>
      {error && (
        <div style={{ marginTop: 24, color: '#b00020', background: '#ffeaea', padding: 16, borderRadius: 8, width: 320, maxWidth: '90vw', textAlign: 'center' }}>
          <span role="img" aria-label="Fehler">❌</span> {error}
        </div>
      )}
      {result && (
        <div style={{
          marginTop: 24,
          background: getColor(result.person),
          padding: 20,
          borderRadius: 10,
          width: 320,
          maxWidth: '90vw',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          textAlign: 'center',
          fontSize: 20
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>
            {result.person === 'Anna Kropfitsch' && '👩‍💼'}
            {result.person === 'Carmen Bergar' && '👩‍💼'}
            {result.person === 'Mattias Herbst' && '🧑‍💼'}
          </div>
          <div><b>{result.person}</b></div>
          <div style={{ fontSize: 16, marginTop: 4, color: '#555' }}>{result.land}</div>
        </div>
      )}
      <footer style={{ marginTop: 40, color: '#888', fontSize: 14 }}>Made with ❤️ for German PLZ routing</footer>
    </div>
  );
} 