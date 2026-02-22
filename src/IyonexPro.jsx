import { useState, useEffect, useRef } from "react";

/* ─── BRAND ──────────────────────────────────────────────────────────────────── */
const PHONE = "8111080117";
const EMAIL = "iyonstan29@gmail.com";
const ADDRESS = "5 Srinivasa Counder St, Sellaperumal Pet, Lawspet, Puducherry 605008";
const WA = "https://wa.me/918111080117";

/* ─── PREMIUM COLOR SYSTEM ───────────────────────────────────────────────────── */
/* Palette: Royal Navy · Deep Emerald · Burgundy Plum · Warm Slate · Champagne Gold */
const C = {
  /* Section Backgrounds — Rich & Varied */
  heroNav:    "#0B1628",      /* Hero: deep royal navy */
  navy:       "#0F1E35",      /* Differentiators: midnight navy */
  emeraldBg:  "#0A1F1A",      /* Services: deep forest emerald */
  burgundy:   "#1A0F1E",      /* Testimonials: rich plum/burgundy */
  royalBlue:  "#0D1830",      /* CTA/About hero */
  warmSlate:  "#141820",      /* Products/Pricing */
  tealBg:     "#0A1C1A",      /* Industry section */
  onyxBg:     "#0D0D0F",      /* Contact/Blog hero */

  /* Warm Card Surfaces */
  cardNavy:   "#132040",      /* card on navy */
  cardEmerald:"#0F2820",      /* card on emerald */
  cardBurg:   "#221228",      /* card on burgundy */
  cardSlate:  "#1A1F2E",      /* card on slate */
  cardWarm:   "#1F1A2A",      /* elevated card */

  /* Light Sections */
  pearl:      "#F4F6F9",
  pearlBlue:  "#EEF4FF",
  white:      "#FFFFFF",
  lightCard:  "#FFFFFF",

  /* Champagne Gold Accents */
  gold:       "#C9A84C",
  goldLight:  "#E8C97A",
  goldDim:    "#7A6230",
  goldGlow:   "rgba(201,168,76,0.14)",

  /* Teal Accents */
  teal:       "#00C8B4",
  tealLight:  "#34E0CE",
  tealGlow:   "rgba(0,200,180,0.1)",

  /* Text */
  platinum:   "#E8ECF0",
  silver:     "#8B97A8",
  muted:      "#4A5568",
  darkText:   "#1A202C",
  midText:    "#4A5568",

  /* Borders */
  border:     "rgba(255,255,255,0.07)",
  borderGold: "rgba(201,168,76,0.25)",
  borderTeal: "rgba(0,200,180,0.2)",

  /* Accents */
  emerald:    "#00B67A",
  ruby:       "#E5342A",
};

