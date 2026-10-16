import { FaArrowUp, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer sectionFrame">
      <div className="footerTop">
        <a href="#home" className="footerBrand">
          <span>AC</span>
          <div><strong>Ajay Chithanoor</strong><small>IT · Cybersecurity · Web</small></div>
        </a>

        <a href="#home" className="backToTop" aria-label="Back to top">Back to top <FaArrowUp /></a>
      </div>

      <div className="footerBottom">
        <p>© {new Date().getFullYear()} Ajay Chithanoor. Built for clarity, security and speed.</p>
        <div className="footerSocials">
          <a href="https://linkedin.com/in/ajaychithanoor" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://github.com/ajaychith" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="mailto:chajay572@gmail.com" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
