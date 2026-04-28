import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  // Ensure sections are visible by default; observer will still animate
  const [isVisible, setIsVisible] = useState({ about: true, journey: true, skills: true, projects: true, certifications: true, contact: true });
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
      const sections = ['home', 'about', 'journey', 'skills', 'projects', 'certifications', 'contact'];
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
  const NAME = 'Nurdhaniyah Fadlisha Binti Hasnorfadli';
  const ROLE = 'Software Engineering Student';
  const TAGLINE = 'Building scalable web applications and database-driven systems.';
  const EMAIL = 'fadlishadhaniyah@gmail.com';
  const PHONE = '+60 13-713 8266';
  const LOCATION = 'Malacca, Malaysia';
  const LINKEDIN = 'https://www.linkedin.com/in/dhaniyahfadlisha';
  const GITHUB = 'https://github.com/DFadlisha';

  const skills = {
    "Programming": ['Java', 'JavaScript', 'C++', 'C#', 'PHP', 'Python', 'Dart', 'HTML', 'CSS'],
    "Frameworks": ['React.js', 'Node.js', 'Flutter', 'Bootstrap', 'Spring Boot'],
    "Databases": ['MySQL', 'phpMyAdmin', 'Firebase Firestore', 'Supabase'],
    "Languages": ['Bahasa Malaysia (Native)', 'English (Proficient)', 'Chinese Mandarin (Conversational)', 'Japanese (Basic)']
  };

  const education = [
    {
      school: 'Universiti Teknologi Malaysia (UTM)',
      program: 'B.CompSc (Software Engineering) with Honours',
      date: '2022 – 2026',
      desc: 'Current GPA: 3.18 • Software Engineering Society Member'
    },
    {
      school: 'Kolej Vokasional Datuk Seri Mohd Zin',
      program: 'Diploma in Information Technology',
      date: '2019 – 2021',
      desc: 'CGPA 3.41'
    }
  ];

  const experience = [
    {
      role: 'Software Engineering Intern',
      company: 'Network Solution Sdn Bhd',
      date: 'Oct 2025 – Mar 2026',
      desc: 'Developed a Payroll System (PHP) and a Quality Control System Report mobile app (Dart/Flutter).'
    },
    {
      role: 'F&B Crew (Part-Time)',
      company: 'Pop Meals',
      date: 'Mar 2025 – Apr 2025',
      desc: 'Handled food preparation and packaging during high-volume periods.'
    },
    {
      role: 'Technical Support Intern',
      company: 'Ishan Tech (M) Sdn Bhd',
      date: 'Mar 2021 – Jul 2021',
      desc: 'Provided support for ESET antivirus solutions and improved maintenance protocols.'
    }
  ];

  const projects = [
    {
      title: 'Site Progress Reporting System (SPRS)',
      description: 'PWA-enabled management platform featuring real-time dashboards, daily report workflows, and automated issue management for MEC\'S Engineering.',
      tags: ['JavaScript', 'PWA', 'Real-time', 'Dashboard'],
      link: 'https://github.com/DFadlisha/SPRS',
      featured: true,
      delay: 0
    },
    {
      title: 'resume-ai',
      description: 'Intelligent AI-powered resume builder that analyzes and formats resumes to be ATS-friendly.',
      tags: ['JavaScript', 'AI', 'ATS'],
      link: 'https://github.com/DFadlisha/resume-ai',
      delay: 100
    },
    {
      title: 'Quality Control System Report',
      description: 'Mobile application built for real-time inspection tracking and quality control reporting at construction or industrial sites.',
      tags: ['Dart', 'Flutter', 'Mobile'],
      link: 'https://github.com/DFadlisha/Quality-Control-System-Report',
      delay: 200
    },
    {
      title: 'MI-NES Payroll System',
      description: 'Comprehensive payroll management system built with PHP and Supabase. Features PDF generation, overtime calculation, and PCB tax integration.',
      tags: ['PHP', 'Supabase', 'MySQL', 'TCPDF'],
      link: 'https://github.com/DFadlisha/payroll-system',
      delay: 300
    },
    {
      title: 'paldeck',
      description: 'A beautiful friend discovery and real-time chat app for gamers built with React Native and Expo, featuring native swipe gestures and a PocketBase backend.',
      tags: ['React Native', 'Expo', 'PocketBase'],
      link: 'https://github.com/DFadlisha/pal-deck',
      delay: 400
    }
  ];

  const certifications = [
    'Cisco IT Essentials',
    'The Essentials of AI & Data Fundamentals'
  ];

  const contactLinks = [
    { label: 'Email', icon: '📧', href: `mailto:${EMAIL}` },
    { label: 'LinkedIn', icon: '💼', href: LINKEDIN },
    { label: 'GitHub', icon: '🐙', href: GITHUB },
    { label: 'Phone', icon: '📞', href: `tel:${PHONE.replace(/\s|-/g, '')}` },
    { label: LOCATION, icon: '📍', href: '#' }
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
            {['home', 'about', 'journey', 'skills', 'projects', 'certifications', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={activeSection === section ? 'active' : ''}
                >
                  {section === 'journey' ? 'Journey' : section.charAt(0).toUpperCase() + section.slice(1)}
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
            {ROLE} <br />
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
          <h2 className="section-title">Professional Summary</h2>
          <div className="hire-me-grid">
            <div className="profile-image-container">
              <img src="/profile.jpg" alt="Profile" className="profile-img" />
            </div>
            <div className="hire-me-content">
              <p className="summary-text">
                I am a <strong>Software Engineering student</strong> with expertise in full-stack development across multiple frameworks.
                I am skilled in building <strong>scalable web applications</strong> and <strong>database-driven systems</strong>,
                with a proven ability to collaborate across departments and work effectively in fast-paced environments.
              </p>

              <div className="stats-row">
                <div className="stat-box">
                  <span className="stat-num">4+</span>
                  <span className="stat-label">Years of Tech Journey</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">15+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-secondary" onClick={() => scrollToSection('contact')}>Contact Me</button>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn-outline">View GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey (Education & Experience) */}
      <section id="journey" className={`section ${isVisible.journey ? 'visible' : ''}`}>
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
      <section id="skills" className={`section ${isVisible.skills ? 'visible' : ''}`}>
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
                className={`project-card ${project.featured ? 'featured' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {project.featured && <div className="featured-badge">Primary Project</div>}
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

      {/* Certifications */}
      <section id="certifications" className={`section ${isVisible.certifications ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-list center-row">
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-card">
                <span className="cert-icon">📜</span>
                <span className="cert-name">{cert}</span>
              </div>
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
