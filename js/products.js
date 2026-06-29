/**
 * ROOTS GALLERY — Product Data
 * Namji Dolls Collection
 *
 * To update products: edit the PRODUCTS array below.
 * To replace images: swap the URL in the `images` array with your local path.
 * Image naming convention: /images/namji-doll-XX.jpg
 */

const PRODUCTS = [
  // ─── BEADED DOLLS ─────────────────────────────────────────────────
  {
    id: "bd-001",
    slug: "royal-beaded-namji",
    name: "Royal Beaded Namji",
    category: "beaded-dolls",
    categoryLabel: "Beaded Dolls",
    price: 285,
    comparePrice: null,
    isNew: true,
    isFeatured: true,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-bd-001a/600/800",
      "https://picsum.photos/seed/namji-bd-001b/600/800",
      "https://picsum.photos/seed/namji-bd-001c/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-bd-001a/600/800",
    colors: ["terracotta", "amber", "gold"],
    colorLabels: ["Terracotta", "Amber", "Gold"],
    materials: "Hardwood, glass seed beads, natural twine, brass rings",
    dimensions: "H 32cm × W 12cm",
    weight: "0.38 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A richly adorned Namji doll with cascading layers of warm-toned glass seed beads. Each bead is hand-threaded by a single artisan over several days.",
    description:
      "The Royal Beaded Namji embodies the highest tradition of adornment in Namji craft. Carved from a single piece of hardwood, the figure is fully encased in layered strands of glass seed beads in deep terracotta, amber, and gold tones. Fine brass rings accent the neck and wrists, reflecting the doll's role as an emblem of prosperity and generational wealth. No two pieces are identical — variations in bead colour and knotting are natural marks of individual handwork.",
    culturalNote:
      "Namji dolls — also known as Namchi or Dowayo dolls — originate from the Namji people of the Faro and Déo Division in the Adamawa Region of Cameroon. Traditionally, these dolls are gifted to young women as objects of blessing, protection, and good fortune as they prepare for new life stages. They are carried, adorned, and passed through generations, accumulating family meaning over time.",
    care: "Dust gently with a soft, dry brush. Keep away from direct sunlight and moisture. Avoid handling the bead strands with wet hands.",
    shipping:
      "Shipped in a custom gift box with tissue and a provenance card. Allow 5–10 business days. Signature required on delivery.",
    tags: ["beaded", "fertility", "gold", "terracotta", "featured"],
  },
  {
    id: "bd-002",
    slug: "amber-thread-namji",
    name: "Amber Thread Namji",
    category: "beaded-dolls",
    categoryLabel: "Beaded Dolls",
    price: 195,
    comparePrice: null,
    isNew: false,
    isFeatured: true,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-bd-002a/600/800",
      "https://picsum.photos/seed/namji-bd-002b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-bd-002a/600/800",
    colors: ["amber", "cream", "brown"],
    colorLabels: ["Amber", "Cream", "Warm Brown"],
    materials: "Hardwood, glass seed beads, cotton thread, cowrie shells",
    dimensions: "H 27cm × W 10cm",
    weight: "0.27 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A slender, elegantly proportioned doll wrapped in amber and cream glass beads with a delicate fringe of cotton thread.",
    description:
      "The Amber Thread Namji is a study in refined proportion. The figure's tapered torso is wrapped in tight rows of seed beads, graduating from deep amber at the base to pale cream at the shoulders. A layered fringe of hand-knotted cotton thread forms a skirt, swaying naturally when displayed. Three cowrie shells are attached at the chest — a traditional symbol of prosperity.",
    culturalNote:
      "Cowrie shells hold deep symbolic meaning across many West and Central African cultures. Among the Namji, they are woven into dolls as symbols of wealth, femininity, and good fortune — commodities once used as currency across the continent.",
    care: "Dust with a soft brush. Store upright. Avoid moisture and prolonged direct sunlight.",
    shipping: "Shipped boxed with provenance card. 5–10 business days.",
    tags: ["beaded", "amber", "cowrie", "feminine"],
  },
  {
    id: "bd-003",
    slug: "indigo-ceremonial-doll",
    name: "Indigo Ceremonial Doll",
    category: "beaded-dolls",
    categoryLabel: "Beaded Dolls",
    price: 340,
    comparePrice: null,
    isNew: true,
    isFeatured: false,
    availability: "limited",
    images: [
      "https://picsum.photos/seed/namji-bd-003a/600/800",
      "https://picsum.photos/seed/namji-bd-003b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-bd-003a/600/800",
    colors: ["indigo", "navy", "copper"],
    colorLabels: ["Indigo", "Navy", "Copper"],
    materials: "Hardwood, glass seed beads, copper wire, leather cord",
    dimensions: "H 36cm × W 14cm",
    weight: "0.44 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "An exceptional ceremonial piece with deep indigo beadwork interlaced with fine copper wire. Limited edition.",
    description:
      "The Indigo Ceremonial Doll is among the most striking pieces in the collection. Rich indigo and navy glass beads are arranged in geometric diamond patterns — a motif traditionally associated with ceremonial dress. Fine copper wire coils around the torso and headdress, catching light with a warm metallic gleam. This is a piece that commands attention on a shelf or mantlepiece.",
    culturalNote:
      "The geometric patterning on this doll references the textile traditions of the Namji people, where woven diamond patterns appear in ceremonial wrappers and regalia. By translating these motifs into beadwork, the craftsperson bridges textile and sculptural traditions.",
    care: "Handle the copper wire elements with care. Do not submerge in water. Buff gently with a dry cloth if the copper patinas.",
    shipping: "Shipped double-boxed with provenance documentation. 5–10 business days.",
    tags: ["beaded", "indigo", "copper", "ceremonial", "limited"],
  },

  // ─── COWRIE SHELL DOLLS ────────────────────────────────────────────
  {
    id: "cs-001",
    slug: "classic-cowrie-namji",
    name: "Classic Cowrie Namji",
    category: "cowrie-shell-dolls",
    categoryLabel: "Cowrie Shell Dolls",
    price: 165,
    comparePrice: null,
    isNew: false,
    isFeatured: true,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-cs-001a/600/800",
      "https://picsum.photos/seed/namji-cs-001b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-cs-001a/600/800",
    colors: ["natural", "cream", "brown"],
    colorLabels: ["Natural", "Cream", "Warm Brown"],
    materials: "Hardwood, cowrie shells, natural cord, leather",
    dimensions: "H 24cm × W 9cm",
    weight: "0.22 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A beautifully proportioned doll adorned densely with natural cowrie shells — a timeless symbol of abundance in Cameroonian craft.",
    description:
      "The Classic Cowrie Namji is the most elemental expression of this tradition. Organic cowrie shells are layered in overlapping rows across the entire figure, creating a naturally textured surface that shifts subtly with light and movement. The exposed hardwood head retains its natural patina, with simple incised features representing the face. Leather cord at the waist adds warmth and definition to the silhouette.",
    culturalNote:
      "Historically, cowrie shells were used as currency across West and Central Africa. Their smooth, rounded form — evoking the pregnant belly — made them a natural symbol of fertility, abundance, and the cyclical nature of life. A doll covered in cowries was a powerful gift to a young woman embarking on married life.",
    care: "Wipe shells with a barely damp cloth if dusty. Allow to fully dry. Do not use chemical cleaners.",
    shipping: "Shipped in a keepsake box with provenance card. 5–10 business days.",
    tags: ["cowrie", "natural", "classic", "fertility"],
  },
  {
    id: "cs-002",
    slug: "layered-cowrie-and-bead",
    name: "Layered Cowrie & Bead",
    category: "cowrie-shell-dolls",
    categoryLabel: "Cowrie Shell Dolls",
    price: 220,
    comparePrice: null,
    isNew: false,
    isFeatured: false,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-cs-002a/600/800",
      "https://picsum.photos/seed/namji-cs-002b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-cs-002a/600/800",
    colors: ["natural", "terracotta", "amber"],
    colorLabels: ["Natural", "Terracotta", "Amber"],
    materials: "Hardwood, cowrie shells, glass beads, brass rings, leather",
    dimensions: "H 30cm × W 12cm",
    weight: "0.34 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A doll that beautifully merges cowrie shell and beadwork traditions in alternating bands of texture and colour.",
    description:
      "This piece blends two traditions into a single expressive object. Alternating bands of natural cowrie shells and warm-toned glass seed beads wrap the figure from waist to shoulders. Brass rings accent the wrists, and a single strand of amber beads forms the headdress. The effect is layered, tactile, and deeply human — a doll that feels as much jewellery as sculpture.",
    culturalNote:
      "The combination of cowries and beads in a single object is common in the most celebratory pieces, made for occasions of great ceremony: a wedding, a birth, or the blessing of a new home.",
    care: "Dust gently with a dry soft brush. Keep away from humidity.",
    shipping: "Shipped boxed with provenance card. 5–10 business days.",
    tags: ["cowrie", "beaded", "mixed", "layered"],
  },
  {
    id: "cs-003",
    slug: "small-cowrie-blessing-doll",
    name: "Small Cowrie Blessing Doll",
    category: "cowrie-shell-dolls",
    categoryLabel: "Cowrie Shell Dolls",
    price: 98,
    comparePrice: null,
    isNew: false,
    isFeatured: false,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-cs-003a/600/800",
      "https://picsum.photos/seed/namji-cs-003b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-cs-003a/600/800",
    colors: ["natural", "cream"],
    colorLabels: ["Natural", "Cream"],
    materials: "Hardwood, cowrie shells, natural cord",
    dimensions: "H 16cm × W 7cm",
    weight: "0.14 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A petite, perfectly formed blessing doll. Ideal for a desk, windowsill, or as a meaningful gift.",
    description:
      "Small in scale but not in presence, this little blessing doll is crafted with the same care as larger pieces. A neat covering of cowrie shells wraps the compact hardwood form. The small scale makes it a beautiful object for a bookshelf, work desk, or windowsill — a daily reminder of the craft and culture behind it.",
    culturalNote:
      "Smaller Namji dolls were often gifted between friends and family members as tokens of affection and good wishes — not exclusively maternal in meaning, but broadly symbolic of care, connection, and good fortune.",
    care: "Dust with a soft cloth or brush as needed.",
    shipping: "Shipped in a padded gift box. 5–10 business days.",
    tags: ["cowrie", "small", "gift", "blessing"],
  },

  // ─── COLLECTOR PIECES ──────────────────────────────────────────────
  {
    id: "cp-001",
    slug: "grand-ceremonial-namji",
    name: "Grand Ceremonial Namji",
    category: "collector-pieces",
    categoryLabel: "Collector Pieces",
    price: 680,
    comparePrice: null,
    isNew: true,
    isFeatured: true,
    availability: "limited",
    images: [
      "https://picsum.photos/seed/namji-cp-001a/600/800",
      "https://picsum.photos/seed/namji-cp-001b/600/800",
      "https://picsum.photos/seed/namji-cp-001c/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-cp-001a/600/800",
    colors: ["terracotta", "gold", "black", "copper"],
    colorLabels: ["Terracotta", "Gold", "Ebony", "Copper"],
    materials: "Ebony hardwood, glass seed beads, cowrie shells, copper wire, brass discs, leather",
    dimensions: "H 48cm × W 18cm",
    weight: "0.82 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A monumental collector's piece — the most fully adorned doll in our collection. An exceptional work of Namji handcraft.",
    description:
      "The Grand Ceremonial Namji is a masterwork of Namji adornment culture. Carved from dense, dark ebony hardwood, the figure stands 48cm tall and is entirely encased in meticulously applied layers of glass beads, cowrie shells, copper wire coils, and hand-hammered brass discs. The work of a single craftsperson, it represents many weeks of focused labour. This is not merely a decorative object — it is a document of living cultural practice, a collector's piece that will hold its significance for generations.",
    culturalNote:
      "The most elaborately adorned Namji dolls were historically associated with households of considerable standing, where they served as meaningful symbols connecting families to their histories and to future generations. While contemporary pieces are crafted for export, the underlying symbolism — blessing, abundance, and generational continuity — remains part of the craft tradition.",
    care: "Do not dust with water. Use a soft, dry brush or compressed air. Display away from direct sunlight and sources of humidity.",
    shipping: "Shipped in a custom wooden crate with full provenance documentation and certificate. Insured. Allow 7–14 business days.",
    tags: ["collector", "ebony", "copper", "ceremonial", "featured", "limited"],
  },
  {
    id: "cp-002",
    slug: "leather-and-bead-elder",
    name: "Leather & Bead Elder",
    category: "collector-pieces",
    categoryLabel: "Collector Pieces",
    price: 420,
    comparePrice: null,
    isNew: false,
    isFeatured: false,
    availability: "limited",
    images: [
      "https://picsum.photos/seed/namji-cp-002a/600/800",
      "https://picsum.photos/seed/namji-cp-002b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-cp-002a/600/800",
    colors: ["brown", "terracotta", "gold"],
    colorLabels: ["Deep Brown", "Terracotta", "Gold"],
    materials: "Aged hardwood, hand-tanned leather, glass seed beads, brass bells",
    dimensions: "H 38cm × W 15cm",
    weight: "0.56 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A rare combination of hand-tanned leather wrapping and fine beadwork, accented with traditional brass bells that produce a gentle sound when moved.",
    description:
      "The Leather & Bead Elder is one of the rarest combinations in the Namji craft vocabulary. Strips of supple, hand-tanned leather are wrapped and knotted around the hardwood form, interspersed with rows of fine seed beads in earthy terracotta and gold tones. A row of small, aged brass bells hangs from the waist — they produce a gentle, resonant sound when the doll is handled or displayed in a breezy space.",
    culturalNote:
      "In Namji tradition, dolls that incorporate multiple materials — leather, shell, bead, metal — are associated with mature wisdom and status. They were made by experienced craftspeople and gifted to mark significant life transitions, not only birth but also the passing of knowledge between generations.",
    care: "Condition the leather annually with a natural wax or oil. Keep away from moisture. The brass bells will naturally develop a patina over time.",
    shipping: "Shipped padded in a custom gift box with provenance card. 5–10 business days.",
    tags: ["collector", "leather", "bells", "elder", "rare"],
  },
  {
    id: "cp-003",
    slug: "twin-namji-pair",
    name: "Twin Namji Pair",
    category: "collector-pieces",
    categoryLabel: "Collector Pieces",
    price: 490,
    comparePrice: null,
    isNew: false,
    isFeatured: false,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-cp-003a/600/800",
      "https://picsum.photos/seed/namji-cp-003b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-cp-003a/600/800",
    colors: ["amber", "cream", "gold"],
    colorLabels: ["Amber", "Cream", "Gold"],
    materials: "Hardwood, glass seed beads, cowrie shells, cotton cord",
    dimensions: "H 28cm × W 10cm each",
    weight: "0.48 kg (pair)",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A matched pair of Namji dolls — rare in the tradition and highly prized as a symbol of duality, balance, and abundant blessing.",
    description:
      "Matched Namji pairs are among the most sought-after pieces in the collector's market. These two figures are worked in complementary bead palettes — one in warm amber and gold tones, the other in cooler cream and natural tones — yet share the same proportions and structural vocabulary. They are intended to be displayed together, and a bond cord of cotton thread connects them at the wrist.",
    culturalNote:
      "Twins hold profound spiritual significance in many Cameroonian cultures. A pair of Namji dolls is associated with exceptional blessing — it is said that a home that holds twin dolls is watched over by an especially attentive ancestral presence.",
    care: "Display upright, together. Dust with a soft dry brush.",
    shipping: "Shipped together in a custom double-width gift box. 5–10 business days.",
    tags: ["collector", "pair", "twins", "amber", "blessing"],
  },

  // ─── DECORATIVE SCULPTURES ─────────────────────────────────────────
  {
    id: "ds-001",
    slug: "standing-sculpture-terracotta",
    name: "Standing Sculpture, Terracotta",
    category: "decorative-sculptures",
    categoryLabel: "Decorative Sculptures",
    price: 145,
    comparePrice: null,
    isNew: false,
    isFeatured: false,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-ds-001a/600/800",
      "https://picsum.photos/seed/namji-ds-001b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-ds-001a/600/800",
    colors: ["terracotta", "brown"],
    colorLabels: ["Terracotta", "Warm Brown"],
    materials: "Hardwood, terracotta-toned glass beads, natural cord",
    dimensions: "H 22cm × W 8cm",
    weight: "0.19 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A clean, minimal sculptural expression of the Namji form. Lightly adorned for those who favour understated warmth.",
    description:
      "The Standing Sculpture in Terracotta is conceived for the contemporary interior. Where more adorned pieces carry the full visual weight of ceremony, this figure is lightly dressed — a simple band of terracotta glass beads at the waist and neck, the warm grain of the hardwood left exposed across most of the body. The result is sculptural, calm, and easy to place in a modern setting.",
    culturalNote:
      "Even the most sparsely adorned Namji doll carries symbolic weight. The form itself — the elongated torso, the rounded head, the abstracted limbs — is the language of meaning; adornment is only its emphasis.",
    care: "Wipe wood with a lightly oiled cloth once or twice a year to maintain warmth. Dust beads gently.",
    shipping: "Shipped in a padded box. 5–10 business days.",
    tags: ["sculpture", "minimal", "terracotta", "interior"],
  },
  {
    id: "ds-002",
    slug: "abstract-trio-set",
    name: "Abstract Trio Set",
    category: "decorative-sculptures",
    categoryLabel: "Decorative Sculptures",
    price: 310,
    comparePrice: null,
    isNew: true,
    isFeatured: true,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-ds-002a/600/800",
      "https://picsum.photos/seed/namji-ds-002b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-ds-002a/600/800",
    colors: ["natural", "cream", "brown", "gold"],
    colorLabels: ["Natural Wood", "Cream", "Brown", "Gold"],
    materials: "Hardwood (three sizes), natural and glass seed beads, cotton cord",
    dimensions: "H 32cm, 24cm, 18cm respectively",
    weight: "0.52 kg (set)",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "Three graduating Namji figures arranged as a sculptural group — a striking statement for a shelf, console, or coffee table.",
    description:
      "The Abstract Trio brings three Namji figures of varying scale into dialogue. Carved from the same hardwood, each is adorned with a different intensity of natural and cream beadwork — the tallest most elaborate, the smallest most bare. The graduating scale creates visual rhythm, and the tonal harmony of the palette allows the set to anchor a space without competing with other decor. Sold as a set.",
    culturalNote:
      "The presence of multiple Namji figures in a home is a sign of considerable blessing and care. Groupings of three or more are seen in traditional households as an accumulation of protective energy and familial intent.",
    care: "Dust individually with a soft brush. Keep as a group for visual and symbolic integrity.",
    shipping: "Shipped together in a custom gift box. 5–10 business days.",
    tags: ["sculpture", "set", "trio", "natural", "interior", "featured"],
  },
  {
    id: "ds-003",
    slug: "dark-wood-spirit-figure",
    name: "Dark Wood Spirit Figure",
    category: "decorative-sculptures",
    categoryLabel: "Decorative Sculptures",
    price: 245,
    comparePrice: null,
    isNew: false,
    isFeatured: false,
    availability: "in-stock",
    images: [
      "https://picsum.photos/seed/namji-ds-003a/600/800",
      "https://picsum.photos/seed/namji-ds-003b/600/800"
    ],
    thumbnail: "https://picsum.photos/seed/namji-ds-003a/600/800",
    colors: ["black", "gold", "amber"],
    colorLabels: ["Ebony", "Gold", "Amber"],
    materials: "Dark oiled hardwood, gold-toned glass beads, amber resin beads, brass pins",
    dimensions: "H 34cm × W 11cm",
    weight: "0.41 kg",
    origin: "Adamawa Region, Cameroon",
    shortDescription:
      "A strong, sculptural figure in darkly oiled hardwood with a restrained but luminous bead collar and crown of amber beads.",
    description:
      "The Dark Wood Spirit Figure is the most architectural piece in the decorative range. Carved from dense, oiled hardwood that has been darkened through a traditional heating and oiling process, the surface reads almost as lacquer — deep, warm, and slightly reflective. A single bead collar of gold-toned glass beads encircles the neck, and amber resin beads form a small crown. Brass pins at the shoulders complete the composition.",
    culturalNote:
      "Dark-oiled Namji figures carry a particularly considered aesthetic presence. In the craft tradition, the process of heating and oiling the wood is associated with transforming the raw material into something finished and intentional — a kind of completion that makes the figure ready to be given meaning through adornment.",
    care: "Re-oil with a thin coat of natural wood oil annually to maintain the dark sheen. Avoid direct sunlight which may lighten the wood over time.",
    shipping: "Shipped with provenance card. 5–10 business days.",
    tags: ["sculpture", "dark wood", "ebony", "gold", "architectural"],
  },
];

/**
 * Helper: Get product by slug
 */
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

/**
 * Helper: Get products by category
 */
function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Helper: Get featured products
 */
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.isFeatured);
}

/**
 * Helper: Get new arrivals
 */
function getNewArrivals() {
  return PRODUCTS.filter(p => p.isNew);
}

/**
 * Helper: Format price in USD
 * Replace with your own currency logic as needed.
 */
function formatPriceUSD(amount) {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
}

/**
 * Available filter options derived from product data
 */
const FILTER_OPTIONS = {
  categories: [
    { value: "beaded-dolls",          label: "Beaded Dolls" },
    { value: "cowrie-shell-dolls",    label: "Cowrie Shell Dolls" },
    { value: "collector-pieces",      label: "Collector Pieces" },
    { value: "decorative-sculptures", label: "Decorative Sculptures" },
  ],
  colors: [
    { value: "terracotta", label: "Terracotta",   hex: "#C4714B" },
    { value: "amber",      label: "Amber",         hex: "#C6920C" },
    { value: "gold",       label: "Gold",          hex: "#C9A047" },
    { value: "cream",      label: "Cream",         hex: "#EDE4D6" },
    { value: "natural",    label: "Natural Wood",  hex: "#9E7A5C" },
    { value: "brown",      label: "Warm Brown",    hex: "#7A5840" },
    { value: "black",      label: "Ebony",         hex: "#2A2420" },
    { value: "indigo",     label: "Indigo",        hex: "#3B4F7A" },
    { value: "copper",     label: "Copper",        hex: "#A0664A" },
  ],
  sizes: [
    { value: "small",  label: "Small (under 20cm)" },
    { value: "medium", label: "Medium (20–30cm)"   },
    { value: "large",  label: "Large (30–40cm)"    },
    { value: "xlarge", label: "XL (over 40cm)"     },
  ],
  availability: [
    { value: "in-stock", label: "In Stock" },
    { value: "limited",  label: "Limited Edition" },
  ],
};

/**
 * Sort products
 */
function sortProducts(products, sortBy) {
  const list = [...products];
  switch (sortBy) {
    case "newest":
      return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "featured":
    default:
      return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
}

/**
 * Filter products
 */
function filterProducts(products, filters = {}) {
  return products.filter(p => {
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(p.category)) return false;
    }
    if (filters.colors && filters.colors.length > 0) {
      if (!p.colors.some(c => filters.colors.includes(c))) return false;
    }
    if (filters.availability && filters.availability.length > 0) {
      if (!filters.availability.includes(p.availability)) return false;
    }
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    if (filters.sizes && filters.sizes.length > 0) {
      const h = parseInt(p.dimensions);
      const sizeMap = {
        small:  h < 20,
        medium: h >= 20 && h <= 30,
        large:  h > 30 && h <= 40,
        xlarge: h > 40,
      };
      if (!filters.sizes.some(s => sizeMap[s])) return false;
    }
    return true;
  });
}

// Export for module use (works in both browser global and module contexts)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PRODUCTS, FILTER_OPTIONS,
    getProductBySlug, getProductsByCategory, getFeaturedProducts, getNewArrivals,
    formatPriceUSD, sortProducts, filterProducts,
  };
}
