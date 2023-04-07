import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/StyleBanner.css';

export default function Banner() {
  return (
    <Link to="/" className='bannerLink'>
    <div className="banner">
      
        <img
          alt="logo"
          src="https://cdn.openart.ai/stable_diffusion/c9668e89905c4e4e3d121aa8871be8f91e3c813a_2000x2000.webp"
          width={'50px'}
        />
        <h4>Manic Crusader Clothing</h4>
        <img
          alt="logo"
          src="https://cdn.openart.ai/stable_diffusion/c9668e89905c4e4e3d121aa8871be8f91e3c813a_2000x2000.webp"
          width={'50px'}
        />
      
    </div>
    </Link>
  );
}



