import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Description */}
        <div className="footer-brand">
          <h3>PantryPal</h3>
          <p>Your smart kitchen companion, helping you manage groceries and plan meals effortlessly.</p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">About</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Terms</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Blog</Link>
        </div>

        {/* Support */}
        <div className="footer-support">
          <h4>Support</h4>
          <Link to="/">FAQ</Link>
          <Link to="/">Help Center</Link>
          <Link to="/">Feedback</Link>
          <Link to="/">Tutorials</Link>
        </div>

        {/* Resources */}
        <div className="footer-resources">
          <h4>Resources</h4>
          <Link to="/">Guides</Link>
          <Link to="/">Recipes</Link>
          <Link to="/">Tips & Tricks</Link>
          <Link to="/">Community</Link>
        </div>

     

        </div>
      

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 PantryPal. All rights reserved.</p>
        <p>Designed with ❤️ by Tsehaynesh | 
          <Link to="/"> Sitemap</Link> | 
          <Link to="/"> Contact</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
