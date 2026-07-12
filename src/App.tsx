import { useState } from 'react'
import type { FormEvent } from 'react'
import milesImg from './assets/Miles B. Paradero.jpg'
import cvPdf from './assets/cv.pdf'

// AgriSync Assets
import agriShowcase from './assets/AgriSync/7b931e90-2e3e-4ef8-b2a4-513110e6d67a.jpg'
import agriRoute from './assets/AgriSync/4ea42a2c-7df0-460f-a34f-5b3a29227c8a.jpg'
import agriOrders from './assets/AgriSync/64c98c27-89bb-4443-973a-1686bc6b0fc7.jpg'
import agriBatch from './assets/AgriSync/33f3dd48-27c8-4972-9a0d-963e86db94c0.jpg'

// Jobol's Menu Assets
import jobolsLogin from "./assets/Jobol's Menu/a7590ff4-4148-4aae-8553-7eea3dd3b442.jpg"
import jobolsMain from "./assets/Jobol's Menu/d2285970-a7e5-47e4-b5e9-69e0dfb444fe.jpg"
import jobolsGroup from "./assets/Jobol's Menu/f768f2f0-c9bf-4197-8134-a7624bd974e7.jpg"

// Suriin AI Assets
import suriinReports from './assets/Suriin Ai/bfc05112-ff1a-44be-8fc9-b0f6b5c421cd.jpg'
import suriinHistory from './assets/Suriin Ai/0bdfe9bb-8bee-4b85-862f-2ede2c616bf1.jpg'
import suriinCase from './assets/Suriin Ai/13212322-4dc4-4671-a7d6-2f7773dccf23.jpg'
import suriinIntel from './assets/Suriin Ai/0c19f274-7816-46eb-9fec-5c790fc62c57.jpg'
import suriinAnalytics from './assets/Suriin Ai/d82353e6-7412-4672-9fa5-47c24de6db03.jpg'

import './App.css'

