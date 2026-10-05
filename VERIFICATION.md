# Verification

Verified on 5 October 2026 with Node.js 25.9.0 and npm 11.12.1.

- `npm run build`: production build succeeds.
- `npm test`: 5 tests pass, covering all 18 catalog entries, Redux actions and totals, duplicate adds, minimum quantity, missing IDs, full shopping flow, disabled/re-enabled product buttons, empty cart, checkout feedback, category filtering, direct cart entry, and unknown routes.
- Dependency installation audit after updating Vitest: zero known vulnerabilities reported at verification time.
- Production preview browser check: landing background and company text render; Get Started opens the catalog; plant illustrations render; adding two different plants updates the navbar; quantity increase updates the line total and overall amount; checkout shows Coming Soon.
- Browser arithmetic check: 2 × $18.00 Snake Plant + 1 × $24.00 ZZ Plant = 3 total items and $60.00.
- All seven requested filenames and their capitalization are included in the archive.
- All 18 plant images and the background SVG are bundled locally.

The ZIP contains source files, dependency lockfile, and documentation. `node_modules/` and generated `dist/` are intentionally excluded; recreate them using `npm ci` and `npm run build`.

The project is ready to upload to GitHub. Publication and assignment submission have not been performed. Checkout is intentionally a demonstration, and cart state resets on full refresh.
