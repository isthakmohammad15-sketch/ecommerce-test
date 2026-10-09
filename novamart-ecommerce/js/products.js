/**
 * NovaMart Product Catalog
 * Complete dataset containing 16 premium products across Fashion, Beauty, Home, and Accessories.
 */

const NOVA_PRODUCTS = [
  {
    id: 1,
    name: "Tailored Linen Single-Breasted Blazer",
    category: "Fashion",
    price: 189.00,
    originalPrice: 240.00,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    sku: "NM-FAS-001",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    description: "Crafted from breathable European flax linen, this relaxed single-breasted blazer offers effortless elegance for both casual layering and tailored evening wear.",
    features: [
      "100% sustainable European organic linen",
      "Horn button closures with tailored notch lapels",
      "Lightweight half-lined interior for breathability",
      "Dual exterior patch pockets and interior chest pocket"
    ],
    details: {
      material: "100% Organic European Linen",
      fit: "Relaxed tailored fit",
      care: "Dry clean or gentle cold hand wash",
      origin: "Ethically made in Portugal"
    }
  },
  {
    id: 2,
    name: "Merino Wool Relaxed Turtleneck",
    category: "Fashion",
    price: 125.00,
    originalPrice: 160.00,
    rating: 4.8,
    reviewsCount: 98,
    badge: "New",
    badgeType: "new",
    inStock: true,
    sku: "NM-FAS-002",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    description: "Spun from ultra-fine 19.5 micron merino wool, this knit turtleneck delivers cloud-soft warmth without any itchiness. An essential foundation for winter layering.",
    features: [
      "100% Extra-fine non-mulesed Merino Wool",
      "Ribbed collar, cuffs, and hem detailing",
      "Natural thermal regulation and odor resistance",
      "Pre-shrunk for consistent fit"
    ],
    details: {
      material: "100% Merino Wool",
      fit: "Regular easy fit",
      care: "Hand wash cold, dry flat",
      origin: "Crafted in Biella, Italy"
    }
  },
  {
    id: 3,
    name: "Pure Silk Bias-Cut Evening Slip Dress",
    category: "Fashion",
    price: 210.00,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 76,
    badge: "Popular",
    badgeType: "popular",
    inStock: true,
    sku: "NM-FAS-003",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    description: "A timeless 90s silhouette rendered in heavyweight 22 momme Mulberry silk. Designed with a gentle drape that hugs natural curves with fluid grace.",
    features: [
      "100% Grade 6A Mulberry Silk (22 momme)",
      "Adjustable delicate shoulder straps",
      "Bias cut creates effortless fluid drape",
      "Flattering scoop neckline with French seams"
    ],
    details: {
      material: "100% Mulberry Silk",
      fit: "Bias cut contour drape",
      care: "Dry clean recommended",
      origin: "Responsibly crafted in Shanghai"
    }
  },
  {
    id: 4,
    name: "Organic Cotton Wide-Leg Pleated Chino",
    category: "Fashion",
    price: 95.00,
    originalPrice: 120.00,
    rating: 4.7,
    reviewsCount: 64,
    badge: "Sale",
    badgeType: "sale",
    inStock: true,
    sku: "NM-FAS-004",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    description: "Structured yet comfortable, these wide-leg chinos are woven from heavy organic cotton twill. Double front pleats lend an architectural silhouette.",
    features: [
      "100% GOTS certified organic cotton twill",
      "Deep front pleats and side slash pockets",
      "Corozo nut button and clean zip fly",
      "Relaxed wide leg with clean bottom cuffs"
    ],
    details: {
      material: "100% Organic Cotton Twill",
      fit: "High-rise, relaxed wide leg",
      care: "Machine wash cold with like colors",
      origin: "Made in Turkey"
    }
  },
  {
    id: 5,
    name: "Botanical Glow Facial Recovery Elixir",
    category: "Beauty",
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 312,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    sku: "NM-BEA-001",
    image: "https://images.unsplash.com/photo-1608248597359-0091392e21c2?auto=format&fit=crop&w=800&q=80",
    description: "A nutrient-dense botanical oil packed with cold-pressed rosehip, squalane, and bakuchiol. Restores radiant luminescence and strengthens the moisture barrier.",
    features: [
      "100% cold-pressed organic active botanicals",
      "Infused with plant-derived squalane & 2% bakuchiol",
      "Non-comedogenic, fast-absorbing velvet finish",
      "Free of parabens, synthetic fragrances, and sulfates"
    ],
    details: {
      volume: "30 ml / 1.0 fl oz",
      skinType: "All skin types, especially dry and dull",
      scent: "Subtle natural herbal & citrus notes",
      crueltyFree: "Leaping Bunny Certified"
    }
  },
  {
    id: 6,
    name: "Peptide Renewal Deep Hydration Cream",
    category: "Beauty",
    price: 74.00,
    originalPrice: 92.00,
    rating: 4.8,
    reviewsCount: 184,
    badge: "Popular",
    badgeType: "popular",
    inStock: true,
    sku: "NM-BEA-002",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    description: "An intensive moisturising barrier treatment formulated with triple-weight hyaluronic acid and multi-peptides to plump fine lines and restore suppleness.",
    features: [
      "Multi-peptide complex stimulates collagen synthesis",
      "Ceramide NP reinforces the cellular skin matrix",
      "Rich whipped emulsion texture without greasiness",
      "Dermatologically tested for sensitive complexions"
    ],
    details: {
      volume: "50 ml / 1.7 oz",
      skinType: "Normal, dry, and combination",
      scent: "Fragrance-free formula",
      crueltyFree: "100% Vegan & Cruelty Free"
    }
  },
  {
    id: 7,
    name: "Rose Damascena Velvet Eau De Parfum",
    category: "Beauty",
    price: 115.00,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 89,
    badge: "New",
    badgeType: "new",
    inStock: true,
    sku: "NM-BEA-003",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    description: "A hypnotic, modern interpretation of Turkish Damask rose layered with pink pepper, smokey ambergris, and Haitian vetiver in a crystal flacon.",
    features: [
      "Concentrated Eau de Parfum (18% fragrance oil)",
      "Top: Pink peppercorn, sparkling bergamot",
      "Heart: Wild Turkish Rose Damascena, geranium",
      "Base: Haitian vetiver, warm amber, white cedarwood"
    ],
    details: {
      volume: "50 ml / 1.7 fl oz",
      fragranceFamily: "Floral Woody Amber",
      longevity: "8+ hours wear",
      glass: "Recyclable heavy Italian glass bottle"
    }
  },
  {
    id: 8,
    name: "Green Tea & Kaolin Clarifying Clay Mask",
    category: "Beauty",
    price: 42.00,
    originalPrice: 50.00,
    rating: 4.7,
    reviewsCount: 119,
    badge: "Sale",
    badgeType: "sale",
    inStock: true,
    sku: "NM-BEA-004",
    image: "https://images.unsplash.com/photo-1567928815116-24231b14a270?auto=format&fit=crop&w=800&q=80",
    description: "Detoxify and refine pores without stripping moisture. French green clay combines with matcha tea extract to calm inflammation and rebalance sebum.",
    features: [
      "French green kaolin clay draws out deep impurities",
      "Organic ceremonial green tea provides rich antioxidants",
      "Niacinamide (2%) minimizes visible pore diameter",
      "Non-drying formula rinses clean with warm water"
    ],
    details: {
      volume: "85 g / 3.0 oz",
      skinType: "Oily, combination, and blemish-prone",
      useFrequency: "1-2 times weekly",
      crueltyFree: "Cruelty Free & Paraben Free"
    }
  },
  {
    id: 9,
    name: "Nordic Matte Ceramic Sculptural Vase",
    category: "Home",
    price: 58.00,
    originalPrice: 75.00,
    rating: 4.9,
    reviewsCount: 220,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    sku: "NM-HOM-001",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    description: "Hand-thrown by master artisans, this architectural stoneware vase boasts an organic curved contour and a tactile chalk-matte finish.",
    features: [
      "Handmade stoneware ceramic with matte mineral glaze",
      "Waterproof interior coating for fresh botanicals",
      "Sculptural presence doubles as art object when empty",
      "Protective felt pads under base to protect tabletops"
    ],
    details: {
      dimensions: "9.5\" H x 6.2\" W x 4.0\" D",
      weight: "1.8 lbs",
      care: "Wipe with damp cloth; hand rinse interior",
      artisanOrigin: "Handcrafted in Portugal"
    }
  },
  {
    id: 10,
    name: "Minimalist Brass & Opal Glass Table Lamp",
    category: "Home",
    price: 145.00,
    originalPrice: 180.00,
    rating: 4.8,
    reviewsCount: 153,
    badge: "Popular",
    badgeType: "popular",
    inStock: true,
    sku: "NM-HOM-002",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Warm, diffused ambient lighting enclosed in a mouth-blown frosted opal sphere, perched atop a solid brushed brass cylinder base with dimming rotary dial.",
    features: [
      "Solid spun brass base with clear protective lacquer",
      "Hand-blown frosted opal glass spherical diffuser",
      "Built-in smooth rotary dimmer switch on base",
      "Braided 6-foot textile cord with reinforced plug"
    ],
    details: {
      dimensions: "12\" H x 7.5\" Globe Diameter",
      bulbType: "E26 LED Warm White 2700K (Included)",
      voltage: "110-240V compatible",
      finish: "Satin Brushed Brass"
    }
  },
  {
    id: 11,
    name: "Waffle Weave Organic Linen Throw",
    category: "Home",
    price: 85.00,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 94,
    badge: "New",
    badgeType: "new",
    inStock: true,
    sku: "NM-HOM-003",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    description: "Generously sized and stonewashed for supreme softness. This tactile honeycomb waffle blanket adds cozy texture to couches and bedroom retreats.",
    features: [
      "60% French Linen, 40% Organic Turkish Cotton",
      "Breathable honeycomb texture for all-season comfort",
      "Pre-washed to resist pilling and shrinking",
      "Subtle raw eyelash fringe borders"
    ],
    details: {
      dimensions: "50\" x 70\" (127cm x 178cm)",
      care: "Machine wash cold gentle, tumble dry low",
      certifications: "OEKO-TEX Standard 100 Certified",
      origin: "Woven in Denizli, Turkey"
    }
  },
  {
    id: 12,
    name: "Botanical Cedarwood & Amber Soy Candle",
    category: "Home",
    price: 36.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviewsCount: 268,
    badge: "Sale",
    badgeType: "sale",
    inStock: true,
    sku: "NM-HOM-004",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    description: "Hand-poured 100% natural soy wax infused with notes of smoked cedarwood, golden amber, cardamom, and clove in a reusable matte ceramic tumbler.",
    features: [
      "Natural US-grown soy wax with unbleached cotton wick",
      "Clean 55-60 hour slow and even burn time",
      "Phthalate-free pure essential oils & fine fragrances",
      "Ceramic vessel easily repurposed after burn"
    ],
    details: {
      weight: "11 oz (312g)",
      burnTime: "Approx. 55-60 hours",
      scentFamily: "Woody / Spicy Amber",
      packaging: "100% recycled paper gift cylinder"
    }
  },
  {
    id: 13,
    name: "Italian Pebbled Leather Everyday Tote",
    category: "Accessories",
    price: 260.00,
    originalPrice: 320.00,
    rating: 4.9,
    reviewsCount: 195,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    sku: "NM-ACC-001",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description: "Structured yet slouchy, handcrafted from full-grain Italian pebbled calfskin. Fits a 15-inch laptop with room for daily work and weekend essentials.",
    features: [
      "Full-grain certified Italian pebbled leather",
      "Padded interior laptop sleeve with magnetic clasp",
      "Sturdy 9.5\" shoulder drop handles with reinforced rivets",
      "Zip top closure and micro-suede interior lining"
    ],
    details: {
      dimensions: "13.5\" H x 17.5\" W x 5.5\" D",
      hardware: "Pale gold tarnish-resistant hardware",
      care: "Wipe with soft leather conditioner",
      origin: "Handcrafted in Florence, Italy"
    }
  },
  {
    id: 14,
    name: "Sculptural 18K Gold Vermeil Drop Earrings",
    category: "Accessories",
    price: 92.00,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 114,
    badge: "Popular",
    badgeType: "popular",
    inStock: true,
    sku: "NM-ACC-002",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    description: "Inspired by mid-century modernist forms, these undulating teardrop earrings capture light beautifully while remaining remarkably lightweight for all-day wear.",
    features: [
      "Thick 2.5 micron 18K gold plating over 925 sterling silver",
      "Hollow casting ensures ultra-comfortable weightless wear",
      "Hypoallergenic sterling silver posts with secure butterfly backs",
      "Antioxidant e-coating protects against natural tarnishing"
    ],
    details: {
      dimensions: "1.4\" drop length, 0.8\" width",
      weight: "4.2g each",
      hypoallergenic: "Nickel-free and cadmium-free",
      packaging: "Comes in signature emerald velvet jewelry box"
    }
  },
  {
    id: 15,
    name: "Handcrafted Acetate Polarized Sunglasses",
    category: "Accessories",
    price: 110.00,
    originalPrice: 140.00,
    rating: 4.7,
    reviewsCount: 88,
    badge: "Sale",
    badgeType: "sale",
    inStock: true,
    sku: "NM-ACC-003",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    description: "Retro square silhouette milled from biodegradable Italian Mazzucchelli cellulose acetate, fitted with scratch-resistant polarized CR-39 lenses.",
    features: [
      "Plant-based Italian cellulose acetate frame",
      "100% UVA/UVB Category 3 polarized protection",
      "German 5-barrel stainless steel hinges for lifetime durability",
      "Includes microfiber cleaning cloth and recycled leather case"
    ],
    details: {
      frameWidth: "142 mm; Bridge: 20 mm; Temple: 145 mm",
      lensColor: "Deep Amber Green polarized",
      faceFit: "Medium to wide fit",
      uvProtection: "UV400 rated"
    }
  },
  {
    id: 16,
    name: "Minimalist Japanese Quartz Leather Watch",
    category: "Accessories",
    price: 175.00,
    originalPrice: 215.00,
    rating: 4.9,
    reviewsCount: 167,
    badge: "Bestseller",
    badgeType: "bestseller",
    inStock: true,
    sku: "NM-ACC-004",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    description: "Clean Bauhaus-inspired dial with surgical-grade 316L stainless steel casing and an interchangeable vegetable-tanned Horween leather band.",
    features: [
      "Japanese Miyota precision quartz movement",
      "Scratch-resistant sapphire crystal glass",
      "Vegetable-tanned full-grain leather strap with quick release",
      "5 ATM / 50 meters water resistance"
    ],
    details: {
      caseDiameter: "38 mm; Case Thickness: 7.2 mm",
      strapWidth: "20 mm interchangeable",
      waterResistance: "50m (Swim-proof)",
      warranty: "2-year international warranty"
    }
  }
];

