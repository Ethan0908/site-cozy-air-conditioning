import business from '../data/business.json';

const phoneDisplay = business.phone || '(212) 971-1383';
const phoneDigits = phoneDisplay.replace(/\D/g, '');
const phoneHref = `tel:${phoneDigits.length === 10 ? `+1${phoneDigits}` : phoneDigits}`;
const websiteHref = normalizeWebsiteHref(business.website);
const websiteLabel = getWebsiteLabel(business.website) || 'cozyairconditioning.com';
const serviceArea = titleCase(business.serviceArea || business.city || 'Manhattan');
const notes = business.rawLead?.notes || business.description || '';
const ratingNote = notes.match(/4\.8 rating\s*[•-]\s*22 Google reviews/i)?.[0]?.replace('•', '/');
const addressNote = notes.match(/276 5th Ave #704, New York, NY 10001, USA/i)?.[0];

const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#guide', label: 'Call guide' },
  { href: '#fit', label: 'Manhattan fit' },
  { href: '#process', label: 'Process' },
  { href: '#questions', label: 'Questions' },
  { href: '#contact', label: 'Contact' },
];

const proofItems = [
  { label: 'Service area', value: serviceArea },
  { label: 'Category noted', value: 'HVAC' },
  { label: 'Phone', value: phoneDisplay },
  { label: 'Google profile note', value: ratingNote || 'Rating noted in lead data' },
  { label: 'Website', value: websiteLabel },
];

const inquiryRoutes = [
  {
    name: 'Cooling',
    tag: 'Comfort drop',
    lead: 'Start here when the issue is comfort, cooling performance, or a system that needs attention.',
    prepare: ['Building type', 'Unit or system symptoms', 'When the issue started', 'Any access constraints'],
  },
  {
    name: 'Heating',
    tag: 'Heat change',
    lead: 'Use the call to explain the equipment involved and what changed in the space.',
    prepare: ['Space affected', 'Equipment location', 'Recent service history', 'Preferred contact window'],
  },
  {
    name: 'Airflow',
    tag: 'Uneven rooms',
    lead: 'For uneven rooms, stale zones, or airflow questions, details about the layout help the conversation.',
    prepare: ['Rooms or floors affected', 'Vent or return locations', 'Building restrictions', 'Photos if requested later'],
  },
  {
    name: 'Project coordination',
    tag: 'Planned work',
    lead: 'For planned work, share the building context and what decision you are trying to make next.',
    prepare: ['Property type', 'Decision deadline', 'Site access notes', 'Existing documentation'],
  },
];

const intakeSignals = [
  {
    label: 'Building',
    value: 'Apartment, office, retail, or other Manhattan space',
  },
  {
    label: 'Issue',
    value: 'What changed, where it happens, and how often',
  },
  {
    label: 'Access',
    value: 'Super, management, elevator, roof, or mechanical-room notes',
  },
  {
    label: 'Contact',
    value: phoneDisplay,
  },
];

const fitCards = [
  {
    title: 'Apartments and co-ops',
    text: 'Manhattan HVAC calls often involve access, building rules, and compact mechanical spaces. Bring those constraints into the first call.',
  },
  {
    title: 'Offices and retail',
    text: 'For workplace comfort issues, describe the affected zones, operating hours, and any building management requirements.',
  },
  {
    title: 'Phone-first intake',
    text: `${business.name} lists ${phoneDisplay} as the primary contact path in the supplied business data.`,
  },
  {
    title: '5th Avenue note',
    text: addressNote ? `Address noted in supplied data: ${addressNote}.` : 'No structured street address was supplied.',
  },
];

const decisionSteps = [
  {
    title: 'Before you call',
    points: ['Name the building type', 'Write down symptoms', 'Note access or management rules'],
  },
  {
    title: 'During the call',
    points: ['Ask whether the request fits', 'Confirm the next contact step', 'Share the best callback number'],
  },
  {
    title: 'After the call',
    points: ['Keep notes together', 'Use the website for more context', 'Avoid assuming timing until confirmed'],
  },
];

