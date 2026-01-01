
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Import Auth Models (Required)
export * from "./models/auth";

// Wishlist Items
export const wishlistItems = sqliteTable("wishlist_items", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  link: text("link"),
  imagePath: text("image_path"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const insertWishlistItemSchema = createInsertSchema(wishlistItems).omit({
  id: true,
  createdAt: true
});

export type WishlistItem = typeof wishlistItems.$inferSelect;
export type InsertWishlistItem = z.infer<typeof insertWishlistItemSchema>;

// Pickup Points
export const pickupPoints = sqliteTable("pickup_points", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  address: text("address").notNull(),
  details: text("details"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const insertPickupPointSchema = createInsertSchema(pickupPoints).omit({
  id: true,
  createdAt: true
});

export type PickupPoint = typeof pickupPoints.$inferSelect;
export type InsertPickupPoint = z.infer<typeof insertPickupPointSchema>;

// Submissions
export const submissions = sqliteTable("submissions", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  senderName: text("sender_name").notNull(),
  senderSurname: text("sender_surname").notNull(),
  message: text("message"),
  qrCodePath: text("qr_code_path").notNull(),
  paymentProofPath: text("payment_proof_path").notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  createdAt: true,
  status: true
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
