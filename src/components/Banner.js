import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/StyleBanner.css';
import LOGO from "../images/logo_rev_3-03-removebg-preview.png"

export default function Banner() {
  return (
    <Link to="/" className='bannerLink'>
    <div className="banner">
      
        <img
          alt="logo"
          src={LOGO}
          width={'50px'}
        />
        <h4>Manic Crusader Clothing</h4>
        <img
          alt="logo"
          src={LOGO}
          width={'50px'}
        />
      
    </div>
    </Link>
  );
}



