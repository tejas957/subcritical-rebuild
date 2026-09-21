# Subcritical Systems — site rebuild

A static, dependency-free rebuild of subcritical.com: plain HTML, CSS and
JavaScript. No build step, no framework, no server required to preview it.

## What's in here

```
index.html      Home (hero, about, technology, diagram, comparison, FAQ, team,
                 careers preview, audience paths, news, contact)
careers.html    Full 21-role list with live search + department filter
press.html      Newsroom + media kit / contact
privacy.html    Privacy policy (address corrected to match the footer)
css/style.css   All styling — design tokens are CSS variables at the top
js/main.js      Nav, hero animation, diagram interactivity, FAQ, contact form
js/careers.js   Careers search/filter logic
images/         Placeholder graphics (see "Known placeholders" below)
```

## Preview it locally

No install needed — any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Or just double-click `index.html` (a few effects, like the Google Maps
embed, need a real server or live hosting to load correctly).

## Hosting it (pick any one — all are free for a site this size)

- **Netlify** — drag the whole folder onto app.netlify.com/drop. Live in
  seconds, free SSL and a custom domain.
- **Vercel** — `npx vercel` from inside this folder, or connect a GitHub repo
  for auto-deploys.
- **GitHub Pages** — push this folder to a repo, enable Pages in repo
  settings, point it at the root.
- **Cloudflare Pages / Amazon S3+CloudFront** — also drop-in compatible;
  no build command needed on any of them (leave that field blank).

## Bringing it into Framer

The current subcritical.com is built in Framer, so there are two paths:

1. **Recreate the layout natively in Framer** (recommended if the client
   wants to keep editing visually). Use this build as the exact spec —
   copy, structure, spacing, and the CSS variables at the top of
   `style.css` for colors/fonts. This needs someone with Framer editor
   access; it can't be scripted from outside the app.
2. **Embed this as code** using a Framer "Embed" / Code Component pointed
   at this site (hosted anywhere above). Fastest option, but content edits
   then happen in this codebase, not in Framer's visual editor.

## Known placeholders — replace before launch

- **Font**: styled with Inter (closest free match to the screenshots). If
  the client's real site uses something else, swap the Google Fonts link
  in each HTML file's `<head>` and the `--font-sans` variable in
  `style.css`.
- **Accelerator photo** (`images/accelerator-placeholder.svg`): an abstract
  stand-in. Swap in the real tunnel photo from the client.
- **Team photos**: initials-in-a-circle placeholders. Names/titles (Fred
  Turner, Dr. Dina Turner, Dr. Stuart Henderson) come from public NRC
  filings and press coverage — confirm current titles and get real
  headshots and bios before this goes live.
- **Contact form**: client-side only right now (shows a "not wired up yet"
  message on submit). Point it at the client's email/CRM, or swap in a
  service like Formspree/Netlify Forms.
- **Careers "View Description" links**: point to the client's real PDF
  job-description files where I had a URL from the live site; a few show
  `#` and need the real PDF link.
- **Map embed**: uses a public Google Maps query URL (no API key) for
  8602 Lava Hill Rd — works out of the box, but confirm that's the
  address they want shown publicly.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (disables the hero animation and
  transitions).
- Semantic headings, a skip-to-content link, and keyboard-operable diagram
  hotspots, FAQ accordion, and mobile nav.
- No image is more than a placeholder SVG right now — real photography
  will need standard compression/responsive `srcset` before launch.
