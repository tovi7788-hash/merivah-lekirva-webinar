# Nava 17 November acquisition source
- [x] Inspect live registration triggers and confirm exact ref preservation for Lovable and GitHub Pages callers.
- [x] Add `influencer-nava-17-11` / `נאוה 17/11` to the existing Make WhatsApp and optional email-pool payloads without changing the legacy Nava/Raizy swap.
- [x] Validate attribution and both payloads with a rolled-back registration; run regression checks and report any Make or deployment steps.

# Requested fixes
- [x] Verify and clean up the mobile hero illustration, logo and title without changing desktop; capture before/after at 375px.
- [x] Split operational/marketing consent, add default-false storage, test both choices and verify 375px/1280px without publishing.
- [x] Replace only testimonial asset pointers 13–18 after visual comparison; verify 375px/1280px rendering, spotlight and build without publishing.
- [x] Replace only testimonial asset pointers 7–12 after visual comparison; verify 375px/1280px rendering, spotlight and build without publishing.
- [x] Replace only the hero asset pointer with the visually verified compressed JPEG; retain import and crop, verify 375px/768px/1280px without publishing.
- [x] Show all testimonial images with contain and a measured representative ratio on a soft brand background; verify spotlight, registration links and unchanged form behavior.
- [x] Update only hero promise paragraphs, section 2 copy, second takeaway and six CTA labels; verify 375px/768px/1280px, links and form behavior without publishing.
- [x] Update only section 3's copy/topic pills, the first takeaway description and section 8's gift copy; verify scope, 375px/1280px and registration links without publishing.
- [x] Wrap section 4's four unchanged benefit articles in the supplied BorderGlow and verify pointer effects, 375px/1280px layout and build without publishing.
- [x] Rebuild only hero sections 1/1b with the uploaded heart illustration; verify 1280px/390px/375px, motion preferences and registration scrolling without publishing.
- [x] Replace section 7 with the supplied ChromaGrid, change only the registration submit label, and verify 375px/1280px rendering and regression tests.
- [x] Replace the testimonials accordion with a three-card desktop / one-card mobile carousel, preserving phone frames and entrance animation.
- [x] Verify testimonial paging, mobile swipe, reduced motion and whole-page overflow in the browser.
- [x] Add nullable registration source storage.
- [x] Capture URL ref and include it in each registration.
- [x] Add discreet alternative contact links below the form.
- [x] Add the Yuval-section CTA and unify registration CTA wording.
- [x] Run regression tests and verify real registrations with/without ref and mobile layout; remove test registrations.

# Relationship quiz
- [x] Create the gender selection, five questions, scoring and personalized results at /quiz.
- [x] Reuse the registration form with source quiz, preserving existing pages and storage.
- [x] Test scoring and registration, verify the complete flow and mobile layout, and remove test data.

# Whole-page mobile audit
- [x] Inspect the entire landing page at 390px and 375px for horizontal overflow, readable text, intact media and unobstructed controls.
- [x] Capture the full scroll at both widths and report every finding before changing the site; no site changes made.

# Focused hero hierarchy
- [x] Update only the hero order, exact body copy, typography and CTA dimensions.
- [x] Verify desktop and 375px/390px layouts and capture screenshots: no horizontal overflow, CTA is unobstructed and above the fold; existing smooth scroll stops short of the form on mobile, reported without changing other sections.

# Mobile persistent controls
- [x] Reproduce text overlaps during a whole-page 375px scroll and capture before evidence.
- [x] Reduce mobile controls and reserve viewport space; verify 158 whole-page scroll positions, all six CTAs, guide/WhatsApp links, FAQ and desktop preservation; capture mobile screenshots.

# Hero color transition and controls recheck
- [x] Recheck both persistent controls throughout 85 real wheel-scroll steps at 375px: no text occlusion or mutual overlap, controls remain 48px.
- [x] Smooth the dark hero into the existing blue section, and that section into the cream background; preserve text and capture mobile/desktop evidence.

# Gift section heading size
- [x] Enlarge only section 8's main heading by 5px, keep every other text in that section at its original size, and verify 375px/1280px without publishing.

# Landing page PDF
- [ ] Convert the current landing page into an A4 portrait PDF and keep it at exports/landing-page-current.pdf in the project.