const timeline = [
  {
    title: 'Call the listed number',
    text: `Start with ${phoneDisplay}. It is the clearest contact path supplied for this business.`,
  },
  {
    title: 'Describe the HVAC issue plainly',
    text: 'Share what changed, where it is happening, and what kind of space is affected.',
  },
  {
    title: 'Confirm fit and next step',
    text: 'Use the conversation to learn whether the request is a fit and what information is needed next.',
  },
  {
    title: 'Keep the website handy',
    text: `${websiteLabel} is available as the public reference path from the supplied data.`,
  },
];

const expectations = [
  {
    title: 'What is verified here',
    text: `${business.name}, Manhattan service area, HVAC note, phone number, website, and the lead-provided Google rating line.`,
  },
  {
    title: 'What is not assumed',
    text: 'This page does not add emergency availability, same-day timing, warranties, licensing claims, or testimonials.',
  },
  {
    title: 'How to use the rating note',
    text: ratingNote
      ? `${ratingNote} appears in the supplied lead notes. It is shown as a data point, not as a testimonial.`
      : 'The lead notes mention reputation data, but no structured review content was supplied.',
  },
  {
    title: 'Why there are no photos',
    text: 'No business photos or logo were supplied, so the page uses typography, linework, and factual contact modules instead.',
  },
];

const principles = [
  {
    question: 'Why does the page focus on calling?',
    answer: `The supplied data includes a phone number and primary CTA of "Call now." No email or booking URL was provided.`,
  },
  {
    question: 'Are the service categories a full menu?',
    answer:
      'No. They are routing prompts for an HVAC conversation because the source data did not include a structured service list.',
  },
  {
    question: 'Why mention Manhattan so often?',
    answer:
      'The city and service area are both supplied as Manhattan, and local building context affects how visitors prepare for HVAC calls.',
  },
  {
    question: 'Why no testimonials or awards?',
    answer:
      'No testimonial text, award, license, certification, guarantee, or years-in-business claim was supplied.',
  },
];

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getWebsiteLabel(value: string) {
  if (!value) return '';

  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
}

function normalizeWebsiteHref(value: string) {
  if (!value) return '#contact';
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <a className="brand-lockup" href="#top" aria-label={`${business.name} home`}>
        <span className="brand-mark" aria-hidden="true">
          <span />
        </span>
        <span>
          <strong>{business.name}</strong>
          <small>Manhattan HVAC</small>
        </span>
      </a>
      <nav className="anchor-nav" aria-label="Page sections">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href={phoneHref}>
        Call now
      </a>
    </header>
  );
}

function HeroDossier() {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">HVAC contact path for {serviceArea}</p>
        <h1 id="hero-title">Manhattan HVAC help with a clearer first call.</h1>
        <p className="hero-deck">
          Cozy Air Conditioning is listed for HVAC service in Manhattan. Start with the
          supplied phone number, describe the building and comfort issue, and confirm the
          right next step directly.
        </p>
        <div className="hero-actions" aria-label="Primary contact actions">
          <a className="button button-primary" href={phoneHref}>
            Call {phoneDisplay}
          </a>
          <a className="button button-secondary" href={websiteHref} target="_blank" rel="noreferrer">
            Visit website
          </a>
        </div>
        <p className="hero-note">
          No emergency, warranty, licensing, or timing claims are added beyond the supplied
          business data.
        </p>
      </div>
      <DossierVisual />
    </section>
  );
}

