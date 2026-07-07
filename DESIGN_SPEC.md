# Cozy Air Conditioning Design Spec

## Design Read

Cozy Air Conditioning has sparse but useful source data: a Manhattan HVAC business, phone number, website URL, a lead-provided Google rating/review count, and a 5th Avenue address embedded in the notes. No logo, photos, testimonials, service list, offer, guarantee, emergency promise, or certification data is available. The site must therefore earn premium quality through editorial composition, clear contact paths, factual proof, technical restraint, and Manhattan-specific service context rather than invented claims.

Primary audience: Manhattan property owners, office managers, apartment residents, and comparison shoppers who need a phone-first HVAC contact and want to confirm fit quickly.

Positioning: a polished Manhattan HVAC contact point with a calm, practical intake experience. The page should feel like a designed service dossier, not a generic contractor homepage.

Art direction: `neighbourhood-field-guide` with a `technical-proof-dossier` layer. The visual system should combine warm editorial paper, precise rule lines, a cooling-blue technical accent, and copper call-to-action details. Use CSS-built visual assets: service-map panels, airflow linework, compact data strips, and a Manhattan address/contact module. Do not use unrelated stock images.

## Design Dials

- DESIGN_VARIANCE: 8. The site needs a custom editorial structure because the data is thin and no images are supplied.
- MOTION_INTENSITY: 3. Trust-first local service page with subtle hover, focus, accordion, and sticky CTA behaviour only.
- VISUAL_DENSITY: 5. Enough density to feel like a useful field guide, with generous spacing so it still feels premium.

## Colour Scheme

Use the provided premium-local-service tokens as the base, then add a restrained HVAC cooling accent so the page does not read as a one-note warm palette.

- Paper background: `#f5f1eb`
- Deep ink: `#15110d`
- Muted copy: `#6f655b`
- White surface: `#ffffff`
- Soft translucent surface: `rgba(255, 255, 255, 0.74)`
- Copper CTA: `#9b5f2b`
- Deep copper: `#5b3318`
- Cool technical blue: `#2f6f8f`
- Pale blue wash: `#dcecf1`
- Rule line: `rgba(21, 17, 13, 0.14)`
- High-contrast panel: `#17130f`

Avoid bright SaaS gradients, purple/blue-purple dominance, glassy novelty effects, and cheap drop shadows. Depth should come from borders, overlays, spacing, and layered grid panels.

## Typography

Use `next/font/google` in the implementation.

- Display: `Fraunces`, weights 600/700. Used for H1, section titles, oversized proof numerals, and the wordmark.
- Body/UI: `Instrument_Sans`, weights 400/500/600/700. Used for navigation, body, labels, buttons, and compact data.
- Font strategy: assign font CSS variables in `app/layout.tsx`, then use them through CSS variables in `app/globals.css`.
- Hero H1 target: 2 to 3 desktop lines, wide measure around 11 to 13 characters per major phrase line, `clamp()` size roughly 3.2rem to 6.8rem.
- Do not use browser default fonts, raw `system-ui`, Arial, or Helvetica as the identity stack.

## Asset And Branding Plan

No supplied logo, hero image, or photos exist. Stock assets are not allowed.

Create brand presence through:

- A text wordmark: `Cozy Air Conditioning`, typeset in Fraunces with compact supporting line `Manhattan HVAC`.
- A small CSS monogram or temperature dial mark using borders, circular linework, and the cool blue/copper palette.
- A hero CSS-art panel titled around factual concepts: Manhattan, HVAC, call-first intake. Use airflow curves, building-grid blocks, address/contact tiles, and a thermostat-like module.
- A full-bleed CSS technical panel later in the page with rule lines and abstract ducts/airflow, not an invented photo.
- If future real business photos are added to `business.photos`, use them as documentary accents and replace CSS-art where appropriate.

## Page Structure And Component Order

The final page should contain at least 10 meaningful sections plus footer. Planned component order:

1. `SiteHeader`
   - Sticky top navigation with logo/wordmark, anchor links, website link, and phone CTA.
   - Anchors: `#services`, `#fit`, `#process`, `#expectations`, `#questions`, `#contact`.

2. `HeroDossier`
   - Oversized editorial split hero.
   - Left: location line, H1 such as `Manhattan HVAC help, made easier to start.`, concise deck, phone CTA, website secondary link.
   - Right: CSS-built service dossier panel with contact phone, service area, lead-provided rating/review count, and 5th Avenue note from raw notes.
   - No fake emergency, same-day, warranty, or licensed claims.

3. `CredibilityStrip`
   - Compact horizontal strip using only facts: Manhattan service area, HVAC category, `(212) 971-1383`, `4.8 rating / 22 Google reviews` from business description, and website URL.
   - Ticker-like on mobile if needed, but readable without JS.

4. `BrandThesis`
   - Two-column editorial section explaining the site promise: start with the building, the comfort issue, and the right contact path.
   - Copy must stay specific to Manhattan HVAC conditions without claiming capabilities not in data.

