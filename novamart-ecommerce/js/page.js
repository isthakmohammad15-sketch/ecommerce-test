/**
 * NovaMart E-Commerce Page-Specific Controllers
 * Automatically initializes logic based on body `data-page` attribute or current URL.
 */

const NovaPageController = {
  init() {
    const pageId = document.body.getAttribute('data-page') || this.detectPage();

    switch (pageId) {
      case 'home':
        this.initHome();
        break;
      case 'shop':
        this.initShop();
        break;
      case 'product':
        this.initProductDetail();
        break;
      case 'categories':
        this.initCategories();
        break;
      case 'cart':
        this.initCart();
        break;
      case 'checkout':
        this.initCheckout();
        break;
      case 'login':
        this.initLogin();
        break;
      case 'register':
        this.initRegister();
        break;
      case 'wishlist':
        this.initWishlist();
        break;
      case 'contact':
        this.initContact();
        break;
      default:
        break;
    }
  },

  detectPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('shop.html')) return 'shop';
    if (path.includes('product.html')) return 'product';
    if (path.includes('categories.html')) return 'categories';
    if (path.includes('cart.html')) return 'cart';
    if (path.includes('checkout.html')) return 'checkout';
    if (path.includes('login.html')) return 'login';
    if (path.includes('register.html')) return 'register';
    if (path.includes('wishlist.html')) return 'wishlist';
    if (path.includes('contact.html')) return 'contact';
    return 'home';
  },

  // =========================================================================
  // 1. Home Page Controller
  // =========================================================================
  initHome() {
    // Render featured products
    const featuredGrid = document.getElementById('featuredProductsGrid');
    if (featuredGrid && typeof getFeaturedProducts === 'function') {
      const featured = getFeaturedProducts(4);
      featuredGrid.innerHTML = featured.map(p => NovaApp.createProductCardHTML(p)).join('');
    }

    // Render trending products
    const trendingGrid = document.getElementById('trendingProductsGrid');
    if (trendingGrid && typeof getTrendingProducts === 'function') {
      const trending = getTrendingProducts(4);
      trendingGrid.innerHTML = trending.map(p => NovaApp.createProductCardHTML(p)).join('');
    }

    // Promo banner countdown timer
    this.startPromoCountdown();
  },

  startPromoCountdown() {
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minsEl = document.getElementById('countdownMins');
    const secsEl = document.getElementById('countdownSecs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    // Set countdown 2 days ahead
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(targetDate.getHours() + 14);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(mins).padStart(2, '0');
      secsEl.textContent = String(secs).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  },

  // =========================================================================
  // 2. Shop Page Controller
  // =========================================================================
  initShop() {
    const grid = document.getElementById('shopProductsGrid');
    const searchInput = document.getElementById('shopSearchInput');
    const sortSelect = document.getElementById('shopSortSelect');
    const categoryPills = document.querySelectorAll('.category-pill-btn');
    const resultCount = document.getElementById('shopResultsCount');
    const emptyState = document.getElementById('shopEmptyState');
    const activeFiltersContainer = document.getElementById('shopActiveFilters');

    // Parse URL queries
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'All';
    let currentSearch = urlParams.get('search') || '';
    let currentSort = urlParams.get('sort') || 'featured';

    // Populate search input if passed via query
    if (searchInput && currentSearch) {
      searchInput.value = currentSearch;
    }

    // Set initial category button active
    categoryPills.forEach(pill => {
      const cat = pill.getAttribute('data-category');
      if (cat.toLowerCase() === currentCategory.toLowerCase()) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    if (sortSelect && currentSort) {
      sortSelect.value = currentSort;
    }

    const render = () => {
      if (typeof NOVA_PRODUCTS === 'undefined') return;

      let filtered = [...NOVA_PRODUCTS];

      // Filter by Category
      if (currentCategory && currentCategory.toLowerCase() !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
      }

      // Filter by Search Query
      if (currentSearch.trim()) {
        const query = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      }

      // Sort
      if (currentSort === 'price-low-high') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price-high-low') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (currentSort === 'popularity') {
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
      }

      // Update Result Count
      if (resultCount) {
        resultCount.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
      }

      // Render Active Filter Chips
      if (activeFiltersContainer) {
        let chipsHtml = '';
        if (currentCategory.toLowerCase() !== 'all') {
          chipsHtml += `
            <span class="active-tag">
              Category: ${currentCategory}
              <button type="button" id="clearCatFilter">&times;</button>
            </span>
          `;
        }
        if (currentSearch.trim()) {
          chipsHtml += `
            <span class="active-tag">
              Search: "${currentSearch}"
              <button type="button" id="clearSearchFilter">&times;</button>
            </span>
          `;
        }
        if (chipsHtml) {
          chipsHtml += `
            <button type="button" id="clearAllFiltersBtn" class="btn btn-sm btn-outline" style="padding: 4px 10px; font-size: 11px;">
              Reset All
            </button>
          `;
        }
        activeFiltersContainer.innerHTML = chipsHtml;

        const clearCat = document.getElementById('clearCatFilter');
        if (clearCat) clearCat.addEventListener('click', () => {
          currentCategory = 'All';
          categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'All'));
          render();
        });

        const clearSearch = document.getElementById('clearSearchFilter');
        if (clearSearch) clearSearch.addEventListener('click', () => {
          currentSearch = '';
          if (searchInput) searchInput.value = '';
          render();
        });

        const clearAll = document.getElementById('clearAllFiltersBtn');
        if (clearAll) clearAll.addEventListener('click', () => {
          currentCategory = 'All';
          currentSearch = '';
          if (searchInput) searchInput.value = '';
          categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'All'));
          render();
        });
      }

      // Render Grid or Empty State
      if (filtered.length === 0) {
        if (grid) grid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
      } else {
        if (grid) {
          grid.style.display = 'grid';
          grid.innerHTML = filtered.map(p => NovaApp.createProductCardHTML(p)).join('');
        }
        if (emptyState) emptyState.style.display = 'none';
      }
    };

    // Category button events
    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.getAttribute('data-category');
        render();
      });
    });

    // Search input debounce
    if (searchInput) {
      let timeout = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          currentSearch = e.target.value;
          render();
        }, 250);
      });
    }

    // Sort select change
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        render();
      });
    }

    // Reset button in empty state
    const resetEmptyBtn = document.getElementById('resetShopFiltersBtn');
    if (resetEmptyBtn) {
      resetEmptyBtn.addEventListener('click', () => {
        currentCategory = 'All';
        currentSearch = '';
        if (searchInput) searchInput.value = '';
        categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'All'));
        render();
      });
    }

    render();
  },

  // =========================================================================
  // 3. Product Details Page Controller
  // =========================================================================
  initProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 1;
    let product = getProductById(productId);

    if (!product && typeof NOVA_PRODUCTS !== 'undefined' && NOVA_PRODUCTS.length > 0) {
      product = NOVA_PRODUCTS[0];
    }

    if (!product) return;

    // Document title
    document.title = `${product.name} — NovaMart`;

    // Populate Breadcrumbs
    const breadcrumbCat = document.getElementById('detailBreadcrumbCategory');
    const breadcrumbTitle = document.getElementById('detailBreadcrumbTitle');
    if (breadcrumbCat) {
      breadcrumbCat.textContent = product.category;
      breadcrumbCat.href = `shop.html?category=${encodeURIComponent(product.category)}`;
    }
    if (breadcrumbTitle) breadcrumbTitle.textContent = product.name;

    // Populate Main Image & Fallback
    const mainImg = document.getElementById('detailMainImage');
    if (mainImg) {
      mainImg.src = product.image;
      mainImg.alt = product.name;
      mainImg.onerror = () => { mainImg.src = DEFAULT_FALLBACK_IMAGE; };
    }

    // Badge
    const badgeEl = document.getElementById('detailProductBadge');
    if (badgeEl) {
      if (product.badge) {
        badgeEl.textContent = product.badge;
        badgeEl.className = `badge badge-${product.badgeType || 'bestseller'}`;
        badgeEl.style.display = 'inline-flex';
      } else {
        badgeEl.style.display = 'none';
      }
    }

    // Category & SKU
    const catEl = document.getElementById('detailCategory');
    if (catEl) catEl.textContent = product.category;
    const skuEl = document.getElementById('detailSku');
    if (skuEl) skuEl.textContent = `SKU: ${product.sku}`;

    // Title & Rating
    const titleEl = document.getElementById('detailTitle');
    if (titleEl) titleEl.textContent = product.name;
    const ratingEl = document.getElementById('detailRatingNum');
    if (ratingEl) ratingEl.textContent = product.rating;
    const reviewsEl = document.getElementById('detailReviewCount');
    if (reviewsEl) reviewsEl.textContent = `(${product.reviewsCount} verified reviews)`;

    // Prices & Discount calculation
    const priceEl = document.getElementById('detailPrice');
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
    const origPriceEl = document.getElementById('detailOriginalPrice');
    const saveBadgeEl = document.getElementById('detailSaveBadge');

    if (product.originalPrice && product.originalPrice > product.price) {
      if (origPriceEl) {
        origPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
        origPriceEl.style.display = 'inline';
      }
      if (saveBadgeEl) {
        const savePercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        saveBadgeEl.textContent = `Save ${savePercent}%`;
        saveBadgeEl.style.display = 'inline-block';
      }
    } else {
      if (origPriceEl) origPriceEl.style.display = 'none';
      if (saveBadgeEl) saveBadgeEl.style.display = 'none';
    }

    // Description & Features
    const descEl = document.getElementById('detailDescription');
    if (descEl) descEl.textContent = product.description;

    const featuresList = document.getElementById('detailFeaturesList');
    if (featuresList && product.features) {
      featuresList.innerHTML = product.features.map(f => `
        <li>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${f}</span>
        </li>
      `).join('');
    }

    // Specs Tab Content
    const specsBox = document.getElementById('detailSpecsContent');
    if (specsBox && product.details) {
      specsBox.innerHTML = `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${Object.entries(product.details).map(([key, val]) => `
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 12px 0; font-weight: 700; color: var(--color-primary-dark); width: 35%; text-transform: capitalize;">
                ${key.replace(/([A-Z])/g, ' $1')}
              </td>
              <td style="padding: 12px 0; color: var(--text-muted);">${val}</td>
            </tr>
          `).join('')}
        </table>
      `;
    }

    // Quantity Selector
    const qtyInput = document.getElementById('detailQuantityInput');
    const qtyMinus = document.getElementById('detailQuantityMinus');
    const qtyPlus = document.getElementById('detailQuantityPlus');

    if (qtyMinus && qtyPlus && qtyInput) {
      qtyMinus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
      qtyPlus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < 20) qtyInput.value = val + 1;
      });
    }

    // Add to Cart
    const addCartBtn = document.getElementById('detailAddToCartBtn');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
        NovaApp.addToCart(product.id, qty);
      });
    }

    // Wishlist Toggle
    const wishBtn = document.getElementById('detailWishlistBtn');
    if (wishBtn) {
      wishBtn.setAttribute('data-wishlist-id', product.id);
      const isSaved = NovaStorage.getWishlist().includes(product.id);
      if (isSaved) wishBtn.classList.add('active');

      wishBtn.addEventListener('click', () => {
        NovaApp.toggleWishlist(product.id);
        wishBtn.classList.toggle('active', NovaStorage.getWishlist().includes(product.id));
      });
    }

    // Tabs Switcher
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Demo Review Form
    const reviewForm = document.getElementById('demoReviewForm');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        NovaToast.show('Thank you! Your verified review has been submitted for approval.', 'success');
        reviewForm.reset();
      });
    }

    // Related Products Grid
    const relatedGrid = document.getElementById('detailRelatedGrid');
    if (relatedGrid && typeof getRelatedProducts === 'function') {
      const related = getRelatedProducts(product.id, product.category, 4);
      relatedGrid.innerHTML = related.map(p => NovaApp.createProductCardHTML(p)).join('');
    }
  },

  // =========================================================================
  // 4. Categories Page Controller
  // =========================================================================
  initCategories() {
    // Show preview products for each category
    const catSections = [
      { id: 'fashionPreviewGrid', category: 'Fashion' },
      { id: 'beautyPreviewGrid', category: 'Beauty' },
      { id: 'homePreviewGrid', category: 'Home' },
      { id: 'accessoriesPreviewGrid', category: 'Accessories' }
    ];

    catSections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el && typeof getProductsByCategory === 'function') {
        const items = getProductsByCategory(section.category).slice(0, 4);
        el.innerHTML = items.map(p => NovaApp.createProductCardHTML(p)).join('');
      }
    });
  },

  // =========================================================================
  // 5. Cart Page Controller
  // =========================================================================
  initCart() {
    const tableBody = document.getElementById('cartTableBody');
    const emptyState = document.getElementById('cartEmptyState');
    const contentLayout = document.getElementById('cartContentLayout');

    const subtotalEl = document.getElementById('cartSubtotal');
    const shippingEl = document.getElementById('cartShipping');
    const discountEl = document.getElementById('cartDiscount');
    const discountRow = document.getElementById('cartDiscountRow');
    const totalEl = document.getElementById('cartTotal');

    let appliedDiscount = 0; // In percentage or fixed
    let isFreeShippingCoupon = false;

    const render = () => {
      const cart = NovaStorage.getCart();

      if (cart.length === 0) {
        if (contentLayout) contentLayout.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      if (contentLayout) contentLayout.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';

      let subtotal = 0;

      if (tableBody) {
        tableBody.innerHTML = cart.map(item => {
          const product = getProductById(item.id);
          if (!product) return '';

          const itemTotal = product.price * item.quantity;
          subtotal += itemTotal;

          return `
            <tr data-cart-item-id="${product.id}">
              <td>
                <div class="cart-product-cell">
                  <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="cart-thumb" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
                  </a>
                  <div>
                    <div class="cart-product-cat">${product.category}</div>
                    <div class="cart-product-title">
                      <a href="product.html?id=${product.id}">${product.name}</a>
                    </div>
                    <button type="button" class="cart-remove-btn" data-cart-remove="${product.id}" style="font-size: 12px; color: var(--color-danger); margin-top: 4px; display: inline-flex; align-items: center; gap: 4px;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      Remove
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <span style="font-weight: 600; color: var(--color-primary-dark);">$${product.price.toFixed(2)}</span>
              </td>
              <td>
                <div class="quantity-stepper">
                  <button type="button" data-qty-dec="${product.id}" aria-label="Decrease">&minus;</button>
                  <input type="text" value="${item.quantity}" readonly aria-label="Quantity">
                  <button type="button" data-qty-inc="${product.id}" aria-label="Increase">&plus;</button>
                </div>
              </td>
              <td style="text-align: right;">
                <span style="font-weight: 800; color: var(--color-primary-dark);">$${itemTotal.toFixed(2)}</span>
              </td>
            </tr>
          `;
        }).join('');
      }

      // Calculations
      let shipping = (subtotal >= 75 || isFreeShippingCoupon) ? 0 : 9.99;
      let discountAmount = (subtotal * appliedDiscount) / 100;
      let total = Math.max(0, subtotal + shipping - discountAmount);

      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;

      if (discountRow) {
        if (discountAmount > 0) {
          discountRow.style.display = 'flex';
          if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
        } else {
          discountRow.style.display = 'none';
        }
      }

      if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    };

    // Event listener for cart actions
    if (tableBody) {
      tableBody.addEventListener('click', (e) => {
        const incBtn = e.target.closest('[data-qty-inc]');
        if (incBtn) {
          const id = incBtn.getAttribute('data-qty-inc');
          const cart = NovaStorage.getCart();
          const item = cart.find(i => i.id === parseInt(id, 10));
          if (item) {
            NovaApp.updateCartQuantity(id, item.quantity + 1);
            render();
          }
          return;
        }

        const decBtn = e.target.closest('[data-qty-dec]');
        if (decBtn) {
          const id = decBtn.getAttribute('data-qty-dec');
          const cart = NovaStorage.getCart();
          const item = cart.find(i => i.id === parseInt(id, 10));
          if (item) {
            NovaApp.updateCartQuantity(id, item.quantity - 1);
            render();
          }
          return;
        }

        const removeBtn = e.target.closest('[data-cart-remove]');
        if (removeBtn) {
          const id = removeBtn.getAttribute('data-cart-remove');
          NovaApp.removeFromCart(id);
          render();
          return;
        }
      });
    }

    // Coupon Code submission
    const couponForm = document.getElementById('cartCouponForm');
    if (couponForm) {
      couponForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const codeInput = document.getElementById('cartCouponInput');
        if (!codeInput) return;
        const code = codeInput.value.trim().toUpperCase();

        if (code === 'NOVA10') {
          appliedDiscount = 10;
          NovaToast.show('Promo code applied: 10% OFF your order!', 'success');
        } else if (code === 'SPRING20') {
          appliedDiscount = 20;
          NovaToast.show('Promo code applied: 20% OFF your order!', 'success');
        } else if (code === 'FREESHIP') {
          isFreeShippingCoupon = true;
          NovaToast.show('Promo code applied: Free Shipping unlocked!', 'success');
        } else {
          NovaToast.show('Invalid coupon code. Try "NOVA10" or "FREESHIP"', 'error');
          return;
        }
        render();
      });
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to empty your cart?')) {
          NovaStorage.saveCart([]);
          render();
          NovaToast.show('Cart has been cleared', 'info');
        }
      });
    }

    render();
  },

  // =========================================================================
  // 6. Checkout Page Controller
  // =========================================================================
  initCheckout() {
    const summaryItems = document.getElementById('checkoutItemsList');
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const shippingEl = document.getElementById('checkoutShipping');
    const totalEl = document.getElementById('checkoutTotal');
    const checkoutForm = document.getElementById('checkoutForm');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    const confirmationModal = document.getElementById('orderConfirmationModal');
    const modalOrderId = document.getElementById('modalOrderId');
    const modalOrderEmail = document.getElementById('modalOrderEmail');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    const cart = NovaStorage.getCart();

    // Fill summary
    if (cart.length === 0) {
      if (summaryItems) {
        summaryItems.innerHTML = `
          <div style="padding: 24px 0; text-align: center; color: var(--text-light); font-size: 14px;">
            Your cart is currently empty.
            <div style="margin-top: 12px;">
              <a href="shop.html" class="btn btn-sm btn-primary">Go to Shop</a>
            </div>
          </div>
        `;
      }
      if (placeOrderBtn) placeOrderBtn.disabled = true;
      return;
    }

    let subtotal = 0;
    if (summaryItems) {
      summaryItems.innerHTML = cart.map(item => {
        const product = getProductById(item.id);
        if (!product) return '';
        const lineTotal = product.price * item.quantity;
        subtotal += lineTotal;

        return `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${product.image}" alt="${product.name}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;" onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'">
              <div>
                <div style="font-weight: 700; color: var(--text-main); line-height: 1.3;">${product.name}</div>
                <div style="color: var(--text-light);">Qty: ${item.quantity} &times; $${product.price.toFixed(2)}</div>
              </div>
            </div>
            <div style="font-weight: 700; color: var(--color-primary-dark);">$${lineTotal.toFixed(2)}</div>
          </div>
        `;
      }).join('');
    }

    let shippingMethod = 0; // Standard free
    const updateTotals = () => {
      const grandTotal = subtotal + shippingMethod;
      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      if (shippingEl) shippingEl.textContent = shippingMethod === 0 ? 'FREE' : `$${shippingMethod.toFixed(2)}`;
      if (totalEl) totalEl.textContent = `$${grandTotal.toFixed(2)}`;
    };

    updateTotals();

    // Shipping selection change
    const shippingRadios = document.querySelectorAll('input[name="shipping_method"]');
    shippingRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        shippingMethod = e.target.value === 'express' ? 15.00 : 0;
        updateTotals();
      });
    });

    // Payment method tabs
    const paymentOptions = document.querySelectorAll('.payment-card-option');
    paymentOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        paymentOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const method = opt.getAttribute('data-payment-method');
        const cardFields = document.getElementById('creditCardFields');
        if (cardFields) {
          cardFields.style.display = method === 'card' ? 'block' : 'none';
        }
      });
    });

    // Auto-fill if user logged in
    const currentUser = NovaStorage.getUser();
    if (currentUser) {
      const emailField = document.getElementById('checkoutEmail');
      const nameField = document.getElementById('checkoutFirstName');
      if (emailField) emailField.value = currentUser.email;
      if (nameField && currentUser.name) nameField.value = currentUser.name.split(' ')[0];
    }

    // Form Submission & Validation
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = [
          { id: 'checkoutFirstName', name: 'First Name' },
          { id: 'checkoutLastName', name: 'Last Name' },
          { id: 'checkoutEmail', name: 'Email Address' },
          { id: 'checkoutPhone', name: 'Phone' },
          { id: 'checkoutAddress', name: 'Shipping Address' },
          { id: 'checkoutCity', name: 'City' },
          { id: 'checkoutPostal', name: 'Postal Code' },
          { id: 'checkoutCountry', name: 'Country' }
        ];

        let isValid = true;
        requiredFields.forEach(field => {
          const el = document.getElementById(field.id);
          if (el) {
            if (!el.value.trim()) {
              el.classList.add('error');
              isValid = false;
            } else {
              el.classList.remove('error');
            }
          }
        });

        // Email validation
        const emailInput = document.getElementById('checkoutEmail');
        if (emailInput && !NovaApp.isValidEmail(emailInput.value.trim())) {
          emailInput.classList.add('error');
          isValid = false;
        }

        if (!isValid) {
          NovaToast.show('Please complete all required shipping fields properly.', 'error');
          return;
        }

        // Show loading simulation on button
        if (placeOrderBtn) {
          placeOrderBtn.disabled = true;
          placeOrderBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"/></svg>
            Processing Demo Order...
          `;
        }

        setTimeout(() => {
          // Generate demo order ID
          const randomOrderId = 'NM-' + Math.floor(100000 + Math.random() * 900000);
          if (modalOrderId) modalOrderId.textContent = randomOrderId;
          if (modalOrderEmail && emailInput) modalOrderEmail.textContent = emailInput.value.trim();

          // Clear cart in storage
          NovaStorage.saveCart([]);

          // Open confirmation modal
          if (confirmationModal) {
            confirmationModal.classList.add('open');
          }

          if (placeOrderBtn) {
            placeOrderBtn.disabled = false;
            placeOrderBtn.textContent = 'Place Order';
          }
        }, 1200);
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  },

  // =========================================================================
  // 7. Login Page Controller
  // =========================================================================
  initLogin() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');
    const togglePassBtn = document.getElementById('toggleLoginPassword');
    const demoFillBtn = document.getElementById('demoFillLoginBtn');

    if (togglePassBtn && passInput) {
      togglePassBtn.addEventListener('click', () => {
        const isPass = passInput.type === 'password';
        passInput.type = isPass ? 'text' : 'password';
      });
    }

    if (demoFillBtn && emailInput && passInput) {
      demoFillBtn.addEventListener('click', () => {
        emailInput.value = 'alex.morgan@example.com';
        passInput.value = 'NovaSecret2026!';
        NovaToast.show('Demo credentials inserted!', 'info');
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput ? emailInput.value.trim() : '';
        const password = passInput ? passInput.value.trim() : '';

        if (!NovaApp.isValidEmail(email)) {
          NovaToast.show('Please enter a valid email address.', 'error');
          if (emailInput) emailInput.classList.add('error');
          return;
        }

        if (password.length < 6) {
          NovaToast.show('Password must be at least 6 characters.', 'error');
          if (passInput) passInput.classList.add('error');
          return;
        }

        // Save demo session
        const userObj = {
          name: email.split('@')[0].replace('.', ' '),
          email: email,
          loggedIn: true
        };

        NovaStorage.saveUser(userObj);
        NovaToast.show(`Welcome back, ${userObj.name}!`, 'success');

        setTimeout(() => {
          window.location.href = 'shop.html';
        }, 800);
      });
    }
  },

  // =========================================================================
  // 8. Register Page Controller
  // =========================================================================
  initRegister() {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('regConfirmPassword');
    const termsCheckbox = document.getElementById('regTerms');
    const togglePassBtn = document.getElementById('toggleRegPassword');

    if (togglePassBtn && passInput) {
      togglePassBtn.addEventListener('click', () => {
        const isPass = passInput.type === 'password';
        passInput.type = isPass ? 'text' : 'password';
        if (confirmInput) confirmInput.type = isPass ? 'text' : 'password';
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const pass = passInput ? passInput.value.trim() : '';
        const confirmPass = confirmInput ? confirmInput.value.trim() : '';

        if (!name) {
          NovaToast.show('Please provide your full name.', 'error');
          return;
        }

        if (!NovaApp.isValidEmail(email)) {
          NovaToast.show('Please provide a valid email address.', 'error');
          return;
        }

        if (pass.length < 6) {
          NovaToast.show('Password must be at least 6 characters.', 'error');
          return;
        }

        if (pass !== confirmPass) {
          NovaToast.show('Passwords do not match.', 'error');
          return;
        }

        if (termsCheckbox && !termsCheckbox.checked) {
          NovaToast.show('Please agree to the Terms of Service to continue.', 'error');
          return;
        }

        const userObj = {
          name: name,
          email: email,
          loggedIn: true
        };

        NovaStorage.saveUser(userObj);
        NovaToast.show(`Registration successful! Welcome to NovaMart, ${name}.`, 'success');

        setTimeout(() => {
          window.location.href = 'shop.html';
        }, 800);
      });
    }
  },

  // =========================================================================
  // 9. Wishlist Page Controller
  // =========================================================================
  initWishlist() {
    const grid = document.getElementById('wishlistGrid');
    const emptyState = document.getElementById('wishlistEmptyState');
    const headerBar = document.getElementById('wishlistHeaderBar');
    const countEl = document.getElementById('wishlistItemsCount');

    const render = () => {
      const wishlist = NovaStorage.getWishlist();

      if (wishlist.length === 0) {
        if (grid) grid.style.display = 'none';
        if (headerBar) headerBar.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      if (grid) grid.style.display = 'grid';
      if (headerBar) headerBar.style.display = 'flex';
      if (emptyState) emptyState.style.display = 'none';

      if (countEl) {
        countEl.textContent = `${wishlist.length} saved item${wishlist.length === 1 ? '' : 's'}`;
      }

      if (grid) {
        grid.innerHTML = wishlist.map(id => {
          const product = getProductById(id);
          if (!product) return '';
          return NovaApp.createProductCardHTML(product);
        }).join('');
      }
    };

    // Move all to cart
    const moveAllBtn = document.getElementById('wishlistMoveAllBtn');
    if (moveAllBtn) {
      moveAllBtn.addEventListener('click', () => {
        const wishlist = NovaStorage.getWishlist();
        if (wishlist.length === 0) return;

        wishlist.forEach(id => {
          NovaApp.addToCart(id, 1, false);
        });

        NovaStorage.saveWishlist([]);
        render();
        NovaToast.show('All items moved to your shopping cart!', 'success');
      });
    }

    // Clear wishlist
    const clearBtn = document.getElementById('clearWishlistBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all items from your wishlist?')) {
          NovaStorage.saveWishlist([]);
          render();
          NovaToast.show('Wishlist cleared.', 'info');
        }
      });
    }

    render();
  },

  // =========================================================================
  // 10. Contact Page Controller
  // =========================================================================
  initContact() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const successBanner = document.getElementById('contactSuccessBanner');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');

        if (!nameInput.value.trim() || !NovaApp.isValidEmail(emailInput.value.trim()) || !messageInput.value.trim()) {
          NovaToast.show('Please fill in your name, valid email, and message.', 'error');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending Message...';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
          if (successBanner) {
            successBanner.style.display = 'block';
            successBanner.scrollIntoView({ behavior: 'smooth' });
          }
          contactForm.reset();
          NovaToast.show('Your demo message was simulated successfully!', 'success');
        }, 800);
      });
    }

    // Interactive FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          faqItems.forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      }
    });
  }
};

// Attach to window & module
if (typeof window !== 'undefined') {
  window.NovaPageController = NovaPageController;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NovaPageController };
}

// Initialize page controller on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    NovaPageController.init();
  });
}

