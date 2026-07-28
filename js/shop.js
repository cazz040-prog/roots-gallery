/**
 * ROOTS GALLERY — Shop / Collection Page Logic
 * Handles product rendering, filtering, sorting, and URL state.
 *
 * QA fixes:
 * - filterForm captured after buildFilters() injection (was null before)
 * - Duplicate form IDs replaced with unique class-based references
 * - Nested <label> → <span> (valid HTML)
 * - ?q= text search support added
 * - aria-pressed on view toggle buttons
 * - Filter state properly syncs between sidebar and drawer
 */

document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('shop-products-grid')) return;

  // ─── State ───────────────────────────────────────────────────────────

  const state = {
    sort:    'featured',
    query:   '',
    filters: {
      categories:   [],
      colors:       [],
      availability: [],
      minPrice:     undefined,
      maxPrice:     undefined,
    },
    view: 'grid',
  };

  // ─── DOM refs ─────────────────────────────────────────────────────────

  const grid        = document.getElementById('shop-products-grid');
  const countEl     = document.getElementById('shop-product-count');
  const sortSelect  = document.getElementById('shop-sort-select');
  const gridViewBtn = document.getElementById('view-grid');
  const listViewBtn = document.getElementById('view-list');

  // Filter-related refs (captured after injection)
  let sidebarFormEl = null;
  let drawerFormEl  = null;

  // ─── Parse URL params on load ─────────────────────────────────────────

  const params = new URLSearchParams(window.location.search);

  if (params.get('category')) {
    state.filters.categories = [params.get('category')];
  }
  if (params.get('q')) {
    state.query = params.get('q').toLowerCase().trim();
  }
  if (params.get('filter') === 'new')      state.filters._new      = true;
  if (params.get('filter') === 'featured') state.filters._featured = true;
  if (params.get('filter') === 'limited')  state.filters.availability = ['limited'];
  if (params.get('sort')) {
    state.sort = params.get('sort');
    if (sortSelect) sortSelect.value = state.sort;
  }

  // ─── Get filtered + sorted products ──────────────────────────────────

  function getFilteredProducts() {
    if (typeof PRODUCTS === 'undefined') return [];
    let list = [...PRODUCTS];

    // URL meta filters
    if (state.filters._new)      list = list.filter(p => p.isNew);
    if (state.filters._featured) list = list.filter(p => p.isFeatured);

    // Text search across name, category, style number, and colour
    if (state.query) {
      const q = state.query;
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.styleNumber.toLowerCase().includes(q) ||
        (p.colour && p.colour.toLowerCase().includes(q))
      );
    }

    // Standard filters
    if (typeof filterProducts !== 'undefined') {
      list = filterProducts(list, state.filters);
    }

    // Sort
    if (typeof sortProducts !== 'undefined') {
      list = sortProducts(list, state.sort);
    }

    return list;
  }

  // ─── Card HTML builder ────────────────────────────────────────────────

  function buildCardHTML(product) {
    const badge = product.isNew
      ? `<span class="badge badge--new">New</span>`
      : '';

    const colourLine = product.colour
      ? `<div class="product-card-material">${escHtml(product.colour)}</div>`
      : '';

    const priceHtml = product.purchasable && product.priceNIS !== null
      ? `<span itemprop="price" content="${product.priceNIS}">\u20AA${product.priceNIS}</span><meta itemprop="priceCurrency" content="ILS">`
      : `<span class="price-on-request">${product.requiresPriceConfirmation ? 'Price confirmation required' : 'Enquire for price'}</span>`;

    const cartBtn = product.purchasable
      ? `<button
           class="product-card-action-btn"
           data-quick-add="${escHtml(product.slug)}"
           aria-label="Add ${escHtml(product.name)} to cart"
           title="Add to cart"
         >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
         </button>`
      : '';

    return `
      <article class="product-card" itemscope itemtype="https://schema.org/Product">
        <a href="product.html?slug=${product.slug}" class="product-card-image"
           itemprop="url" aria-label="View ${escHtml(product.name)} ${escHtml(product.styleNumber)}">
          <img
            src="${escHtml(product.image)}"
            alt="${escHtml(product.alt)}"
            loading="lazy"
            width="800" height="1067"
            itemprop="image"
          >
          <div class="product-card-badges">${badge}</div>
          <div class="product-card-actions">
            ${cartBtn}
            <button
              class="product-card-action-btn"
              data-wishlist="${escHtml(product.slug)}"
              aria-label="Save ${escHtml(product.name)} to wishlist"
              title="Save to wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
          </div>
        </a>
        <div class="product-card-info">
          <div class="product-card-category">${escHtml(product.categoryLabel)}</div>
          <h2 class="product-card-name" itemprop="name">
            <a href="product.html?slug=${escHtml(product.slug)}">${escHtml(product.name)}</a>
          </h2>
          <div class="product-card-style-number">${escHtml(product.styleNumber)}</div>
          ${colourLine}
          <div class="product-card-footer"
               itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span class="product-price">${priceHtml}</span>
            <a href="product.html?slug=${escHtml(product.slug)}"
               class="product-card-quick-add"
               aria-label="View ${escHtml(product.name)}">View</a>
          </div>
        </div>
      </article>
    `;
  }

  // ─── Render ───────────────────────────────────────────────────────────

  function render() {
    const products = getFilteredProducts();

    if (countEl) {
      countEl.textContent = state.query
        ? `${products.length} result${products.length !== 1 ? 's' : ''} for "${state.query}"`
        : `${products.length} piece${products.length !== 1 ? 's' : ''}`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:var(--s20) 0;">
          <p style="font-size:var(--fs-xl);color:var(--text-3);margin-bottom:var(--s4);">No pieces found</p>
          <p style="font-size:var(--fs-sm);color:var(--text-3);margin-bottom:var(--s6);">
            ${state.query ? `No results for "<em>${escHtml(state.query)}</em>". ` : ''}Try adjusting or clearing your filters.
          </p>
          <button class="btn btn-ghost" id="clear-filters-inline">Clear all filters</button>
        </div>
      `;
      document.getElementById('clear-filters-inline')?.addEventListener('click', clearFilters);
      return;
    }

    grid.innerHTML = products.map(buildCardHTML).join('');
    bindGridEvents(grid);
  }

  // ─── Card event binding ───────────────────────────────────────────────

  function bindGridEvents(container) {
    container.querySelectorAll('[data-quick-add]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const product = typeof PRODUCTS !== 'undefined'
          ? PRODUCTS.find(p => p.slug === btn.dataset.quickAdd)
          : null;
        if (product && typeof Cart !== 'undefined') Cart.add(product, 1);
      });
    });

    container.querySelectorAll('[data-wishlist]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('wishlisted');
        if (typeof showToast !== 'undefined') {
          showToast(
            btn.classList.contains('wishlisted')
              ? 'Saved to wishlist'
              : 'Removed from wishlist',
            'success'
          );
        }
      });
    });
  }

  // ─── Read filter form state ───────────────────────────────────────────

  function syncFiltersFromForm(formEl) {
    if (!formEl) return;

    state.filters.categories = Array.from(
      formEl.querySelectorAll('input[name="category"]:checked')
    ).map(el => el.value);

    state.filters.colors = Array.from(
      formEl.querySelectorAll('input[name="colour"]:checked')
    ).map(el => el.value);

    state.filters.availability = Array.from(
      formEl.querySelectorAll('input[name="availability"]:checked')
    ).map(el => el.value);

    const minEl = formEl.querySelector('input[name="price-min"]');
    const maxEl = formEl.querySelector('input[name="price-max"]');
    state.filters.minPrice = minEl && minEl.value ? parseFloat(minEl.value) : undefined;
    state.filters.maxPrice = maxEl && maxEl.value ? parseFloat(maxEl.value) : undefined;
  }

  // ─── Sync checkboxes from state (pre-populate on page load) ──────────

  function syncFormFromState(formEl) {
    if (!formEl) return;

    state.filters.categories.forEach(cat => {
      const el = formEl.querySelector(`input[name="category"][value="${cat}"]`);
      if (el) el.checked = true;
    });

    state.filters.colors.forEach(val => {
      const el = formEl.querySelector(`input[name="colour"][value="${val}"]`);
      if (el) el.checked = true;
    });

    state.filters.availability.forEach(val => {
      const el = formEl.querySelector(`input[name="availability"][value="${val}"]`);
      if (el) el.checked = true;
    });
  }

  // ─── Clear filters ────────────────────────────────────────────────────

  function clearFilters() {
    state.filters = {
      categories: [], colors: [], availability: [],
      minPrice: undefined, maxPrice: undefined,
    };
    state.query = '';
    state.filters._new      = false;
    state.filters._featured = false;
    [sidebarFormEl, drawerFormEl].forEach(f => { if (f) f.reset(); });
    render();
    updateActiveFilterCount();
  }

  // ─── Active filter count badge ────────────────────────────────────────

  function updateActiveFilterCount() {
    const count =
      (state.filters.categories?.length  || 0) +
      (state.filters.colors?.length      || 0) +
      (state.filters.availability?.length|| 0) +
      (state.filters.minPrice !== undefined ? 1 : 0) +
      (state.filters.maxPrice !== undefined ? 1 : 0);

    document.querySelectorAll('.filter-active-count').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ─── Build filter UI ──────────────────────────────────────────────────

  function buildFilters(container, formId) {
    if (!container || typeof FILTER_OPTIONS === 'undefined') return null;

    container.innerHTML = `
      <form id="${formId}" class="filter-form" novalidate>

        <!-- Category -->
        <div class="filter-group open">
          <div class="filter-group-header">
            <span class="filter-group-title">Category</span>
            <svg class="filter-group-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="filter-group-body">
            <div class="filter-options">
              ${FILTER_OPTIONS.categories.map(opt => `
                <label class="filter-option">
                  <input type="checkbox" name="category" value="${opt.value}">
                  <span>${opt.label}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Colour -->
        <div class="filter-group">
          <div class="filter-group-header">
            <span class="filter-group-title">Colour</span>
            <svg class="filter-group-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="filter-group-body">
            <div class="filter-options">
              ${FILTER_OPTIONS.colors.map(opt => `
                <label class="filter-option">
                  <input type="checkbox" name="colour" value="${opt.value}">
                  <span>${opt.label}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Availability -->
        <div class="filter-group">
          <div class="filter-group-header">
            <span class="filter-group-title">Pricing</span>
            <svg class="filter-group-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="filter-group-body">
            <div class="filter-options">
              ${FILTER_OPTIONS.availability.map(opt => `
                <label class="filter-option">
                  <input type="checkbox" name="availability" value="${opt.value}">
                  <span>${opt.label}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Price range (NIS) -->
        <div class="filter-group">
          <div class="filter-group-header">
            <span class="filter-group-title">Price (₪ NIS)</span>
            <svg class="filter-group-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="filter-group-body">
            <div class="price-range-inputs">
              <input type="number" name="price-min" placeholder="₪ Min" min="0" max="9999" aria-label="Minimum price in NIS">
              <span class="price-range-sep">—</span>
              <input type="number" name="price-max" placeholder="₪ Max" min="0" max="9999" aria-label="Maximum price in NIS">
            </div>
          </div>
        </div>

      </form>
    `;

    const formEl = container.querySelector('.filter-form');

    // Re-init accordion headers inside newly built filter UI
    container.querySelectorAll('.filter-group-header').forEach(header => {
      const group = header.closest('.filter-group');
      header.addEventListener('click', () => group.classList.toggle('open'));
    });

    // Checkbox/input changes
    if (formEl) {
      formEl.addEventListener('change', () => {
        syncFiltersFromForm(formEl);
        render();
        updateActiveFilterCount();
      });

      // Sync initial state → form
      syncFormFromState(formEl);
    }

    return formEl;
  }

  // ─── Build sidebar + drawer ───────────────────────────────────────────

  const filterSidebar = document.getElementById('filter-sidebar');
  if (filterSidebar) {
    sidebarFormEl = buildFilters(filterSidebar, 'shop-filter-form-sidebar');
  }

  const filterDrawerBody = document.getElementById('filter-drawer-body');
  if (filterDrawerBody) {
    drawerFormEl = buildFilters(filterDrawerBody, 'shop-filter-form-drawer');
  }

  // ─── Clear buttons ────────────────────────────────────────────────────

  document.querySelector('.filters-clear')?.addEventListener('click', clearFilters);

  // ─── Sort ────────────────────────────────────────────────────────────

  if (sortSelect) {
    sortSelect.value = state.sort;
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      render();
    });
  }

  // ─── View toggle ─────────────────────────────────────────────────────

  function setView(view) {
    state.view = view;
    const isGrid = view === 'grid';
    grid.style.gridTemplateColumns = isGrid ? '' : 'repeat(2, 1fr)';
    if (gridViewBtn) {
      gridViewBtn.classList.toggle('active', isGrid);
      gridViewBtn.setAttribute('aria-pressed', String(isGrid));
    }
    if (listViewBtn) {
      listViewBtn.classList.toggle('active', !isGrid);
      listViewBtn.setAttribute('aria-pressed', String(!isGrid));
    }
  }

  gridViewBtn?.addEventListener('click', () => setView('grid'));
  listViewBtn?.addEventListener('click', () => setView('list'));
  setView('grid');

  // ─── Mobile filter drawer ─────────────────────────────────────────────

  const filterDrawer        = document.getElementById('filter-drawer');
  const filterDrawerToggle  = document.querySelector('.mobile-filter-toggle');
  const filterDrawerCloseBtn = document.getElementById('filter-drawer-close-btn');
  const filterDrawerOverlay = document.querySelector('.filter-drawer-overlay');
  const filterDrawerApply   = document.getElementById('filter-drawer-apply');

  const openDrawer  = () => { filterDrawer?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeDrawer = () => { filterDrawer?.classList.remove('open'); document.body.style.overflow = ''; };

  filterDrawerToggle?.addEventListener('click', openDrawer);
  filterDrawerCloseBtn?.addEventListener('click', closeDrawer);
  filterDrawerApply?.addEventListener('click', closeDrawer);
  filterDrawerOverlay?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && filterDrawer?.classList.contains('open')) closeDrawer(); });

  // ─── Search: show banner if query is active ───────────────────────────

  if (state.query) {
    const searchBanner = document.createElement('div');
    searchBanner.style.cssText = `padding:var(--s4) 0;font-size:var(--fs-sm);color:var(--text-2);border-bottom:1px solid var(--border-light);margin-bottom:var(--s4);display:flex;align-items:center;justify-content:space-between;gap:var(--s4);`;
    searchBanner.innerHTML = `
      <span>Showing results for <strong>"${escHtml(state.query)}"</strong></span>
      <button class="btn btn-ghost btn-sm" id="clear-search-btn">Clear search</button>
    `;
    grid.parentElement?.insertBefore(searchBanner, grid);
    document.getElementById('clear-search-btn')?.addEventListener('click', () => {
      state.query = '';
      searchBanner.remove();
      render();
      updateActiveFilterCount();
    });
  }

  // ─── Utility ─────────────────────────────────────────────────────────

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── Initial render ───────────────────────────────────────────────────

  render();
  updateActiveFilterCount();

});
