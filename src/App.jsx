import React, { useMemo, useState } from "react";

import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Search,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  Sparkles,
  Layers3,
  ShieldCheck,
  Truck,
  Factory
} from "lucide-react";

import "./App.css";

// IMAGE IMPORTS
import owner from "./assets/owner.png";
import manager from "./assets/manager.png";
import office from "./assets/offc.jpeg";
import office1 from "./assets/offc1.jpeg";
import office2 from "./assets/offc2.jpeg";
import office3 from "./assets/offc3.jpeg";
import office4 from "./assets/offc4.jpeg";

const EMAIL = "dgapparels092@gmail.com";
const WHATSAPP = "917696799906";

const fabrics = [
  {
    id: 1,
    name: "DG COT Peach Touch",
    code: "DG CIR 0001",
    category: "Circular Knit",
    gsm: "250 GSM",
    type: "Fake Cotton",
    image: "https://www.dg-knitting.com/assets/images/fabrics/cotton-series/DG-CIR-0001/swirl/dg-cir-0001-swirl-thumb.webp",
    description: "Soft brushed finish with a refined, compact texture.",
    label: "SIGNATURE"
  },
  {
    id: 2,
    name: "DG COT Soft Rib",
    code: "DG CIR 0002",
    category: "Circular Knit",
    gsm: "240 GSM",
    type: "Fake Cotton",
    image: "https://www.dg-knitting.com/assets/images/fabrics/cotton-series/DG-CIR-0002/swirl/dg-cir-0002-swirl-thumb.webp",
    description: "Fine vertical rib texture with a soft matte appearance.",
    label: "BESTSELLER"
  },
  {
    id: 3,
    name: "DG COT CCD",
    code: "DG CIR 0003",
    category: "Circular Knit",
    gsm: "160–170 GSM",
    type: "Fake Cotton",
    image: "https://www.dg-knitting.com/assets/images/fabrics/cotton-series/DG-CIR-0003/swirl/dg-cir-0003-swirl-thumb.webp",
    description: "Lightweight construction with a fine knit texture.",
    label: "LIGHTWEIGHT"
  },
  {
    id: 4,
    name: "DG COT Mini Grid",
    code: "DG CIR 0004",
    category: "Circular Knit",
    gsm: "240 GSM",
    type: "Fake Cotton",
    image: "https://www.dg-knitting.com/assets/images/fabrics/cotton-series/DG-CIR-0004/swirl/dg-cir-0004-swirl-thumb.webp",
    description: "Subtle micro-grid surface with a premium matte finish.",
    label: "TEXTURED"
  },
  {
    id: 5,
    name: "DG COT Thermal Grid",
    code: "DG CIR 0005",
    category: "Circular Knit",
    gsm: "290–300 GSM",
    type: "Fake Cotton",
    image: "https://www.dg-knitting.com/assets/images/fabrics/cotton-series/DG-CIR-0005/swirl/dg-cir-0005-swirl-thumb.webp",
    description: "Raised grid texture for heavier garment applications.",
    label: "HEAVYWEIGHT"
  },
  {
    id: 6,
    name: "DG COT Boomer",
    code: "DG CIR 0006",
    category: "Circular Knit",
    gsm: "240–250 GSM",
    type: "Fake Cotton",
    image: "https://www.dg-knitting.com/assets/images/fabrics/cotton-series/DG-CIR-0006/swirl/dg-cir-0006-swirl-thumb.webp",
    description: "Fine vertical ribbed surface with a soft matte look.",
    label: "NEW ARRIVAL"
  },
  {
    id: 7,
    name: "DG WRP Pitch Fine",
    code: "DG WRP 0001",
    category: "Warp Knit",
    gsm: "160–170 GSM",
    type: "Polyester",
    image: "https://www.dg-knitting.com/assets/images/fabrics/warp-series/DG-WRP-0001/swirl/dg-wrp-0001-swirl-thumb.webp",
    description: "Uniform fine surface for formal and corporate wear.",
    label: "WARP SERIES"
  },
  {
    id: 8,
    name: "DG WRP Suede Touch",
    code: "DG WRP 0002",
    category: "Warp Knit",
    gsm: "300 GSM",
    type: "Brushed Suede",
    image: "https://www.dg-knitting.com/assets/images/fabrics/warp-series/DG-WRP-0002/swirl/dg-wrp-0002-swirl-thumb.webp",
    description: "Velvety brushed surface with a luxurious handfeel.",
    label: "PREMIUM"
  }
];

