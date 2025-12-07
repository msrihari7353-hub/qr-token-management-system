import React from 'react';
import { useLocation } from 'react-router-dom';
import './TokenConfirmation.css';

const TokenConfirmation = () => {
  const location = useLocation();
  const { token, businessName } = location.state || {};

  if (!token) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <h2>No token information found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✅</div>
        <h1>Token Generated Successfully!</h1>
        
        <div className="token-display">
          <div className="token-label">Your Token Number</div>
          <div className="token-number">{token.tokenNumber}</div>
        </div>

        <div className="info-section">
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">{token.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone:</span>
            <span className="info-value">{token.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Service:</span>
            <span className="info-value">{token.serviceType}</span>
          </div>
        </div>

        <div className="sms-notification">
          <p>📱 An SMS has been sent to your phone number</p>
          <p className="sms-detail">
            You will receive another SMS when it's your turn
          </p>
        </div>

        <div className="instructions">
          <h3>What's Next?</h3>
          <ul>
            <li>Please wait for your turn</li>
            <li>You will receive an SMS notification</li>
            <li>Keep your phone nearby</li>
            <li>Show this token number when called</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenConfirmation;