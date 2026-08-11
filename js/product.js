/**
 * ROOTS GALLERY — Product Detail Page Logic
 *
 * Handles dynamic rendering of the product detail page.
 * Only displays fields confirmed in the product data (Winter 2026 catalogue).
 * Add to Cart is gated behind product.purchasable.
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

  document.title = `${product.name}${product.colour ? ` — ${product.colour}` : ''} ${product.styleNumber} | ROOTS`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `${product.name}${product.colour ? `, ${product.colour}` : ''} — style ${product.styleNumber}. Handcrafted African artisanal piece from ROOTS.`;
  }

  // ─── Gallery ──────────────────────────────────────────────────────────

  const mainImage = document.getElementById('gallery-main-image');
  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.alt;
  }

  // Single image per product — hide thumbnail strip
  const thumbsContainer = document.getElementById('gallery-thumbs');
  if (thumbsContainer) {
    thumbsContainer.style.display = 'none';
    const gallery = document.querySelector('.product-gallery');
    if (gallery) gallery.style.gridTemplateColumns = '1fr';
  }

  // ─── Populate fields ──────────────────────────────────────────────────

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  };

  const setHTML = (id, html) => {
    const el = document.getElementById(id);
    if (el && html != null) el.innerHTML = html;
  };

  const hide = id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  };

  setText('product-category',   product.categoryLabel);
  setText('product-title',      product.name);
  setText('breadcrumb-product', `${product.name} ${product.styleNumber}`);

  // Price display
  const priceEl = document.getElementById('product-price');
  if (priceEl) {
    if (product.purchasable && product.priceNIS !== null) {
      priceEl.textContent = `\u20AA${product.priceNIS}`;
    } else {
      priceEl.innerHTML = product.requiresPriceConfirmation
        ? `<span class="price-on-request">Price confirmation required</span>`
        : `<span class="price-on-request">Enquire for price</span>`;
    }
  }

  // Product Details table (replaces accordion sections)
  const detailsTable = document.getElementById('product-details-table');
  if (detailsTable) {
    const rows = [
      { label: 'Style Number', value: product.styleNumber },
      { label: 'Category',     value: product.categoryLabel },
      { label: 'Colour',       value: product.colour },
      { label: 'Season',       value: product.season },
    ].filter(r => r.value != null);

    detailsTable.innerHTML = rows.map(r => `
      <div class="detail-row">
        <span class="detail-label">${r.label}</span>
        <span class="detail-value">${r.value}</span>
      </div>
    `).join('');
  }

  // Hide availability indicator (no stock data available)
  hide('product-availability');

  // Hide description paragraph (no description in catalogue data)
  const descEl = document.getElementById('product-description');
  if (descEl) descEl.style.display = 'none';

  // ─── Purchase controls ────────────────────────────────────────────────

  const actionsEl   = document.querySelector('.product-actions');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const qtyInput    = document.getElementById('product-qty');
  const qtyDec      = document.getElementById('qty-dec');
  const qtyInc      = document.getElementById('qty-inc');

  if (!product.purchasable) {
    // Not purchasable — replace actions with enquire message
    if (actionsEl) {
      actionsEl.innerHTML = `
        <p class="product-enquire-note">
          ${product.requiresPriceConfirmation
            ? 'The selling price for this item requires confirmation. Please get in touch to place an order.'
            : 'Pricing for this piece is not yet available. Please enquire for availability and pricing.'}
        </p>
        <a href="contact.html" class="btn btn-ghost btn-lg" style="max-width:400px;">Enquire About This Piece</a>
      `;
    }
  } else {
    // Purchasable — bind quantity and add-to-cart
    qtyDec?.addEventListener('click', () => {
      const val = parseInt(qtyInput?.value) || 1;
      if (qtyInput && val > 1) qtyInput.value = val - 1;
    });

    qtyInc?.addEventListener('click', () => {
      const val = parseInt(qtyInput?.value) || 1;
      if (qtyInput) qtyInput.value = val + 1;
    });

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        if (typeof Cart === 'undefined') return;
        const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1;
        Cart.add(product, qty);

        const original = addToCartBtn.textContent;
        addToCartBtn.textContent = '\u2713 Added to Cart';
        addToCartBtn.disabled    = true;
        setTimeout(() => {
          addToCartBtn.textContent = original;
          addToCartBtn.disabled    = false;
        }, 2500);
      });
    }
  }

  // ─── Collection story link ────────────────────────────────────────────

  const COLLECTION_STORIES = {
    'namji-dolls': {
      label: 'Namji Dolls',
      intro: 'Handcrafted symbols of beauty, fertility and protection, originating from the Namji people of Cameroon.',
    },
    'tikar-bangles': {
      label: 'Tikar Bangles',
      intro: 'Wearable art inspired by the centuries-old beadwork traditions of Cameroon\'s Tikar people.',
    },
    'round-bowl-baskets': {
      label: 'Round Bowl Baskets',
      intro: 'Hand-crafted from locally gathered grasses and natural fibres, celebrating the artistry of African weaving.',
    },
  };

  const collectionLinkEl = document.getElementById('product-collection-link');
  if (collectionLinkEl) {
    const story = COLLECTION_STORIES[product.category];
    if (story) {
      const isHandcrafted = ['namji-dolls','tikar-bangles','round-bowl-baskets'].includes(product.category);
      collectionLinkEl.innerHTML = `
        <p class="subheading" style="margin-bottom:var(--s3);">Part of the ${story.label} collection</p>
        <p style="font-size:var(--fs-sm);color:var(--text-2);line-height:var(--lh-loose);margin-bottom:var(--s4);">${story.intro}</p>
        ${isHandcrafted ? `<p style="font-size:var(--fs-xs);color:var(--text-3);font-style:italic;margin-bottom:var(--s5);">As each piece is handcrafted, natural variations are part of its individual character.</p>` : ''}
        <a href="shop.html?category=${product.category}" class="text-link" style="font-size:var(--fs-sm);">
          Explore the ${story.label} collection
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:14px;height:14px;margin-left:6px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      `;
    } else {
      collectionLinkEl.style.display = 'none';
    }
  }

  // ─── Accordion — keep aria-expanded in sync ───────────────────────────

  document.querySelectorAll('.accordion-header').forEach(header => {
    const item = header.closest('.accordion-item');
    if (!item) return;
    const updateAria = () => {
      header.setAttribute('aria-expanded', String(item.classList.contains('open')));
    };
    updateAria();
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
        const badge = p.isNew ? `<span class="badge badge--new">New</span>` : '';
        const priceHtml = p.purchasable && p.priceNIS !== null
          ? `\u20AA${p.priceNIS}`
          : `<span class="price-on-request">Enquire for price</span>`;
        const cartBtn = p.purchasable
          ? `<button class="product-card-action-btn" data-quick-add="${p.slug}"
                     aria-label="Add ${p.name} to cart" title="Add to cart">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
             </button>`
          : '';

        return `
          <article class="product-card">
            <a href="product.html?slug=${p.slug}" class="product-card-image"
               aria-label="View ${p.name} ${p.styleNumber}">
              <img src="${p.image}" alt="${p.alt}" loading="lazy" width="800" height="1067">
              ${badge ? `<div class="product-card-badges">${badge}</div>` : ''}
              <div class="product-card-actions">
                ${cartBtn}
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
              <div class="product-card-style-number">${p.styleNumber}</div>
              ${p.colour ? `<div class="product-card-material">${p.colour}</div>` : ''}
              <div class="product-card-footer">
                <span class="product-price">${priceHtml}</span>
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
          if (p && p.purchasable && typeof Cart !== 'undefined') Cart.add(p, 1);
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
        color:rgba(255,255,255,0.6);font-size:2rem;cursor:pointer;line-height:1;padding:8px;
      `;
      closeBtn.textContent = '\u00D7';

      overlay.appendChild(img);
      overlay.appendChild(closeBtn);

      const dismiss = () => overlay.remove();
      overlay.addEventListener('click', e => { if (e.target === overlay || e.target === closeBtn) dismiss(); });
      closeBtn.addEventListener('click', dismiss);

      const escHandler = e => {
        if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', escHandler); }
      };
      document.addEventListener('keydown', escHandler);

      document.body.appendChild(overlay);
      closeBtn.focus();
    });
  }
});
