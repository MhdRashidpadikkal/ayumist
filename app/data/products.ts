export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "AYUMIST Skin Dew Gel",
    price: 899,
    originalPrice: 1199,
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5,
    reviews: 234,
    description: "Hydrating face gel with natural herbs for glowing skin. Enriched with aloe vera and turmeric for deep moisturization.",
    category: "skincare",
    tags: ["hydrating", "natural", "glowing", "aloe vera", "turmeric", "moisturizing", "face gel"],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "AYUMIST Glow Nectar Face Cream",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5,
    reviews: 189,
    description: "Nourishing face cream with turmeric and saffron for radiant complexion and anti-aging benefits.",
    category: "skincare",
    tags: ["nourishing", "turmeric", "saffron", "radiant", "anti-aging", "face cream", "glow"],
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "AYUMIST Kesh Nectar Herbal Hair Oil",
    price: 799,
    originalPrice: 999,
    image: "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4,
    reviews: 156,
    description: "Strengthening hair oil with 21 herbal extracts for healthy, lustrous hair growth and nourishment.",
    category: "haircare",
    tags: ["strengthening", "herbal", "hair growth", "natural", "ayurvedic", "hair oil", "nourishing"],
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "AYUMIST Shine Dew Herbal Shampoo",
    price: 649,
    originalPrice: 799,
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4,
    reviews: 278,
    description: "Gentle cleansing shampoo with natural ingredients for soft, manageable hair without harsh chemicals.",
    category: "haircare",
    tags: ["gentle", "cleansing", "natural", "soft hair", "sulfate-free", "shampoo", "herbal"],
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "AYUMIST Soft Dew Herbal Body Lotion",
    price: 899,
    originalPrice: 1099,
    image: "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5,
    reviews: 145,
    description: "Moisturizing body lotion with coconut and aloe vera for silky smooth skin and long-lasting hydration.",
    category: "bodycare",
    tags: ["moisturizing", "coconut", "aloe vera", "smooth skin", "hydrating", "body lotion", "natural"],
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: "AYUMIST Pink Bliss Lip Balm",
    price: 299,
    originalPrice: 399,
    image: "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5,
    reviews: 89,
    description: "Nourishing lip balm with natural oils and butters for soft, pink lips with subtle tint.",
    category: "skincare",
    tags: ["nourishing", "natural oils", "soft lips", "pink tint", "moisturizing", "lip balm", "natural"],
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: "AYUMIST Nature Touch Herbal Soap",
    price: 199,
    originalPrice: 249,
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4,
    reviews: 234,
    description: "Handcrafted soap with natural herbs and essential oils for gentle cleansing and skin nourishment.",
    category: "bodycare",
    tags: ["handcrafted", "natural herbs", "essential oils", "gentle", "cleansing", "soap", "ayurvedic"],
    inStock: true,
    featured: false
  },
  {
    id: 8,
    name: "AYUMIST Radiance Face Mask",
    price: 549,
    originalPrice: 699,
    image: "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5,
    reviews: 167,
    description: "Brightening face mask with turmeric and honey for instant glow and deep skin purification.",
    category: "skincare",
    tags: ["brightening", "turmeric", "honey", "instant glow", "face mask", "purifying", "natural"],
    inStock: true,
    featured: false
  },
  {
    id: 9,
    name: "AYUMIST Herbal Hair Conditioner",
    price: 599,
    originalPrice: 749,
    image: "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4,
    reviews: 203,
    description: "Deep conditioning treatment with argan oil and hibiscus for smooth, manageable hair.",
    category: "haircare",
    tags: ["conditioning", "argan oil", "hibiscus", "smooth hair", "deep treatment", "conditioner", "natural"],
    inStock: false,
    featured: false
  },
  {
    id: 10,
    name: "AYUMIST Wellness Tea Blend",
    price: 399,
    originalPrice: 499,
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5,
    reviews: 312,
    description: "Herbal tea blend with ashwagandha and tulsi for daily wellness and stress relief.",
    category: "wellness",
    tags: ["herbal tea", "ashwagandha", "tulsi", "wellness", "daily health", "stress relief", "ayurvedic"],
    inStock: true,
    featured: false
  },
  {
    id: 11,
    name: "AYUMIST Anti-Aging Serum",
    price: 1599,
    originalPrice: 1999,
    image: "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5,
    reviews: 98,
    description: "Powerful anti-aging serum with vitamin C and natural peptides for youthful, radiant skin.",
    category: "skincare",
    tags: ["anti-aging", "vitamin c", "peptides", "youthful", "radiant", "serum", "premium"],
    inStock: true,
    featured: true
  },
  {
    id: 12,
    name: "AYUMIST Detox Body Scrub",
    price: 699,
    originalPrice: 899,
    image: "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4,
    reviews: 156,
    description: "Exfoliating body scrub with sea salt and essential oils for smooth, detoxified skin.",
    category: "bodycare",
    tags: ["exfoliating", "sea salt", "essential oils", "detox", "smooth skin", "scrub", "natural"],
    inStock: true,
    featured: false
  }
];