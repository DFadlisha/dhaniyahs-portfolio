import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  // Ensure sections are visible by default; observer will still animate
  const [isVisible, setIsVisible] = useState({ about: true, projects: true, contact: true });
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Active section detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for cursor follower
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading animation (short)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for reveal animations (kept, but no longer hides content on load)
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        setIsVisible((prev) => ({ ...prev, [sectionId]: entry.isIntersecting || prev[sectionId] }));
        if (entry.isIntersecting) setActiveSection(sectionId);
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // ===== Resume-driven content =====
  const NAME = 'Dhaniyah Fadlisha'; // used in hero only
  const TAGLINE = 'Software Engineering Student • UTM Kuala Lumpur';
  const EMAIL = 'fadlishadhaniyah@gmail.com';
  const PHONE = '+60 13-713 8266';
  const LINKEDIN = 'https://www.linkedin.com/in/dhaniyahfadlisha';
  const GITHUB = 'https://github.com/DFadlisha';

  const skills = {
    core: ['Java', 'JavaScript', 'C++', 'C#', 'PHP', 'Python', 'HTML', 'CSS'],
    frameworks: ['React.js', 'Node.js', 'Flutter', 'Git', 'GitHub', 'VS Code', 'MySQL'],
    soft: ['Problem-solving', 'Team collaboration', 'Customer service', 'Cross-department communication']
  };

  const education = [
    {
      school: 'Universiti Teknologi Malaysia (UTM), Kuala Lumpur',
      program: 'B.CompSc (Software Engineering) with Honours',
      meta: 'Expected Oct 2026 • CGPA 3.17',
      coursework: ['Software Engineering', 'OOP', 'Data Structures', 'Web & Mobile Development', 'Database Systems']
    },
    {
      school: 'Kolej Vokasional Datuk Seri Mohd Zin, Melaka',
      program: 'Diploma in Information Technology',
      meta: 'Graduated Sept 2021 • CGPA 3.41',
      coursework: ['Computer System Maintenance', 'Network Security', 'Programming Languages', 'Database Fundamentals']
    }
  ];

  const experience = [
    {
      role: 'Technical Support Intern',
      company: 'Ishan Tech (M) Sdn Bhd',
      period: 'Mar 2021 – Jul 2021',
      bullets: [
        'Supported clients on ESET antivirus solutions and troubleshooting',
        'Collaborated with marketing & PM teams on new service initiatives',
        'Improved equipment maintenance protocols and safety standards',
        'Sharpened problem-solving & client communication through direct support'
      ]
    }
  ];

  const projects = [
    {
      title: 'Bank Management System',
      description:
        'Java OOP project implementing encapsulation, inheritance, and polymorphism with a console-driven backend for data management (July 2024).',
      tags: ['Java', 'OOP', 'Encapsulation', 'Inheritance', 'Polymorphism'],
      delay: 0
    },
    {
      title: 'Property Landing Page',
      description: 'Responsive HTML/CSS property showcase with clean UI and cross-device compatibility (updated recently).',
      tags: ['HTML', 'CSS', 'Responsive Design'],
      delay: 150
    },
    {
      title: 'Interactive JavaScript Apps',
      description:
        'Big Bang mini-game plus a Data Tables system with sorting, filtering, and search using modern DOM/ES6 patterns.',
      tags: ['JavaScript', 'DOM', 'ES6'],
      delay: 300
    }
  ];

  const contactLinks = [
    { label: 'Email', icon: '📧', href: `mailto:${EMAIL}`, delay: 100 },
    { label: 'LinkedIn', icon: '💼', href: LINKEDIN, delay: 200 },
    { label: 'GitHub', icon: '🐙', href: GITHUB, delay: 250 },
    { label: 'Phone', icon: '📞', href: `tel:${PHONE.replace(/\s|-/g, '')}`, delay: 300 }
  ];

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio">
      {/* Animated Background Layers */}
      <div className="bg-animated" aria-hidden="true"></div>
      <div className="bg-grid" aria-hidden="true"></div>

      {/* Cursor follower */}
      <div
        className="cursor-follower"
        style={{ transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)` }}
      ></div>

      {/* Centered Navigation (name removed) */}
      <nav className={`navbar ${activeSection !== 'home' ? 'scrolled' : ''}`}>
        <div className="nav-container center-only">
          <ul className="nav-links center-nav">
            {['home', 'about', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={activeSection === section ? 'active' : ''}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Hello, I'm</span>
              <span className="title-line highlight">{NAME}</span>
            </h1>
            <p className="hero-subtitle">{TAGLINE}</p>
            <button className="cta-button" onClick={() => scrollToSection('projects')}>
              <span>View My Work</span>
              <div className="button-shine"></div>
            </button>
          </div>
        </div>
        <div className="floating-elements">
          <div className="float-element" style={{ '--delay': '0s' }}>✨</div>
          <div className="float-element" style={{ '--delay': '2s' }}>💫</div>
          <div className="float-element" style={{ '--delay': '4s' }}>⭐</div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={`section ${isVisible.about ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-image">
              <div className="image-placeholder">
                <span className="emoji">👋</span>
                <div className="image-glow"></div>
              </div>
            </div>
            <div className="about-text">
              <p className="text-reveal">
                Motivated third-year Software Engineering student seeking an internship to apply skills in Java, JavaScript, React.js, and Flutter while gaining hands-on experience and contributing in a collaborative environment.
              </p>

              <div className="quick-cards">
                <div className="qcard">
                  <h4>Education</h4>
                  {education.map((ed) => (
                    <div key={ed.school} className="qitem">
                      <strong>{ed.school}</strong>
                      <div>{ed.program}</div>
                      <div className="muted">{ed.meta}</div>
                    </div>
                  ))}
                </div>
                <div className="qcard">
                  <h4>Experience</h4>
                  {experience.map((xp) => (
                    <div key={xp.company} className="qitem">
                      <strong>
                        {xp.role} · {xp.company}
                      </strong>
                      <div className="muted">{xp.period}</div>
                      <ul>
                        {xp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="skills">
                {[...skills.core, ...skills.frameworks].map((skill, index) => (
                  <span key={skill} className="skill-tag" style={{ '--delay': `${0.2 + index * 0.06}s` }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`section ${isVisible.projects ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.title} className="project-card" style={{ '--delay': `${project.delay}ms` }}>
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`section ${isVisible.contact ? 'visible' : ''}`}>
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="contact-description">
              I’m open to internships and collaborations. Reach out via email, GitHub, or LinkedIn, and let’s create something meaningful.
            </p>

            <div className="contact-links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="contact-link"
                  style={{ '--delay': `${link.delay}ms` }}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <span className="icon">{link.icon}</span>
                  <span className="label">{link.label}</span>
                  <div className="link-glow"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {NAME}. Crafted with care and attention to detail.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
