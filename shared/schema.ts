
import { pgTable, text, serial, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Import Auth Models (Required)
export * from "./models/auth";

// Wishlist Items
export const wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  link: text("link"),
  imagePath: text("image_path"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWishlistItemSchema = createInsertSchema(wishlistItems).omit({ 
  id: true, 
  createdAt: true 
});

export type WishlistItem = typeof wishlistItems.$inferSelect;
export type InsertWishlistItem = z.infer<typeof insertWishlistItemSchema>;

// Pickup Points
export const pickupPoints = pgTable("pickup_points", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPickupPointSchema = createInsertSchema(pickupPoints).omit({ 
  id: true, 
  createdAt: true 
});

export type PickupPoint = typeof pickupPoints.$inferSelect;
export type InsertPickupPoint = z.infer<typeof insertPickupPointSchema>;

// Submissions
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  senderName: text("sender_name").notNull(),
  senderSurname: text("sender_surname").notNull(),
  qrCodePath: text("qr_code_path").notNull(),
  paymentProofPath: text("payment_proof_path").notNull(),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({ 
  id: true, 
  createdAt: true,
  status: true 
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