/* ─── DATA ───────────────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon:"01", title:"Home Automation", sub:"Intelligent Residential Systems",
    desc:"Complete smart home ecosystems engineered to your floor plan. Centralised control of lighting, HVAC, security, and appliances through a single unified platform.",
    points:["Adaptive lighting & climate control","Voice-activated scene management","Remote access from any device","Energy consumption analytics","Integration with existing infrastructure","5-year service contract included"] },
  { icon:"02", title:"Industrial Automation", sub:"Factory & Process Automation",
    desc:"Enterprise-grade PLC, SCADA, and IoT solutions that optimise throughput, reduce downtime, and deliver measurable ROI across manufacturing and processing facilities.",
    points:["Siemens, Allen-Bradley & Delta PLC","SCADA & HMI commissioning","Predictive maintenance systems","OEE performance tracking","Safety interlock engineering","ERP/SAP integration capability"] },
  { icon:"03", title:"Electrical Engineering", sub:"Licensed Electrical Services",
    desc:"Comprehensive electrical solutions for residential, commercial and industrial projects — from initial load calculations and panel design to full installation and IE Act certification.",
    points:["Full wiring & panel design","MCB/RCCB distribution systems","Earthing & lightning protection","Power factor correction","UPS & generator changeover","Compliance certification"] },
  { icon:"04", title:"Product Development", sub:"Custom Hardware & Firmware",
    desc:"End-to-end development of bespoke automation hardware — from concept and PCB design through prototyping, firmware, and batch production at our in-house R&D facility.",
    points:["PCB design & fabrication","Embedded firmware development","IoT device prototyping","3D enclosure engineering","BIS compliance support","Prototype to production"] },
  { icon:"05", title:"Smart Control Systems", sub:"Unified Management Platforms",
    desc:"Proprietary control software and mobile applications that provide real-time monitoring, automation rules, and analytics for homes, factories, and commercial buildings.",
    points:["Native iOS & Android apps","Web-based admin dashboard","Role-based access control","Real-time push notifications","Offline operation capability","Monthly analytics reports"] },
  { icon:"06", title:"Security Solutions", sub:"Integrated Security Systems",
    desc:"Layered security ecosystems combining AI-powered surveillance, access control, and intrusion detection — engineered to protect residential and commercial assets around the clock.",
    points:["Full HD & 4K IP camera networks","AI-based person & vehicle detection","Biometric access control","Video doorbell systems","NVR & cloud storage","Instant mobile alerts"] },
  { icon:"07", title:"Solar & Energy", sub:"Renewable Energy Integration",
    desc:"Combining solar installations with intelligent energy management systems to maximise renewable utilisation, reduce grid dependency, and provide transparent ROI reporting.",
    points:["Solar panel installation","Hybrid inverter configuration","Battery storage management","Smart load scheduling","Net metering coordination","Monthly savings reporting"] },
  { icon:"08", title:"Building Management", sub:"Commercial BMS Solutions",
    desc:"Centralised Building Management Systems for hotels, hospitals, office complexes, and retail facilities — delivering comfort, efficiency, and operational intelligence at scale.",
    points:["Multi-zone HVAC automation","Centralised BMS dashboard","Occupancy-based lighting","Access & visitor management","Energy cost monitoring","Emergency system integration"] },
];

const PRODUCTS = [
  { sku:"IYX-SS01", name:"Smart Switch Module", cat:"Residential", price:"From ₹1,200",
    desc:"Capacitive-touch smart switch panels engineered for Indian electrical standards. Zero neutral wiring required.",
    specs:["App + Voice + Touch control","Works with existing wiring","Alexa & Google certified","2-year manufacturer warranty"] },
  { sku:"IYX-DL02", name:"Digital Door Lock", cat:"Security", price:"From ₹6,500",
    desc:"Multi-modal access control: fingerprint, PIN, RFID, mobile app, and mechanical key backup with full audit log.",
    specs:["5-in-1 unlock methods","Auto-lock with tamper alert","Complete access history","Fits standard Indian doors"] },
  { sku:"IYX-IR03", name:"Universal IR Hub", cat:"Residential", price:"From ₹2,800",
    desc:"Centralised infrared controller compatible with all AC units, televisions, set-top boxes, and legacy IR appliances.",
    specs:["Universal device compatibility","Temperature-based AC control","Alexa & Google integrated","Wi-Fi + Bluetooth redundancy"] },
  { sku:"IYX-EM04", name:"Energy Monitor", cat:"Industrial", price:"From ₹3,500",
    desc:"Three-phase real-time energy meter with cloud dashboard. Enables up to 30% reduction in electricity expenditure.",
    specs:["3-phase monitoring","Cloud analytics dashboard","Bill forecasting engine","CSV data export"] },
  { sku:"IYX-PL05", name:"PLC Control Module", cat:"Industrial", price:"From ₹12,000",
    desc:"16 I/O industrial PLC with licensed programming software and two on-site commissioning sessions included.",
    specs:["16 digital I/O points","Ladder logic programming","Modbus RTU/TCP","Commissioning included"] },
  { sku:"IYX-CC06", name:"4MP IP Camera", cat:"Security", price:"From ₹4,200",
    desc:"4-megapixel full-colour 24/7 IP camera with AI person and vehicle detection and IP67-rated weatherproof housing.",
    specs:["4MP full-colour night vision","AI detection algorithms","Two-way audio","IP67 weatherproof rated"] },
  { sku:"IYX-CM07", name:"Curtain Drive Motor", cat:"Residential", price:"From ₹5,500",
    desc:"Whisper-quiet motorised curtain rail system with astronomical scheduling. Fully integrated with Iyonex platform.",
    specs:["Astronomical scheduling","Manual override support","5-metre track capacity","Silent belt drive"] },
  { sku:"IYX-GW08", name:"Industrial IoT Gateway", cat:"Industrial", price:"From ₹8,900",
    desc:"Enterprise-grade gateway supporting Modbus RTU/TCP, OPC-UA, MQTT. Connects legacy PLCs to any cloud platform.",
    specs:["Modbus + OPC-UA + MQTT","DIN rail mountable","4G + Ethernet + Wi-Fi","Edge computing capable"] },
  { sku:"IYX-DB09", name:"Video Doorbell", cat:"Security", price:"From ₹3,200",
    desc:"Full HD video doorbell with instant mobile notifications, two-way audio, motion zone detection.",
    specs:["HD video + infrared night","Instant mobile notification","Two-way communication","Cloud + local recording"] },
  { sku:"IYX-SP10", name:"Smart Power Plug", cat:"Residential", price:"From ₹799",
    desc:"16A smart plug with real-time energy monitoring, overload protection and programmable scheduling.",
    specs:["16A load capacity","Real-time energy data","Overload protection","Schedule & countdown timer"] },
  { sku:"IYX-SM11", name:"Solar Monitor Module", cat:"Industrial", price:"From ₹4,800",
    desc:"Retrofit monitoring module compatible with any solar inverter brand. Monthly ROI reports included.",
    specs:["Universal inverter compatibility","Real-time generation data","Grid export monitoring","Monthly ROI reporting"] },
  { sku:"IYX-MS12", name:"Motion Sensor", cat:"Security", price:"From ₹1,800",
    desc:"Dual-technology PIR and microwave sensor for false-alarm-free indoor and outdoor detection. 15-metre range.",
    specs:["15m range, 120° field","PIR + microwave dual-tech","Tamper-resistant housing","Instant app notifications"] },
];

const TESTIMONIALS = [
  { name:"Ravi Kumar", role:"Property Owner", company:"Chennai", text:"Iyonex transformed our 4BHK residence into a fully automated smart home within 48 hours. The commissioning was meticulous, the platform is intuitive, and the 5-year service commitment is genuinely reassuring.", rating:5 },
  { name:"Priya Sharma", role:"Operations Director", company:"Coimbatore Manufacturing", text:"Following Iyonex's PLC and SCADA implementation across our packaging line, production efficiency increased by 40% and annual downtime costs reduced by ₹18 lakhs. The engineering team's expertise was exceptional.", rating:5 },
  { name:"Arun Mehta", role:"Director", company:"Bangalore Villa Development", text:"The Iyonex team delivered a complete smart home solution for 12 units simultaneously — on schedule, on budget. Post-installation support has been prompt and professional without exception.", rating:5 },
  { name:"Deepa Nair", role:"Managing Director", company:"Commercial Complex, Kochi", text:"Complete electrical and automation fit-out for 8,000 sq ft of office space. Iyonex managed the entire project from design to commissioning with zero scope creep and flawless execution.", rating:5 },
  { name:"Suresh Babu", role:"Warehouse Manager", company:"Cuddalore Logistics", text:"Iyonex automated our 30,000 sq ft warehouse operations — conveyors, access control, and energy monitoring. Labour costs reduced by 65% per shift. The ROI was evident within six months.", rating:5 },
  { name:"Kavitha Reddy", role:"General Manager", company:"Pondicherry Hospitality", text:"Room automation deployed across 40 keys with full BMS integration at reception. Guest satisfaction scores improved and energy expenditure dropped 28% in the first quarter post-installation.", rating:5 },
];

const CASE_STUDIES = [
  { label:"RESIDENTIAL", title:"Smart Villa — Auroville", result:"35% energy reduction", detail:"60+ smart devices across 4BHK villa. Smart lighting, motorised shading, biometric access, 8-camera IP network, and solar energy monitoring. Project delivered in 4 days." },
  { label:"INDUSTRIAL", title:"Textile Factory — Villupuram", result:"40% productivity increase", detail:"12 looms and 3 dyeing machines automated via Siemens S7 PLC + SCADA. OEE improved from 62% to 89%. Remote monitoring enables real-time production oversight." },
  { label:"HOSPITALITY", title:"Boutique Hotel — Pondicherry", result:"28% energy cost reduction", detail:"40 guest rooms with smart lighting, AC scheduling and DND integration. Central BMS at reception. Guest experience rating improved to 4.9/5 on booking platforms." },
  { label:"LOGISTICS", title:"Warehouse — Cuddalore", result:"₹2.4L monthly savings", detail:"Conveyor automation, pallet sortation, and smart access control across 30,000 sq ft. Operational headcount reduced from 18 to 6 per shift with full audit trail." },
  { label:"ENERGY", title:"Solar Integration — Chennai", result:"60% electricity bill reduction", detail:"10kW rooftop solar integrated with smart energy management. Automated load switching eliminates export waste. Monthly bill reduced from ₹8,400 to ₹3,100." },
  { label:"UTILITIES", title:"Water Treatment — Karaikal", result:"100% remote operations", detail:"5 MLD plant fully automated with PLC-controlled chemical dosing, filter backwash cycles, and pump management. Full remote SCADA control for operators." },
];

const PRICING = [
  { plan:"Residential Starter", price:"₹15,000", gst:"+ GST", desc:"1–2 BHK apartments",
    features:["4 Smart Switch Modules","1 Digital Door Lock","1 Universal IR Hub","Mobile Application Access","Alexa & Google Integration","Professional Installation","2-Year Product Warranty","5-Year Service Contract"] },
  { plan:"Smart Home Pro", price:"₹45,000", gst:"+ GST", desc:"3–4 BHK residences", popular:true,
    features:["Unlimited Smart Switches","Locks + Video Doorbell","4 HD IP Cameras","Curtain Drive Motors","Energy Monitoring Dashboard","Voice & App Control","Solar-Ready Integration","Priority 24/7 Support","2-Year Product Warranty","5-Year Service Contract"] },
  { plan:"Villa Premium", price:"₹95,000", gst:"+ GST", desc:"Villas & independent houses",
    features:["Complete Villa Automation","8 Cameras + 4K NVR","Solar Power Monitoring","Full BMS Dashboard","Custom Scene Programming","Home Theatre Integration","Dedicated Project Engineer","Lifetime App Updates","2-Year Product Warranty","5-Year Service Contract"] },
  { plan:"Industrial Starter", price:"₹75,000", gst:"+ GST", desc:"Small factory automation",
    features:["PLC + HMI Control Panel","SCADA Monitoring System","Motor Control (4 units)","Remote Application Access","Safety Interlock Systems","Annual Maintenance Contract","2-Year Product Warranty","5-Year Service Contract"] },
  { plan:"Industrial Enterprise", price:"Custom", gst:"", desc:"Large-scale industrial",
    features:["Unlimited PLC Nodes","Full SCADA + MES Integration","Predictive Maintenance System","ERP/SAP Integration","Dedicated On-site Engineer","Monthly Performance Reports","Custom SLA Agreement","2-Year Product Warranty","5-Year Service Contract"] },
];

const FAQS = [
  { q:"What does the 5-Year Free Service contract include?", a:"From the date of installation, Iyonex provides 5 years of complimentary service — covering software updates, scheduled maintenance visits, hardware inspections, on-site troubleshooting, and warranty-covered device replacements. There are no call-out fees or hidden charges throughout the service period." },
  { q:"What is covered under the 2-Year Product Warranty?", a:"All Iyonex products carry a full 2-year manufacturer warranty covering component failures, manufacturing defects, and firmware faults. Warranty claims are processed within 48 working hours, with replacement units dispatched at no cost to the client." },
  { q:"Will smart devices work with my existing electrical wiring?", a:"Yes. Iyonex smart switch modules are specifically engineered for Indian electrical infrastructure and fit standard switchboard configurations without neutral wire rewiring. A complimentary site assessment is conducted before any project begins to confirm compatibility." },
  { q:"Does the system operate without an internet connection?", a:"All Iyonex devices support local control mode. In the absence of internet connectivity, devices continue to operate via physical interface, local Wi-Fi, and scheduled automations — ensuring complete operational continuity." },
  { q:"How long does a typical home automation installation take?", a:"A standard 2–3 BHK smart home project is typically completed within 1–2 working days. Larger villa projects require 3–5 days. Industrial timelines are project-specific and are defined in the project proposal." },
  { q:"Is the system compatible with Alexa and Google Home?", a:"Yes. All Iyonex residential smart devices carry Amazon Alexa Works With and Google Home certifications. Full voice control is available immediately upon commissioning." },
  { q:"Which regions does Iyonex serve?", a:"Iyonex is headquartered in Puducherry and serves the full Union Territory along with Villupuram, Cuddalore, Tindivanam, Chidambaram, Karaikal, Chennai, Auroville, and surrounding areas. Large industrial projects are undertaken across India." },
  { q:"Can the system be expanded after initial installation?", a:"Iyonex systems are fully modular and backward compatible. Devices, sensors, cameras, and automation rules can be added at any time without disrupting the existing infrastructure." },
];

const BLOG = [
  { cat:"HOME AUTOMATION", title:"The Business Case for Smart Home Investment in India 2025", date:"January 2025", read:"5 min", desc:"A data-driven analysis of ROI, energy savings, and property value uplift from residential automation — comparing Tier 1 and Tier 2 city deployments." },
  { cat:"INDUSTRIAL", title:"How PLC Automation Delivered ₹50L Annual Savings for a Puducherry Manufacturer", date:"February 2025", read:"7 min", desc:"A detailed case study examining the Iyonex SCADA deployment at a local textile facility — methodology, results, and lessons for regional manufacturers." },
  { cat:"ENERGY", title:"Maximising Solar ROI Through Intelligent Energy Management", date:"March 2025", read:"4 min", desc:"Technical overview of how smart load scheduling and real-time monitoring can improve solar utilisation by up to 40% compared to standard installations." },
  { cat:"INDUSTRIAL", title:"Five Indicators Your Production Facility Is Ready for Automation", date:"April 2025", read:"6 min", desc:"A diagnostic framework for factory owners evaluating automation readiness — covering labour costs, OEE benchmarks, and infrastructure prerequisites." },
  { cat:"SECURITY", title:"Layered Security Architecture: Beyond CCTV", date:"May 2025", read:"5 min", desc:"How AI-based detection, access control, and automated response protocols are redefining commercial and residential security standards." },
  { cat:"ADVISORY", title:"Seven Questions to Ask Your Automation Partner Before Signing", date:"June 2025", read:"4 min", desc:"A procurement guide for homeowners and facility managers — covering certifications, service commitments, product warranties, and post-installation support." },
];

const AREAS = ["Puducherry (HQ)","Chennai","Villupuram","Cuddalore","Tindivanam","Chidambaram","Karaikal","Auroville","Mahe","Kallakurichi","Salem","Coimbatore","Bangalore","Pan-India (Industrial)"];

const CERTIFICATIONS = [
  { code:"ISO 9001", label:"Quality Management" },
  { code:"IE Act", label:"Licensed Contractor" },
  { code:"BIS", label:"Standards Compliant" },
  { code:"CE", label:"Export Certified" },
  { code:"Alexa", label:"Works With Alexa" },
  { code:"Google", label:"Google Home Ready" },
];

const IMGS = {
  hero:       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85",
  homeAuto:   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  industrial: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85",
  solar:      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85",
  security:   "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&q=85",
  office:     "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
  factory:    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&q=85",
  team:       "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85",
  puducherry: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=85",
};

const SERVICE_IMGS = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80",
  "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=700&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
];

/* ─── HOOKS ──────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.06) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView();
  const transforms = { up:"translateY(40px)", down:"translateY(-40px)", left:"translateX(-40px)", right:"translateX(40px)" };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : (transforms[direction] || "translateY(40px)"), transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── 3D CARD ────────────────────────────────────────────────────────────────── */
