
import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");
  try {
    const wishlist = await storage.getWishlist();
    if (wishlist.length === 0) {
      await storage.createWishlistItem({
        title: "Dior Lipstick",
        description: "Shade 999, velvet finish. Must have!",
        link: "https://www.dior.com",
        imagePath: "https://placehold.co/400x300/pink/white?text=Lipstick",
      });
      console.log("Added wishlist item.");
    }

    const points = await storage.getPickupPoints();
    if (points.length === 0) {
      await storage.createPickupPoint({
        address: "CDEK, Lenina St. 45",
        details: "Code 1234",
      });
      console.log("Added pickup point.");
    }
  } catch (error) {
    console.error("Error seeding:", error);
  }
  console.log("Seeding complete.");
  process.exit(0);
}

seed();
