/**
 * ROOTS GALLERY — Homepage Logic
 * Renders product carousels, new arrivals, etc.
 */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Product Card Builder ────────────────────────────────────────────

  function buildProductCard(product, size = 'default') {
    const badge = product.availability === 'limited'
      ? `<span class="badge badge--limited">Limited</span>`
      : product.isNew
        ? `<span class="badge badge--new">New</span>`
        : '';

    return `
      <article class="product-card">
        <a href="product.html?slug=${product.slug}" class="product-card-image" aria-label="${product.name}">
          <img
            src="${product.thumbnail}"
            alt="${product.name}"
            loading="lazy"
            width="600"
            height="800"
          >
          <div class="product-card-badges">${badge}</div>
          <div class="product-card-actions">
            <button
              class="product-card-action-btn"
              data-quick-add="${product.slug}"
              aria-label="Quick add ${product.name} to cart"
              title="Add to cart"
            >
              ${cartIconSVG()}
            </button>
            <button
              class="product-card-action-btn"
              data-wishlist="${product.slug}"
              aria-label="Add ${product.name} to wishlist"
              title="Wishlist"
            >
              ${heartIconSVG()}
            </button>
          </div>
        </a>
        <div class="product-card-info">
          <div class="product-card-category">${product.categoryLabel}</div>
          <h3 class="product-card-name">
            <a href="product.html?slug=${product.slug}">${product.name}</a>
          </h3>
          <div class="product-card-material">${product.materials.split(',')[0]}</div>
          <div class="product-card-footer">
            <span class="product-price">$${product.price}</span>
            <a
              href="product.html?slug=${product.slug}"
              class="product-card-quick-add"
              aria-label="View ${product.name}"
            >View</a>
          </div>
        </div>
      </article>
    `;
  }

  function cartIconSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;
  }

  function heartIconSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
  }

  // ─── New Arrivals Carousel ───────────────────────────────────────────

  const newArrivalsTrack = document.getElementById('new-arrivals-track');
  if (newArrivalsTrack && typeof PRODUCTS !== 'undefined') {
    const newItems = PRODUCTS.filter(p => p.isNew).slice(0, 6);
    // Fill up to 6 with featured if not enough new items
    const filler = PRODUCTS.filter(p => p.isFeatured && !p.isNew);
    const display = [...newItems, ...filler].slice(0, 6);
    newArrivalsTrack.innerHTML = display.map(p => buildProductCard(p)).join('');
    bindCardEvents(newArrivalsTrack);
  }

  // ─── Featured Products Grid ──────────────────────────────────────────

  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid && typeof PRODUCTS !== 'undefined') {
    const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
    featuredGrid.innerHTML = featured.map(p => buildProductCard(p)).join('');
    bindCardEvents(featuredGrid);
  }

  // ─── Carousel Navigation ─────────────────────────────────────────────

  document.querySelectorAll('[data-carousel]').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('[data-carousel-prev]');
    const nextBtn = wrapper.querySelector('[data-carousel-next]');
    if (!track) return;

    const scrollAmount = () => track.offsetWidth * 0.75;

    if (prevBtn) prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  });

  // ─── Hero Parallax (subtle, respects reduced motion and resize) ──────

  const heroImage = document.querySelector('.hero-image');
  if (heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Only apply when viewport is wide enough and hero is visible
          if (window.innerWidth > 768 && window.scrollY < window.innerHeight) {
            heroImage.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
          } else {
            heroImage.style.transform = '';
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Newsletter is now handled globally by components.js initNewsletter()

  // ─── Bind quick-add & wishlist after dynamic render ──────────────────

  function bindCardEvents(container) {
    if (!container) return;
    // Quick add
    container.querySelectorAll('[data-quick-add]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const slug = btn.dataset.quickAdd;
        if (!slug || typeof PRODUCTS === 'undefined') return;
        const product = PRODUCTS.find(p => p.slug === slug);
        if (!product || typeof Cart === 'undefined') return;
        Cart.add(product, 1);
      });
    });
    // Wishlist
    container.querySelectorAll('[data-wishlist]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('wishlisted');
        if (typeof showToast !== 'undefined') {
          showToast(
            btn.classList.contains('wishlisted') ? 'Added to wishlist' : 'Removed from wishlist',
            'success'
          );
        }
      });
    });
  }

});
