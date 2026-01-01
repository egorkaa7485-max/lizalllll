# Elizavet Belle Gift Platform


## Overview

A gift submission platform for "Elizavet Belle" that allows fans to send gifts through a wishlist system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and UI animations
- **Form Handling**: React Hook Form with Zod validation
- **File Uploads**: Uppy with AWS S3-compatible presigned URL uploads

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **Build**: Vite for client, esbuild for server bundling
- **API Design**: RESTful endpoints defined in shared routes schema with Zod validation

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema management (`db:push` command)
- **Object Storage**: Google Cloud Storage via Replit's object storage integration

### Authentication
- **Method**: Replit OpenID Connect (OIDC) authentication
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user upsert on login with profile syncing

### Key Design Patterns
- **Shared Types**: Schema and route definitions in `shared/` directory used by both client and server
- **Type-Safe API**: Zod schemas define request/response types for all endpoints
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Integration Modules**: Replit-specific integrations isolated in `server/replit_integrations/`

### Database Tables
- `users` - Authenticated user profiles (required for Replit Auth)
- `sessions` - Session storage (required for Replit Auth)
- `wishlist_items` - Gift wishlist entries with images
- `pickup_points` - Physical pickup locations for gifts
- `submissions` - Gift submission records with QR codes and payment proofs

## External Dependencies

### Third-Party Services
- **Replit Auth**: OpenID Connect authentication via Replit's identity provider
- **Replit Object Storage**: S3-compatible file storage with presigned URL uploads
- **Telegram Bot API**: Bot notifications via `node-telegram-bot-api` package
- **Google Cloud Storage**: SDK used for object storage operations

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secret for session encryption
- `ISSUER_URL` - Replit OIDC issuer (defaults to https://replit.com/oidc)
- `REPL_ID` - Replit application identifier (auto-set by Replit)
- `TELEGRAM_BOT_TOKEN` - Token for Telegram bot integration (optional)
- `PUBLIC_OBJECT_SEARCH_PATHS` - Paths for public object access (optional)

### Key npm Dependencies
- `drizzle-orm` / `drizzle-kit` - Database ORM and migrations
- `express` / `express-session` - Web server and session management
- `passport` / `openid-client` - Authentication middleware
- `@tanstack/react-query` - Server state management
- `@uppy/core` / `@uppy/aws-s3` - File upload handling
- `framer-motion` - Animation library
- `zod` - Runtime type validation