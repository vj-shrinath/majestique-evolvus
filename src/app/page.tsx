import Image from "next/image";
import InquiryPopup from "../components/InquiryPopup";
import Chatbot from "../components/Chatbot";
import HeroSlideshow from "../components/HeroSlideshow";
import TowerText from "../components/TowerText";
import HeroSearchBar from "../components/HeroSearchBar";
import LoadingScreen from "../components/LoadingScreen";
import InquiryButton from "../components/InquiryButton";
import AmenitiesDeck from "../components/AmenitiesDeck";
import ScrollReveal from "../components/ScrollReveal";
import StatsBar from "../components/StatsBar";
import HorizontalOverlappingDeck from "../components/HorizontalOverlappingDeck";
import NavContactButton from "../components/NavContactButton";
import MobileNavMenu from "../components/MobileNavMenu";
export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <InquiryPopup />
      <Chatbot />

      {/* Floating Brand Logo - Outer Beige Background */}
      <div className="brand-logo">
        <Image 
           src="/logo_suia.webp" 
           alt="Majestique Evolvus Logo" 
           width={130} 
           height={60} 
           style={{ height: "auto", objectFit: "contain" }} 
           priority
         />
      </div>

      {/* Floating Island Hero Section */}
      <section className="hero">
        <HeroSlideshow />
        <div className="hero-overlay"></div>
        
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-links">
            <a href="#overview">Overview</a>
            <a href="#showcase">Showcase</a>
            <a href="#pricing">Residences</a>
            <a href="#amenities">Amenities</a>
            <a href="#brochures">Brochures</a>
          </div>
          <NavContactButton />
          <MobileNavMenu />
        </nav>

        <div className="hero-inner-padded">
          <TowerText text="Majestique Evolvus" />
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Central Kharadi, Pune &bull; 10-Acre Ultra-Luxury Township
            </div>

            <h1>
              Where Architectural Mastery<br />
              <span className="gold-gradient-text">Meets Uncompromised Living.</span>
            </h1>

            <p className="hero-subtext">
              Explore thoughtfully engineered 3 BHK & 4 BHK luxury flats in Pune, featuring 70+ bespoke lifestyle amenities, grand clubhouse, and panoramic sky decks.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <div className="hero-price-badge">
                <span className="price-label">Residences Starting From</span>
                <span className="price-value">₹ 1.84 Cr* <small>Onwards</small></span>
              </div>

              <div className="hero-cta-group">
                <a href="#showcase" className="btn-hero-primary">
                  <span>Explore Sky Residences</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#brochures" className="btn-hero-secondary">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <span>Brochure</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Bottom Search Component - Desktop Only */}
        <HeroSearchBar />
      </section>

      {/* Mobile Search Bar - Shown below hero on small screens */}
      <div className="mobile-search-wrapper">
        <HeroSearchBar />
      </div>

      {/* Animated Stats Bar */}
      <ScrollReveal>
        <StatsBar />
      </ScrollReveal>

      {/* Thin Gold Divider */}
      <div style={{ width: "80px", height: "3px", background: "linear-gradient(90deg, transparent, #b38b22, transparent)", margin: "0 auto" }} />

      {/* Project Overview (SEO Optimized Content) */}
      <section id="overview" className="container">
        <ScrollReveal>
          <h2 className="section-title">Majestique Evolvus – 3 & 4 BHK Luxury Flats in Kharadi, Pune</h2>
        </ScrollReveal>
        <div className="overview-container">
          <div className="overview-text">
            <ScrollReveal direction="left">
              <p style={{ marginBottom: "1rem", lineHeight: 1.8 }}>
                Experience the pinnacle of luxury real estate in Pune. <strong>Majestique Evolvus in Central Kharadi</strong> offers thoughtfully designed 3 & 4 BHK luxury residences for sale in Kharadi, equipped with world-class specifications and lifestyle amenities that redefine comfort. Welcome to an iconic development that stands tall in Pune's most sought-after neighborhood.
              </p>
              <ul style={{ listStyle: "none", lineHeight: 2, marginTop: "1rem", padding: 0 }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><svg width="18" height="18" fill="none" stroke="#d4af37" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg> <strong>Sprawling 10 Acres of Grand Development</strong></li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><svg width="18" height="18" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 2v20M20 2v20M8 22V2h8v20M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg> <strong>6 Iconic Towers (Tower 1–4, 13 & 14)</strong></li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><svg width="18" height="18" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> <strong>Possession: Dec 2028 (As per RERA)</strong></li>
              </ul>
            </ScrollReveal>
          </div>
          <div className="overview-image">
            <ScrollReveal direction="right">
              <Image 
                 src="/asset-2.jpeg" 
                 alt="Majestique Evolvus upper kharadi luxury living" 
                 width={600} 
                 height={600} 
                 className="overview-img-element"
               />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive Overlapping Horizontal Scroll Showcase Deck */}
      <section id="showcase" style={{ margin: "2rem 0" }}>
        <HorizontalOverlappingDeck 
          title="3 & 4 BHK Residences & Floorplan Showcase"
          subtitle="Scroll to explore our exclusive residences for sale in Kharadi, floor plans, and lifestyle highlights overlapping in real-time."
          cards={[
            {
              id: "card-3bhk-luxury",
              tag: "3 BHK Luxury",
              title: "3 BHK Luxury Residence",
              subtitle: "Tower 1 & 2 • Central Kharadi, Pune",
              desc: "Engineered for urban luxury with optimized spaces, high-end vitrified tile flooring, modular kitchen platform, and 3 private bath suits.",
              badge: "Popular",
              price: "₹ 1.84 Cr*",
              area: "1149 sq.ft.",
              features: [
                "Premium Vitrified Flooring",
                "Granite Modular Kitchen Platform",
                "3 Attached Luxury Bathrooms",
                "Spacious Sunlit Balcony Deck"
              ],
              image: "asset-14.jpeg",
              ctaText: "Get Complete Costing & Availabilities"
            },
            {
              id: "card-3bhk-premium",
              tag: "3 BHK Premium",
              title: "3 BHK Premium Residence",
              subtitle: "Prime Corner Units",
              desc: "Expansive layout featuring premium flooring, extra-wide balcony overhang, utility dry balcony, and smart home automation points.",
              badge: "Best Value",
              price: "₹ 2.10 Cr*",
              area: "1300 sq.ft.",
              features: [
                "Premium Living Room Flooring",
                "Premium Modular Kitchen + Dry Balcony",
                "Wide Terrace Balcony with Panoramic View",
                "Smart Lock & Video Door Phone"
              ],
              image: "asset-15.jpeg",
              ctaText: "Get Complete Costing & Availabilities"
            },
            {
              id: "card-4bhk-signature",
              tag: "4 BHK Signature",
              title: "4 BHK Grand Residence",
              subtitle: "Signature Suites",
              desc: "Ultimate luxury for families. Features 4 grand bedrooms, expansive living & dining lounge, private master terrace, and maid/utility provisions.",
              badge: "Spacious Luxury",
              price: "₹ 2.65 Cr*",
              area: "1565 sq.ft.",
              features: [
                "4 Master Bedrooms + Dining Lounge",
                "Double Height Private Terrace",
                "Modular Kitchen with Separate Utility",
                "Premium Sanitary Fitted Bathrooms"
              ],
              image: "asset-2.jpeg",
              ctaText: "Get Complete Costing & Availabilities"
            },
            {
              id: "card-ebrochure",
              tag: "Official E-Brochure",
              title: "Official Master E-Brochure",
              subtitle: "Majestique Landmarks Official Release",
              desc: "Complete 17-acre master plan, architectural blueprints, amenity breakdowns, and developer credentials in high definition PDF format.",
              badge: "Official Project Literature",
              features: [
                "17+ Acres Master Site Plan",
                "RERA Registration Details",
                "Complete Specifications & Finishes",
                "Location & Connectivity Map"
              ],
              image: "asset-1.jpeg",
              ctaText: "Download E-Brochure PDF",
              pdfUrl: "https://u8zpu6q2e6.ufs.sh/f/vXIfOjKjYQc8lnvs9qMO0jFyBK8XaQwVzDILsbpvcPeN6Zir"
            },
            {
              id: "card-amenities",
              tag: "35+ Amenities",
              title: "World-Class Amenities",
              subtitle: "Clubhouse, Sports & Wellness",
              desc: "Experience 35+ extraordinary facilities including Twin Squash Courts, Dolby Atmos Theatre, Rooftop Gazebo, and Infinity Swimming Pool.",
              badge: "Lifestyle Hub",
              features: [
                "Twin Squash Courts & Box Cricket",
                "Dolby Atmos Private Screening Room",
                "Rooftop Yoga Deck & Gazebo",
                "Co-working Lounge & Gymnasium"
              ],
              image: "asset-7.jpeg",
              ctaText: "Explore All 35+ Amenities"
            }
          ]}
        />
      </section>

      {/* Configurations & Pricing */}
      <section id="pricing" className="container pricing-section">
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>UNIT CONFIGURATIONS – ALL TOWERS</h2>
            <p style={{ color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="18" height="18" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg> 
              Note: Prices are exclusive of Floor Rise & PLC
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-3">
          <ScrollReveal delay={0}>
            <div className="pricing-card">
              <div className="pricing-badge">Popular</div>
              <h3>3 BHK Luxury Flat</h3>
              <p className="pricing-area">1149 sq.ft. (Carpet Area)</p>
              <h4 className="pricing-price">₹ 1.84 Cr*</h4>
              <ul className="pricing-features">
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Premium Vitrified Flooring</li>
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Modular Kitchen Platform</li>
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> 3 Attached Bathrooms</li>
              </ul>
              <InquiryButton title="Get Complete Costing" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="pricing-card featured">
              <div className="pricing-badge">Best Value</div>
              <h3>3 BHK Premium Flat</h3>
              <p className="pricing-area">1300 sq.ft. (Carpet Area)</p>
              <h4 className="pricing-price">₹ 2.10 Cr*</h4>
              <ul className="pricing-features">
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Premium Flooring</li>
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Premium Modular Kitchen</li>
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Larger Balcony + Dry Area</li>
              </ul>
              <InquiryButton title="Get Complete Costing" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="pricing-card">
              <div className="pricing-badge">Spacious</div>
              <h3>4 BHK Signature Flat</h3>
              <p className="pricing-area">1565 sq.ft. (Carpet Area)</p>
              <h4 className="pricing-price">₹ 2.65 Cr*</h4>
              <ul className="pricing-features">
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> 4 Bedrooms + Living Room</li>
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Premium Specifications</li>
                <li><svg width="16" height="16" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Utility Balcony + Dry Area</li>
              </ul>
              <InquiryButton title="Get Complete Costing" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brochure Previews & Downloads */}
      <section id="brochures" className="container">
        <ScrollReveal>
          <h2 className="section-title">Official Brochures & Floor Plans</h2>
          <p style={{ textAlign: "center", marginBottom: "3rem", color: "#666" }}>Review and download our official project literature directly.</p>
        </ScrollReveal>
        
        <div className="grid grid-3" style={{ gap: "2rem" }}>
          {[
            { 
              id: "master", 
              title: "Official E-Brochure",
              url: "https://u8zpu6q2e6.ufs.sh/f/vXIfOjKjYQc8lnvs9qMO0jFyBK8XaQwVzDILsbpvcPeN6Zir"
            },
            { 
              id: "2bhk-plan", 
              title: "2 BHK Floor Plan",
              url: "https://u8zpu6q2e6.ufs.sh/f/vXIfOjKjYQc87IPSz0jAQi4sGS6mjZY2JelTBbxwMgV0t9dR"
            },
            { 
              id: "3bhk-plan", 
              title: "3 BHK Floor Plan",
              url: "https://u8zpu6q2e6.ufs.sh/f/vXIfOjKjYQc8sPXAxIcxn5o2fdWcqZlrVUQg9zD4b3J6KThN"
            }
          ].map((doc, idx) => (
            <ScrollReveal key={doc.id} delay={idx * 150}>
              <div className="brochure-card">
                {/* Mobile Specific Icon (Hidden on Desktop via CSS) */}
                <div className="mobile-brochure-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                
                <div className="brochure-card-body">
                  <h3 className="brochure-title">{doc.title}</h3>
                  {/* PDF Preview Frame with Native Fallback */}
                  <object 
                    className="brochure-preview-obj"
                    data={`${doc.url}#toolbar=0&navpanes=0&scrollbar=0`}
                    type="application/pdf"
                    title={doc.title}
                  >
                    {/* Fallback shown if PDF preview is blocked or unsupported */}
                    <div className="brochure-fallback">
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem", opacity: 0.8 }}>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <text x="12" y="16" fontSize="5" fontWeight="bold" fill="#d4af37" stroke="none" textAnchor="middle">PDF</text>
                      </svg>
                      <p style={{ color: "#666", fontSize: "0.85rem", margin: 0 }}>Preview unavailable vertically</p>
                      <p style={{ color: "#999", fontSize: "0.75rem", marginTop: "0.2rem" }}>Tap Download below</p>
                    </div>
                  </object>
                  <div className="brochure-actions">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark brochure-btn">View PDF</a>
                    <a href={doc.url} download target="_blank" rel="noopener noreferrer" className="btn btn-outline brochure-btn">Download</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="container amenities-section">
        <ScrollReveal>
          <h2 className="section-title">70+ Modern Lifestyle Amenities</h2>
          <p style={{ textAlign: "center", marginBottom: "3rem", color: "#666" }}>Elevate your lifestyle with our premium facilities at Majestique Evolvus.</p>
        </ScrollReveal>
        <AmenitiesDeck
          amenities={[
            { img: "asset-3.jpeg", title: "Grand Clubhouse (~27,000 Sq. Ft.)" },
            { img: "asset-4.jpeg", title: "Rooftop Yoga Deck & Gazebo" },
            { img: "asset-5.jpeg", title: "Twin Squash Courts & Box Cricket" },
            { img: "asset-6.jpeg", title: "Co-working Lounge & Gymnasium" },
            { img: "asset-7.jpeg", title: "Swimming Pool + Jacuzzi" },
            { img: "asset-8.jpeg", title: "Dolby Atmos Theatre" },
          ]}
        />
      </section>

      {/* SEO FAQ Section */}
      <section id="faq" className="container">
        <ScrollReveal>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </ScrollReveal>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            { q: "What is the starting price for flats in Majestique Evolvus?", a: "The pricing for our premium 3 BHK apartments starts at ₹1.84 Cr, and our spacious 4 BHK residences start at ₹2.65 Cr onwards." },
            { q: "Where is Majestique Evolvus located?", a: "The project is strategically located in Central Kharadi, Pune, offering seamless connectivity to Viman Nagar, Kalyani Nagar, and Koregaon Park." },
            { q: "What are the amenities provided?", a: "Residents enjoy exclusive access to 70+ modern luxury lifestyle amenities, including a Grand Clubhouse, Dolby Atmos Theatre, Box Cricket arena, Twin Squash Courts, Swimming Pool, and a Co-working space." },
          ].map((faq, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="faq-item">
                <h4 style={{ marginBottom: "0.5rem" }}>{faq.q}</h4>
                <p style={{ color: "#555" }}>{faq.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Location Advantage / Map Section */}
      <section id="location" className="container" style={{ marginTop: "4rem" }}>
        <ScrollReveal>
          <h2 className="section-title">Location Advantage – Central Kharadi, Pune</h2>
          <p style={{ textAlign: "center", marginBottom: "3rem", color: "#666" }}>Seamless connectivity to major IT Hubs, Malls, Hospitals & International Schools.</p>
        </ScrollReveal>

        <div className="grid grid-2" style={{ gap: "3rem", alignItems: "center" }}>
          <ScrollReveal direction="left">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ backgroundColor: "#faf8f5", padding: "12px", borderRadius: "12px", border: "1px solid #e2d29b" }}>
                  <svg width="24" height="24" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "1.1rem" }}>Near bypass & Next to BNY Mellon</h4>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>EON IT Park & World Trade Center just minutes away</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ backgroundColor: "#faf8f5", padding: "12px", borderRadius: "12px", border: "1px solid #e2d29b" }}>
                  <svg width="24" height="24" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1"/><polygon points="12 15 17 21 7 21 12 15"/></svg>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "1.1rem" }}>Nearby Attractions</h4>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>Amanora Mall, Seasons Mall, and Phoenix Project</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ backgroundColor: "#faf8f5", padding: "12px", borderRadius: "12px", border: "1px solid #e2d29b" }}>
                  <svg width="24" height="24" fill="none" stroke="#b38b22" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "1.1rem" }}>Top Schools & Hospitals</h4>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>Manipal Hospital, EuroSchool & Orchids International within 3km</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div style={{ border: "1px solid #ddd", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-medium)", height: "380px" }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.96000000000001!3d18.560000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3a5a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sUpper%20Kharadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Majestique Evolvus Location Map"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Modern Luxury Footer */}
      <footer id="contact" style={{ backgroundColor: "#0e0e0e", color: "#888", marginTop: "5rem" }}>
        <div className="footer-inner">
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <Image 
                src="/logo_suia.webp" 
                alt="Majestique Evolvus Logo" 
                width={140} 
                height={65} 
                style={{ filter: "brightness(0) invert(1)", height: "auto", objectFit: "contain" }} 
              />
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
              Experience iconic luxury living in Central Kharadi, Pune. Thoughtfully crafted residences, world-class amenities, and 360-degree connectivity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h5>Navigation</h5>
            <a href="#overview">Overview</a>
            <a href="#showcase">Showcase</a>
            <a href="#pricing">Pricing</a>
            <a href="#amenities">Amenities</a>
            <a href="#brochures">Brochures</a>
          </div>

          {/* Legal / Contact */}
          <div className="footer-links-group">
            <h5>Legal & RERA</h5>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="https://u8zpu6q2e6.ufs.sh/f/vXIfOjKjYQc8XBCtNoJb56GC8fHIhWLPoSV2T4EvqFacYdzs" target="_blank" rel="noopener noreferrer">MahaRERA Certificate</a>
            <p style={{ fontSize: "0.85rem", marginTop: "0.8rem", color: "#d4af37" }}>
              MahaRERA No: P52100054253
            </p>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="footer-bottom">
          Disclaimer: The content provided on this website is for informational purposes only and does not constitute an offer to avail any service. Prices mentioned are subject to change without prior notice.
          <br />
          © {new Date().getFullYear()} Majestique Evolvus. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
