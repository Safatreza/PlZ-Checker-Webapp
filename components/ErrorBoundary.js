import React from 'react';

/**
 * React Error Boundary component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Initialize error state
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * Updates state when an error occurs
   * @param {Error} error - The error that occurred
   * @returns {Object} New state with error flag
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Captures error details and logs them
   * @param {Error} error - The error object
   * @param {Object} errorInfo - Error information with component stack
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    // Log error for debugging purposes
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when error occurs
      return (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 20,
          textAlign: 'center'
        }}>
          <div className="main-container">
            <div className="error-card">
              <span role="img" aria-label="Fehler">⚠️</span>
              <h2 style={{ margin: '16px 0', color: 'var(--aboutwater-error)' }}>
                Etwas ist schief gelaufen
              </h2>
              <p style={{ marginBottom: '24px' }}>
                Die Anwendung ist auf einen unerwarteten Fehler gestoßen.
              </p>
              <button 
                className="water-button" 
                onClick={() => window.location.reload()}
                style={{ marginTop: '16px' }}
              >
                Seite neu laden
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;