// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ title, description, price, benefits, color }) => {
  const handleGetStarted = () => {
    localStorage.setItem('selectedProduct', title.toLowerCase());
    window.location.href = '/register';
  };

  return (
    <div className="product-card" style={{ border: `2px solid ${color}` }}>
      <h2 style={{ color }}>{title}</h2>
      <p>{description}</p>
      <h3>₵{price}</h3>
      <p className="fee-note" style={{ color: '#777', fontSize: '14px' }}>₵50 website fee included</p>
      <ul>
        {benefits.map((b, i) => (
          <li key={i}>✔️ {b}</li>
        ))}
      </ul>
      <button style={{ backgroundColor: color }} onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default ProductCard;
