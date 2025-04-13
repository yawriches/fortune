import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';
import '../../App.css';

const RegisterPage = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const product = localStorage.getItem('selectedProduct');
    setSelectedProduct(product || 'unknown');
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Sign up with metadata only; trigger handles DB insert
      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            product: selectedProduct,
            paid: false
          }
        }
      });

      if (authError) throw authError;
      if (!user) throw new Error('User creation failed');

      // Redirect to payment (user entry already inserted via trigger)
      window.location.href = '/payment';

    } catch (err) {
      console.error('Registration Error:', err.message || err);
      alert(`Registration failed: ${err.message}`);
    }
  };

  return (
    <div className="register-page">
      <h2>Register for {selectedProduct.replace(/\b\w/g, c => c.toUpperCase())} Access</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
