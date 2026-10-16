# InsightNova — React + Vite website

## Open in VS Code

1. Extract this ZIP.
2. Open the `insightnova` folder in VS Code.
3. Install Node.js 22 or newer if needed.
4. Open Terminal → New Terminal and run:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. Stop with Ctrl+C.

## Production

```sh
npm run build
npm test
npm run preview
```

Upload the contents of `dist/` to a static hosting provider. Each page has its own HTML file; no server routing fallback is required. The prebuilt `dist/` folder is included. Use a local HTTP server or `npm run preview`; do not double-click HTML files to run ES modules.

## Project structure

- `src/App.jsx` — reusable layout components and page layouts
- `src/content.json` — original document text, unchanged and indexed
- `src/styles.css` — design tokens, layout, responsive and accessibility styles
- `src/main.jsx` — client hydration and development entry
- `src/entry-server.jsx` — React server rendering entry
- `scripts/prerender.mjs` — generates crawlable HTML for every page
- `scripts/verify.mjs` — source coverage, page structure and internal link checks
- `public/source/` — original supplied document and palette
- `vite.config.js` — relative asset paths and browser compilation target

## Design and content

Navy #10367D, neutral #EBEBEB, and light blue #74B4D6 (matched to the visible third swatch). The third swatch is labelled A5CE00 in the image, which is a yellow-green and does not match its visible colour. Change `--sky` in `src/styles.css` if the printed code was intended.

All nonempty source paragraphs are retained verbatim on the Corporate Profile page linked from the footer. The visitor pages reorganise the same source content; document section numbering and editorial labels are retained in the complete profile. No testimonials, statistics, contact details, or business claims have been invented. The decorative hero is an abstract data motif, not a chart representing company results.

The contact page includes required full name, email, contact number and message fields, native email validation, phone validation, accessible labels, pending state and submission feedback. No messages are stored or sent yet. Replace the body of `src/services/enquiries.js` with your awaited Firestore write. It receives `{ fullName, email, contactNumber, message }`. Add `serverTimestamp()` to the Firestore record. The current adapter intentionally rejects; the form retains entered values and reports that it could not send. The form resets and displays success only after the adapter resolves. No submitted data is logged or saved in browser storage. Configure Firebase and appropriate Firestore rules before deploying live submissions. The Privacy Policy and Terms of Use labels are plain text because the document supplies no policy content or destinations.

## SEO and accessibility

Each route is prerendered with full text, a page title, source-based meta description, semantic landmarks and one H1. Add production-domain canonical URLs and a sitemap when the domain is known. No placeholder domain is embedded.

Responsive layouts cover mobile, tablet and desktop. Native links, keyboard focus outlines, a skip link, accessible navigation toggle, semantic lists, native FAQ disclosures, reduced-motion handling and system fonts are included. No remote font or image requests are required.

Automated checks validate the production build, exact source-text coverage and internal links. Interactive browser testing was not available in the build environment. Before launch, check the navigation and FAQ disclosures in current Chrome, Edge, Firefox and Safari, including keyboard navigation and a 320px viewport. Browser compilation targets ES2020 and Safari 14; this is not a claim of device testing.
