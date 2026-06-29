/**
 * ROOTS GALLERY — Product Detail Page Logic
 *
 * QA fixes:
 * - Add-to-cart handled here only; initAddToCartButtons removed from components.js
 * - Accordion aria-expanded updated on toggle
 * - Related product cards include quick-add and wishlist
 * - Gallery lightbox gets role/aria attributes
 * - Sold-out check uses correct availability values
 */

document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('product-detail-root')) return;

  // ─── Get slug from URL ────────────────────────────────────────────────

  const params  = new URLSearchParams(window.location.search);
  const slug    = params.get('slug');
  const product = typeof getProductBySlug !== 'undefined' ? getProductBySlug(slug) : null;

  if (!product) {
    document.getElementById('product-detail-root').innerHTML = `
      <div class="container" style="padding:var(--s24) 0;text-align:center;">
        <p class="subheading" style="margin-bottom:var(--s4);">Collection</p>
        <h1 class="heading-2" style="margin-bottom:var(--s5);">Piece not found</h1>
        <p style="color:var(--text-2);margin-bottom:var(--s8);max-width:36ch;margin-inline:auto;">
          We couldn't find that piece. It may have been removed or the URL may be incorrect.
        </p>
        <a href="shop.html" class="btn btn-primary btn-lg">Browse the Collection</a>
      </div>
    `;
    return;
  }

  // ─── Page title and meta ──────────────────────────────────────────────

  document.title = `${product.name} — Roots Gallery`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = product.shortDescription;

  // ─── Gallery ──────────────────────────────────────────────────────────

  const thumbsContainer = document.getElementById('gallery-thumbs');
  const mainImage       = document.getElementById('gallery-main-image');

  // Set main image immediately
  if (mainImage) {
    mainImage.src = product.images[0];
    mainImage.alt = `${product.name} — front view`;
  }

  if (thumbsContainer && product.images.length > 1) {
    thumbsContainer.innerHTML = product.images.map((src, i) => `
      <button
        class="gallery-thumb ${i === 0 ? 'active' : ''}"
        data-index="${i}"
        aria-label="View ${product.name}, image ${i + 1} of ${product.images.length}"
        ${i === 0 ? 'aria-pressed="true"' : 'aria-pressed="false"'}
      >
        <img src="${src}" alt="${product.name} — view ${i + 1}" loading="lazy">
      </button>
    `).join('');

    thumbsContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.dataset.index);
        if (mainImage) {
          mainImage.src        = product.images[index];
          mainImage.alt        = `${product.name} — view ${index + 1}`;
        }
        thumbsContainer.querySelectorAll('.gallery-thumb').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-pressed', 'false');
        });
        thumb.classList.add('active');
        thumb.setAttribute('aria-pressed', 'true');
      });
    });
  } else if (thumbsContainer) {
    thumbsContainer.style.display = 'none';
    const gallery = document.querySelector('.product-gallery');
    if (gallery) gallery.style.gridTemplateColumns = '1fr';
  }

  // ─── Populate product info fields ────────────────────────────────────

  const fill = (id, value, asText = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (asText) el.textContent = value;
    else        el.innerHTML   = value;
  };

  fill('product-category',    product.categoryLabel, true);
  fill('product-title',       product.name,          true);
  fill('product-price',       `$${product.price}`);
  fill('product-description', product.shortDescription, true);
  fill('product-full-desc',   product.description);
  fill('product-cultural',    `<p>${product.culturalNote}</p>`);
  fill('product-care',        product.care, true);
  fill('product-shipping',    product.shipping, true);
  fill('breadcrumb-product',  product.name, true);
  fill('detail-materials',    product.materials, true);
  fill('detail-dimensions',   product.dimensions, true);
  fill('detail-origin',       product.origin, true);
  fill('detail-weight',       product.weight, true);

  // Availability indicator
  const availEl = document.getElementById('product-availability');
  if (availEl) {
    if (product.availability === 'in-stock') {
      availEl.innerHTML = `<span style="color:var(--sage);font-size:var(--fs-sm);display:flex;align-items:center;gap:6px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> In stock — ready to ship</span>`;
    } else if (product.availability === 'limited') {
      availEl.innerHTML = `<span style="color:var(--terracotta);font-size:var(--fs-sm);display:flex;align-items:center;gap:6px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg> Limited availability</span>`;
    } else {
      availEl.innerHTML = `<span style="color:var(--taupe);font-size:var(--fs-sm);">Sold out — join the waiting list</span>`;
    }
  }

  // ─── Quantity controls ────────────────────────────────────────────────

  const qtyInput = document.getElementById('product-qty');
  const qtyDec   = document.getElementById('qty-dec');
  const qtyInc   = document.getElementById('qty-inc');

  qtyDec?.addEventListener('click', () => {
    const val = parseInt(qtyInput?.value) || 1;
    if (qtyInput && val > 1) qtyInput.value = val - 1;
  });

  qtyInc?.addEventListener('click', () => {
    const val = parseInt(qtyInput?.value) || 1;
    if (qtyInput) qtyInput.value = val + 1;
  });

  // ─── Add to cart ──────────────────────────────────────────────────────

  const addToCartBtn = document.getElementById('add-to-cart-btn');

  if (addToCartBtn) {
    if (product.availability === 'sold-out') {
      addToCartBtn.textContent = 'Sold Out';
      addToCartBtn.disabled    = true;
      addToCartBtn.classList.replace('btn-primary', 'btn-ghost');
    } else {
      addToCartBtn.addEventListener('click', () => {
        if (typeof Cart === 'undefined') return;
        const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1;
        Cart.add(product, qty);

        const original = addToCartBtn.textContent;
        addToCartBtn.textContent = '✓ Added to Cart';
        addToCartBtn.disabled    = true;
        setTimeout(() => {
          addToCartBtn.textContent = original;
          addToCartBtn.disabled    = false;
        }, 2500);
      });
    }
  }

  // ─── Accordion — keep aria-expanded in sync ───────────────────────────
  // Note: components.js initAccordions() also runs; this patch ensures any
  // accordion created after DOMContentLoaded also gets correct ARIA.
  document.querySelectorAll('.accordion-header').forEach(header => {
    const item = header.closest('.accordion-item');
    if (!item) return;
    const updateAria = () => {
      header.setAttribute('aria-expanded', String(item.classList.contains('open')));
    };
    // Initial state
    updateAria();
    // After click
    header.addEventListener('click', () => setTimeout(updateAria, 0));
  });

  // ─── Related products ─────────────────────────────────────────────────

  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid && typeof PRODUCTS !== 'undefined') {
    const related = PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    if (related.length === 0) {
      const section = document.getElementById('related-products-section');
      if (section) section.style.display = 'none';
    } else {
      relatedGrid.innerHTML = related.map(p => {
        const badge = p.availability === 'limited'
          ? `<span class="badge badge--limited">Limited</span>`
          : p.isNew ? `<span class="badge badge--new">New</span>` : '';
        return `
          <article class="product-card">
            <a href="product.html?slug=${p.slug}" class="product-card-image"
               aria-label="View ${p.name}">
              <img src="${p.thumbnail}" alt="${p.name}" loading="lazy" width="600" height="800">
              ${badge ? `<div class="product-card-badges">${badge}</div>` : ''}
              <div class="product-card-actions">
                <button class="product-card-action-btn" data-quick-add="${p.slug}"
                        aria-label="Add ${p.name} to cart" title="Add to cart">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                </button>
                <button class="product-card-action-btn" data-wishlist="${p.slug}"
                        aria-label="Save ${p.name} to wishlist" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
              </div>
            </a>
            <div class="product-card-info">
              <div class="product-card-category">${p.categoryLabel}</div>
              <h3 class="product-card-name">
                <a href="product.html?slug=${p.slug}">${p.name}</a>
              </h3>
              <div class="product-card-material">${p.materials.split(',')[0]}</div>
              <div class="product-card-footer">
                <span class="product-price">$${p.price}</span>
                <a href="product.html?slug=${p.slug}" class="product-card-quick-add">View</a>
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Bind quick-add and wishlist on the related grid
      relatedGrid.querySelectorAll('[data-quick-add]').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          const p = PRODUCTS.find(pr => pr.slug === btn.dataset.quickAdd);
          if (p && typeof Cart !== 'undefined') Cart.add(p, 1);
        });
      });
      relatedGrid.querySelectorAll('[data-wishlist]').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          btn.classList.toggle('wishlisted');
          if (typeof showToast !== 'undefined') {
            showToast(btn.classList.contains('wishlisted') ? 'Saved to wishlist' : 'Removed from wishlist', 'success');
          }
        });
      });
    }
  }

  // ─── Gallery zoom lightbox ────────────────────────────────────────────

  const zoomBtn = document.querySelector('.gallery-zoom-btn');
  if (zoomBtn && mainImage) {
    zoomBtn.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', `Zoom: ${product.name}`);
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:2000;
        display:flex;align-items:center;justify-content:center;cursor:zoom-out;
      `;

      const img = new Image();
      img.src = mainImage.src;
      img.alt = mainImage.alt;
      img.style.cssText = `max-width:90vw;max-height:90vh;object-fit:contain;`;

      const closeBtn = document.createElement('button');
      closeBtn.setAttribute('aria-label', 'Close zoom');
      closeBtn.style.cssText = `
        position:absolute;top:16px;right:20px;background:none;border:none;
        color:rgba(255,255,255,0.6);font-size:2rem;cursor:pointer;line-height:1;
        padding:8px;
      `;
      closeBtn.textContent = '×';

      overlay.appendChild(img);
      overlay.appendChild(closeBtn);

      const dismiss = () => overlay.remove();
      overlay.addEventListener('click', e => { if (e.target === overlay || e.target === closeBtn) dismiss(); });
      closeBtn.addEventListener('click', dismiss);

      const escHandler = e => { if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', escHandler); } };
      document.addEventListener('keydown', escHandler);

      document.body.appendChild(overlay);
      closeBtn.focus();
    });
  }
});
