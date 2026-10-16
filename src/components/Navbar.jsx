import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Expertise", "services"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Contact", "contact"]
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-32% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`siteHeader ${scrolled ? "isScrolled" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Ajay Chithanoor home">
          <span className="brandMark">AC</span>
          <span className="brandText"><strong>Ajay Chithanoor</strong><small>IT · Security · Web</small></span>
        </a>

        <button
          className={`menuToggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>

        <div className={`navPanel ${menuOpen ? "active" : ""}`}>
          <ul className="navLinks">
            {links.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="/Ajay Chithanoor.pdf" download className="navResume">
            <FaDownload /> Resume
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
