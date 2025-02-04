import React from 'react';

const ForbiddenPage = () => {
  const styles = {
    pageContainer: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f5f1ef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 0,
      color: '#5C4033'
    },
    container: {
      textAlign: 'center',
      padding: '2rem',
      background: 'white',
      borderRadius: '40px',
      boxShadow: '0 2px 4px rgba(92, 64, 51, 0.1)',
      maxWidth: '400px',
      border: '2px solid #5C4033'
    },
    heading: {
      fontSize: '4rem',
      margin: 0,
      color: '#5C4033'
    },
    subtitle: {
      fontSize: '1.5rem',
      margin: '1rem 0',
      color: '#5C4033'
    },
    message: {
      margin: '1rem 0',
      lineHeight: 1.5,
      color: '#5C4033'
    },
    button: {
      display: 'inline-block',
      padding: '0.8rem 1.5rem',
      backgroundColor: '#5C4033',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '40px',
      transition: 'all 0.2s',
      border: '2px solid #5C4033',
      cursor: 'pointer'
    },
    buttonHover: {
      backgroundColor: 'transparent',
      color: '#5C4033'
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>403</h1>
        <div style={styles.subtitle}>Access Forbidden</div>
        <p style={styles.message}>
          Sorry, you don't have permission to access this page. Please check your 
          credentials or contact the administrator if you believe this is a mistake.
        </p>
        <button
          onClick={handleClick}
          style={{ ...styles.button, ...(isHovered ? styles.buttonHover : {}) }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;