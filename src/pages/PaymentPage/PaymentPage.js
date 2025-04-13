import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import '../../App.css';
import '../../components/PaymentPage.css';

const PaymentPage = () => {
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load Paystack inline script
    const loadPaystackScript = () => {
      if (!window.PaystackPop) {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v2/inline.js';
        script.onload = () => {
          console.log('Paystack script loaded');
        };
        script.onerror = () => {
          alert('Error loading payment system. Please try again.');
        };
        document.body.appendChild(script);
      }
    };

    loadPaystackScript();

    // Fetch user
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // If user is logged in, check their paid status
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('paid')
          .eq('uid', user.id)
          .single();

        if (data?.paid) {
          // If paid is true, redirect to the dashboard
          navigate('/dashboard');
        }
      }
    };

    // Get selected product
    const product = localStorage.getItem('selectedProduct');
    setSelectedProduct(product);

    fetchUser();
  }, [navigate]);

  // Get amount in pesewas
  const getAmount = () => {
    switch (selectedProduct) {
      case 'launchpad': return 20000; // GHS 200.00
      case 'keystone': return 30000;  // GHS 300.00
      case 'fortune': return 50000;   // GHS 500.00
      default: return 0;
    }
  };

  const payWithPaystack = () => {
    if (!window.PaystackPop) {
      alert('Payment system not loaded. Please refresh!');
      return;
    }

    if (!user?.email) {
      alert('Please login first!');
      return;
    }

    const paystack = new window.PaystackPop();

    paystack.newTransaction({
      key: 'pk_test_7eca745297063b919c7ab96c5da3144bd22dd021',
      email: user.email,
      amount: getAmount(),
      currency: 'GHS',
      onSuccess: async (transaction) => {
        try {
          // Update the 'paid' field to true for the user
          const { error } = await supabase
            .from('users')
            .update({
              paid: true
            })
            .eq('uid', user.id);

          if (error) throw error;
          alert('Payment Successful!');
          navigate('/dashboard');
        } catch (error) {
          console.error('Update error:', error);
          alert('Payment succeeded but profile update failed');
        }
      },
      onCancel: () => {
        alert('Payment window closed');
      }
    });
  };

  return (
    <div className="payment-page">
      <h2>Complete Payment</h2>
      <div className="payment-details">
        <p>Product: <strong>{selectedProduct}</strong></p>
        <p>Amount: <strong>GHS {(getAmount() / 100).toFixed(2)}</strong></p>
        <button 
          onClick={payWithPaystack}
          className="paystack-button"
          disabled={!selectedProduct || !user?.email}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
