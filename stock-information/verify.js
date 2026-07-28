const fs = require('fs');
const path = require('path');

// products.js uses browser-global style; load it with module export workaround
let src = fs.readFileSync(path.join(__dirname, '../js/products.js'), 'utf8');
// Execute and grab PRODUCTS via the module.exports block
const m = { exports: {} };
const fn = new Function('module', 'exports', src);
fn(m, m.exports);

const PRODUCTS = m.exports.PRODUCTS;
const errors = [];

console.log('=== Verification Report ===\n');
console.log('Total products:', PRODUCTS.length);

if (PRODUCTS.length !== 40) errors.push('Expected 40 products, got ' + PRODUCTS.length);

// Check no blank/error entries
const badEntries = PRODUCTS.filter(p => !p.styleNumber);
if (badEntries.length) errors.push('Entries without style number: ' + badEntries.length);

// Check all images exist on disk
PRODUCTS.forEach(p => {
  const imgFile = path.join(__dirname, '..', p.image);
  if (!fs.existsSync(imgFile)) errors.push('Missing image: ' + p.image);
});
console.log('Image files on disk:', PRODUCTS.filter(p => {
  return fs.existsSync(path.join(__dirname, '..', p.image));
}).length + ' / ' + PRODUCTS.length);

// Check no invented NIS price (all unpriced products should have null)
const withNIS = PRODUCTS.filter(p => p.priceNIS !== null);
const withoutNIS = PRODUCTS.filter(p => p.priceNIS === null);
console.log('\nWith confirmed NIS price:', withNIS.length);
console.log('Without NIS price:', withoutNIS.length);
console.log('  Style numbers without price:', withoutNIS.map(p => p.styleNumber).join(', '));

// Check unpriced are not purchasable
const badPurchasable = PRODUCTS.filter(p => p.priceNIS === null && p.purchasable);
if (badPurchasable.length) errors.push('Unpriced but purchasable: ' + badPurchasable.map(p => p.styleNumber).join(', '));

// Check purchasable products
const purchasable = PRODUCTS.filter(p => p.purchasable);
console.log('\nPurchasable:', purchasable.length);
console.log('  ', purchasable.map(p => p.styleNumber + '(₪' + p.priceNIS + ')').join(', '));

// Check DN22/DN23 specific
const dn22 = PRODUCTS.find(p => p.styleNumber === 'DN22');
const dn23 = PRODUCTS.find(p => p.styleNumber === 'DN23');
console.log('\nDN22 priceNIS:', dn22 ? dn22.priceNIS : 'NOT FOUND', '(expected 449)');
console.log('DN23 priceNIS:', dn23 ? dn23.priceNIS : 'NOT FOUND', '(expected null)');
console.log('DN23 requiresPriceConfirmation:', dn23 ? dn23.requiresPriceConfirmation : 'NOT FOUND', '(expected true)');

if (!dn22 || dn22.priceNIS !== 449) errors.push('DN22 priceNIS should be 449, got: ' + (dn22 ? dn22.priceNIS : 'missing'));
if (!dn23 || dn23.priceNIS !== null) errors.push('DN23 priceNIS should be null');
if (!dn23 || !dn23.requiresPriceConfirmation) errors.push('DN23 requiresPriceConfirmation should be true');

// Check no costZAR exposed in price field
PRODUCTS.forEach(p => {
  if (p.price !== undefined) errors.push(p.styleNumber + ' has a `price` field — should be priceNIS only');
});

// Check categories
const cats = [...new Set(PRODUCTS.map(p => p.category))];
console.log('\nCategories:', cats.join(', '));
const expectedCats = ['tikar-bangles','namji-dolls','woven-baskets','wooden-bowls','small-bowls'];
expectedCats.forEach(c => {
  if (!cats.includes(c)) errors.push('Missing category: ' + c);
});

// Unique slugs
const slugs = PRODUCTS.map(p => p.slug);
const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupSlugs.length) errors.push('Duplicate slugs: ' + dupSlugs.join(', '));

// Unique IDs
const ids = PRODUCTS.map(p => p.id);
const dupIds = ids.filter((s, i) => ids.indexOf(s) !== i);
if (dupIds.length) errors.push('Duplicate IDs: ' + dupIds.join(', '));

console.log('\n=== Result ===');
if (errors.length === 0) {
  console.log('All checks PASSED');
} else {
  console.error(errors.length + ' check(s) failed:');
  errors.forEach(e => console.error('  FAIL:', e));
  process.exit(1);
}
