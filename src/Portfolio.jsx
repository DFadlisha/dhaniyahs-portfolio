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
  const NAME = 'Dhaniyah Fadlisha';
  const ROLE = 'Software Engineering Student';
  const TAGLINE = 'Pixels that perform, code that connects.';
  const EMAIL = 'fadlishadhaniyah@gmail.com';
  const PHONE = '+60 13-713 8266';
  const LINKEDIN = 'https://www.linkedin.com/in/dhaniyahfadlisha';
  const GITHUB = 'https://github.com/DFadlisha';

  const skills = {
    "Front-end": ['React.js', 'JavaScript', 'HTML', 'CSS', 'Flutter', 'Tailwind CSS', 'Bootstrap'],
    "Back-end": ['Java', 'Node.js', 'PHP', 'Python', 'MySQL', 'C++', 'C#'],
    "Tools": ['Git', 'GitHub', 'VS Code', 'Figma']
  };

  const education = [
    {
      school: 'Universiti Teknologi Malaysia (UTM)',
      program: 'B.CompSc (Software Engineering) with Honours',
      date: 'Expected Oct 2026',
      desc: 'CGPA 3.17 • Core: Software Engineering, OOP, Data Structures'
    },
    {
      school: 'Kolej Vokasional Datuk Seri Mohd Zin',
      program: 'Diploma in Information Technology',
      date: 'Graduated Sept 2021',
      desc: 'CGPA 3.41 • Dean\'s List Awardee'
    }
  ];

  const experience = [
    {
      role: 'Technical Support Intern',
      company: 'Ishan Tech (M) Sdn Bhd',
      date: 'Mar 2021 – Jul 2021',
      desc: 'Provided technical support for ESET antivirus, troubleshot client issues, and collaborated with marketing teams.'
    },
    {
      role: 'Freelance Developer',
      company: 'Self-Employed',
      date: '2023 - Present',
      desc: 'Developed web solutions and interactive applications for various academic and personal projects.'
    }
  ];

  const projects = [
    {
      title: 'MI-NES Payroll System',
      description: 'Comprehensive payroll management system built with PHP and Supabase. Features PDF generation, overtime calculation, and PCB tax integration.',
      tags: ['PHP', 'Supabase', 'MySQL', 'TCPDF'],
      link: 'https://github.com/DFadlisha/payroll-system',
      delay: 0
    },
    {
      title: 'Queue System',
      description: 'Real-time queue tracking system using Vite and polling. Integrates with Upstash Redis for state syncing across devices without a custom backend.',
      tags: ['Vite', 'React', 'Redis', 'Vercel'],
      link: 'https://github.com/DFadlisha/Queue-System',
      delay: 150
    },
    {
      title: 'Sortmaster Mobile',
      description: 'Mobile sorting application built with React, TypeScript, and Tailwind CSS. Features a modern UI using shadcn-ui and Lovable integration.',
      tags: ['React Native', 'TypeScript', 'Tailwind CSS', 'Shadcn'],
      link: 'https://github.com/DFadlisha/sortmaster-mobile',
      delay: 300
    }
  ];

  const contactLinks = [
    { label: 'Email', icon: '📧', href: `mailto:${EMAIL}` },
    { label: 'LinkedIn', icon: '💼', href: LINKEDIN },
    { label: 'GitHub', icon: '🐙', href: GITHUB },
    { label: 'Phone', icon: '📞', href: `tel:${PHONE.replace(/\s|-/g, '')}` }
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
      <div className="bg-animated" aria-hidden="true"></div>
      <div className="bg-grid" aria-hidden="true"></div>

      {/* Cursor follower */}
      <div
        className="cursor-follower"
        style={{ transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)` }}
      ></div>

      {/* Navbar */}
      <nav className={`navbar ${activeSection !== 'home' ? 'scrolled' : ''}`}>
        <div className="nav-container center-only">
          <ul className="nav-links center-nav">
            {['home', 'about', 'services', 'projects', 'contact'].map((section) => (
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
      <section id="home" className="hero-section center-text">
        <div className="container">
          <h1 className="hero-title">
            Hey, I am <span className="highlight">{NAME}</span> <br />
            {TAGLINE}
          </h1>
          <button className="cta-button" onClick={() => scrollToSection('about')}>
            <span>Read More</span>
          </button>
        </div>
      </section>

      {/* Why Hire Me / About */}
      <section id="about" className={`section ${isVisible.about ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Why hire me for your next project?</h2>
          <div className="hire-me-grid">
            <div className="profile-image-container">
              <img src="/profile.jpg" alt="Profile" className="profile-img" />
            </div>
            <div className="hire-me-content">
              <p className="summary-text">
                I am a passionate <strong>{ROLE}</strong> with a strong foundation in computer science principles.
                With experience in both academic and practical software development, I build efficient,
                user-friendly solutions. I am eager to contribute my skills in full-stack development
                to create impactful digital experiences.
              </p>

              <div className="stats-row">
                <div className="stat-box">
                  <span className="stat-num">3+</span>
                  <span className="stat-label">Years Learning</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">10+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-secondary" onClick={() => scrollToSection('contact')}>Contact Me</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey (Education & Experience) */}
      <section id="services" className={`section ${isVisible.services ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">My Academic and Professional Journey</h2>
          <div className="journey-grid">

            {/* Education Column */}
            <div className="journey-column">
              <h3 className="column-title">Education</h3>
              <div className="timeline-cards">
                {education.map((edu, idx) => (
                  <div key={idx} className="timeline-card">
                    <div className="card-badge">{edu.date}</div>
                    <h4>{edu.program}</h4>
                    <h5>{edu.school}</h5>
                    <p>{edu.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div className="journey-column">
              <h3 className="column-title">Professional Experience</h3>
              <div className="timeline-cards">
                {experience.map((exp, idx) => (
                  <div key={idx} className="timeline-card">
                    <div className="card-badge">{exp.date}</div>
                    <h4>{exp.role}</h4>
                    <h5>{exp.company}</h5>
                    <p>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills-section" className="section">
        <div className="container">
          <h2 className="section-title">Tools and Skills</h2>

          <div className="skills-category-tabs">
            {Object.keys(skills).map(cat => (
              <span key={cat} className="category-pill">{cat}</span>
            ))}
          </div>

          <div className="skills-grid-visual">
            <div className="skills-list">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skill-group">
                  <h4>{category}</h4>
                  {items.map(skill => (
                    <div key={skill} className="skill-bar-container">
                      <div className="skill-info">
                        <span>{skill}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${Math.floor(Math.random() * 20 + 75)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`section ${isVisible.projects ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`section ${isVisible.contact ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-links center-row">
            {contactLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="contact-pill">
                <span>{link.icon}</span> {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {NAME}. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