5. `ServiceArchitecture`
   - Not a generic card stack. Use a horizontal service selector or segmented dossier tabs.
   - Service inquiry categories may include: Cooling, Heating, Airflow, Project Coordination.
   - Wording should frame these as ways to route an HVAC conversation, not as a verified exhaustive service menu.
   - Each panel includes what to prepare before calling: building type, unit/system symptoms, access constraints, and preferred timing.

6. `ManhattanFitPanel`
   - Asymmetric bento section with no empty holes.
   - Modules: apartments/co-ops, offices/retail, service-area contact, address note, phone-first action.
   - Use layout specificity and building-context copy, not fake client lists or neighborhoods.

7. `DecisionGuide`
   - Buyer support section: `Before you call`, `During the call`, `After the call`.
   - Practical checklist for contact readiness. This is factual advice, not a guarantee of workflow.

8. `ProcessTimeline`
   - Human/process story section with three or four steps: call, describe the HVAC issue, confirm fit/next step, use website/contact path for more context.
   - Avoid promising diagnosis, arrival speed, or quote format unless data later supports it.

9. `ExpectationGrid`
   - Proof/expectations section with compact modules: factual rating/review count, Manhattan address note, phone availability as a contact method, website as reference path.
   - Include a `What this page does not claim` micro-panel to reinforce no fabricated emergency/licensing/guarantee claims.

10. `PrinciplesAccordion`
    - Useful interaction via native `details` elements or a small client component if the build later needs richer state.
    - Topics: clear contact route, factual claims only, Manhattan context, no stock imagery, call-first conversion.

11. `ContactConversion`
    - High-contrast final CTA panel.
    - Primary action: `Call (212) 971-1383`.
    - Secondary action: `Visit website`.
    - Show service area and lead-provided 5th Avenue address note if parsed safely from notes.

12. `SiteFooter`
    - Wordmark, anchor links, phone, website, service area, factual disclaimer that content is based on supplied business data.

13. `MobileStickyCTA`
    - Fixed bottom action bar on small screens when phone exists.
    - Primary phone button and compact website link.

## Interactions

- Sticky desktop header with anchor highlights via hover/focus states only.
- Native anchor navigation with smooth scrolling unless reduced motion is enabled.
- Service architecture segmented tabs if implemented as a client component; otherwise use accessible `details` panels.
- Principles/FAQ accordion using `details` for low-risk buildability.
- Mobile sticky CTA with `tel:` link and website link.
- Hover states: copper CTA darkens; service rows reveal cool-blue rule accents; cards lift by border/transform only.
- Focus-visible rings on all links/buttons.
- Reduced motion: disable smooth scrolling, transforms, and animated linework.

## CTA Map

- Header primary: `tel:+12129711383` labelled `Call now`.
- Hero primary: `tel:+12129711383` labelled `Call (212) 971-1383`.
- Hero secondary: `https://cozyairconditioning.com/` labelled `Visit website`.
- Service panels: `Call to discuss fit` to phone.
- Decision guide: `Start with a call` to phone.
- Final CTA primary: phone.
- Final CTA secondary: website.
- Mobile sticky CTA: phone plus website.
- No email CTA because no email exists in business data.

## Responsive Behaviour

- Desktop: max content width around 1180 to 1240px; split hero uses 12-column grid with wide text and a right dossier panel.
- Tablet: hero becomes stacked but keeps the dossier panel high on the page; service tabs may become two-column cards/details.
- Mobile: header reduces to wordmark plus call button; anchor nav becomes horizontally scrollable or hidden behind compact row; H1 uses `clamp()` and stays readable; all grids collapse to one column.
- Mobile sticky CTA appears below 760px and reserves bottom padding so it does not cover footer/contact content.
- Bento modules must have stable dimensions and no horizontal overflow.
- Long URL text should be wrapped or shown as a concise label to avoid overflow.

## Baseline Deletion Plan

During implementation, treat `app/page.tsx` and `app/globals.css` as blank canvas files. Remove any starter scaffold, generic section labels, placeholder headings, repeated service cards as the main structure, default font stacks, cheap shadows, and unsupported claims. Preserve only factual data and build assumptions.

## QA Risks

- Thin data can lead to vague copy. Mitigation: write around contact readiness, Manhattan HVAC context, and factual proof only.
- Services array is empty. Mitigation: frame service content as inquiry routing categories, not verified offerings.
- Address exists only in notes. Mitigation: display as `Address noted in business data` or parse carefully; do not present a full location module if parsing is uncertain.
- Rating/review count is lead-provided in description, not structured reviews. Mitigation: show as a compact factual data point, not testimonial content.
- No images. Mitigation: use CSS-art and editorial layout; do not hotlink stock.
- Mobile CTA can cover content. Mitigation: add shell bottom padding on mobile.
- Font loading may affect build. Mitigation: use `next/font/google` only; no external CSS imports.
- Accessibility risk in tabs/accordions. Mitigation: prefer native `details` or fully labelled buttons with `aria-controls`.
- Horizontal overflow risk from hero visual and long website URL. Mitigation: `overflow-x: hidden`, responsive grid, and wrapped labels.
