// src/components/Layout/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer-cerfrance">
      <div className="container mx-auto px-4">
        <div className="footer-content">
          <div className="footer-main">
            <div className="flex items-center justify-center">
              <span className="text-cer-gray text-sm font-medium">
                Problème d'utilisation?&nbsp;&nbsp;
                <Link
                  to={"#"}
                  onClick={() => (window.location = "mailto:")}
                  className="footer-link"
                >
                  Nous contacter
                </Link>
              </span>
            </div>
          </div>
          
          <div className="footer-info mt-2">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <span>CERALIS © 2025 - Version 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;