const categories = [
  "All Fabrics",
  "Circular Knit",
  "Warp Knit"
];
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Fabrics");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState("General Enquiry");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [activeFabric, setActiveFabric] = useState(null);

  const filteredFabrics = useMemo(() => {
    return fabrics.filter((fabric) => {
      const categoryMatch =
        activeCategory === "All Fabrics" ||
        fabric.category === activeCategory;

      const searchMatch =
        `${fabric.name} ${fabric.code} ${fabric.gsm} ${fabric.type}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    window.setTimeout(() => setAlert(null), 4000);
  };

  const openForm = (type, fabric = "") => {
    setFormType(type);
    setSelectedFabric(fabric);
    setActiveFabric(null);
    setModal(true);
    setMenuOpen(false);
  };

  const closeForm = () => setModal(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setSubmitting(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            ...data,
            _subject: `DG APPARELS | ${formType}`,
            _template: "table"
          })
        }
      );

      const result = await response.json();

      if (!response.ok || result.success !== "true") {
        throw new Error("Submission failed");
      }

      form.reset();
      closeForm();
      showAlert("Your enquiry has been sent successfully!");
    } catch {
      showAlert(
        "Unable to send right now. Please email us directly.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        "Hello DG APPARELS! I want to enquire about your fabrics."
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="dg-site">

      {/* TOP ANNOUNCEMENT */}
      <div className="topbar">
        <span>PREMIUM TEXTILE SOLUTIONS</span>
        <span className="topbar-center">
          QUALITY IN EVERY THREAD
        </span>
        <a href={`mailto:${EMAIL}`}>
          CONNECT WITH US <ArrowUpRight size={13} />
        </a>
      </div>

      {/* NAVIGATION */}
      <header className="header">
        <a href="#home" className="logo">
          <span className="logo-mark">DG</span>
          <span className="logo-text">
            DG APPARELS
            <small>FABRIC · INNOVATION · QUALITY</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our Story</a>
          <a href="#leadership" onClick={() => setMenuOpen(false)}>Leadership</a>
          <a href="#infrastructure" onClick={() => setMenuOpen(false)}>Our Facility</a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          <button
            className="nav-button"
            onClick={() => openForm("Request a Quote")}
          >
            Get a Quote <ArrowUpRight size={16} />
          </button>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-kicker">
            <span />
            THE ART OF PREMIUM TEXTILES
          </div>

          <h1>
            Woven with
            <br />
            <em>purpose.</em>
            Made for
            <br />
            <em>possibility.</em>
          </h1>

          <p>
            Discover the perfect balance of texture, quality
            and innovation. Fabric solutions designed to bring
            your creative vision to life.
          </p>

          <div className="hero-buttons">
            <a href="#collection" className="btn-primary">
              EXPLORE COLLECTION <ArrowUpRight size={17} />
            </a>

            <button
              className="btn-glass"
              onClick={() => openForm("Request a Fabric Sample")}
            >
              REQUEST A SAMPLE
            </button>
          </div>

          <div className="hero-bottom">
            <span>01 — TEXTILE EXCELLENCE</span>
            <span>DESIGNED FOR THE NEXT GENERATION</span>
          </div>
        </div>

        <div className="hero-side-text">DG APPARELS · INDIA</div>

        <div className="hero-scroll">
          <span />
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="intro-strip">
        <div>TEXTURE</div>
        <span>✳</span>
        <div>INNOVATION</div>
        <span>✳</span>
        <div>QUALITY</div>
        <span>✳</span>
        <div>CRAFTSMANSHIP</div>
      </section>
      {/* ABOUT */}
      <section className="about-section section-space" id="about">
        <div className="section-topline">
          <span>01 / THE BRAND</span>
          <span>OUR PHILOSOPHY</span>
        </div>

        <div className="about-layout">
          <div className="about-heading">
            <span className="eyebrow-dark">MORE THAN JUST FABRIC</span>

            <h2>
              Every thread
              <br />
              tells a <em>story.</em>
            </h2>
          </div>

          <div className="about-description">
            <p>
              At DG APPARELS, we see fabric as the foundation
              of every great creation. Our approach brings
              together material exploration, thoughtful
              selection and a passion for textile excellence.
            </p>

            <p>
              From everyday essentials to statement-making
              collections, we help businesses find materials
              that make their ideas tangible.
            </p>

            <a href="#contact" className="underlined-link">
              LET'S BUILD SOMETHING TOGETHER
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="about-image-grid">
          <div className="about-image large-image">
            <img src={office} alt="DG Apparels Office" loading="lazy" />
            <span>01 — OUR WORKSPACE</span>
          </div>

          <div className="about-image small-image">
            <img src={office1} alt="DG Apparels Facility" loading="lazy" />
            <span>02 — OUR FACILITY</span>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="leadership-section section-space" id="leadership">
        <div className="section-topline">
          <span>02 / OUR LEADERSHIP</span>
          <span>THE PEOPLE BEHIND DG</span>
        </div>

        <div className="leadership-heading">
          <span className="eyebrow-dark">MEET OUR TEAM</span>

          <h2>
            People behind
            <br />
            <em>our vision.</em>
          </h2>

          <p>
            Strong leadership, dedicated management and a shared
            commitment to quality.
          </p>
        </div>

        <div className="leadership-grid">
          <div className="leader-card">
            <div className="leader-image">
              <img src={owner} alt="DG Apparels Owner" loading="lazy" />
            </div>

            <div className="leader-details">
              <span>01 — FOUNDER</span>
              <h3>Our Owner</h3>
              <p>Owner / Founder</p>
            </div>
          </div>

          <div className="leader-card">
            <div className="leader-image">
              <img src={manager} alt="DG Apparels Manager" loading="lazy" />
            </div>

            <div className="leader-details">
              <span>02 — MANAGEMENT</span>
              <h3>Our Manager</h3>
              <p>Manager</p>
            </div>
          </div>
        </div>
      </section>

   
{/* INFRASTRUCTURE */}
<section
  className="infrastructure-section section-space"
  id="infrastructure"
>
  <div className="section-topline">
    <span>03 / OUR INFRASTRUCTURE</span>
    <span>INSIDE DG APPARELS</span>
  </div>

  <div className="infrastructure-heading">
    <span className="eyebrow-dark">OUR WORKSPACE</span>

    <h2>
      Where ideas meet
      <br />
      <em>craftsmanship.</em>
    </h2>

    <p>
      A glimpse into our workplace, facilities and the
      environment where quality takes shape.
    </p>
  </div>

  <div className="infrastructure-grid">

    <div className="infrastructure-card">
      <img
        src={office2}
        alt="DG Apparels Workplace"
        loading="lazy"
      />
      <div className="infra-overlay">
        <span>01 — OUR WORKSPACE</span>
      </div>
    </div>

    <div className="infrastructure-card">
      <img
        src={office3}
        alt="DG Apparels Infrastructure"
        loading="lazy"
      />
      <div className="infra-overlay">
        <span>02 — OUR INFRASTRUCTURE</span>
      </div>
    </div>

    <div className="infrastructure-card infra-wide">
      <img
        src={office4}
        alt="DG Apparels Factory"
        loading="lazy"
      />
      <div className="infra-overlay">
        <span>03 — OUR OPERATIONS</span>
      </div>
    </div>

  </div>
</section>

      {/* COLLECTION */}
      <section className="collection-section section-space" id="collection">
        <div className="section-topline light-topline">
          <span>04 / THE COLLECTION</span>
          <span>EXPLORE OUR MATERIALS</span>
        </div>

        <div className="collection-heading">
          <div>
            <span className="eyebrow-light">FIND YOUR PERFECT MATERIAL</span>
            <h2>
              The fabric
              <br />
              <em>edit.</em>
            </h2>
          </div>

          <p>
            A carefully curated selection of textile constructions
            for modern apparel and evolving design needs.
          </p>
        </div>

        <div className="collection-controls">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "category-tab selected"
                    : "category-tab"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="fabric-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Find your fabric..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        <div className="product-grid">
          {filteredFabrics.map((fabric, index) => (
            <article className="product-card" key={fabric.id}>
              <div className="product-image-wrap">
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900";
                  }}
                />

                <span className="product-label">{fabric.label}</span>

                <button
                  className="product-quick"
                  onClick={() => setActiveFabric(fabric)}
                  aria-label={`View ${fabric.name}`}
                >
                  <ArrowUpRight />
                </button>

                <span className="product-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="product-info">
                <div className="product-code">{fabric.code}</div>
                <h3>{fabric.name}</h3>
                <p>{fabric.description}</p>

                <div className="product-specs">
                  <span>{fabric.gsm}</span>
                  <span>{fabric.category}</span>
                </div>

                <button
                  className="product-enquire"
                  onClick={() => openForm("Fabric Enquiry", fabric.name)}
                >
                  ENQUIRE ABOUT THIS FABRIC
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredFabrics.length === 0 && (
          <div className="no-products">
            <Search size={28} />
            <h3>No matching fabrics found</h3>
            <p>Try another keyword or category.</p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All Fabrics");
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

        <div className="collection-footer">
          <span>CRAFTED FOR CREATORS. SELECTED FOR QUALITY.</span>

          <button onClick={() => openForm("Complete Collection Enquiry")}>
            EXPLORE WITH OUR TEAM <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
      {/* EXPERTISE */}
      <section className="expertise-section section-space" id="expertise">
        <div className="section-topline">
          <span>05 / WHAT WE DO</span>
          <span>OUR EXPERTISE</span>
        </div>

        <div className="expertise-heading">
          <span className="eyebrow-dark">QUALITY IS IN THE DETAILS</span>

          <h2>
            Thoughtful materials.
            <br />
            <em>Meaningful results.</em>
          </h2>
        </div>

        <div className="expertise-grid">
          <div className="expertise-card">
            <span className="expertise-index">01</span>
            <Layers3 size={29} />
            <h3>Material Selection</h3>
            <p>
              Explore textile constructions, textures and
              compositions suited to your product vision.
            </p>
            <ArrowUpRight />
          </div>

          <div className="expertise-card">
            <span className="expertise-index">02</span>
            <ShieldCheck size={29} />
            <h3>Quality Focus</h3>
            <p>
              Put fabric specifications, consistency and
              finish at the centre of every decision.
            </p>
            <ArrowUpRight />
          </div>

          <div className="expertise-card">
            <span className="expertise-index">03</span>
            <Factory size={29} />
            <h3>Textile Solutions</h3>
            <p>
              Discover material options for diverse apparel
              applications and business requirements.
            </p>
            <ArrowUpRight />
          </div>

          <div className="expertise-card">
            <span className="expertise-index">04</span>
            <Truck size={29} />
            <h3>Order Support</h3>
            <p>
              Get clear communication throughout your
              sampling and enquiry journey.
            </p>
            <ArrowUpRight />
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section className="final-cta">
        <div className="cta-decoration">DG</div>

        <span className="eyebrow-light">
          YOUR VISION. OUR MATERIALS.
        </span>

        <h2>
          Let's create
          <br />
          something <em>exceptional.</em>
        </h2>

        <p>
          Tell us about your next collection and discover
          materials that bring your ideas to life.
        </p>

        <button
          className="cta-white-button"
          onClick={() => openForm("Project Enquiry")}
        >
          START A CONVERSATION
          <ArrowUpRight size={18} />
        </button>
      </section>

      {/* CONTACT */}
      <section className="contact-section section-space" id="contact">
        <div className="section-topline">
          <span>06 / GET IN TOUCH</span>
          <span>WE'D LOVE TO HEAR FROM YOU</span>
        </div>

        <div className="contact-layout">
          <div className="contact-left">
            <span className="eyebrow-dark">LET'S CONNECT</span>

            <h2>
              Good ideas
              <br />
              start with
              <br />
              <em>a hello.</em>
            </h2>

            <p>
              Looking for a fabric partner? Need samples?
              Have a new project? We're ready to listen.
            </p>

            <a href={`mailto:${EMAIL}`} className="contact-email">
              <Mail size={18} />
              {EMAIL}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="contact-right">
            <div className="contact-card-heading">
              <span>01 — SEND AN ENQUIRY</span>
              <Sparkles size={20} />
            </div>

            <h3>Tell us what you're looking for.</h3>

            <p>
              Our team can help you explore suitable fabric
              options for your requirements.
            </p>

            <button
              className="contact-action"
              onClick={() => openForm("General Enquiry")}
            >
              GENERAL ENQUIRY <ArrowUpRight />
            </button>

            <button
              className="contact-action"
              onClick={() => openForm("Sample Request")}
            >
              REQUEST A SAMPLE <ArrowUpRight />
            </button>

            <button
              className="contact-action"
              onClick={() => openForm("Bulk Order Enquiry")}
            >
              BULK ORDER ENQUIRY <ArrowUpRight />
            </button>

            <div className="contact-note">
              <CheckCircle2 size={17} />
              Your enquiry details are handled with care.
            </div>
          </div>
        </div>
      </section>
       {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a href="#home" className="logo footer-logo">
            <span className="logo-mark">DG</span>
            <span className="logo-text">
              DG APPARELS
              <small>FABRIC · INNOVATION · QUALITY</small>
            </span>
          </a>

          <p>
            Where material meets imagination.
            <br />
            Discover the difference in every detail.
          </p>

          <a href={`mailto:${EMAIL}`} className="footer-mail">
            {EMAIL}
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} DG APPARELS. ALL RIGHTS RESERVED.
          </span>

          <div>
            <a href="#home">HOME</a>
            <a href="#collection">COLLECTION</a>
            <a href="#contact">CONTACT</a>
          </div>

          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      {/* FABRIC DETAIL MODAL */}
      {activeFabric && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setActiveFabric(null);
            }
          }}
        >
          <div className="fabric-modal">
            <button
              className="modal-close"
              onClick={() => setActiveFabric(null)}
              aria-label="Close fabric details"
            >
              <X />
            </button>

            <div className="fabric-modal-image">
              <img
                src={activeFabric.image}
                alt={activeFabric.name}
              />
            </div>

            <div className="fabric-modal-content">
              <span className="eyebrow-dark">
                {activeFabric.code}
              </span>

              <h2>{activeFabric.name}</h2>
              <p>{activeFabric.description}</p>

              <div className="modal-specs">
                <div>
                  <small>FABRIC TYPE</small>
                  <strong>{activeFabric.type}</strong>
                </div>

                <div>
                  <small>GSM</small>
                  <strong>{activeFabric.gsm}</strong>
                </div>

                <div>
                  <small>CATEGORY</small>
                  <strong>{activeFabric.category}</strong>
                </div>
              </div>

              <button
                className="nav-button modal-enquire"
                onClick={() =>
                  openForm("Fabric Enquiry", activeFabric.name)
                }
              >
                ENQUIRE ABOUT THIS FABRIC
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENQUIRY FORM MODAL */}
      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeForm();
          }}
        >
          <div className="enquiry-modal">
            <button
              className="modal-close"
              onClick={closeForm}
              aria-label="Close enquiry"
            >
              <X />
            </button>

            <div className="form-heading">
              <span className="eyebrow-dark">
                DG APPARELS / CONNECT
              </span>

              <h2>
                Let's talk
                <br />
                <em>possibilities.</em>
              </h2>

              <p>
                Complete the details below and tell us about
                your fabric requirements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="enquiry-form">
              <input
                type="hidden"
                name="enquiry_type"
                value={formType}
              />

              <div className="form-field">
                <label>FULL NAME *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-two-columns">
                <div className="form-field">
                  <label>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="dgapparels092@gmail.com"
                  />
                </div>

                <div className="form-field">
                  <label>PHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    minLength="7"
                    placeholder="+917696799906"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>COMPANY NAME</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your business name"
                />
              </div>

              <div className="form-field">
                <label>FABRIC INTEREST</label>
                <select
                  name="fabric"
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                >
                  <option value="">Select a fabric</option>

                  {fabrics.map((fabric) => (
                    <option key={fabric.id} value={fabric.name}>
                      {fabric.name}
                    </option>
                  ))}

                  <option value="Other">Other / Not sure</option>
                </select>
              </div>

              <div className="form-two-columns">
                <div className="form-field">
                  <label>REQUIRED QUANTITY</label>
                  <input
                    name="quantity"
                    placeholder="e.g. 500 kg"
                  />
                </div>

                <div className="form-field">
                  <label>TARGET GSM</label>
                  <input
                    name="gsm"
                    placeholder="e.g. 240 GSM"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>YOUR MESSAGE *</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Tell us about your project or requirements..."
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={submitting}
              >
                {submitting ? "SENDING..." : "SEND MY ENQUIRY"}
                {!submitting && <Send size={17} />}
              </button>

              <span className="form-privacy">
                By submitting, you agree to be contacted regarding your enquiry.
              </span>
            </form>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {alert && (
        <div className={`notification ${alert.type}`}>
          {alert.type === "success" ? (
            <CheckCircle2 size={21} />
          ) : (
            <X size={21} />
          )}

          <span>{alert.message}</span>

          <button
            onClick={() => setAlert(null)}
            aria-label="Dismiss notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* WHATSAPP */}
      <button
        className="whatsapp-float"
        onClick={handleWhatsApp}
        aria-label="Contact on WhatsApp"
      >
        <Phone size={22} />
      </button>

    </div>
  );
}