// Fallback image helper
const DEFAULT_FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3e%3crect width='600' height='600' fill='%23f1f5f2'/%3e%3cg fill='%230f382c' opacity='0.3'%3e%3ccircle cx='300' cy='260' r='80'/%3e%3cpath d='M180 440c0-66 54-120 120-120s120 54 120 120H180z'/%3e%3c/g%3e%3ctext x='300' y='500' font-family='sans-serif' font-size='22' font-weight='600' fill='%230f382c' text-anchor='middle' opacity='0.6'%3eNovaMart Product Image%3c/text%3e%3c/svg%3e";

// Helper functions for catalog queries
function getProductById(id) {
  const numericId = parseInt(id, 10);
  return NOVA_PRODUCTS.find(p => p.id === numericId) || null;
}

function getFeaturedProducts(limit = 4) {
  return NOVA_PRODUCTS.filter(p => p.badge === "Bestseller").slice(0, limit);
}

function getTrendingProducts(limit = 4) {
  return NOVA_PRODUCTS.filter(p => p.badge === "Popular" || p.badge === "New").slice(0, limit);
}

function getProductsByCategory(category) {
  if (!category || category.toLowerCase() === 'all') return NOVA_PRODUCTS;
  return NOVA_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getRelatedProducts(currentId, category, limit = 4) {
  return NOVA_PRODUCTS
    .filter(p => p.category.toLowerCase() === category.toLowerCase() && p.id !== parseInt(currentId, 10))
    .slice(0, limit);
}
// Categories metadata
const NOVA_CATEGORIES = [
  {
    name: "Fashion",
    tagline: "Effortless, sustainable tailoring and luxury essentials",
    itemCount: 4,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    color: "#e8efe9"
  },
  {
    name: "Beauty",
    tagline: "Clean, science-backed botanical skincare & clean fragrance",
    itemCount: 4,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    color: "#f5eee9"
  },
  {
    name: "Home",
    tagline: "Architectural decor, artisanal ceramics, and cozy textiles",
    itemCount: 4,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    color: "#ebf2ee"
  },
  {
    name: "Accessories",
    tagline: "Handcrafted Italian leather, jewelry, and timepieces",
    itemCount: 4,
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=800&q=80",
    color: "#f3ede7"
  }
];

// Attach to global window object if in browser
if (typeof window !== 'undefined') {
  window.NOVA_PRODUCTS = NOVA_PRODUCTS;
  window.NOVA_CATEGORIES = NOVA_CATEGORIES;
  window.DEFAULT_FALLBACK_IMAGE = DEFAULT_FALLBACK_IMAGE;
  window.getProductById = getProductById;
  window.getFeaturedProducts = getFeaturedProducts;
  window.getTrendingProducts = getTrendingProducts;
  window.getProductsByCategory = getProductsByCategory;
  window.getRelatedProducts = getRelatedProducts;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NOVA_PRODUCTS,
    NOVA_CATEGORIES,
    DEFAULT_FALLBACK_IMAGE,
    getProductById,
    getFeaturedProducts,
    getTrendingProducts,
    getProductsByCategory,
    getRelatedProducts
  };
}

