// src/data/souvenirs.js

// Wellness
import CoffeeScrubImg from "../assets/Wellness/CoffeeScrub.jpg";

// Flavors
import CoffeeImg from "../assets/Flavor/coffee.jpg";
import HoneyImg from "../assets/Flavor/Honey.jpg";

// Crafts
import TampipiImg from "../assets/Crafts/Tampipi.jpg";

// Aroma
import DiffuserImg from "../assets/Aroma/Diffuser.jpg";
import LinenImg from "../assets/Aroma/Linen.jpg";

const souvenirs = [
  {
    id: 1,
    name: "Coffee Scrub",
    description: "Exfoliating coffee scrub made from natural ingredients.",
    price: 200,
    image: CoffeeScrubImg,
    category: "Wellness",
  },
  {
    id: 2,
    name: "Local Coffee",
    description: "Premium coffee beans sourced from local farms.",
    price: 350,
    image: CoffeeImg,
    category: "Flavors",
  },
  {
    id: 3,
    name: "Local Honey",
    description: "Pure and natural honey harvested from local apiaries.",
    price: 220,
    image: HoneyImg,
    category: "Flavors",
  },
  {
    id: 4,
    name: "Tampipi",
    description: "Traditional handwoven tampipi for storage or decoration.",
    price: 400,
    image: TampipiImg,
    category: "Crafts",
  },
  {
    id: 5,
    name: "Aroma Diffuser",
    description: "A calming diffuser that spreads natural fragrance.",
    price: 400,
    image: DiffuserImg,
    category: "Aromas",
  },
  {
    id: 6,
    name: "Linen Spray",
    description: "Refreshing linen spray with a relaxing scent.",
    price: 250,
    image: LinenImg,
    category: "Aromas",
  },
];

export default souvenirs;
