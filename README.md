# Paradise Nursery

A complete responsive houseplant shopping application built with **React, Vite, Redux Toolkit, React Redux, and React Router** for the Paradise Nursery final project.

Browse 18 unique houseplants in three categories, add plants to your cart, adjust quantities, remove items, and see totals update immediately. The landing page introduces Paradise Nursery with an illustrated botanical background, company information, and a Get Started button.

## Run locally

Install Node.js 22.12 or newer, then open a terminal in this folder:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173). Do not open `index.html` directly from the filesystem.

```bash
npm test          # Automated reducer and shopping-flow tests
npm run build    # Production files in dist/
npm run preview  # Preview the production build locally
```

## Folder structure

```text
paradise-nursery/
├── README.md
├── SUBMISSION.md
├── VERIFICATION.md
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
├── .gitignore
├── public/images/             # 18 bundled botanical SVG illustrations
└── src/
    ├── main.jsx               # React root, Redux Provider, HashRouter
    ├── App.jsx                # Landing page and application routes
    ├── App.css                # Background-image styling and responsive design
    ├── AboutUs.jsx            # Company information
    ├── ProductList.jsx        # Categories, cards, Redux add-to-cart
    ├── CartItem.jsx           # Cart items, controls, totals, checkout
    ├── CartSlice.jsx          # Redux actions, reducer, total selectors
    ├── Navbar.jsx             # Home, Plants, dynamic Cart count
    ├── store.js
    ├── plants.js              # 18 unique catalog entries
    ├── format.js              # USD formatting
    ├── assets/nursery-background.svg
    └── test/                  # Automated behavior tests
```

## Rubric checklist

| Task | Required file | Implementation |
| --- | --- | --- |
| 1 | `README.md` | Project name, details, setup, structure, rubric coverage |
| 2 | `src/AboutUs.jsx` | Paradise Nursery company details and mission |
| 3 | `src/App.css` | `.landing-hero` uses a bundled background image with a readable gradient overlay |
| 4 | `src/App.jsx` | Landing page with Paradise Nursery company name and Get Started link to Plants |
| 5 | `src/CartSlice.jsx` | `addItem`, `incrementQuantity`, `decrementQuantity`, `removeItem`; Redux selectors for item count and total |
| 6 | `src/ProductList.jsx` | Three categories, six unique plants each; image, name, description, price, disabled-after-add buttons; shared navbar rendered by App |
| 7 | `src/CartItem.jsx` | Total quantity and amount, each image/name/unit price/item total, +/− controls, Delete, Coming Soon checkout, Continue Shopping; shared navbar rendered by App |

## Cart behavior

- The badge counts total units, not just distinct plants. Two Snake Plants plus one ZZ Plant shows **3**.
- Adding a plant sets its quantity to one and disables its product button. Removing it enables the button again.
- Decrease stops at one; use Delete to remove the last unit. The minus button is disabled at one.
- Prices are stored as integer cents; totals are the sum of unit price × quantity, formatted in USD.
- Empty carts display a $0.00 total and Continue Shopping link.
- Checkout displays **Coming Soon!** and does not place an order or collect payment.
- Cart state survives page navigation within the app; a full browser refresh resets it. No backend or persistence is required.

## Routes and GitHub hosting

Hash routing keeps routes usable on static hosts, including GitHub Pages, without server rewrite rules:

- `/#/` — Home
- `/#/plants` — Product Listing
- `/#/cart` — Cart

Vite uses relative asset paths (`base: './'`) so the build works beneath a repository subdirectory. For hosting, deploy the **contents of `dist/`** after running `npm run build`; source files must first be built. For assignment submission, upload the source project to GitHub and follow `SUBMISSION.md` to collect seven direct file URLs. No GitHub repository or public deployment is created by this ZIP.

## Assets and accessibility

All 18 plant images and the landing background are original bundled SVG illustrations; they require no remote image service or API key. Optional Google Fonts have local Georgia/Arial fallbacks. Cards and cart images include descriptive alternative text. The interface includes semantic navigation, visible keyboard focus, labeled quantity controls, live cart updates, a skip link, reduced-motion support, and mobile layouts.

## Framework references

- [Vite guide](https://vite.dev/guide/)
- [Redux Toolkit createSlice](https://redux.js.org/toolkit/api/createSlice)
- [React Router HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter)