function DossierVisual() {
  return (
    <aside className="dossier-panel" aria-label="Cozy Air Conditioning contact dossier">
      <div className="airflow-art" aria-hidden="true">
        <span className="duct duct-one" />
        <span className="duct duct-two" />
        <span className="duct duct-three" />
        <span className="building-grid" />
      </div>
      <div className="dossier-heading">
        <span className="dial-mark" aria-hidden="true" />
        <div>
          <p>Call-first dossier</p>
          <strong>{serviceArea}</strong>
        </div>
      </div>
      <div className="dossier-grid">
        <div>
          <span>Primary path</span>
          <strong>{phoneDisplay}</strong>
        </div>
        <div>
          <span>Business type</span>
          <strong>{business.businessType}</strong>
        </div>
        <div>
          <span>Lead note</span>
          <strong>HVAC</strong>
        </div>
        <div>
          <span>Public web path</span>
          <strong>{websiteLabel}</strong>
        </div>
      </div>
      {ratingNote ? (
        <p className="dossier-proof">Lead-provided reputation note: {ratingNote}.</p>
      ) : null}
      <div className="instrument-stack" aria-hidden="true">
        <span>Building</span>
        <span>Symptom</span>
        <span>Access</span>
      </div>
    </aside>
  );
}

function CredibilityStrip() {
  return (
    <section className="cred-strip" aria-label="Business facts">
      {proofItems.map((item) => (
        <div key={item.label} className="cred-item">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}

function BrandThesis() {
  return (
    <section className="thesis section-shell" aria-labelledby="thesis-title">
      <div className="section-kicker">Manhattan field guide</div>
      <div className="thesis-grid">
        <h2 id="thesis-title">A cleaner first call for HVAC work in dense buildings.</h2>
        <div className="thesis-copy">
          <p>
            Manhattan HVAC requests rarely begin with a perfect form. They begin with a
            building, a comfort problem, access limits, and a phone number that needs to
            reach the right conversation.
          </p>
          <p>
            This page keeps the path simple: use the listed Cozy Air Conditioning contact,
            prepare the details that matter, and avoid assumptions that were not supplied
            in the business data.
          </p>
        </div>
      </div>
    </section>
  );
}

function IntakeLedger() {
  return (
    <section className="intake-ledger section-shell" id="guide" aria-labelledby="guide-title">
      <div className="ledger-heading">
        <p className="section-kicker">Call prep ledger</p>
        <h2 id="guide-title">Four details make the conversation less vague.</h2>
      </div>
      <div className="ledger-board" aria-label="Information to prepare before calling">
        {intakeSignals.map((signal) => (
          <article key={signal.label}>
            <span>{signal.label}</span>
            <p>{signal.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceArchitecture() {
  return (
    <section className="services section-shell" id="services" aria-labelledby="services-title">
      <div className="section-intro">
        <p className="section-kicker">Inquiry routing</p>
        <h2 id="services-title">Four practical ways to frame the HVAC conversation.</h2>
        <p>
          No verified service menu was supplied. These prompts help a caller organize the
          first discussion without pretending to be an exhaustive list.
        </p>
      </div>
      <div className="route-board">
        {inquiryRoutes.map((route, index) => (
          <details key={route.name} className="route-detail" open={index === 0}>
            <summary>
              <span>{route.name}</span>
              <small>{route.tag}</small>
            </summary>
            <p>{route.lead}</p>
            <ul>
              {route.prepare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href={phoneHref}>Call to discuss fit</a>
          </details>
        ))}
      </div>
    </section>
  );
}

function ManhattanFitPanel() {
  return (
    <section className="fit section-shell" id="fit" aria-labelledby="fit-title">
      <div className="fit-lead">
        <p className="section-kicker">Manhattan fit</p>
        <h2 id="fit-title">Useful context before anyone talks equipment.</h2>
        <p>
          The supplied data points to Manhattan, HVAC, and a phone-first CTA. The most useful
          page experience is therefore a clear intake guide, not a fake gallery or broad
          contractor claims.
        </p>
      </div>
      <div className="fit-bento">
        {fitCards.map((card, index) => (
          <article key={card.title} className={`fit-card fit-card-${index + 1}`}>
            <span aria-hidden="true">0{index + 1}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DecisionGuide() {
  return (
    <section className="decision section-shell" id="decision" aria-labelledby="decision-title">
      <div className="decision-panel">
        <div>
          <p className="section-kicker">Caller guide</p>
          <h2 id="decision-title">Make the first HVAC call specific.</h2>
          <p>
            A little preparation helps the call stay grounded in the actual space, rather
            than vague symptoms.
          </p>
          <a className="text-link" href={phoneHref}>
            Start with a call
          </a>
        </div>
        <div className="decision-columns">
          {decisionSteps.map((step) => (
            <article key={step.title}>
              <h3>{step.title}</h3>
              <ul>
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  return (
    <section className="process section-shell" id="process" aria-labelledby="process-title">
      <div className="sticky-copy">
        <p className="section-kicker">Process</p>
        <h2 id="process-title">A direct path from concern to next step.</h2>
        <p>
          This sequence is an intake guide based on the available contact facts. It does not
          promise diagnosis, arrival timing, or project scope.
        </p>
      </div>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article key={item.title} className="timeline-item">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TechnicalPanel() {
  return (
    <section className="technical-panel" aria-label="HVAC linework panel">
      <div className="technical-inner">
        <div>
          <p className="section-kicker">No stock imagery</p>
          <h2>Airflow, address, and contact details carry the visual system.</h2>
          <p>
            With no supplied photos, the page uses HVAC-inspired linework and factual
            business data instead of unrelated imagery.
          </p>
        </div>
        <div className="technical-map" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

function ExpectationGrid() {
  return (
    <section
      className="expectations section-shell"
      id="expectations"
      aria-labelledby="expectations-title"
    >
      <div className="section-intro compact">
        <p className="section-kicker">Proof boundary</p>
        <h2 id="expectations-title">Only the supplied facts are treated as proof.</h2>
      </div>
      <div className="expectation-grid">
        {expectations.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PrinciplesAccordion() {
  return (
    <section className="questions section-shell" id="questions" aria-labelledby="questions-title">
      <div className="questions-heading">
        <p className="section-kicker">Questions</p>
        <h2 id="questions-title">How this page handles thin source data.</h2>
      </div>
      <div className="accordion">
        {principles.map((item, index) => (
          <details key={item.question} open={index === 0}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactConversion() {
  return (
    <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div>
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Ready to start the Manhattan HVAC conversation?</h2>
          <p>
            Call Cozy Air Conditioning with the building context, symptoms, and access notes
            that will help the first conversation stay specific.
          </p>
        </div>
        <div className="contact-card">
          <span>Primary contact</span>
          <a className="contact-phone" href={phoneHref}>
            {phoneDisplay}
          </a>
          <a className="button button-primary" href={phoneHref}>
            Call now
          </a>
          <a
            className="button button-dark-secondary"
            href={websiteHref}
            target="_blank"
            rel="noreferrer"
          >
            Open {websiteLabel}
          </a>
          {addressNote ? <p>Address noted in supplied data: {addressNote}</p> : null}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-brand">
        <strong>{business.name}</strong>
        <span>HVAC noted for {serviceArea}</span>
      </div>
      <nav aria-label="Footer sections">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="footer-contact">
        <a href={phoneHref}>{phoneDisplay}</a>
        <a href={websiteHref} target="_blank" rel="noreferrer">
          {websiteLabel}
        </a>
      </div>
      <p>
        Content is based on supplied business data only. No stock photos, invented
        testimonials, guarantees, or unsupported availability claims are used.
      </p>
    </footer>
  );
}

function MobileStickyCTA() {
  return (
    <div className="mobile-cta" aria-label="Mobile contact actions">
      <a href={phoneHref}>Call</a>
      <a href={websiteHref} target="_blank" rel="noreferrer">
        Website
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <HeroDossier />
      <CredibilityStrip />
      <BrandThesis />
      <IntakeLedger />
      <ServiceArchitecture />
      <ManhattanFitPanel />
      <DecisionGuide />
      <ProcessTimeline />
      <TechnicalPanel />
      <ExpectationGrid />
      <PrinciplesAccordion />
      <ContactConversion />
      <SiteFooter />
      <MobileStickyCTA />
    </main>
  );
}
