# NovaMart — Modern Luxury E-Commerce Website

An elegant, fully responsive 10-page e-commerce website built strictly using **HTML5, CSS3, and vanilla JavaScript only** (no external UI libraries, no React, no Tailwind, no Bootstrap, no backend required).

Designed with a high-end Scandinavian and botanical aesthetic: soft off-white backgrounds, deep forest green accents (`#0f382c`), vibrant lime-green highlights (`#84cc16`), subtle depth, rounded cards, and smooth micro-animations.

---

## 🌟 Live Pages Included

1. **Home (`index.html`)** — Hero section with CTAs, announcement bar, category showcase, featured bestsellers, promotional countdown timer, benefits strip, and newsletter subscription.
2. **Shop (`shop.html`)** — Complete catalog with real-time live search, category pill filter tabs, price/rating/popularity sorting, result counter, active filter tags, and empty states.
3. **Product Details (`product.html`)** — Dynamic product page driven by URL query parameters (`?id=X`), high-resolution product photography, quantity selector, add to cart, wishlist toggle, tabbed specifications and customer reviews, plus related products.
4. **Categories (`categories.html`)** — Visual showcase for Fashion, Beauty, Home, and Accessories with curated subcategory previews and direct shop filters.
5. **Shopping Bag / Cart (`cart.html`)** — Dynamic cart items loaded from `localStorage`, quantity increment/decrement, remove items, coupon discount system (`NOVA10`, `SPRING20`, `FREESHIP`), real-time calculation of subtotal, shipping, and total, plus empty cart state.
6. **Checkout (`checkout.html`)** — Multi-step shipping and address form, delivery speed selector, demo payment simulation, client-side input validation, and an animated Order Confirmation Modal with a generated Order ID (`NM-XXXXXX`).
7. **Sign In / Login (`login.html`)** — Clean authentication card, email and password validation, show/hide password toggle, and a one-click "Auto Fill" demo credentials helper.
8. **Create Account / Register (`register.html`)** — Membership registration form, password matching validation, show/hide toggle, terms checkbox, and local session creation.
9. **Saved Wishlist (`wishlist.html`)** — Interactive wishlist with `localStorage` persistence, "Move All to Cart" bulk action, individual item removal, and an empty wishlist state.
10. **Contact & Concierge (`contact.html`)** — Flagship atelier info, inquiry department selector, contact form validation with simulated response banner, and interactive collapsible FAQ accordion.

---

## 📂 Project Directory Structure

```text
novamart-ecommerce/
├── index.html            # 1. Home page
├── shop.html             # 2. Shop catalog page
├── product.html          # 3. Dynamic product detail page
├── categories.html       # 4. Categories overview
├── cart.html             # 5. Shopping cart & order calculations
├── checkout.html         # 6. Checkout & order confirmation
├── login.html            # 7. Member login
├── register.html         # 8. Member registration
├── wishlist.html         # 9. Persistent wishlist
├── contact.html          # 10. Contact concierge & FAQs
├── css/
│   └── style.css         # Unified design system & responsive styling
├── js/
│   ├── products.js       # Catalog dataset (16 curated luxury items)
│   ├── app.js            # Global state: cart, wishlist, auth, toasts, search modal
│   └── page.js           # Page-specific controllers and event listeners
└── README.md             # Documentation & setup guide
```

---

## 🚀 How to Run Locally with VS Code & Live Server

### Option A: Using the VS Code "Live Server" Extension (Recommended)
1. Open Visual Studio Code.
2. Go to **File** > **Open Folder...** and select the `novamart-ecommerce` folder (or the root project folder).
3. Install the **Live Server** extension by *Ritwick Dey* from the VS Code Extensions Marketplace if not already installed.
4. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your default web browser will automatically open `http://127.0.0.1:5500/index.html`.

### Option B: Using Python Built-in Server
If you have Python installed, open PowerShell or Terminal in the `novamart-ecommerce` directory and run:
```powershell
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

### Option C: Using Node.js `npx serve`
```bash
npx serve .
```

### Option D: Direct Browser Launch
You can also directly double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari. All styles, images, and `localStorage` features will function seamlessly!

---

## 🛍️ Interactive Demo Features to Test

- **Add to Cart & Badge Updates:** Click the "+" button on any product card or the "Add to Cart" button on `product.html`. Notice the badge counter in the navigation bar pulse and update across all pages.
- **Wishlist Persistence:** Click the heart icon on any product. Reload the page or navigate to `wishlist.html` to verify the item stays saved in `localStorage`.
- **Search Modal:** Click the magnifying glass icon in the header or press search on `shop.html` to test live matching.
- **Dynamic Product Pages:** On the shop page or home page, click any product title or image to open `product.html?id=X` populated with that item's unique specs, gallery, and related items.
- **Coupon Codes:** In `cart.html`, try applying `NOVA10` (10% off), `SPRING20` (20% off), or `FREESHIP` (free shipping).
- **Checkout & Confirmation:** Fill in the shipping details on `checkout.html` and click "Place Demo Order" to experience the loading sequence and order receipt modal.
- **One-Click Demo Login:** On `login.html`, click "Auto Fill" to populate demo credentials and sign in. Notice your name appear in the header account dropdown!
- **Collapsible FAQs:** Visit `contact.html` and click on questions to expand and collapse answers with smooth animated arrows.

---

## 🎨 Design Philosophy & Technology

- **HTML5:** Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`).
- **CSS3:** Custom properties (CSS variables), CSS Grid, Flexbox, smooth transitions, glassmorphism (`backdrop-filter: blur`), responsive media queries (`1024px`, `768px`, `480px`).
- **Vanilla JavaScript (ES6+):** Module-free clean JS, event delegation, `localStorage` state management, debounced search filtering, and accessible keyboard focus navigation.
- **Zero External Dependencies:** Built with zero bulky CSS or JS frameworks for instant page loads.
