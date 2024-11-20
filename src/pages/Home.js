import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="contain">
      <h1 className="heading" onClick={() => navigate('/detailsec')}>
        BRAIN TUMOR
      </h1>
    </div>
  );
};

export default Home;
