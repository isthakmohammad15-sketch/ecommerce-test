/**
 * NovaMart E-Commerce Core Application Logic
 * Shared across all 10 pages for cart, wishlist, search, toast notifications, and auth state.
 */

// Storage Keys
const STORAGE_KEYS = {
  CART: 'novamart_cart',
  WISHLIST: 'novamart_wishlist',
  USER: 'novamart_user'
};

// ---------------------------------------------------------------------------
// 1. Storage & State Management
// ---------------------------------------------------------------------------
const NovaStorage = {
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      NovaApp.updateBadges();
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  },

  getWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading wishlist from localStorage', e);
      return [];
    }
  },

  saveWishlist(wishlist) {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      NovaApp.updateBadges();
      NovaApp.updateWishlistButtons();
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  },

  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      NovaApp.renderUserState();
    } catch (e) {
      console.error('Error saving user state', e);
    }
  },

  clearUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    NovaApp.renderUserState();
  }
};

// ---------------------------------------------------------------------------
// 2. Toast Notification Manager
// ---------------------------------------------------------------------------
const NovaToast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'success', duration = 3200) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f382c" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-message">${message}</div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
};

// ---------------------------------------------------------------------------
// 3. Core NovaApp Application Controller
// ---------------------------------------------------------------------------
const NovaApp = {
  init() {
    this.setupNavbar();
    this.setupSearchModal();
    this.setupNewsletter();
    this.updateBadges();
    this.renderUserState();
    this.setupGlobalDelegation();
  },

  // Navbar behavior & Mobile drawer
  setupNavbar() {
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    // Mobile nav drawer
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileClose = document.getElementById('mobileNavClose');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      });

      const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      };

      if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
      mobileDrawer.addEventListener('click', (e) => {
        if (e.target === mobileDrawer) closeDrawer();
      });
    }

    // Announcement bar dismiss
    const dismissBtn = document.getElementById('announcementDismiss');
    const announcementBar = document.getElementById('announcementBar');
    if (dismissBtn && announcementBar) {
      dismissBtn.addEventListener('click', () => {
        announcementBar.style.display = 'none';
      });
    }
  },

  // Global Quick Search Modal
  setupSearchModal() {
    const openBtns = document.querySelectorAll('[data-open-search]');
    const modalBackdrop = document.getElementById('searchModalBackdrop');
    const closeBtn = document.getElementById('searchModalClose');
    const searchInput = document.getElementById('modalSearchInput');
    const resultsContainer = document.getElementById('modalSearchResults');

    if (!modalBackdrop) return;

    const openModal = () => {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 100);
      }
      renderQuickResults('');
    };

    const closeModal = () => {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });

    const renderQuickResults = (query) => {
      if (!resultsContainer || typeof NOVA_PRODUCTS === 'undefined') return;
      const cleanQ = query.trim().toLowerCase();
      const filtered = cleanQ.length === 0
        ? NOVA_PRODUCTS.slice(0, 4)
        : NOVA_PRODUCTS.filter(p => p.name.toLowerCase().includes(cleanQ) || p.category.toLowerCase().includes(cleanQ));

      if (filtered.length === 0) {
        resultsContainer.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--text-light); font-size: 14px;">
            No products found matching "<strong>${query}</strong>"
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = filtered.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item">
          <img src="${p.image}" alt="${p.name}" class="search-result-thumb" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-light); font-weight: 700;">${p.category}</div>
            <div style="font-size: 14px; font-weight: 600; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
            <div style="font-size: 13px; font-weight: 800; color: var(--color-primary);">$${p.price.toFixed(2)}</div>
          </div>
          <span style="font-size: 12px; font-weight: 600; color: var(--color-primary);">View &rarr;</span>
        </a>
      `).join('');
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderQuickResults(e.target.value);
      });
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim().length > 0) {
          window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
        }
      });
    }
  },

  // Newsletter subscription simulation
  setupNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input) return;
        const email = input.value.trim();
        if (!this.isValidEmail(email)) {
          NovaToast.show('Please enter a valid email address.', 'error');
          return;
        }

        NovaToast.show('Welcome to NovaMart! Your 15% promo code has been registered.', 'success');
        input.value = '';
      });
    });
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Dynamic Header Badges
  updateBadges() {
    const cart = NovaStorage.getCart();
    const wishlist = NovaStorage.getWishlist();

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalWishlistCount = wishlist.length;

    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = totalCartCount;
      badge.style.display = totalCartCount > 0 ? 'flex' : 'none';
      badge.classList.add('pulse');
      setTimeout(() => badge.classList.remove('pulse'), 300);
    });

    document.querySelectorAll('.wishlist-badge').forEach(badge => {
      badge.textContent = totalWishlistCount;
      badge.style.display = totalWishlistCount > 0 ? 'flex' : 'none';
    });
  },

  // Update heart buttons active state across page
  updateWishlistButtons() {
    const wishlist = NovaStorage.getWishlist();
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = parseInt(btn.getAttribute('data-wishlist-id'), 10);
      const isActive = wishlist.includes(id);
      if (isActive) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Add to wishlist');
      }
    });
  },

  // User state in header
  renderUserState() {
    const user = NovaStorage.getUser();
    const containers = document.querySelectorAll('.user-auth-indicator');

    containers.forEach(container => {
      if (user && user.loggedIn) {
        container.innerHTML = `
          <div class="user-menu-wrapper">
            <button type="button" class="header-action-btn" id="userMenuBtn" aria-label="Account Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <div class="user-dropdown" id="userDropdown">
              <div class="user-dropdown-header">
                <div class="user-dropdown-name">${user.name || 'Shopper'}</div>
                <div class="user-dropdown-email">${user.email}</div>
              </div>
              <a href="wishlist.html" class="user-dropdown-item">My Wishlist</a>
              <a href="cart.html" class="user-dropdown-item">My Cart</a>
              <button type="button" class="user-dropdown-item" id="logoutBtn" style="color: var(--color-danger); width: 100%; text-align: left;">
                Sign Out
              </button>
            </div>
          </div>
        `;

        const userBtn = container.querySelector('#userMenuBtn');
        const userDropdown = container.querySelector('#userDropdown');
        const logoutBtn = container.querySelector('#logoutBtn');

        if (userBtn && userDropdown) {
          userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('open');
          });

          document.addEventListener('click', () => {
            userDropdown.classList.remove('open');
          });
        }

        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            NovaStorage.clearUser();
            NovaToast.show('You have been signed out.', 'info');
          });
        }
      } else {
        container.innerHTML = `
          <a href="login.html" class="header-action-btn" title="Sign In" aria-label="Sign In">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
        `;
      }
    });
  },

  // -------------------------------------------------------------------------
  // 4. Cart & Wishlist Operations
  // -------------------------------------------------------------------------
  addToCart(productId, quantity = 1, showFeedback = true) {
    const product = getProductById(productId);
    if (!product) return;

    let cart = NovaStorage.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ id: product.id, quantity });
    }

    NovaStorage.saveCart(cart);

    if (showFeedback) {
      NovaToast.show(`Added "${product.name}" to cart!`, 'success');
    }
  },

  updateCartQuantity(productId, quantity) {
    let cart = NovaStorage.getCart();
    const index = cart.findIndex(item => item.id === parseInt(productId, 10));
    if (index > -1) {
      if (quantity <= 0) {
        cart.splice(index, 1);
        NovaToast.show('Item removed from cart', 'info');
      } else {
        cart[index].quantity = quantity;
      }
      NovaStorage.saveCart(cart);
    }
  },

  removeFromCart(productId) {
    let cart = NovaStorage.getCart();
    cart = cart.filter(item => item.id !== parseInt(productId, 10));
    NovaStorage.saveCart(cart);
    NovaToast.show('Item removed from cart', 'info');
  },

  toggleWishlist(productId) {
    const id = parseInt(productId, 10);
    const product = getProductById(id);
    let wishlist = NovaStorage.getWishlist();
    const index = wishlist.indexOf(id);

    if (index > -1) {
      wishlist.splice(index, 1);
      NovaStorage.saveWishlist(wishlist);
      NovaToast.show(`Removed "${product ? product.name : 'Item'}" from wishlist`, 'info');
    } else {
      wishlist.push(id);
      NovaStorage.saveWishlist(wishlist);
      NovaToast.show(`Saved "${product ? product.name : 'Item'}" to wishlist!`, 'success');
    }
  },

  // Event Delegation for quick buttons
  setupGlobalDelegation() {
    document.addEventListener('click', (e) => {
      // Add to cart click
      const cartBtn = e.target.closest('[data-add-cart]');
      if (cartBtn) {
        e.preventDefault();
        const id = cartBtn.getAttribute('data-add-cart');
        const qty = parseInt(cartBtn.getAttribute('data-qty') || 1, 10);
        this.addToCart(id, qty);
        return;
      }

      // Wishlist toggle click
      const wishBtn = e.target.closest('[data-wishlist-id]');
      if (wishBtn) {
        e.preventDefault();
        const id = wishBtn.getAttribute('data-wishlist-id');
        this.toggleWishlist(id);
        return;
      }
    });
  },

  // -------------------------------------------------------------------------
  // 5. Reusable Product Card HTML Builder
  // -------------------------------------------------------------------------
  createProductCardHTML(product) {
    const isWishlisted = NovaStorage.getWishlist().includes(product.id);
    const badgeClass = product.badgeType ? `badge-${product.badgeType}` : 'badge-bestseller';

    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image-container">
          ${product.badge ? `<span class="badge ${badgeClass} product-card-badge">${product.badge}</span>` : ''}
          <button type="button" class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-wishlist-id="${product.id}" 
                  aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
          </a>
        </div>
        <div class="product-card-body">
          <div class="product-category-meta">${product.category}</div>
          <h3 class="product-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <div class="product-rating">
            <svg class="star-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span><strong>${product.rating}</strong> (${product.reviewsCount})</span>
          </div>
          <div class="product-price-row">
            <div>
              <span class="product-price">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button type="button" class="product-add-cart-btn" data-add-cart="${product.id}" aria-label="Add ${product.name} to cart" title="Add to Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

// Attach to window
if (typeof window !== 'undefined') {
  window.STORAGE_KEYS = STORAGE_KEYS;
  window.NovaStorage = NovaStorage;
  window.NovaToast = NovaToast;
  window.NovaApp = NovaApp;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STORAGE_KEYS,
    NovaStorage,
    NovaToast,
    NovaApp
  };
}

// Initialize when DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    NovaApp.init();
  });
}

