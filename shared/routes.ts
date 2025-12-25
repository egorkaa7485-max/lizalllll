
import { z } from 'zod';
import { insertWishlistItemSchema, wishlistItems, insertPickupPointSchema, pickupPoints, insertSubmissionSchema, submissions } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  wishlist: {
    list: {
      method: 'GET' as const,
      path: '/api/wishlist',
      responses: {
        200: z.array(z.custom<typeof wishlistItems.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/wishlist',
      input: insertWishlistItemSchema,
      responses: {
        201: z.custom<typeof wishlistItems.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/wishlist/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  pickupPoints: {
    list: {
      method: 'GET' as const,
      path: '/api/pickup-points',
      responses: {
        200: z.array(z.custom<typeof pickupPoints.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/pickup-points',
      input: insertPickupPointSchema,
      responses: {
        201: z.custom<typeof pickupPoints.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/pickup-points/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  submissions: {
    list: {
      method: 'GET' as const,
      path: '/api/submissions', // Admin only
      responses: {
        200: z.array(z.custom<typeof submissions.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/submissions',
      input: insertSubmissionSchema,
      responses: {
        201: z.custom<typeof submissions.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
