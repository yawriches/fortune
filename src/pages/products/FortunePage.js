// src/pages/products/FortunePage.js
import React from 'react';
import ProductCard from '../../components/ProductCard';

const FortunePage = () => {
  const handleRegister = (product) => {
    localStorage.setItem('selectedProduct', product);
    window.location.href = '/register';
  };

  return (
    <div className="products-page">
      <h1>Fortune Builders Full Access</h1>

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
        buttonAction={() => handleRegister('launchpad')}
      />

      <ProductCard
        title="Keystone"
        description="Unlock 2 income streams and WhatsApp automation"
        price={300}
        benefits={[
          '2 Digital Products',
          'WhatsApp Automation Setup',
          'Funnel Template',
        ]}
        color="#2196F3"
        buttonAction={() => handleRegister('keystone')}
      />

      <ProductCard
        title="Fortune"
        description="Full access, 3 income streams & 1-on-1 coaching"
        price={500}
        benefits={[
          '3 Digital Products',
          'Private Mentorship',
          'Full Automation Tools',
        ]}
        color="#FF9800"
        buttonAction={() => handleRegister('fortune')}
      />
    </div>
  );
};

export default FortunePage;
