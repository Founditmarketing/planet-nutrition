export interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  price: number;
  rating: string;
  reviews: number;
  details: string;
  image: string;
  longDescription?: string;
  ingredients?: string[];
}

export const products: Product[] = [
  {
    id: "whey-matrix",
    name: "WHEY MATRIX",
    category: "Proteins",
    desc: "Premium Muscle Recovery",
    price: 59.99,
    rating: "4.9",
    reviews: 245,
    details: "30 Servings • Chocolate / Vanilla",
    image: "/products/Whey Matrix - protein.webp",
    longDescription: "Whey Matrix is our elite-level protein blend designed for maximum absorption and muscle recovery. Featuring a multi-phase release of fast and slow-digesting proteins, it feeds your muscles immediately post-workout and continues to provide sustained amino acids for hours. Cold-processed to preserve nutrient integrity, it's the ultimate tool for lean muscle growth.",
    ingredients: ["Whey Protein Isolate", "Whey Protein Concentrate", "Micellar Casein", "Digestive Enzyme Blend", "Natural & Artificial Flavors", "Sucralose"]
  },
  {
    id: "pure-power-limitless",
    name: "PURE POWER LIMITLESS",
    category: "Pre-Workouts",
    desc: "Explosive Energy & Pump",
    price: 44.99,
    rating: "4.8",
    reviews: 189,
    details: "40 Servings • Fruit Punch",
    image: "/products/Pure Power Limitless - pre-workout.png",
    longDescription: "Break through plateaus with Pure Power Limitless. This clinically-dosed pre-workout combines high-stimulant energy with massive nitric oxide boosters for skin-tearing pumps. Experience tunnel-vision focus and relentless endurance without the inevitable crash. Formulated for serious athletes pushing their absolute limits.",
    ingredients: ["L-Citrulline Malate (2:1)", "Beta-Alanine", "Caffeine Anhydrous (350mg)", "Alpha-GPC", "L-Tyrosine", "Huperzine A"]
  },
  {
    id: "pure-creatine",
    name: "PURE CREATINE",
    category: "Creatine",
    desc: "Unflavored Muscle Builder",
    price: 29.99,
    rating: "5.0",
    reviews: 312,
    details: "60 Servings • Unflavored",
    image: "/products/Pure Creatine.jpg",
    longDescription: "The most researched and proven supplement on the planet. Our 100% Pure Creatine Monohydrate is micronized for superior mixability and rapid absorption. Increases ATP production to fuel explosive movements, enhance strength, and support muscle hydration and volume. Unflavored and perfect for stacking with your pre-workout or protein shake.",
    ingredients: ["100% Micronized Creatine Monohydrate"]
  }
];