function Card3D({ children, style = {}, intensity = 16 }) {
  const ref = useRef(null);
  const handle = (e) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -intensity;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateZ(10px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)"; };
  return (
    <div ref={ref} onMouseMove={handle} onMouseLeave={reset}
      style={{ transition: "transform 0.18s ease-out", transformStyle: "preserve-3d", willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

/* ─── PREMIUM SHARED COMPONENTS ──────────────────────────────────────────────── */

/* Gold rule + uppercase label */
function Eyebrow({ children, light }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "3px", textTransform: "uppercase", color: C.gold }}>{children}</span>
      <div style={{ width: 32, height: 1, background: `linear-gradient(270deg, ${C.gold}, transparent)` }} />
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle, light, center }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 680 : "none", margin: center ? "0 auto 72px" : "0 0 60px" }}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.2vw, 3rem)", color: light ? C.platinum : C.darkText, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: subtitle ? 18 : 0 }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: light ? C.silver : "#64748B", lineHeight: 1.8, maxWidth: 580, margin: center ? "0 auto" : 0 }}>{subtitle}</p>}
    </div>
  );
}

/* Gold CTA button */
function GoldBtn({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick}
      style={{ background: h ? `linear-gradient(135deg, ${C.goldLight}, ${C.gold})` : `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, color: C.heroNav, border: "none", padding: "15px 36px", borderRadius: 2, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", boxShadow: h ? `0 12px 40px rgba(201,168,76,0.4)` : `0 4px 16px rgba(201,168,76,0.2)` }}>
      {children}
    </button>
  );
}

/* Ghost outline button */
function GhostBtn({ children, onClick, gold }) {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick}
      style={{ background: h ? "rgba(255,255,255,0.06)" : "transparent", color: gold ? C.gold : C.platinum, border: `1px solid ${gold ? C.borderGold : "rgba(255,255,255,0.2)"}`, padding: "14px 34px", borderRadius: 2, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.88rem", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>
      {children}
    </button>
  );
}

/* Teal check item */
function CheckItem({ text, light }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, flexShrink: 0, marginTop: 7 }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: light ? "rgba(232,236,240,0.75)" : "#64748B", lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

/* ─── DECORATIVE ELEMENTS ────────────────────────────────────────────────────── */
/* Horizontal golden divider line */
const GoldLine = ({ width = 60, center }) => (
  <div style={{ display: "flex", justifyContent: center ? "center" : "flex-start", marginBottom: 20 }}>
    <div style={{ width, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
  </div>
);

/* Corner accent marks — luxury touch */
const CornerMark = ({ top, right, bottom, left, color = C.gold, size = 16 }) => (
  <div style={{ position: "absolute", top, right, bottom, left, width: size, height: size,
    borderTop: top !== undefined ? `1.5px solid ${color}` : "none",
    borderBottom: bottom !== undefined ? `1.5px solid ${color}` : "none",
    borderLeft: left !== undefined ? `1.5px solid ${color}` : "none",
    borderRight: right !== undefined ? `1.5px solid ${color}` : "none" }} />
);

/* ─── NAVBAR ─────────────────────────────────────────────────────────────────── */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  const pages = ["Home", "About", "Services", "Products", "Pricing", "Blog", "Contact"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 76,
        background: scrolled ? "rgba(11,22,40,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
        padding: "0 56px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        {/* Logo */}
        <div onClick={() => setPage("Home")} style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <div style={{ position: "relative", width: 40, height: 40, borderRadius: 4, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={C.heroNav} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.35rem", color: C.platinum, letterSpacing: "3px", lineHeight: 1 }}>IYONEX</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", color: C.gold, letterSpacing: "3.5px", textTransform: "uppercase", marginTop: 2 }}>Smart Automation</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 0 }}>
          {pages.map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              background: "none", border: "none", padding: "8px 16px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: page === p ? 600 : 400,
              fontSize: "0.82rem", letterSpacing: "0.8px", textTransform: "uppercase",
              color: page === p ? C.gold : "rgba(232,236,240,0.6)",
              cursor: "pointer", transition: "color 0.2s",
              borderBottom: page === p ? `1px solid ${C.gold}` : "1px solid transparent"
            }}>
              {p}
            </button>
          ))}
        </div>

        <GoldBtn onClick={() => setPage("Contact")}>Consult Now</GoldBtn>
      </nav>

      {/* WhatsApp float */}
      <a href={WA} target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 32, right: 32, zIndex: 300, width: 52, height: 52, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,0.45)", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.6)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.45)"; }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.54 5.877L.057 23.943l6.204-1.626A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.5-5.228-1.375l-.374-.222-3.683.965.982-3.593-.244-.389A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  const pages = ["Home", "About", "Services", "Products", "Pricing", "Blog", "Contact"];
  return (
    <footer style={{ background: C.heroNav, borderTop: `1px solid ${C.border}` }}>
      {/* Golden top accent */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
      <div style={{ padding: "80px 64px 48px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1.4fr 1.8fr", gap: 56, marginBottom: 64 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 4, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={C.heroNav} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem", color: C.platinum, letterSpacing: "3px" }}>IYONEX</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", color: C.gold, letterSpacing: "3.5px", textTransform: "uppercase", marginTop: 2 }}>Smart Automation</div>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: C.silver, lineHeight: 1.85, maxWidth: 310, marginBottom: 28 }}>Pioneering intelligent automation across residential, industrial, and commercial sectors — headquartered in Puducherry, serving South India and beyond.</p>
            <div style={{ display: "flex", gap: 12 }}>
              {[["5 Yrs", "Free Service", C.emerald], ["2 Yrs", "Warranty", C.teal]].map(([n, l, col]) => (
                <div key={l} style={{ border: `1px solid ${col}30`, borderRadius: 4, padding: "12px 18px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: col }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: C.silver, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.68rem", color: C.gold, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 24 }}>Navigate</div>
            {pages.map(p => (
              <div key={p} onClick={() => setPage(p)}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: C.silver, marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.platinum}
                onMouseLeave={e => e.target.style.color = C.silver}>{p}</div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.68rem", color: C.gold, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 24 }}>Services</div>
            {["Home Automation","Industrial Automation","Electrical Engineering","Product Development","Security Solutions","Solar & Energy","Building Management"].map(s => (
              <div key={s} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: C.silver, marginBottom: 10 }}>{s}</div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.68rem", color: C.gold, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 24 }}>Contact</div>
            {[[PHONE, `tel:+91${PHONE}`, "Phone"], [EMAIL, `mailto:${EMAIL}`, "Email"]].map(([val, href, label]) => (
              <div key={label} style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.silver, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                <a href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.teal, textDecoration: "none" }}>{val}</a>
              </div>
            ))}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.silver, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4 }}>Address</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: C.silver, lineHeight: 1.7 }}>{ADDRESS}</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <a href={WA} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", padding: "9px 16px", borderRadius: 2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.5px" }}>WhatsApp</a>
              <a href={`tel:+91${PHONE}`} style={{ background: C.teal, color: C.heroNav, padding: "9px 16px", borderRadius: 2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.5px" }}>Call Now</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.muted }}>© 2025 Iyonex Automation. All rights reserved.</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.muted }}>Crafted with precision in Puducherry, India</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────────── */
function FaqItem({ faq, i }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.04}>
      <div style={{ borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", padding: "22px 0", background: "none", border: "none", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: C.platinum, fontSize: "0.95rem", textAlign: "left", lineHeight: 1.6 }}>{faq.q}</span>
          <div style={{ width: 28, height: 28, border: `1px solid ${open ? C.gold : C.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.3s" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "none" }}>
              <path d="M6 9l6 6 6-6" stroke={open ? C.gold : C.silver} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
        {open && <div style={{ padding: "0 0 24px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.silver, lineHeight: 1.85, maxWidth: "90%" }}>{faq.a}</div>}
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function HomePage({ setPage }) {
  const [ti, setTi] = useState(0);
  useEffect(() => { const t = setInterval(() => setTi(p => (p + 1) % TESTIMONIALS.length), 5500); return () => clearInterval(t); }, []);

  return (
    <div>
      {/* ── HERO: FULL VIEWPORT ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center",
        background: `linear-gradient(150deg, rgba(11,22,40,0.95) 0%, rgba(15,30,53,0.88) 60%, rgba(0,200,180,0.08) 100%), url(${IMGS.hero}) center/cover no-repeat`,
      }}>
        {/* Fine grid overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", pointerEvents: "none", opacity: 0.4 }} />
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "15%", right: "5%", width: 700, height: 700, background: `radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "0%", width: 500, height: 500, background: `radial-gradient(circle, rgba(0,200,180,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "130px 64px 100px", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div>
            <Reveal>
              <Eyebrow>Puducherry's Premier Automation Company</Eyebrow>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(3rem, 5.5vw, 5rem)", color: C.platinum, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 28 }}>
                Engineering<br />
                <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}>Intelligent</span><br />
                Automation
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: C.silver, lineHeight: 1.9, maxWidth: 520, marginBottom: 44 }}>
                Iyonex delivers enterprise-grade home and industrial automation, electrical engineering, and custom product development — backed by our industry-leading <strong style={{ color: C.platinum }}>5-Year Service Contract</strong> and <strong style={{ color: C.platinum }}>2-Year Product Warranty</strong>.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
                <GoldBtn onClick={() => setPage("Services")}>Explore Services</GoldBtn>
                <GhostBtn onClick={() => setPage("Contact")}>Request Consultation</GhostBtn>
              </div>
              {/* Stats */}
              <div style={{ display: "flex", gap: 0, paddingTop: 36, borderTop: `1px solid ${C.border}` }}>
                {[["500+", "Projects Delivered"], ["14+", "Cities Served"], ["99%", "Client Retention"], ["6+", "Years Expertise"]].map(([n, l], i) => (
                  <div key={l} style={{ flex: 1, paddingRight: 24, borderRight: i < 3 ? `1px solid ${C.border}` : "none", marginRight: i < 3 ? 24 : 0 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.1rem", backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.silver, letterSpacing: "0.5px", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — Dashboard */}
          <Reveal direction="left" delay={0.25}>
            <Card3D intensity={12}>
              <div style={{ background: "rgba(13,17,24,0.8)", border: `1px solid ${C.border}`, borderRadius: 12, padding: 28, backdropFilter: "blur(20px)", position: "relative", overflow: "hidden" }}>
                {/* Corner marks */}
                <CornerMark top={12} left={12} />
                <CornerMark top={12} right={12} />
                <CornerMark bottom={12} left={12} />
                <CornerMark bottom={12} right={12} />
                {/* Gold top glow */}
                <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, paddingBottom: 18, borderBottom: `1px solid ${C.border}` }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.silver, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 4 }}>Iyonex Control Centre</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1rem", color: C.platinum }}>Smart Home Dashboard</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 7, height: 7, background: C.emerald, borderRadius: "50%", boxShadow: `0 0 10px ${C.emerald}` }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: C.emerald }}>Live</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {[["Lighting", "12 Zones Active", C.gold], ["Climate", "23°C — Auto", C.teal], ["Security", "Armed", C.emerald], ["Energy", "18.4 kWh Today", C.goldLight]].map(([k, v, col]) => (
                    <div key={k} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "14px 16px", border: `1px solid ${C.border}` }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.silver, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>{k}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.88rem", color: col }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: C.tealGlow, border: C.borderTeal, borderRadius: 8, padding: "11px 14px", marginBottom: 14 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.teal }}>✦ All 24 devices operating nominally</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: "rgba(0,182,122,0.08)", border: "1px solid rgba(0,182,122,0.2)", borderRadius: 8, padding: "14px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: C.emerald }}>5 Years</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: C.silver, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 3 }}>Free Service</div>
                  </div>
                  <div style={{ background: C.goldGlow, border: C.borderGold, borderRadius: 8, padding: "14px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: C.gold }}>2 Years</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: C.silver, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 3 }}>Warranty</div>
                  </div>
                </div>
              </div>
            </Card3D>
          </Reveal>
        </div>
      </section>

      {/* ── GOLD MARQUEE STRIP ─────────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldDim})`, padding: "18px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {[["5-Year Free Service","All projects covered, zero fees"], ["2-Year Warranty","Full product coverage"], ["IE Act Licensed","Certified engineers only"], ["Free Site Survey","No-obligation assessment"]].map(([t, d]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 4, height: 4, background: C.heroNav, borderRadius: "50%", opacity: 0.6 }} />
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: C.heroNav, letterSpacing: "0.5px" }}>{t}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(8,11,15,0.65)" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY IYONEX ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 64px", background: `linear-gradient(135deg, ${C.navy} 0%, #12284A 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "40%", right: "-5%", width: 600, height: 600, background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Why Iyonex" title="The Standard for Automation Excellence" subtitle="We engineer intelligent systems that perform flawlessly for years — and stand behind every installation with service commitments our competitors cannot match." center light /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              ["01","Certified Engineers","IE Act licensed electricians and certified PLC specialists on every project — no subcontracting, ever."],
              ["02","5-Year Service","Industry-leading 5-year free service contract. No call-out fees, no labour charges."],
              ["03","2-Year Warranty","Full manufacturer warranty on all hardware. Claims resolved within 48 hours."],
              ["04","End-to-End","Design, procurement, installation, commissioning, training — one accountable partner."],
              ["05","Global Technology","Systems built on Siemens, Allen-Bradley, and Iyonex-certified IoT hardware."],
              ["06","Transparent Pricing","Itemised quotations. Fixed-price residential contracts. Custom SLAs for industry."],
            ].map(([num, title, desc]) => (
              <Reveal key={num} delay={parseInt(num) * 0.06}>
                <Card3D intensity={12}>
                  <div style={{ background: C.cardNavy, borderRadius: 8, padding: "36px 28px", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", transition: "border-color 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.borderGold}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}40, transparent)` }} />
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.8rem", color: "rgba(201,168,76,0.1)", lineHeight: 1, marginBottom: 20, letterSpacing: "-0.02em" }}>{num}</div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: C.platinum, marginBottom: 12, letterSpacing: "0.3px" }}>{title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: C.silver, lineHeight: 1.8 }}>{desc}</p>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ──────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 64px", background: `linear-gradient(150deg, ${C.emeraldBg} 0%, #0E2820 50%, #0A1C18 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "20%", left: "0%", width: 500, height: 500, background: `radial-gradient(circle, rgba(0,200,180,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Solutions" title="Comprehensive Automation Services" subtitle="From a single smart switch to a fully automated industrial facility — Iyonex has the expertise and infrastructure to deliver." light center /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
            {SERVICES.slice(0, 6).map((s, i) => (
              <Reveal key={s.icon} delay={i * 0.07}>
                <div style={{ padding: "40px 32px", background: C.cardNavy, borderRight: (i % 3 !== 2) ? `1px solid ${C.border}` : "none", borderBottom: i < 3 ? `1px solid ${C.border}` : "none", transition: "background 0.35s, border-color 0.35s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.cardSlate}
                  onMouseLeave={e => e.currentTarget.style.background = C.cardNavy}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.5rem", color: `${C.gold}18`, lineHeight: 1, marginBottom: 20 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.teal, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>{s.sub}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.15rem", color: C.platinum, marginBottom: 14 }}>{s.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: C.silver, lineHeight: 1.8 }}>{s.desc.substring(0, 110)}…</p>
                  <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 20, height: 1, background: C.gold }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: C.gold, letterSpacing: "1.5px", textTransform: "uppercase" }}>Learn more</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <GhostBtn gold onClick={() => setPage("Services")}>View All Services</GhostBtn>
          </div>
        </div>
      </section>

      {/* ── IMAGE SHOWCASE ─────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 64px", background: "linear-gradient(135deg, #0F1E35 0%, #12284A 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Our Work" title="Real Projects, Transformative Results" subtitle="From luxury smart villas to high-throughput industrial facilities — our portfolio speaks for itself." light center /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr", gridTemplateRows: "300px 300px", gap: 16 }}>
            <Card3D style={{ gridRow: "1 / 3" }} intensity={8}>
              <div style={{ height: "100%", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                <img src={IMGS.homeAuto} alt="Smart home" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,15,0.92) 0%, transparent 55%)" }} />
                {/* Gold corner accent */}
                <CornerMark top={16} left={16} color={C.gold} size={20} />
                <CornerMark bottom={16} right={16} color={C.gold} size={20} />
                <div style={{ position: "absolute", bottom: 28, left: 28 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: C.gold, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 8 }}>Residential</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: C.platinum, lineHeight: 1.2 }}>Smart Home<br />Automation</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.silver, marginTop: 8 }}>Complete smart living ecosystems</div>
                </div>
              </div>
            </Card3D>
            {[[IMGS.industrial, "Industrial", "Factory Automation", C.teal],
              [IMGS.solar, "Solar", "Energy Management", C.gold],
              [IMGS.security, "Security", "Surveillance Systems", C.emerald],
              [IMGS.office, "Commercial", "Building Management", C.teal]].map(([src, cat, title, col]) => (
              <Card3D key={title} intensity={14}>
                <div style={{ height: "100%", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                  <img src={src} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,15,0.88) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", color: col, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 5 }}>{cat}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1rem", color: C.platinum }}>{title}</div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ───────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 64px", background: C.pearl }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Project Portfolio" title="Measurable Results, Every Engagement" subtitle="A selection of transformative automation projects delivered across residential, industrial, and commercial sectors." center /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 0.07}>
                <Card3D intensity={10}>
                  <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #E2E8F0", transition: "box-shadow 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(8,11,15,0.12)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                    <div style={{ background: C.cardNavy, padding: "28px 28px 24px", position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: C.teal, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>{cs.label}</div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.1rem", color: C.platinum, marginBottom: 10 }}>{cs.title}</h3>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{cs.result}</div>
                    </div>
                    <div style={{ padding: "22px 28px", background: C.white }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "#64748B", lineHeight: 1.8 }}>{cs.detail}</p>
                    </div>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 64px", background: `linear-gradient(135deg, #1A0F28 0%, #1F1030 50%, #160E22 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 400, background: `radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Client Perspectives" title="Trusted by Industry Leaders" light center /></Reveal>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <Card3D intensity={6}>
              <div style={{ background: C.cardBurg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "56px 60px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}60, transparent)` }} />
                {/* Giant decorative quote */}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "8rem", color: `${C.gold}10`, lineHeight: 0.8, marginBottom: 8, userSelect: "none" }}>"</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 24, marginTop: -16 }}>
                  {Array(TESTIMONIALS[ti].rating).fill(0).map((_, k) => (
                    <svg key={k} width="16" height="16" viewBox="0 0 24 24" fill={C.gold}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.12rem", color: C.platinum, lineHeight: 1.9, fontStyle: "italic", marginBottom: 36 }}>{TESTIMONIALS[ti].text}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.platinum, fontSize: "0.95rem" }}>{TESTIMONIALS[ti].name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.silver, marginTop: 3 }}>{TESTIMONIALS[ti].role} — {TESTIMONIALS[ti].company}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {TESTIMONIALS.map((_, k) => (
                      <button key={k} onClick={() => setTi(k)} style={{ width: k === ti ? 28 : 8, height: 8, borderRadius: 4, background: k === ti ? C.gold : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.35s" }} />
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 64px", background: "linear-gradient(145deg, #0A1C1A 0%, #0D2420 50%, #081814 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Industries Served" title="Expertise Across Every Sector" subtitle="From individual residences to large-scale industrial facilities — Iyonex has deep domain knowledge across a diverse range of sectors." light center /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[["Residential Homes","Smart apartments, villas & independent houses"],["Manufacturing","Factory and process automation at scale"],["Hotels & Hospitality","Guest room and BMS automation"],["Healthcare","Access control and environmental monitoring"],["Education","Smart campus and classroom solutions"],["Retail & Commercial","Lighting, HVAC and security management"],["Water Utilities","Pump and dosing automation"],["Renewable Energy","Solar and storage management systems"],["Warehousing","Conveyor, sorting and access control"],["Pharmaceuticals","Clean-room environmental monitoring"],["Food Processing","Cold storage and line automation"],["Construction","Pre-installation smart wiring planning"]].map(([title, desc]) => (
              <Reveal key={title}>
                <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 8, padding: "22px 20px", transition: "border-color 0.3s, background 0.3s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderGold; e.currentTarget.style.background = C.cardSlate; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.cardNavy; }}>
                  <div style={{ width: 24, height: 1, background: C.gold, marginBottom: 14 }} />
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: C.platinum, marginBottom: 7 }}>{title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", color: C.silver, lineHeight: 1.65 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 64px", background: `linear-gradient(135deg, ${C.royalBlue} 0%, ${C.heroNav} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.3 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}60, transparent)` }} />
        <Reveal>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <Eyebrow>Begin Your Project</Eyebrow>
            <GoldLine width={80} center />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", color: C.platinum, lineHeight: 1.15, marginBottom: 24 }}>Ready to Engineer a<br /><span style={{ backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Smarter Future?</span></h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: C.silver, marginBottom: 48, lineHeight: 1.85 }}>Contact Iyonex for a complimentary site assessment and no-obligation project proposal. We respond within 2 business hours.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <GoldBtn onClick={() => setPage("Contact")}>Schedule Consultation</GoldBtn>
              <a href={WA} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", padding: "15px 32px", borderRadius: 2, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.54 5.877L.057 23.943l6.204-1.626A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.5-5.228-1.375l-.374-.222-3.683.965.982-3.593-.244-.389A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function AboutPage({ setPage }) {
  return (
    <div style={{ paddingTop: 76 }}>
      <section style={{ minHeight: "65vh", padding: "100px 64px 80px", display: "flex", alignItems: "center", background: `linear-gradient(145deg, ${C.royalBlue} 0%, ${C.heroNav} 60%, rgba(0,200,180,0.08) 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.3 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Eyebrow>About Iyonex</Eyebrow>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.8rem, 5vw, 4.5rem)", color: C.platinum, lineHeight: 1.08, maxWidth: 780, letterSpacing: "-0.03em" }}>Born in Puducherry.<br />Built to Lead India's<br /><span style={{ backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Automation Industry.</span></h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: C.silver, lineHeight: 1.9, maxWidth: 640, marginTop: 28 }}>Iyonex was founded on a conviction that intelligent automation — the kind deployed by global corporations — should be accessible to every Indian home and factory. That conviction remains the foundation of everything we do.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "120px 64px", background: C.pearl }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
          <Reveal>
            <Eyebrow>Our Story</Eyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.4rem", color: C.darkText, lineHeight: 1.15, marginBottom: 28 }}>From a Lawspet Workshop to South India's Trusted Partner</h2>
            {["Iyonex began as a small electrical contracting business in Lawspet, Puducherry. Our founder, a qualified electrical engineer, observed that homeowners and factory operators in the region were contending with high energy expenditure, manual operational processes, and inadequate security infrastructure.","Applying engineering principles to practical IoT deployment, he developed a comprehensive smart home system and commissioned it in his own residence. The response was immediate and enthusiastic. Iyonex was formally incorporated and has grown consistently since.","Today, Iyonex operates a multidisciplinary engineering team, a dedicated R&D and product development facility, and a portfolio of over 500 delivered projects across residential, industrial, and commercial sectors."].map((p, i) => (
              <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#64748B", lineHeight: 1.9, marginBottom: 18 }}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <Card3D intensity={8}>
              <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 18, position: "relative", height: 300 }}>
                <img src={IMGS.team} alt="Iyonex team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,15,0.8) 0%, transparent 55%)" }} />
                <CornerMark top={14} left={14} color={C.gold} size={18} />
                <CornerMark bottom={14} right={14} color={C.gold} size={18} />
                <div style={{ position: "absolute", bottom: 20, left: 22 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: C.gold, letterSpacing: "3px", textTransform: "uppercase" }}>Est. 2018</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: C.platinum }}>Puducherry, South India</div>
                </div>
              </div>
            </Card3D>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["2018","Founded in Lawspet, Puducherry",C.gold],["2019","First industrial project — Villupuram",C.teal],["2021","Mobile platform launched — iOS & Android",C.emerald],["2022","Chennai expansion. 200+ clients",C.gold],["2023","R&D product division established",C.teal],["2025","500+ projects across 14 cities",C.gold]].map(([yr, desc, col]) => (
                <div key={yr} style={{ background: C.white, border: "1px solid #E2E8F0", borderRadius: 8, padding: "18px 16px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: col, fontSize: "1.25rem", marginBottom: 7 }}>{yr}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#64748B", lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "80px 64px", background: `linear-gradient(90deg, ${C.royalBlue}, ${C.heroNav}, ${C.royalBlue})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}60, transparent)` }} />
        <Reveal>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 24, textAlign: "center" }}>
            {[["500+","Projects"],["50+","Industrial Clients"],["14+","Cities"],["6+","Years"],["12","Engineers"],["5 Yrs","Free Service"],["2 Yrs","Warranty"],["24/7","Support"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.4rem", backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: C.silver, letterSpacing: "1.5px", marginTop: 6, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ padding: "120px 64px", background: "linear-gradient(140deg, #1A0F28 0%, #220F22 60%, #1A1030 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Purpose" title="Mission, Vision & Promise" light center /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[["Mission","To deliver precision-engineered automation solutions that measurably improve quality of life, operational efficiency, and safety — making intelligent technology accessible to every Indian home and industrial facility.",C.gold],["Vision","To be the most trusted automation engineering company in South India — recognised for technical excellence, service integrity, and long-term client partnerships built on genuine results.",C.teal],["Promise","Every Iyonex project carries our 5-year complimentary service contract and 2-year product warranty — not as a marketing claim, but as a reflection of our confidence in the systems we engineer.",C.emerald]].map(([title, text, col]) => (
              <Reveal key={title}>
                <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 8, padding: "40px 32px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${col}, transparent)` }} />
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: `${col}15`, border: `1px solid ${col}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: col }} />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: C.platinum, marginBottom: 14 }}>{title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.silver, lineHeight: 1.85 }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "120px 64px", background: "linear-gradient(135deg, #0D1830 0%, #111F3A 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Leadership" title="The Team Behind Iyonex" subtitle="Certified engineers, experienced designers, and dedicated support professionals." light center /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {[["Founder & Chief Executive","B.E. Electrical & Electronics","10+ years in automation, IoT and electrical engineering. Certified PLC programmer and smart home specialist.",C.gold],["Head of Industrial Automation","M.E. Control Systems","Specialist in Siemens S7, Allen-Bradley and Delta PLC platforms. 40+ industrial projects across Tamil Nadu.",C.teal],["Principal Electrical Engineer","B.E. EEE — IE Act Licensed","Licensed electrical contractor with 200+ residential and commercial projects. Smart panel design specialist.",C.gold],["IoT Product Engineer","B.Tech Electronics & Comm.","Designs Iyonex custom PCBs, embedded firmware and IoT devices. Expert in ESP32, STM32, LoRaWAN.",C.teal],["Software & App Developer","B.Tech Computer Science","Develops Iyonex platform for iOS, Android and web. Specialist in real-time IoT dashboards and MQTT.",C.emerald],["Client Success Manager","MBA Operations Management","Manages the 5-year service programme, warranty administration, and all post-installation relationships.",C.gold]].map(([role, qual, desc, col]) => (
              <Reveal key={role}>
                <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 8, padding: "28px 24px", transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.borderGold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ width: 44, height: 44, background: `${col}15`, border: `1px solid ${col}35`, borderRadius: 8, marginBottom: 18 }} />
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.93rem", color: C.platinum, marginBottom: 4 }}>{role}</h3>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: col, letterSpacing: "0.5px", marginBottom: 12, fontWeight: 600 }}>{qual}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: C.silver, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 64px", background: "linear-gradient(135deg, #0A1C1A 0%, #0E2420 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Credentials" title="Certified, Licensed & Compliant" subtitle="Every project meets or exceeds applicable Indian and international standards." light center /></Reveal>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.code} delay={i * 0.07}>
                <Card3D intensity={14}>
                  <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 8, padding: "26px 36px", textAlign: "center", minWidth: 160, transition: "border-color 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.borderGold}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: C.gold, marginBottom: 6 }}>{cert.code}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: C.silver, letterSpacing: "1.5px", textTransform: "uppercase" }}>{cert.label}</div>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SERVICES PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function ServicesPage({ setPage }) {
  return (
    <div style={{ paddingTop: 76 }}>
      <section style={{ minHeight: "55vh", display: "flex", alignItems: "center", padding: "100px 64px 80px", background: `linear-gradient(145deg, ${C.royalBlue} 0%, ${C.heroNav} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.3 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Eyebrow>Our Services</Eyebrow>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: C.platinum, marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.03em" }}>Complete Automation Engineering</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: C.silver, maxWidth: 580, lineHeight: 1.85, marginBottom: 28 }}>A single, accountable engineering partner for every automation requirement — residential, industrial, commercial, and custom product development.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ background: "rgba(0,182,122,0.1)", border: "1px solid rgba(0,182,122,0.3)", borderRadius: 3, padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.emerald, fontWeight: 600, letterSpacing: "0.5px" }}>5-Year Free Service on All Projects</div>
              <div style={{ background: C.goldGlow, border: C.borderGold, borderRadius: 3, padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.gold, fontWeight: 600, letterSpacing: "0.5px" }}>2-Year Product Warranty Standard</div>
            </div>
          </Reveal>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section key={s.icon} style={{ padding: "80px 64px", background: i % 2 === 0 ? C.navy : C.emeraldBg, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 56, alignItems: "center" }}>
            {i % 2 !== 0 && (
              <Reveal direction="right" delay={0.1}>
                <Card3D intensity={10}>
                  <div style={{ borderRadius: 10, overflow: "hidden", height: 340, position: "relative" }}>
                    <img src={SERVICE_IMGS[i]} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,15,0.8) 0%, transparent 55%)" }} />
                    <CornerMark top={12} left={12} color={C.gold} size={16} />
                    <CornerMark bottom={12} right={12} color={C.gold} size={16} />
                    <div style={{ position: "absolute", bottom: 18, left: 18 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.58rem", color: C.gold, letterSpacing: "3px", textTransform: "uppercase" }}>{s.icon} — {s.sub}</div>
                    </div>
                  </div>
                </Card3D>
              </Reveal>
            )}
            <Reveal>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "4rem", color: `${C.gold}18`, lineHeight: 1, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: C.teal, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>{s.sub}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.1rem", color: C.platinum, marginBottom: 18, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{s.title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: C.silver, lineHeight: 1.9, marginBottom: 28 }}>{s.desc}</p>
                <GoldBtn onClick={() => setPage("Contact")}>Request a Quote</GoldBtn>
              </div>
            </Reveal>
            <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={0.1}>
              {i % 2 === 0 ? (
                <Card3D intensity={10}>
                  <div style={{ borderRadius: 10, overflow: "hidden", height: 340, position: "relative" }}>
                    <img src={SERVICE_IMGS[i]} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,15,0.8) 0%, transparent 55%)" }} />
                    <CornerMark top={12} left={12} color={C.gold} size={16} />
                    <CornerMark bottom={12} right={12} color={C.gold} size={16} />
                  </div>
                </Card3D>
              ) : (
                <div style={{ background: C.cardNavy, borderRadius: 8, padding: "36px 32px", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, ${C.teal}, transparent)` }} />
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: C.teal, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 20 }}>Scope of Work</div>
                  {s.points.map(pt => <CheckItem key={pt} text={pt} light />)}
                </div>
              )}
              {i % 2 === 0 && (
                <div style={{ background: C.cardNavy, borderRadius: 8, padding: "36px 32px", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", marginTop: 0 }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, ${C.teal}, transparent)` }} />
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: C.teal, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 20 }}>Scope of Work</div>
                  {s.points.map(pt => <CheckItem key={pt} text={pt} light />)}
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      <section style={{ padding: "120px 64px", background: "linear-gradient(145deg, #0D1830 0%, #0F1E38 50%, #091424 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Engagement Process" title="How We Deliver Every Project" subtitle="A structured, transparent process from initial consultation through post-installation support." light center /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
            {[["01","Consultation","Define requirements, site constraints, and project objectives in detail."],["02","Site Survey","Complimentary on-site assessment by a certified engineer."],["03","Proposal","Itemised quotation delivered within 24 hours."],["04","Installation","Certified team executes on schedule with daily updates."],["05","Commissioning","Full system testing, app setup, and client training."]].map(([num, title, desc], i) => (
              <Reveal key={num} delay={i * 0.09}>
                <div style={{ textAlign: "center", padding: "0 8px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", border: `1px solid ${C.borderGold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", background: C.goldGlow }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: C.gold }}>{num}</span>
                  </div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.platinum, fontSize: "0.9rem", marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.silver, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCTS PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function ProductsPage({ setPage }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Residential", "Industrial", "Security"];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  return (
    <div style={{ paddingTop: 76 }}>
      <section style={{ minHeight: "45vh", display: "flex", alignItems: "center", padding: "100px 64px 72px", background: `linear-gradient(145deg, ${C.royalBlue}, ${C.heroNav})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.3 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Eyebrow>Product Portfolio</Eyebrow>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: C.platinum, marginBottom: 18, lineHeight: 1.1 }}>Smart Automation Hardware</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: C.silver, maxWidth: 560, lineHeight: 1.85 }}>Purpose-engineered hardware — all carrying our standard 2-year warranty and 5-year service contract.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "72px 64px 120px", background: "linear-gradient(145deg, #141820 0%, #18202E 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 0, marginBottom: 56, borderBottom: `1px solid ${C.border}` }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: "14px 28px", background: "none", border: "none",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.82rem",
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: filter === cat ? C.gold : C.silver, cursor: "pointer",
                borderBottom: filter === cat ? `2px solid ${C.gold}` : "2px solid transparent",
                transition: "all 0.2s", marginBottom: -1
              }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 18 }}>
            {filtered.map((p, i) => (
              <Reveal key={p.sku} delay={i * 0.05}>
                <Card3D intensity={10}>
                  <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.borderGold}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <div style={{ background: C.cardSlate, padding: "24px 24px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, ${C.gold}60, transparent)` }} />
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: C.silver, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>{p.sku}</div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.05rem", color: C.platinum }}>{p.name}</h3>
                      </div>
                      <span style={{ background: C.tealGlow, border: C.borderTeal, borderRadius: 3, padding: "4px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: C.teal, fontWeight: 600, whiteSpace: "nowrap" }}>{p.cat}</span>
                    </div>
                    <div style={{ padding: "22px 24px" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: C.silver, lineHeight: 1.78, marginBottom: 16 }}>{p.desc}</p>
                      <div style={{ marginBottom: 20 }}>
                        {p.specs.map(sp => <CheckItem key={sp} text={sp} light />)}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                        <div>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{p.price}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.emerald, fontWeight: 600, marginTop: 2, letterSpacing: "0.5px" }}>2-Yr Warranty · 5-Yr Service</div>
                        </div>
                        <button onClick={() => setPage("Contact")} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, color: C.heroNav, border: "none", padding: "9px 18px", borderRadius: 2, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.76rem", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase" }}>Enquire</button>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 64px", background: `linear-gradient(135deg, ${C.royalBlue}, ${C.heroNav})`, textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)` }} />
        <Reveal>
          <Eyebrow>Custom Products</Eyebrow>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.2rem", color: C.platinum, marginBottom: 14 }}>Require Bespoke Hardware?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.silver, marginBottom: 32, lineHeight: 1.8 }}>Our R&D team designs and manufactures bespoke automation hardware to exact client specifications.</p>
          <GoldBtn onClick={() => setPage("Contact")}>Discuss Custom Requirements</GoldBtn>
        </Reveal>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PRICING PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function PricingPage({ setPage }) {
  return (
    <div style={{ paddingTop: 76 }}>
      <section style={{ minHeight: "45vh", display: "flex", alignItems: "center", padding: "100px 64px 72px", background: `linear-gradient(145deg, ${C.royalBlue}, ${C.heroNav})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.3 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: C.platinum, marginBottom: 18, lineHeight: 1.1 }}>Transparent, Value-Driven Pricing</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: C.silver, maxWidth: 560, lineHeight: 1.85 }}>Every plan includes our industry-leading 5-year service contract and 2-year product warranty. No hidden fees.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "100px 64px", background: "linear-gradient(135deg, #12182C 0%, #1A1030 100%)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
          {PRICING.map((p, i) => (
            <Reveal key={p.plan} delay={i * 0.09}>
              <Card3D intensity={10}>
                <div style={{ background: p.popular ? C.cardBurg : C.cardSlate, border: p.popular ? `1px solid ${C.borderGold}` : `1px solid ${C.border}`, borderRadius: 10, padding: "40px 30px", minWidth: 246, maxWidth: 268, position: "relative", overflow: "hidden", flex: "1 1 246px", boxShadow: p.popular ? `0 20px 60px rgba(201,168,76,0.12)` : "none" }}>
                  {p.popular && <>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
                    <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, color: C.heroNav, padding: "5px 18px", borderRadius: "0 0 6px 6px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Most Selected</div>
                  </>}
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: p.popular ? C.gold : C.silver, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 8, marginTop: p.popular ? 16 : 0 }}>{p.desc}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: C.platinum, marginBottom: 18 }}>{p.plan}</h3>
                  <div style={{ marginBottom: 28 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.4rem", backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{p.price}</span>
                    {p.gst && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.silver }}> {p.gst}</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.teal, flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.silver, lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setPage("Contact")} style={{ width: "100%", background: p.popular ? `linear-gradient(135deg, ${C.gold}, ${C.goldDim})` : "transparent", color: p.popular ? C.heroNav : C.gold, border: p.popular ? "none" : `1px solid ${C.borderGold}`, padding: "13px", borderRadius: 3, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                    {p.price === "Custom" ? "Request Proposal" : "Get Started"}
                  </button>
                </div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "100px 64px", background: C.burgundy }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Competitive Comparison" title="Iyonex vs. The Industry" subtitle="A transparent comparison of the Iyonex service standard against typical automation providers." light center /></Reveal>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: C.heroNav, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ padding: "18px 28px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: C.silver, fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase" }}>Feature</div>
              <div style={{ padding: "18px 28px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: C.gold, letterSpacing: "1px" }}>Iyonex</div>
              <div style={{ padding: "18px 28px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "rgba(255,255,255,0.28)", fontSize: "0.78rem" }}>Competitors</div>
            </div>
            {[["Free Site Survey","Always Included","Often Chargeable"],["Service After Installation","5 Years — Complimentary","1 Year or Paid"],["Product Warranty","2 Full Years","6–12 Months"],["Licensed Engineering Team","IE Act Certified","Variable"],["Itemised Quotations","Standard Practice","Often Vague"],["Offline Operation Mode","Built-in Standard","Rarely Available"],["Alexa & Google Certified","All Products","Select Models"],["Custom Product Development","In-House R&D","Not Available"],["Multi-Platform App","iOS, Android & Web","App Only"],["Emergency Support","24/7 Availability","Business Hours"]].map(([feat, iy, comp], i) => (
              <div key={feat} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: i % 2 === 0 ? C.cardNavy : C.cardSlate, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ padding: "14px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: C.platinum }}>{feat}</div>
                <div style={{ padding: "14px 28px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: C.emerald, fontWeight: 600 }}>{iy}</div>
                <div style={{ padding: "14px 28px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: C.silver }}>{comp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 64px", background: "linear-gradient(145deg, #0A1C1A 0%, #0D2020 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" light center /></Reveal>
          {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} i={i} />)}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   BLOG PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function BlogPage({ setPage }) {
  return (
    <div style={{ paddingTop: 76 }}>
      <section style={{ minHeight: "55vh", display: "flex", alignItems: "center", padding: "100px 64px 80px", background: `linear-gradient(160deg, rgba(8,11,15,0.95), rgba(13,17,24,0.9)), url(${IMGS.factory}) center/cover no-repeat`, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Eyebrow>Insights</Eyebrow>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: C.platinum, marginBottom: 18, lineHeight: 1.1 }}>Automation Intelligence</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: C.silver, maxWidth: 560, lineHeight: 1.85 }}>Expert editorial on home automation, industrial IoT, renewable energy integration, and operational efficiency — written by the Iyonex engineering team.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "100px 64px", background: "linear-gradient(135deg, #0F1E35 0%, #131C30 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }}>
          {BLOG.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.07}>
              <Card3D intensity={10}>
                <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.borderGold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ background: C.cardSlate, padding: "28px 28px 22px", position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, ${C.gold}60, transparent)` }} />
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: C.teal, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 }}>{post.cat}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.05rem", color: C.platinum, lineHeight: 1.5 }}>{post.title}</h3>
                  </div>
                  <div style={{ padding: "22px 28px" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: C.silver, lineHeight: 1.8, marginBottom: 20 }}>{post.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.muted }}>{post.date} · {post.read} read</div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 16, height: 1, background: C.gold }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: C.gold, letterSpacing: "1px", textTransform: "uppercase" }}>Read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ textAlign: "center", marginTop: 64, paddingTop: 64, borderTop: `1px solid ${C.border}` }}>
            <Eyebrow>Have a Technical Question?</Eyebrow>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.silver, marginBottom: 28, lineHeight: 1.8 }}>Our engineering team is available to advise on any automation challenge.</p>
            <GoldBtn onClick={() => setPage("Contact")}>Contact Our Engineers</GoldBtn>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", city:"", message:"" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => { if (!form.name || !form.phone) return alert("Please provide your name and phone number."); setSent(true); };

  const inputStyle = { width:"100%", padding:"13px 16px", border:`1px solid ${C.border}`, borderRadius:3, fontFamily:"'DM Sans', sans-serif", fontSize:"0.9rem", outline:"none", background:C.cardSlate, color:C.platinum, boxSizing:"border-box", transition:"border-color 0.2s" };

  return (
    <div style={{ paddingTop: 76 }}>
      <section style={{ minHeight: "50vh", display: "flex", alignItems: "center", padding: "100px 64px 80px", background: `linear-gradient(160deg, rgba(8,11,15,0.97), rgba(13,17,24,0.93)), url(${IMGS.puducherry}) center/cover no-repeat`, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: C.platinum, marginBottom: 18, lineHeight: 1.1 }}>Begin Your Project</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: C.silver, maxWidth: 560, lineHeight: 1.85 }}>Contact Iyonex for a complimentary site assessment and project proposal. We respond to all enquiries within 2 business hours.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "100px 64px", background: "linear-gradient(145deg, #131520 0%, #171826 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 72, alignItems: "start" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: C.platinum, fontSize: "1.8rem", marginBottom: 36 }}>Contact Information</h2>
            {[[PHONE, `tel:+91${PHONE}`, "Phone"], [EMAIL, `mailto:${EMAIL}`, "Email"]].map(([val, href, label]) => (
              <div key={label} style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.62rem", color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                <a href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: C.teal, textDecoration: "none" }}>{val}</a>
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.62rem", color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>Address</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.silver, lineHeight: 1.7 }}>{ADDRESS}</div>
            </div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.62rem", color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>Business Hours</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.silver }}>Monday – Saturday: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 4:00 PM</div>
            </div>
            <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 8, padding: "28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.62rem", color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 16 }}>Service Guarantee</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ textAlign: "center", background: "rgba(0,182,122,0.08)", border: "1px solid rgba(0,182,122,0.2)", borderRadius: 6, padding: "16px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: C.emerald }}>5 Years</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.silver, textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 4 }}>Free Service</div>
                </div>
                <div style={{ textAlign: "center", background: C.goldGlow, border: C.borderGold, borderRadius: 6, padding: "16px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: C.gold }}>2 Years</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: C.silver, textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 4 }}>Warranty</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={WA} target="_blank" rel="noreferrer" style={{ background:"#25D366", color:"#fff", padding:"11px 20px", borderRadius:2, textDecoration:"none", fontFamily:"'DM Sans', sans-serif", fontWeight:700, fontSize:"0.78rem", letterSpacing:"1px" }}>WhatsApp</a>
              <a href={`tel:+91${PHONE}`} style={{ background:`linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, color:C.heroNav, padding:"11px 20px", borderRadius:2, textDecoration:"none", fontFamily:"'DM Sans', sans-serif", fontWeight:700, fontSize:"0.78rem", letterSpacing:"1px" }}>Call Now</a>
              <a href={`mailto:${EMAIL}`} style={{ background:C.cardNavy, border:`1px solid ${C.border}`, color:C.platinum, padding:"11px 20px", borderRadius:2, textDecoration:"none", fontFamily:"'DM Sans', sans-serif", fontWeight:600, fontSize:"0.78rem", letterSpacing:"1px" }}>Email Us</a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {sent ? (
              <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 10, padding: "72px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
                <div style={{ width: 64, height: 64, background: "rgba(0,182,122,0.1)", border: "1px solid rgba(0,182,122,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={C.emerald} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: C.platinum, marginBottom: 14, fontSize: "1.6rem" }}>Enquiry Received</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.silver, lineHeight: 1.85, marginBottom: 28 }}>Thank you for contacting Iyonex. A member of our team will reach you within 2 business hours to discuss your requirements and arrange a complimentary site visit.</p>
                <button onClick={() => setSent(false)} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, color: C.heroNav, border: "none", padding: "13px 28px", borderRadius: 2, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, cursor: "pointer", letterSpacing: "1.5px", textTransform: "uppercase" }}>Submit Another</button>
              </div>
            ) : (
              <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 10, padding: "44px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}80, transparent)` }} />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: C.platinum, marginBottom: 6, fontSize: "1.5rem" }}>Project Enquiry</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: C.silver, marginBottom: 28 }}>Complete the form and we will respond within 2 business hours.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[["name","Full Name *","text"],["phone","Phone *","tel"]].map(([k, ph, t]) => (
                      <div key={k}>
                        <label style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"0.62rem", fontWeight:600, color:C.gold, letterSpacing:"2px", textTransform:"uppercase", display:"block", marginBottom:7 }}>{ph}</label>
                        <input type={t} value={form[k]} onChange={e => setForm({...form, [k]:e.target.value})}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = C.borderGold}
                          onBlur={e => e.target.style.borderColor = C.border} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"0.62rem", fontWeight:600, color:C.gold, letterSpacing:"2px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = C.borderGold}
                      onBlur={e => e.target.style.borderColor = C.border} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"0.62rem", fontWeight:600, color:C.gold, letterSpacing:"2px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Service Required</label>
                      <select value={form.service} onChange={e => setForm({...form, service:e.target.value})}
                        style={{ ...inputStyle, color: form.service ? C.platinum : C.silver }}>
                        <option value="">Select Service</option>
                        {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"0.62rem", fontWeight:600, color:C.gold, letterSpacing:"2px", textTransform:"uppercase", display:"block", marginBottom:7 }}>City / Location</label>
                      <input type="text" value={form.city} onChange={e => setForm({...form, city:e.target.value})}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = C.borderGold}
                        onBlur={e => e.target.style.borderColor = C.border} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"0.62rem", fontWeight:600, color:C.gold, letterSpacing:"2px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Project Details</label>
                    <textarea rows={5} value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                      placeholder="Describe your project — property type, scale, specific requirements..."
                      style={{ ...inputStyle, resize:"vertical" }}
                      onFocus={e => e.target.style.borderColor = C.borderGold}
                      onBlur={e => e.target.style.borderColor = C.border} />
                  </div>
                  <div style={{ background: "rgba(0,182,122,0.07)", border: "1px solid rgba(0,182,122,0.18)", borderRadius: 4, padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.silver, lineHeight: 1.7 }}>
                    Every enquiry includes a complimentary site visit, no-obligation quotation, and our standard 5-year service + 2-year warranty commitment.
                  </div>
                  <button onClick={handleSubmit} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, color: C.heroNav, border: "none", padding: "16px", borderRadius: 3, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", letterSpacing: "2px", textTransform: "uppercase", boxShadow: `0 8px 32px rgba(201,168,76,0.25)` }}>
                    Submit Enquiry
                  </button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "80px 64px", background: "linear-gradient(135deg, #0A1C1A 0%, #0D2420 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="Coverage" title="Service Regions" subtitle="Headquartered in Puducherry — delivering projects across South India and nationally for large industrial engagements." light center /></Reveal>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {AREAS.map((a, i) => (
              <Reveal key={a} delay={i * 0.03}>
                <div style={{ background: C.cardNavy, border: `1px solid ${C.border}`, borderRadius: 3, padding: "8px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: C.silver, fontWeight: 500 }}>{a}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 64px 80px", background: "linear-gradient(135deg, #0A1C1A 0%, #0D2420 100%)" }}>
        <Reveal>
          <div
  style={{
    maxWidth: 1200,
    margin: "0 auto",
    borderRadius: 10,
    overflow: "hidden",
    border: `1px solid ${C.border}`
  }}
