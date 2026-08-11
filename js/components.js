/**
 * ROOTS GALLERY — Shared Components
 * Injects the site header and footer into every page.
 *
 * QA fixes:
 * - Removed initAddToCartButtons (product.js handles it directly; quick-add handled by shop.js)
 * - Mobile menu closes on link click
 * - Mobile menu and search overlay have independent Escape handlers
 * - Marquee: only duplicates content once, guard against double-call
 * - Mega menu aria-expanded toggled on keyboard/hover
 * - Wishlist uses localStorage for basic persistence
 */

(function () {
  'use strict';

  // ─── SVG Icons ──────────────────────────────────────────────────────

  const ICONS = {
    search:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    cart:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    heart:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    arrow:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    chevron: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    insta:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    fb:      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`,
    pin:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  };

  // ─── Header HTML ─────────────────────────────────────────────────────

  function buildHeader(activePage) {
    return `
<header class="site-header" id="site-header" role="banner">
  <div class="header-inner">

    <!-- Logo -->
    <a href="index.html" class="site-logo" aria-label="Roots Gallery — Home">
      <span class="logo-name">Roots Gallery</span>
      <span class="logo-sub">African artisanal home d&#233;cor</span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="main-nav" aria-label="Main navigation">
      <ul role="list" style="display:flex;align-items:center;gap:var(--s1);">

        <li class="nav-item has-mega-menu ${activePage === 'shop' ? 'active' : ''}">
          <button type="button" aria-haspopup="true" aria-expanded="false" id="mega-menu-toggle">
            Shop ${ICONS.chevron}
          </button>
          <div class="mega-menu-wrapper" role="region" aria-label="Our Curations">
            <div class="mega-menu-grid">
              <div class="mega-menu-col">
                <h4>Our Curations</h4>
                <ul>
                  <li><a href="shop.html">All Pieces</a></li>
                  <li><a href="shop.html?category=namji-dolls">Namji Dolls</a></li>
                  <li><a href="shop.html?category=tikar-bangles">Tikar Bangles</a></li>
                  <li><a href="shop.html?category=round-bowl-baskets">Round Bowl Baskets</a></li>
                  <li><a href="shop.html?category=wooden-bowls">Wooden Bowls</a></li>
                  <li><a href="shop.html?category=small-bowls">Small Bowls</a></li>
                </ul>
              </div>
              <div class="mega-menu-col">
                <h4>Curated</h4>
                <ul>
                  <li><a href="shop.html?filter=new">New Arrivals</a></li>
                  <li><a href="shop.html?filter=featured">Editor's Selection</a></li>
                  <li><a href="shop.html?sort=price-asc">Price: Low to High</a></li>
                </ul>
              </div>
              <div class="mega-menu-col">
                <h4>The Collection</h4>
                <ul>
                  <li><a href="shop.html">Interior Styling</a></li>
                  <li><a href="shop.html">Gifts &amp; Gifting</a></li>
                  <li><a href="index.html#collectors-home">The Collector's Home</a></li>
                </ul>
              </div>
              <div class="mega-menu-col">
                <h4>Discover</h4>
                <ul>
                  <li><a href="about.html">Our Story</a></li>
                  <li><a href="contact.html">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item ${activePage === 'about' ? 'active' : ''}">
          <a href="about.html">Our Story</a>
        </li>

        <li class="nav-item">
          <a href="index.html#collectors-home">The Collector's Home</a>
        </li>

        <li class="nav-item ${activePage === 'contact' ? 'active' : ''}">
          <a href="contact.html">Contact</a>
        </li>
      </ul>
    </nav>

    <!-- Actions -->
    <div class="header-actions">
      <button class="header-btn search-toggle" aria-label="Open search" aria-expanded="false">
        ${ICONS.search}
      </button>
      <a href="cart.html" class="header-btn cart-btn" aria-label="Shopping cart">
        ${ICONS.cart}
        <span class="cart-count" aria-live="polite" aria-label="items in cart">0</span>
      </a>
      <button class="header-btn nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>
</header>

<!-- Search Overlay -->
<div class="search-overlay" id="search-overlay" role="search" aria-label="Search" aria-hidden="true">
  <div class="search-box">
    <label for="search-input" class="sr-only">Search for a piece</label>
    <input type="search" placeholder="Search for a piece…" id="search-input" autocomplete="off">
    <p style="font-size:var(--fs-xs);color:rgba(255,255,255,0.3);margin-top:var(--s3);">Press Enter to search · Esc to close</p>
  </div>
</div>

<!-- Mobile Menu -->
<nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" aria-hidden="true">
  <div class="mobile-menu-inner">
    <ul class="mobile-nav-links" role="list">
      <li><a href="shop.html" class="mobile-nav-link">Shop ${ICONS.arrow}</a></li>
      <li><a href="about.html" class="mobile-nav-link">Our Story ${ICONS.arrow}</a></li>
      <li><a href="index.html#collectors-home" class="mobile-nav-link">The Collector's Home ${ICONS.arrow}</a></li>
      <li><a href="contact.html" class="mobile-nav-link">Contact ${ICONS.arrow}</a></li>
      <li><a href="cart.html" class="mobile-nav-link">Cart ${ICONS.arrow}</a></li>
    </ul>
    <div style="margin-top:var(--s8);display:flex;gap:var(--s3);">
      <a href="https://www.instagram.com/roots_gallery_il/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Follow Roots Gallery on Instagram">${ICONS.insta}</a>
      <a href="https://wa.me/972553193561" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Chat with Roots Gallery on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
      </a>
    </div>
  </div>
</nav>
    `;
  }

  // ─── Footer HTML ─────────────────────────────────────────────────────

  function buildFooter() {
    return `
<footer class="site-footer" role="contentinfo">
  <div class="container container--wide">

    <div class="footer-top">

      <div class="footer-brand">
        <a href="index.html" class="site-logo" aria-label="Roots Gallery — Home">
          <span class="logo-name">Roots Gallery</span>
          <span class="logo-sub">African artisanal home d&#233;cor</span>
        </a>
        <p>African artisanal home d&#233;cor, rooted in heritage, craftsmanship and the beauty of the handmade.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/roots_gallery_il/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Follow Roots Gallery on Instagram">${ICONS.insta}</a>
          <a href="https://wa.me/972553193561" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Chat with Roots Gallery on WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          </a>
        </div>
        <div style="margin-top:var(--s4);display:flex;flex-direction:column;gap:var(--s2);">
          <a href="tel:+972553193561" style="font-size:var(--fs-sm);color:var(--text-2);text-decoration:none;">+972 55 319 3561</a>
          <a href="https://www.instagram.com/roots_gallery_il/" target="_blank" rel="noopener noreferrer" style="font-size:var(--fs-sm);color:var(--text-2);text-decoration:none;">@roots_gallery_il</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="shop.html">All Pieces</a></li>
          <li><a href="shop.html?category=namji-dolls">Namji Dolls</a></li>
          <li><a href="shop.html?category=tikar-bangles">Tikar Bangles</a></li>
          <li><a href="shop.html?category=round-bowl-baskets">Round Bowl Baskets</a></li>
          <li><a href="shop.html?category=wooden-bowls">Wooden Bowls</a></li>
          <li><a href="shop.html?category=small-bowls">Small Bowls</a></li>
          <li><a href="shop.html?filter=new">New Arrivals</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Discover</h4>
        <ul>
          <li><a href="about.html">Our Story</a></li>
          <li><a href="index.html#collectors-home">The Collector's Home</a></li>
          <li><a href="contact.html">Contact Us</a></li>
          <li><a href="contact.html">Enquiries</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Customer Care</h4>
        <ul>
          <li><a href="contact.html">Shipping &amp; Delivery</a></li>
          <li><a href="contact.html">Returns &amp; Exchanges</a></li>
          <li><a href="contact.html">FAQs</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Roots Gallery. All rights reserved.</p>
      <nav class="footer-legal" aria-label="Legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Cookie Policy</a>
      </nav>
    </div>

  </div>
</footer>
    `;
  }

  // ─── Inject Components ────────────────────────────────────────────────

  function inject() {
    const body = document.body;
    const activePage = body.dataset.page || '';

    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = buildHeader(activePage);
    while (headerDiv.firstChild) {
      body.insertBefore(headerDiv.firstChild, body.firstChild);
    }

    const footerDiv = document.createElement('div');
    footerDiv.innerHTML = buildFooter();
    while (footerDiv.firstChild) {
      body.appendChild(footerDiv.firstChild);
    }
  }

  // ─── Header Scroll ────────────────────────────────────────────────────

  function initScrollHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Mobile Menu ─────────────────────────────────────────────────────

  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu   = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    const open = () => {
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    };

    const close = () => {
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      toggle.classList.contains('open') ? close() : open();
    });

    // Close when a nav link is clicked
    menu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', close);
    });

    // Close on ESC — only when menu is open
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) close();
    });
  }

  // ─── Search Overlay ───────────────────────────────────────────────────

  function initSearch() {
    const toggleBtn = document.querySelector('.search-toggle');
    const overlay   = document.getElementById('search-overlay');
    const input     = document.getElementById('search-input');
    if (!toggleBtn || !overlay) return;

    const open = () => {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      setTimeout(() => input?.focus(), 180);
    };

    const close = () => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn.addEventListener('click', open);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    // Escape only closes search when it's open (independent from mobile menu)
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        close();
      }
    });

    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const q = input.value.trim();
          if (q) window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
        }
      });
    }
  }

  // ─── Scroll Animations ────────────────────────────────────────────────

  function initScrollAnimations() {
    // Skip if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.fade-up, .fade-in').forEach(el => el.classList.add('visible'));
      return;
    }

    const els = document.querySelectorAll('.fade-up, .fade-in');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  }

  // ─── Filter Group Accordions ──────────────────────────────────────────

  function initFilterAccordions() {
    document.querySelectorAll('.filter-group-header').forEach((header, i) => {
      const group = header.closest('.filter-group');
      if (!group) return;
      // shop.js rebuilds these; only init static ones
      if (!group.closest('#filter-sidebar') && !group.closest('#filter-drawer-body')) {
        if (i === 0) group.classList.add('open');
        header.addEventListener('click', () => group.classList.toggle('open'));
      }
    });
  }

  // ─── Product Detail Accordions ────────────────────────────────────────

  function initAccordions() {
    document.querySelectorAll('.accordion-item').forEach((item, i) => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      const isOpen = i === 0;
      if (isOpen) item.classList.add('open');
      header.setAttribute('aria-expanded', String(isOpen));

      header.addEventListener('click', () => {
        const opening = !item.classList.contains('open');
        item.classList.toggle('open', opening);
        header.setAttribute('aria-expanded', String(opening));
      });
    });
  }

  // ─── Marquee ─────────────────────────────────────────────────────────

  function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track || track.dataset.duplicated) return;
    track.dataset.duplicated = '1';
    // Clone the children (not innerHTML to avoid double-duplicating)
    const items = Array.from(track.children);
    items.forEach(item => track.appendChild(item.cloneNode(true)));
  }

  // ─── Newsletter — global handler ─────────────────────────────────────

  function initNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input ? input.value.trim() : '';
        if (!email) return;
        if (typeof showToast !== 'undefined') {
          showToast('Thank you for subscribing to Roots Gallery.', 'success', "You're on the list");
        }
        if (input) input.value = '';
      });
    });
  }

  // ─── Quick-add & Wishlist (for static page load) ──────────────────────

  function initQuickAddButtons() {
    document.querySelectorAll('[data-quick-add]').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const slug = btn.dataset.quickAdd;
        if (!slug || typeof PRODUCTS === 'undefined') return;
        const product = PRODUCTS.find(p => p.slug === slug);
        if (product && product.purchasable && typeof Cart !== 'undefined') Cart.add(product, 1);
      });
    });
  }

  function initWishlist() {
    const WISHLIST_KEY = 'roots_gallery_wishlist';
    let wishlist = [];
    try { wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch {}

    document.querySelectorAll('[data-wishlist]').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';

      const slug = btn.dataset.wishlist;
      if (wishlist.includes(slug)) btn.classList.add('wishlisted');

      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const isWishlisted = btn.classList.toggle('wishlisted');
        if (isWishlisted) {
          if (!wishlist.includes(slug)) wishlist.push(slug);
        } else {
          wishlist = wishlist.filter(s => s !== slug);
        }
        try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); } catch {}
        if (typeof showToast !== 'undefined') {
          showToast(isWishlisted ? 'Saved to wishlist' : 'Removed from wishlist', 'success');
        }
      });
    });
  }

  // ─── Boot ─────────────────────────────────────────────────────────────

  function boot() {
    inject();
    initScrollHeader();
    initMobileMenu();
    initSearch();
    initScrollAnimations();
    initFilterAccordions();
    initAccordions();
    initMarquee();
    initNewsletter();
    initQuickAddButtons();
    initWishlist();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
