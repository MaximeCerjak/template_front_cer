import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './footer.scss';
function Footer() {
  return (
    <footer className="flex items-center justify-center footer">
      <div className="greyCer-text font-medium rounded-lg text-sm mr-2">
        Problème d'utilisation?&nbsp;&nbsp;
        <Link
          to={"#"}
          onClick={() => (window.location = "mailto:hotline@85.cerfrance.fr")}
        >
          Nous contacter
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