>
  <iframe
    title="Iyonex Location"
    src="https://www.google.com/maps?q=11.9566,79.8189&z=15&output=embed"
    width="100%"
    height="420"
    style={{
      border: 0,
      display: "block",
      filter: "grayscale(80%) contrast(1.1)"
    }}
    allowFullScreen
    loading="lazy"
  />
</div>
        </Reveal>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════════════════════ */
export default function IyonexPremium() {
  const [page, setPage] = useState("Home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const render = () => {
    switch (page) {
      case "Home":     return <HomePage setPage={setPage} />;
      case "About":    return <AboutPage setPage={setPage} />;
      case "Services": return <ServicesPage setPage={setPage} />;
      case "Products": return <ProductsPage setPage={setPage} />;
      case "Pricing":  return <PricingPage setPage={setPage} />;
      case "Blog":     return <BlogPage setPage={setPage} />;
      case "Contact":  return <ContactPage />;
      default:         return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.navy, overflowX: "hidden", width: "100vw", minWidth: "100vw", margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          scroll-behavior: smooth;
          background: ${C.navy};
        }
        #root, [data-reactroot] {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.heroNav}; }
        ::-webkit-scrollbar-thumb { background: ${C.gold}; border-radius: 2px; }
        ::selection { background: ${C.gold}40; color: ${C.platinum}; }
        input::placeholder, textarea::placeholder { color: ${C.muted}; }
        select option { background: ${C.cardSlate}; color: ${C.platinum}; }
        section { width: 100%; }
      `}</style>
      <Navbar page={page} setPage={setPage} />
      <main style={{ width: "100%" }}>{render()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}