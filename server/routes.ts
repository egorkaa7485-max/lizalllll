
import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupBot } from "./bot";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Register Integrations
  // await setupAuth(app);
  // registerAuthRoutes(app);
  // registerObjectStorageRoutes(app);

  // Setup Bot
  setupBot();

  // API Routes
  
  // Wishlist
  app.get(api.wishlist.list.path, async (req, res) => {
    const items = await storage.getWishlist();
    res.json(items);
  });

  app.post(api.wishlist.create.path, async (req, res) => {
    // Check auth (assuming only admin can create)
    // For now, allow all logged in users as admins? Or just check if logged in.
    // if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");

    try {
      const input = api.wishlist.create.input.parse(req.body);
      const item = await storage.createWishlistItem(input);
      res.status(201).json(item);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete(api.wishlist.delete.path, async (req, res) => {
    // if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    await storage.deleteWishlistItem(Number(req.params.id));
    res.status(204).send();
  });

  // Pickup Points
  app.get(api.pickupPoints.list.path, async (req, res) => {
    const points = await storage.getPickupPoints();
    res.json(points);
  });

  app.post(api.pickupPoints.create.path, async (req, res) => {
    // if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    try {
      const input = api.pickupPoints.create.input.parse(req.body);
      const point = await storage.createPickupPoint(input);
      res.status(201).json(point);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete(api.pickupPoints.delete.path, async (req, res) => {
    // if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    await storage.deletePickupPoint(Number(req.params.id));
    res.status(204).send();
  });

  // Submissions
  app.get(api.submissions.list.path, async (req, res) => {
    // if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    const submissions = await storage.getSubmissions();
    res.json(submissions);
  });

  // Telegram Avatar
  app.get('/api/telegram-avatar/:userId', async (req, res) => {
    const { userId } = req.params;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return res.status(500).json({ error: 'Telegram bot token not configured' });
    }

    try {
      const TelegramBot = (await import('node-telegram-bot-api')).default;
      const bot = new TelegramBot(token);

      const photos = await bot.getUserProfilePhotos(parseInt(userId), { limit: 1 });

      if (photos.total_count > 0 && photos.photos[0]) {
        const photo = photos.photos[0].pop(); // Get the highest quality photo
        if (photo) {
          const fileLink = await bot.getFileLink(photo.file_id);
          res.json({ avatarUrl: fileLink });
          return;
        }
      }

      res.json({ avatarUrl: null });
    } catch (error) {
      console.error('Error fetching Telegram avatar:', error);
      res.status(500).json({ error: 'Failed to fetch avatar' });
    }
  });

  app.post(api.submissions.create.path, async (req, res) => {
    // Public endpoint
    try {
      const input = api.submissions.create.input.parse(req.body);
      const submission = await storage.createSubmission(input);
      res.status(201).json(submission);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      res.status(500).send("Internal Server Error");
    }
  });

  // Telegram Web App auth
  app.post('/api/telegram-auth', async (req, res) => {
    try {
      const { id, first_name, last_name, username, photo_url } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Telegram ID is required' });
      }

      // Find or create user by Telegram ID
      const existingUser = await storage.getUserByTelegramId(id.toString());

      if (existingUser) {
        // Update user data
        await storage.updateUserTelegramData(id.toString(), {
          telegramUsername: username,
          telegramFirstName: first_name,
          telegramLastName: last_name,
          telegramPhotoUrl: photo_url,
        });
        res.json({ success: true, user: existingUser });
      } else {
        // Create new user with Telegram data
        const newUser = await storage.createUser({
          telegramId: id.toString(),
          telegramUsername: username,
          telegramFirstName: first_name,
          telegramLastName: last_name,
          telegramPhotoUrl: photo_url,
        });
        res.json({ success: true, user: newUser });
      }
    } catch (error) {
      console.error('Telegram auth error:', error);
      res.status(500).json({ error: 'Failed to authenticate with Telegram' });
    }
  });

  // Simple auth endpoint - return user data for Telegram auth
  app.get('/api/auth/user', async (req, res) => {
    // For now, we'll use a simple session-based approach
    // In production, you'd want proper session management
    const telegramId = req.headers['x-telegram-user-id'] as string;

    if (!telegramId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
      const user = await storage.getUserByTelegramId(telegramId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });

  // Login endpoint for Telegram
  app.post('/api/login', async (req, res) => {
    try {
      const { id, first_name, last_name, username, photo_url } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Telegram ID is required' });
      }

      // Find or create user
      let user = await storage.getUserByTelegramId(id.toString());

      if (!user) {
        user = await storage.createUser({
          telegramId: id.toString(),
          telegramUsername: username,
          telegramFirstName: first_name,
          telegramLastName: last_name,
          telegramPhotoUrl: photo_url,
        });
      } else {
        // Update user data
        await storage.updateUserTelegramData(id.toString(), {
          telegramUsername: username,
          telegramFirstName: first_name,
          telegramLastName: last_name,
          telegramPhotoUrl: photo_url,
        });
      }

      // Set session header for subsequent requests
      res.setHeader('x-telegram-user-id', id.toString());
      res.json({ success: true, user });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  });



  return httpServer;
}
