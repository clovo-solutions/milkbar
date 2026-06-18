// The Cookhouse — menu. Images live in src/assets/*.avif, named after each item.
const modules = import.meta.glob('../assets/*.avif', { eager: true, query: '?url', import: 'default' });

const imgMap = {};
for (const [path, url] of Object.entries(modules)) {
  const base = path.split('/').pop().replace(/\.avif$/, '');
  imgMap[base] = url;
  // Some files are accidentally doubled, e.g. "Carrot Muffin Carrot Muffin" → "Carrot Muffin"
  const doubled = base.match(/^(.+) \1$/);
  if (doubled) imgMap[doubled[1]] = url;
}

// Look up an item's image by its exact name.
export const img = (name) => imgMap[name];

export const menuData = {
  "Most Ordered": [
    { name: "Egg Protein Salad", description: "Mixed greens, egg, avocado, cottage cheese, aubergine, peppers, capers, pine nuts, seeds and pumpkin bread", price: "€15.00", popular: true, img: img("Egg Protein Salad") },
    { name: "Acai", description: "Homemade granola, fresh fruit, goji berries, coconut flakes & cacao nibs", price: "€13.00", img: img("Acai") },
    { name: "Porridge", description: "Grilled banana, pistachio butter, almond flakes, pistachios, cinnamon with honey or maple", price: "€11.00", img: img("Porridge") },
    { name: "Freddo Espresso", description: "", price: "€3.50", img: img("Freddo Espresso") },
    { name: "Loaded Sweet Potato", description: "With hummus and avocado", price: "€11.50", img: img("Loaded Sweet Potato") },
    { name: "Yoghurt, Strawberries & Blueberries", description: "", price: "€11.00", img: img("Yoghurt, Strawberries & Blueberries") },
    { name: "Raw Veggie Summer Rolls", description: "Rice noodles, pistachios, black sesame and homemade peanut sauce", price: "€12.50", img: img("Raw Veggie Summer Rolls") },
    { name: "Stuffed Medjool Date with Peanut Butter & Dark Chocolate", description: "", price: "€3.00", img: img("Stuffed Medjool Date with Peanut Butter & Dark Chocolate") },
    { name: "Grilled Banana Bread", description: "Served with mascarpone & grilled banana", price: "€6.50", img: img("Grilled Banana Bread") },
    { name: "Berry Chia Pudding", description: "Topped with homemade nutty granola, mixed berries and almond butter", price: "€10.00", img: img("Berry Chia Pudding") },
    { name: "Mixed Lentil Bowl", description: "Carrot, spinach, rocket & black olives", price: "€12.50", img: img("Mixed Lentil Bowl") },
    { name: "Iced Latte", description: "", price: "€4.00", img: img("Iced Latte") },
  ],
  "Bakery": [
    { name: "Croissant", description: "", price: "€3.00", img: img("Croissant") },
    { name: "Almond Croissant", description: "", price: "€6.00", img: img("Almond Croissant") },
    { name: "Devon Ham & Cheese Croissant Sandwich", description: "", price: "€7.00", img: img("Devon Ham & Cheese Croissant Sandwich") },
    { name: "Herbed Zucchini & Feta Bread", description: "", price: "€5.00", img: img("Herbed Zucchini & Feta Bread") },
    { name: "Grilled Banana Bread", description: "Served with mascarpone & grilled banana", price: "€6.50", img: img("Grilled Banana Bread") },
  ],
  "Oats & Chia": [
    { name: "Porridge", description: "Grilled banana, pistachio butter, almond flakes, pistachios, cinnamon with honey or maple", price: "€11.00", popular: true, img: img("Porridge") },
    { name: "Overnight Chia Oats", description: "Peanut butter, chocolate ganache, salted peanuts and banana", price: "€8.50", img: img("Overnight Chia Oats") },
    { name: "Overnight Matcha Chia Oats", description: "Topped with strawberries, coconut flakes and pistachios", price: "€10.00", img: img("Overnight Matcha Chia Oats") },
    { name: "Berry Chia Pudding", description: "Topped with homemade nutty granola, mixed berries and almond butter", price: "€10.00", img: img("Berry Chia Pudding") },
  ],
  "Granola Bowls": [
    { name: "Yoghurt, Banana & Maple", description: "Dried fruits, banana chips, almonds and pistachios", price: "€11.00", img: img("Yoghurt, Banana & Maple") },
    { name: "Yoghurt, Strawberries & Blueberries", description: "", price: "€11.00", img: img("Yoghurt, Strawberries & Blueberries") },
  ],
  "Smoothie Bowls": [
    { name: "Acai", description: "Homemade granola, fresh fruit, goji berries, coconut flakes & cacao nibs", price: "€13.00", popular: true, img: img("Acai") },
    { name: "Playdate", description: "Fresh coconut, organic oats, homemade nutty granola, peanut butter, medjool dates, cinnamon, banana, organic dried mulberries, raw cashews, salted peanuts and black sesame", price: "€14.50", img: img("Playdate") },
    { name: "Matchaful", description: "Fresh coconut, ceremonial grade matcha, banana, avocado, mixed berries, pistachio butter, pistachios, coconut flakes and dried mulberries", price: "€14.50", img: img("Matchaful") },
    { name: "Exotica", description: "Fresh coconut, coconut yoghurt, banana, pineapple, mango, kiwi, passion fruit, ginger lime zest, turmeric, coconut flakes and pumpkin seeds", price: "€14.50", img: img("Exotica") },
    { name: "Cosmic Cacao", description: "Fresh coconut, organic oats, raw cacao, organic cacao protein, cinnamon, almond butter, raw macadamia nuts, raw brazil nuts, pumpkin seeds, almond flakes, goji berries and coconut flakes", price: "€14.50", img: img("Cosmic Cacao") },
  ],
  "Veggie Dishes": [
    { name: "Raw Veggie Summer Rolls", description: "Rice noodles, pistachios, black sesame and homemade peanut sauce", price: "€12.50", img: img("Raw Veggie Summer Rolls") },
    { name: "Mango Salad", description: "Seeds, sesame, lemongrette and fresh chili", price: "€12.00", img: img("Mango Salad") },
    { name: "Loaded Sweet Potato", description: "With hummus and avocado", price: "€11.50", popular: true, img: img("Loaded Sweet Potato") },
    { name: "Mixed Lentil Bowl", description: "Carrot, spinach, rocket & black olives", price: "€12.50", img: img("Mixed Lentil Bowl") },
    { name: "Egg Protein Salad", description: "Mixed greens, egg, avocado, cottage cheese, aubergine, peppers, capers, pine nuts, seeds and pumpkin bread", price: "€15.00", popular: true, img: img("Egg Protein Salad") },
  ],
  "Juices & Smoothies": [
    { name: "C1", description: "Carrot, orange, apple, ginger", price: "€6.50", img: img("C1") },
    { name: "G1", description: "Celery, green apple, lime, ginger", price: "€6.50", img: img("G1") },
    { name: "G2", description: "Pineapple, apple, lime", price: "€6.50", img: img("G2") },
    { name: "G3", description: "Avocado, spinach, apple, cucumber, ginger", price: "€7.00", img: img("G3") },
    { name: "O1", description: "Orange", price: "€3.50", img: img("O1") },
    { name: "P1", description: "Pink grapefruit", price: "€4.00", img: img("P1") },
    { name: "S1", description: "Strawberry, blueberry, orange, banana", price: "€7.50", img: img("S1") },
    { name: "S2", description: "Coconut milk, banana, peanut butter", price: "€7.00", img: img("S2") },
    { name: "Black Magic", description: "Coconut water, activated charcoal, cold pressed pineapple, cold pressed ginger", price: "€7.50", img: img("Black Magic") },
    { name: "Super Greens", description: "Coconut water, cold pressed ginger, spirulina, hemp protein, banana, kiwi, raw spinach", price: "€8.00", img: img("Super Greens") },
    { name: "Vegan Cacao Smoothie", description: "Peanut butter, banana", price: "€7.50", img: img("Vegan Cacao Smoothie") },
  ],
  "Hot & Cold": [
    { name: "Americano", description: "", price: "€3.50", img: img("Americano") },
    { name: "Flat White", description: "", price: "€3.50", img: img("Flat White") },
    { name: "Cappuccino", description: "", price: "€4.00", img: img("Cappuccino") },
    { name: "Latte", description: "", price: "€4.00", img: img("Latte") },
    { name: "French Press", description: "", price: "€3.50", img: img("French Press") },
    { name: "Freddo Espresso", description: "", price: "€3.50", popular: true, img: img("Freddo Espresso") },
    { name: "Freddo Cappuccino", description: "", price: "€3.50", img: img("Freddo Cappuccino") },
    { name: "Iced Americano", description: "", price: "€3.50", img: img("Iced Americano") },
    { name: "Iced Flat White", description: "", price: "€3.50", img: img("Iced Flat White") },
    { name: "Iced Latte", description: "", price: "€4.00", img: img("Iced Latte") },
    { name: "Iced Bumble Coffee", description: "", price: "€6.00", img: img("Iced Bumble Coffee") },
    { name: "Matcha Latte", description: "", price: "€6.50", img: img("Matcha Latte") },
    { name: "Iced Coconut Matcha Espresso", description: "", price: "€7.50", img: img("Iced Coconut Matcha Espresso") },
    { name: "Matcha Rose Latte", description: "Σερβίρεται με γάλα καρύδας", price: "€7.50", img: img("Matcha Rose Latte") },
    { name: "Dreamy Vegan Cacao", description: "", price: "€6.50", img: img("Dreamy Vegan Cacao") },
    { name: "Cold Brew Organic Iced Rose Tea", description: "", price: "€4.00", img: img("Cold Brew Organic Iced Rose Tea") },
    { name: "Water 0.5L", description: "", price: "€1.00", img: img("Water 0.5L") },
  ],
  "Desserts": [
    { name: "Stuffed Medjool Date with Peanut Butter & Dark Chocolate", description: "", price: "€3.00", img: img("Stuffed Medjool Date with Peanut Butter & Dark Chocolate") },
    { name: "Raw Cacao Bar with Pistachio & Orange", description: "", price: "€5.00", img: img("Raw Cacao Bar with Pistachio & Orange") },
    { name: "Raw Dark Chocolate & Salted Peanut Butter Tart", description: "", price: "€8.00", img: img("Raw Dark Chocolate & Salted Peanut Butter Tart") },
    { name: "Carrot Muffin", description: "", price: "€6.50", img: img("Carrot Muffin") },
  ],
  "Retail": [
    { name: "Homemade Slow Roasted Nutty Maple Granola", description: "500gr · take a jar of the house granola home", price: "€15.00", img: img("Homemade Slow Roasted Nutty Maple Granola") },
  ],
};

export const categorySubtitles = {
  "Most Ordered": "Our guests' favourites",
  "Bakery": "Freshly baked",
  "Oats & Chia": "Slow mornings",
  "Granola Bowls": "Homemade granola bowls",
  "Smoothie Bowls": "Thick, cold & loaded",
  "Veggie Dishes": "Garden-fresh plates",
  "Juices & Smoothies": "Cold pressed juices & smoothies",
  "Hot & Cold": "Hot & cold beverages",
  "Desserts": "Sweet — mostly raw",
  "Retail": "Take a little home",
};

export const categories = Object.keys(menuData);
