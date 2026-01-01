
import { db } from "./db";
import {
  wishlistItems, pickupPoints, submissions,
  type InsertWishlistItem, type InsertPickupPoint, type InsertSubmission,
  type WishlistItem, type PickupPoint, type Submission
} from "@shared/schema";
import { users, type User, type UpsertUser } from "@shared/models/auth";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Wishlist
  getWishlist(): Promise<WishlistItem[]>;
  createWishlistItem(item: InsertWishlistItem): Promise<WishlistItem>;
  deleteWishlistItem(id: number): Promise<void>;

  // Pickup Points
  getPickupPoints(): Promise<PickupPoint[]>;
  createPickupPoint(point: InsertPickupPoint): Promise<PickupPoint>;
  deletePickupPoint(id: number): Promise<void>;

  // Submissions
  getSubmissions(): Promise<Submission[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  // updateSubmissionStatus(id: number, status: string): Promise<Submission>;

  // Users
  getUserByTelegramId(telegramId: string): Promise<User | null>;
  createUser(user: UpsertUser): Promise<User>;
  updateUserTelegramData(telegramId: string, data: Partial<UpsertUser>): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Wishlist
  async getWishlist(): Promise<WishlistItem[]> {
    return await db.select().from(wishlistItems).orderBy(desc(wishlistItems.createdAt));
  }

  async createWishlistItem(item: InsertWishlistItem): Promise<WishlistItem> {
    const [newItem] = await db.insert(wishlistItems).values(item).returning();
    return newItem;
  }

  async deleteWishlistItem(id: number): Promise<void> {
    await db.delete(wishlistItems).where(eq(wishlistItems.id, id));
  }

  // Pickup Points
  async getPickupPoints(): Promise<PickupPoint[]> {
    return await db.select().from(pickupPoints).orderBy(desc(pickupPoints.createdAt));
  }

  async createPickupPoint(point: InsertPickupPoint): Promise<PickupPoint> {
    const [newPoint] = await db.insert(pickupPoints).values(point).returning();
    return newPoint;
  }

  async deletePickupPoint(id: number): Promise<void> {
    await db.delete(pickupPoints).where(eq(pickupPoints.id, id));
  }

  // Submissions
  async getSubmissions(): Promise<Submission[]> {
    return await db.select().from(submissions).orderBy(desc(submissions.createdAt));
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [newSubmission] = await db.insert(submissions).values(submission).returning();
    return newSubmission;
  }

  // Users
  async getUserByTelegramId(telegramId: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.telegramId, telegramId)).limit(1);
    return user || null;
  }

  async createUser(user: UpsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUserTelegramData(telegramId: string, data: Partial<UpsertUser>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(data)
      .where(eq(users.telegramId, telegramId))
      .returning();
    return updatedUser;
  }
}

export const storage = new DatabaseStorage();