interface Project {
  id: string;
  refId: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  carouselImages: string[];
  challenge: string;
  solution: string;
  impact: string;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSection, setActiveSection] = useState('about')
  
  // Contact Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Case Study Sidebar State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const projectsPerPage = 2

  const closeCaseStudy = () => {
    setSelectedProject(null)
    setCarouselIndex(0)
  }

  const projects: Project[] = [
    {
      id: 'agrisync',
      refId: 'REF_ID: AGR-2024-001',
      title: 'AgriSync',
      description: 'An agricultural supply chain and e-commerce mobile application that connects local farmers directly to kitchens and consumers, streamlining order fulfillment and logistics.',
      tags: ['AGRICULTURE', 'E-COMMERCE', 'LOGISTICS', 'MOBILE'],
      image: agriShowcase,
      carouselImages: [agriShowcase, agriRoute, agriOrders, agriBatch],
      challenge: 'Local farmers struggled with delivery logistics, route overlaps, and manual coordination of orders, leading to high transportation costs and food spoilage.',
      solution: 'Designed and mapped mobile interfaces for Smart Routing using OpenStreetMap nodes, automatic order batching templates, and real-time tracking metrics for delivery riders.',
      impact: 'Connected over 50 local farmers directly to retail consumers, reduced delivery route redundancies, and slashed average logistics times.'
    },
    {
      id: 'jobolsmenu',
      refId: "REF_ID: POS-2024-012",
      title: "Jobol's Menu",
      description: "A desktop Point-of-Sale (POS) and ordering system designed for restaurant staff and administrators, featuring intuitive item categorizations and automated ticket bill printing.",
      tags: ['POS', 'DESKTOP APP', 'DATABASE', 'JAVA'],
      image: jobolsMain,
      carouselImages: [jobolsMain, jobolsLogin, jobolsGroup],
      challenge: 'The restaurant suffered from manual order slip transcription errors, discrepancies in final bills, and slow customer checkout turnarounds.',
      solution: 'Developed a desktop interface split into categorizations (Main Dish, Appetizer, Dessert, Drinks) with real-time bill aggregation and cash receipt rendering capabilities.',
      impact: 'Eliminated manual transaction recording errors, automated invoice print generations, and reduced customer checkouts by over 50%.'
    },
    {
      id: 'suriinai',
      refId: 'REF_ID: SEC-2026-044',
      title: 'Suriin AI',
      description: 'An AI-powered social media threat intelligence and scam awareness dashboard designed to triage, classify, and analyze potential fraudulent messages and phishing schemes.',
      tags: ['CYBERSECURITY', 'AI/ML', 'ANALYTICS', 'WEB APP'],
      image: suriinReports,
      carouselImages: [suriinReports, suriinHistory, suriinCase, suriinIntel, suriinAnalytics],
      challenge: 'Security response groups spent heavy manual labor reviewing citizen reports of localized scams (such as GCash emergency scams) in Tagalog and English.',
      solution: 'Designed a dashboard aggregating reports, displaying AI classification confidence levels, detailing raw scam copy evidence, and visualizing expert threat attribution rates.',
      impact: 'Achieved over 95% AI confidence classifications for reported threat vectors, claimed case management flow, and automated threat statistics logs.'
    }
  ]

  // Pagination Logic
  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to project section smoothly when page changes
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setFormStatus('error')
      return
    }
    setFormStatus('submitting')
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    }, 1500)
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container nav-container">
          <a href="#about" className="logo" onClick={() => setActiveSection('about')}>
            Miles B. Paradero
          </a>
          
          <button 
            className="menu-toggle" 
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <li>
                <a 
                  href="#about" 
                  className={activeSection === 'about' ? 'active' : ''}
                  onClick={() => { setActiveSection('about'); setMobileMenuOpen(false); }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className={activeSection === 'skills' ? 'active' : ''}
                  onClick={() => { setActiveSection('skills'); setMobileMenuOpen(false); }}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className={activeSection === 'projects' ? 'active' : ''}
                  onClick={() => { setActiveSection('projects'); setMobileMenuOpen(false); }}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={activeSection === 'contact' ? 'active' : ''}
                  onClick={() => { setActiveSection('contact'); setMobileMenuOpen(false); }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a href={cvPdf} download="Miles_B_Paradero_CV.pdf" className="download-btn" style={{ display: 'inline-block', textAlign: 'center' }}>
                  Download CV
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-subtitle">Student & Aspiring System Analyst</span>
            <h1 className="hero-title">Strategic Solutions Through Technical Precision.</h1>
            <p className="hero-desc">
              I am Miles B. Paradero, a student from Davao del Norte State College and an aspiring System Analyst. Passionate about learning how to translate complex requirements into structured technical designs, bridging the gap between stakeholder needs and modern software development.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary" onClick={() => setActiveSection('projects')}>
                View Projects
              </a>
              <a href="#contact" className="btn-secondary" onClick={() => setActiveSection('contact')}>
                Contanct Me
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image-positioner">
              <div className="hero-image-wrapper">
                <img 
                  src={milesImg} 
                  className="hero-image" 
                  alt="Miles B. Paradero" 
                />
              </div>
              <div className="status-card">
                <div className="status-title">// SYSTEM STATUS</div>
                <div>Uptime: 99.9%</div>
                <div>Accuracy: High</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="skills" className="capabilities-section section-padding">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Capabilities</span>
            <h2 className="section-title">Bridging Business Requirements & Architecture</h2>
          </div>
          <div className="capabilities-grid">
            <div className="capability-card">
              <div className="capability-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="9"></line>
                  <line x1="9" y1="13" x2="15" y2="13"></line>
                  <line x1="9" y1="17" x2="13" y2="17"></line>
                </svg>
              </div>
              <h3>Requirements Analysis</h3>
              <ul className="capability-list">
                <li>Stakeholder Interviews</li>
                <li>BRD & FRD Documentation</li>
                <li>User Story Mapping</li>
                <li>Gap Analysis</li>
              </ul>
            </div>

            <div className="capability-card">
              <div className="capability-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>System Design</h3>
              <ul className="capability-list">
                <li>UML Modeling</li>
                <li>API Design (REST/SOAP)</li>
                <li>Database Schema Design</li>
                <li>Microservices Arch</li>
              </ul>
            </div>

            <div className="capability-card">
              <div className="capability-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>Implementation</h3>
              <ul className="capability-list">
                <li>QA Lifecycle Management</li>
                <li>SQL Optimization</li>
                <li>ERP System Integration</li>
                <li>UAT Coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projects" className="portfolio-section section-padding">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Portfolio</span>
            <h2 className="section-title">Strategic Project Delivery</h2>
          </div>
          <div className="projects-list">
            {currentProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card ${index % 2 !== 0 ? 'alternate' : ''}`}
              >
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>
                <div className="project-content">
                  <span className="project-ref">{project.refId}</span>
                  <h3>{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => { setSelectedProject(project); setCarouselIndex(0); }} 
                    className="project-link-btn"
                  >
                    Read Full Project Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-btn wide"
                aria-label="Previous Page"
              >
                Prev
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-btn wide"
                aria-label="Next Page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Professional History and Technical Stack */}
      <section className="history-stack-section section-padding">
        <div className="container history-stack-grid">
          {/* Timeline - Left Column */}
          <div className="history-container">
            <h2>Academic & Project History</h2>
            <div className="timeline" style={{ marginTop: '24px' }}>
              <div className="timeline-item active-item">
                <div className="timeline-dot"></div>
                <div className="timeline-header">
                  <span className="timeline-date">2022 — Present</span>
                  <span className="timeline-role">BS in Information Technology (Undergraduate)</span>
                  <span className="timeline-company">Davao del Norte State College</span>
                </div>
                <p className="timeline-desc">
                  Specializing in systems analysis, business process modeling, and database design. Actively involved in programming projects and developing analytical skills to solve system bottlenecks.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-header">
                  <span className="timeline-date">2025 (Internship)</span>
                  <span className="timeline-role">Systems Analyst Intern</span>
                  <span className="timeline-company">DNSC MIS Office</span>
                </div>
                <p className="timeline-desc">
                  Assisted in analyzing business workflows and documenting requirements for campus system enhancements. Contributed to database schema visualization and user feedback collection.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-header">
                  <span className="timeline-date">2024 — 2025</span>
                  <span className="timeline-role">IT Capstone Project Lead & Systems Analyst</span>
                  <span className="timeline-company">Davao del Norte State College</span>
                </div>
                <p className="timeline-desc">
                  Spearheaded requirements analysis, system architecture mapping, and database design for our group's IT Capstone project. Led a team of four students in modeling system workflows and designing the user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack - Right Column */}
          <div className="stack-card">
            <h3>Beginner Technical Stack</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '-20px', marginBottom: '24px', opacity: 0.8 }}>
              Academic foundation and hands-on laboratory/project exposure.
            </p>
            <div className="stack-groups">
              <div>
                <h4 className="stack-group-title">Methodologies</h4>
                <div className="stack-list">
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Agile/Scrum</span>
                  </div>
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Waterfall</span>
                  </div>
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>SDLC</span>
                  </div>
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>ITIL V4</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="stack-group-title">Tools</h4>
                <div className="stack-list">
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>JIRA / Confluence</span>
                  </div>
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Lucidchart / Visio</span>
                  </div>
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Postman / Swagger</span>
                  </div>
                  <div className="stack-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>SQL Server Mgmt</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="stack-group-title">Core Competencies</h4>
                <div className="stack-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  <span className="tag" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>ERP Implementation</span>
                  <span className="tag" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>Business Process Modeling</span>
                  <span className="tag" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>Data Governance</span>
                  <span className="tag" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>Risk Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-header">
            <h2>Ready to analyze your next challenge?</h2>
            <p>
              Available for senior contract roles or executive consultations. Let's discuss how technical precision can drive your business goals.
            </p>
          </div>
          <div className="contact-card">
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    className="form-input" 
                    placeholder="Full Name..." 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="corpEmail">Corporate Email</label>
                  <input 
                    type="email" 
                    id="corpEmail" 
                    className="form-input" 
                    placeholder="Corporate Email..." 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="projectBrief">Project Brief</label>
                <textarea 
                  id="projectBrief" 
                  className="form-textarea" 
                  placeholder="Describe your project requirements..." 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
              </button>

              {formStatus === 'success' && (
                <div className="submit-message success">
                  Inquiry submitted successfully! We will get back to you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <span className="footer-logo">Miles B. Paradero</span>
          <ul className="footer-links">
            <li>
              <a href="https://Instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
              <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              <a href="#about">Privacy Policy</a>
            </li>
          </ul>
          <span className="footer-copyright">
            &copy; 2024 Miles B. Paradero. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Case Study Sidebar (Drawer) */}
      {selectedProject && (
        <div className="case-study-backdrop" onClick={closeCaseStudy}>
          <div className="case-study-drawer" onClick={(e) => e.stopPropagation()}>
            <header className="drawer-header">
              <span className="drawer-ref">{selectedProject.refId}</span>
              <div className="drawer-title-row">
                <h2>{selectedProject.title}</h2>
                <button className="drawer-close-btn" onClick={closeCaseStudy} aria-label="Close Case Study">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </header>

            <div className="drawer-body">
              {/* Left Column: Case Study Info */}
              <div className="drawer-info-pane">
                <section className="drawer-section">
                  <h3>Project Overview</h3>
                  <p>{selectedProject.description}</p>
                </section>

                <section className="drawer-section">
                  <h3>The Challenge</h3>
                  <p>{selectedProject.challenge}</p>
                </section>

                <section className="drawer-section">
                  <h3>The Solution</h3>
                  <p>{selectedProject.solution}</p>
                </section>

                <section className="drawer-section">
                  <h3>Key Impact</h3>
                  <p>{selectedProject.impact}</p>
                </section>

                <section className="drawer-section">
                  <h3>Technologies Used</h3>
                  <div className="project-tags">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Carousel */}
              <div className="drawer-carousel-pane">
                <div className="drawer-carousel">
                  <div className="carousel-view">
                    <img 
                      src={selectedProject.carouselImages[carouselIndex]} 
                      alt={`${selectedProject.title} Screen ${carouselIndex + 1}`} 
                      className="carousel-image" 
                    />
                    
                    {selectedProject.carouselImages.length > 1 && (
                      <>
                        <button 
                          className="carousel-nav-btn prev"
                          onClick={() => setCarouselIndex((prev) => (prev === 0 ? selectedProject.carouselImages.length - 1 : prev - 1))}
                          aria-label="Previous Slide"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        
                        <button 
                          className="carousel-nav-btn next"
                          onClick={() => setCarouselIndex((prev) => (prev === selectedProject.carouselImages.length - 1 ? 0 : prev + 1))}
                          aria-label="Next Slide"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {selectedProject.carouselImages.length > 1 && (
                    <div className="carousel-indicators">
                      {selectedProject.carouselImages.map((_, i) => (
                        <button 
                          key={i} 
                          className={`carousel-dot ${carouselIndex === i ? 'active' : ''}`}
                          onClick={() => setCarouselIndex(i)}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
