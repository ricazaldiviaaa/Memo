// src/data/souvenirs.js

// Wellness
import CoffeeScrubImg from "../assets/Wellness/CoffeeScrub.jpg";
import CoffeeScrub1 from "../assets/Wellness/CoffeeScrub1.jpg";
import CoffeeScrub2 from "../assets/Wellness/CoffeeScrub2.jpg";
import CoffeeScrub3 from "../assets/Wellness/CoffeeScrub3.jpg";

// Flavors
import CoffeeImg from "../assets/Flavor/coffee.jpg";
import Coffee1 from "../assets/Flavor/coffee1.jpg";
import Coffee2 from "../assets/Flavor/coffee2.jpg";
import Coffee3 from "../assets/Flavor/coffee3.jpg";

import HoneyImg from "../assets/Flavor/Honey.jpg";
import Honey1 from "../assets/Flavor/Honey1.jpg";
import Honey2 from "../assets/Flavor/Honey2.jpg";
import Honey3 from "../assets/Flavor/Honey3.jpg";

// Crafts
import TampipiImg from "../assets/Crafts/Tampipi.jpg";
import Tampipi1 from "../assets/Crafts/Tampipi1.jpg";
import Tampipi2 from "../assets/Crafts/Tampipi2.jpg";
import Tampipi3 from "../assets/Crafts/Tampipi3.jpg";

// Aroma
import DiffuserImg from "../assets/Aroma/Diffuser.jpg";
import Diffuser1 from "../assets/Aroma/Diffuser1.jpg";
import Diffuser2 from "../assets/Aroma/Diffuser2.jpg";
import Diffuser3 from "../assets/Aroma/Diffuser3.jpg";

import LinenImg from "../assets/Aroma/Linen.jpg";
import Linen1 from "../assets/Aroma/Linen1.jpg";
import Linen2 from "../assets/Aroma/Linen2.jpg";
import Linen3 from "../assets/Aroma/Linen3.jpg";

const souvenirs = [
  {
    id: 1,
    name: "Coffee Scrub",
    description: "Exfoliating coffee scrub made from natural ingredients.",
    price: 200,
    image: CoffeeScrubImg,
    category: "Wellness",
    gallery: [CoffeeScrub1, CoffeeScrub2, CoffeeScrub3],
    variations: [
      { name: "Solo", description: "Perfect for individual skincare." },
      { name: "Set", description: "Bundle with multiple packs for sharing." },
    ],
  },
  {
    id: 2,
    name: "Local Coffee",
    description: "Premium coffee beans sourced from local farms.",
    price: 350,
    image: CoffeeImg,
    category: "Flavors",
    gallery: [Coffee1, Coffee2, Coffee3],
    variations: [
      { name: "250g", description: "Perfect for a few brews." },
      { name: "500g", description: "Best value for regular coffee lovers." },
      { name: "1kg", description: "For true coffee enthusiasts." },
    ],
  },
  {
    id: 3,
    name: "Local Honey",
    description: "Pure and natural honey harvested from local apiaries.",
    price: 220,
    image: HoneyImg,
    category: "Flavors",
    gallery: [Honey1, Honey2, Honey3],
    variations: [
      { name: "250ml", description: "Sweet little jar for gifts." },
      { name: "500ml", description: "A family-sized jar." },
    ],
  },
  {
    id: 4,
    name: "Tampipi",
    description: "Traditional handwoven tampipi for storage or decoration.",
    price: 400,
    image: TampipiImg,
    category: "Crafts",
    gallery: [Tampipi1, Tampipi2, Tampipi3],
    variations: [
      { name: "Small", description: "Compact and handy size." },
      { name: "Large", description: "Spacious and decorative." },
    ],
  },
  {
    id: 5,
    name: "Aroma Diffuser",
    description: "A calming diffuser that spreads natural fragrance.",
    price: 400,
    image: DiffuserImg,
    category: "Aromas",
    gallery: [Diffuser1, Diffuser2, Diffuser3],
    variations: [
      { name: "Lavender", description: "Relaxing lavender scent." },
      { name: "Lemon", description: "Refreshing citrus aroma." },
      { name: "Mint", description: "Cool and energizing." },
    ],
  },
  {
    id: 6,
    name: "Linen Spray",
    description: "Refreshing linen spray with a relaxing scent.",
    price: 250,
    image: LinenImg,
    category: "Aromas",
    gallery: [Linen1, Linen2, Linen3],
    variations: [
      { name: "Lavender", description: "Calming and soothing." },
      { name: "Eucalyptus", description: "Fresh and clean scent." },
    ],
  },
];

export default souvenirs;
