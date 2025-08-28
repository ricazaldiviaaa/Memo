// src/data/souvenirs.js

// Wellness
import CoffeeScrubImg from "../assets/wellness/coffeescrub.jpg";
import CoffeeScrub1 from "../assets/wellness/coffeescrub1.jpg";
import CoffeeScrub2 from "../assets/wellness/coffeescrub2.jpg";
import CoffeeScrub3 from "../assets/wellness/coffeescrub3.jpg";

// Flavors
import CoffeeImg from "../assets/flavor/coffee.jpg";
import Coffee1 from "../assets/flavor/coffee1.jpg";
import Coffee2 from "../assets/flavor/coffee2.jpg";
import Coffee3 from "../assets/flavor/coffee3.jpg";

import HoneyImg from "../assets/flavor/honey.jpg";
import Honey1 from "../assets/flavor/honey1.jpg";
import Honey2 from "../assets/flavor/honey2.jpg";
import Honey3 from "../assets/flavor/honey3.jpg";

// Crafts
import TampipiImg from "../assets/crafts/tampipi.jpg";
import Tampipi1 from "../assets/crafts/tampipi1.jpg";
import Tampipi2 from "../assets/crafts/tampipi2.jpg";
import Tampipi3 from "../assets/crafts/tampipi3.jpg";

// Aroma
import DiffuserImg from "../assets/aroma/diffuser.jpg";
import Diffuser1 from "../assets/aroma/diffuser1.jpg";
import Diffuser2 from "../assets/aroma/diffuser2.jpg";
import Diffuser3 from "../assets/aroma/diffuser3.jpg";

import LinenImg from "../assets/aroma/linen.jpg";
import Linen1 from "../assets/aroma/linen1.jpg";
import Linen2 from "../assets/aroma/linen2.jpg";
import Linen3 from "../assets/aroma/linen3.jpg";


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
