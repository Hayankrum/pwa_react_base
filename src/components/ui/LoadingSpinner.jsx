import './LoadingSpinner.css'

export default function LoadingSpinner({ size = 'medium', message = 'Carregando...' }) {
  return (
    <div className="loading-container">
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  )
}
