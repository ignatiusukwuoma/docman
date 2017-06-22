import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-copyright">
        <div className="container">
        Copyright © 2017 Ignatius Ukwuoma
        <Link className="grey-text text-lighten-4 right" to="/home">
          All Documents
        </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
