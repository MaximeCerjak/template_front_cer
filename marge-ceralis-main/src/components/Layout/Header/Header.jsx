// src/components/Layout/Header/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import logo from '../../../assets/Logo-Ceralis-Blanc.png';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header-cerfrance">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div>    
                <div className="logo-cerfrance">
                  <div className="logo-container">
                    <img src={logo} className='logo-image' alt="Logo Ceralis" />
                  </div>
                  <p className="text-sm text-blue-100">Gestion des marges</p>
                </div>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/pricing" 
              className={`nav-link nav-link-red ${location.pathname === '/pricing' ? 'active' : ''}`}
            >
              <i className="pi pi-shopping-cart nav-icon"></i>
              <span className="nav-text">Prix d'achat</span>
            </Link>
            <Link 
              to="/analysis" 
              className={`nav-link nav-link-yellow ${location.pathname === '/analysis' ? 'active' : ''}`}
            >
              <i className="pi pi-chart-line nav-icon"></i>
              <span className="nav-text">Analyse affaires</span>
            </Link>
            {/* <Link 
              to="/reports" 
              className={`nav-link nav-link-blue ${location.pathname === '/reports' ? 'active' : ''}`}
            >
              <i className="pi pi-chart-bar nav-icon"></i>
              <span className="nav-text">Pilotage</span>
            </Link> */}
          </nav>

          <div className="flex items-center">
            <div className="user-info text-white text-sm">
              <span>Utilisateur connecté</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;