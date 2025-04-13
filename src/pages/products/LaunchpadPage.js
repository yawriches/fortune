// src/pages/products/LaunchpadPage.js
import React from 'react';
import ProductCard from '../../components/ProductCard';

const LaunchpadPage = () => {
  const handleRegister = () => {
    localStorage.setItem('selectedProduct', 'launchpad');
    window.location.href = '/register';
  };

  return (
    <div className="products-page">
      <h1>Launchpad Access</h1>
      <ProductCard
        title="Launchpad"
        description="Start your online journey with 1 income stream"
        price={200}
        benefits={[
          '1 Digital Product',
          'Master Resell Rights',
          'Daily Pay Training',
        ]}
        color="#4CAF50"
        buttonAction={handleRegister}
      />
    </div>
  );
};

export default LaunchpadPage;
