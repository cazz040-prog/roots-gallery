/**
 * ROOTS GALLERY — Cart Module
 * Handles cart state, localStorage persistence, and UI updates.
 */

const CART_KEY = 'roots_gallery_cart';

// ─── Cart State ─────────────────────────────────────────────────────

const Cart = {
  items: [],

  /** Load cart from localStorage */
  load() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      this.items = raw ? JSON.parse(raw) : [];
    } catch {
      this.items = [];
    }
    this._updateUI();
    return this;
  },

  /** Save cart to localStorage */
  save() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    this._updateUI();
  },

  /** Get total item count */
  get count() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  /** Get subtotal */
  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  /** Get shipping estimate (NIS) */
  get shipping() {
    if (this.subtotal === 0) return 0;
    return this.subtotal >= 500 ? 0 : 45;
  },

  /** Get total */
  get total() {
    return this.subtotal + this.shipping;
  },

  /** Add item to cart */
  add(product, qty = 1) {
    if (!product.purchasable || product.priceNIS === null) return this;
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({
        id:        product.id,
        slug:      product.slug,
        name:      product.name,
        styleNumber: product.styleNumber,
        category:  product.categoryLabel,
        price:     product.priceNIS,
        image:     product.image || product.thumbnail,
        materials: product.colour || '',
        qty,
      });
    }
    this.save();
    showToast(`${product.name} added to your cart`, 'cart');
    return this;
  },

  /** Remove item from cart */
  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    return this;
  },

  /** Update item quantity */
  updateQty(productId, qty) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      if (qty <= 0) {
        this.remove(productId);
      } else {
        item.qty = qty;
        this.save();
      }
    }
    return this;
  },

  /** Clear cart */
  clear() {
    this.items = [];
    this.save();
    return this;
  },

  /** Get item by id */
  getItem(productId) {
    return this.items.find(i => i.id === productId);
  },

  /** Check if product is in cart */
  has(productId) {
    return !!this.getItem(productId);
  },

  /** Update all cart count badges in DOM */
  _updateUI() {
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
      badge.textContent = this.count;
      badge.classList.toggle('has-items', this.count > 0);
    });
  },
};

// ─── Format helpers ──────────────────────────────────────────────────

function fmtPrice(n) {
  return '\u20AA' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0 });
}

// ─── Toast Notification ──────────────────────────────────────────────

/** Escape HTML for safe insertion into innerHTML */
function escToastHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(message, type = 'info', title = '') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const iconMap = {
    cart:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
    success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>',
    info:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>',
  };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <div class="toast-icon">${iconMap[type] || iconMap.info}</div>
    <div class="toast-text">
      ${title ? `<div class="toast-title">${escToastHtml(title)}</div>` : ''}
      <div class="toast-message">${escToastHtml(message)}</div>
    </div>
    <button class="toast-close" aria-label="Dismiss notification">×</button>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  const dismiss = () => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  setTimeout(dismiss, 4000);
}

// ─── Cart Page Renderer ───────────────────────────────────────────────

function renderCartPage() {
  const wrap = document.getElementById('cart-items-container');
  const summaryWrap = document.getElementById('cart-summary-container');
  if (!wrap) return;

  if (Cart.items.length === 0) {
    wrap.innerHTML = `
      <div class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
        </svg>
        <h2>Your cart is empty</h2>
        <p>You haven't added any pieces yet. Explore the collection to find your next Namji doll.</p>
        <a href="shop.html" class="btn btn-primary btn-lg">Shop the Collection</a>
      </div>
    `;
    if (summaryWrap) summaryWrap.style.display = 'none';
    return;
  }

  // Items
  wrap.innerHTML = Cart.items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-category">${item.category}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.materials}</div>
        <div class="cart-item-qty">
          <div class="cart-item-qty-control">
            <button class="cart-item-qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <div class="cart-item-qty-value">${item.qty}</div>
            <button class="cart-item-qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${fmtPrice(item.price * item.qty)}</div>
    </div>
  `).join('');

  // Summary
  if (summaryWrap) {
    summaryWrap.style.display = '';
    const shippingLabel = Cart.shipping === 0 ? '<span style="color:var(--sage)">Free</span>' : fmtPrice(Cart.shipping);
    summaryWrap.innerHTML = `
      <h3>Order Summary</h3>
      <div class="cart-summary-row">
        <span>Subtotal (${Cart.count} item${Cart.count !== 1 ? 's' : ''})</span>
        <span>${fmtPrice(Cart.subtotal)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Estimated Shipping</span>
        <span>${shippingLabel}</span>
      </div>
      ${Cart.shipping > 0 ? `<div class="cart-summary-row"><span style="font-size:var(--fs-xs);color:var(--text-3)">Free shipping on orders over \u20AA500</span></div>` : ''}
      <div class="cart-summary-row total">
        <span>Total</span>
        <span>${fmtPrice(Cart.total)}</span>
      </div>
      <div class="cart-summary-actions">
        <a href="checkout.html" class="btn btn-primary btn-full btn-lg">Proceed to Checkout</a>
        <a href="shop.html" class="btn btn-ghost btn-full">Continue Shopping</a>
      </div>
      <p class="cart-note">Taxes calculated at checkout. All pieces are insured during transit.</p>
    `;
  }

  // Bind events
  wrap.querySelectorAll('.cart-item-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const item = Cart.getItem(id);
      if (!item) return;
      Cart.updateQty(id, action === 'inc' ? item.qty + 1 : item.qty - 1);
      renderCartPage();
    });
  });

  wrap.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      Cart.remove(btn.dataset.id);
      renderCartPage();
    });
  });
}

// ─── Checkout Page Renderer ───────────────────────────────────────────

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-container');
  const totalsContainer = document.getElementById('checkout-totals-container');
  if (!container) return;

  if (Cart.items.length === 0) {
    container.innerHTML = '<p style="font-size:var(--fs-sm);color:var(--text-3)">No items in cart.</p>';
    return;
  }

  container.innerHTML = Cart.items.map(item => `
    <div class="checkout-item">
      <div class="checkout-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="checkout-item-badge">${item.qty}</div>
      </div>
      <div class="checkout-item-info">
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-meta">${item.category}</div>
      </div>
      <div class="checkout-item-price">${fmtPrice(item.price * item.qty)}</div>
    </div>
  `).join('');

  if (totalsContainer) {
    const shippingLabel = Cart.shipping === 0 ? 'Free' : fmtPrice(Cart.shipping);
    totalsContainer.innerHTML = `
      <div class="checkout-totals">
        <div class="cart-summary-row">
          <span>Subtotal</span><span>${fmtPrice(Cart.subtotal)}</span>
        </div>
        <div class="cart-summary-row">
          <span>Shipping</span><span>${shippingLabel}</span>
        </div>
        <div class="cart-summary-row total">
          <span>Total</span><span>${fmtPrice(Cart.total)}</span>
        </div>
      </div>
    `;
  }
}

// ─── Init ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  Cart.load();

  // Cart page
  renderCartPage();

  // Checkout summary
  renderCheckoutSummary();
});
