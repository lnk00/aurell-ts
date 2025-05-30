# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `bun run client:dev` - Start client development server on port 5173
- `bun run server:dev` - Start server development server on port 3000

### Testing
- `cd packages/client && bun run test` - Run client tests with Vitest
- `cd packages/server && bun run test` - Run server tests with Vitest and Cloudflare Workers pool

### Linting & Formatting
- `cd packages/client && bun run check` - Run Biome check (lint + format)
- `cd packages/client && bun run lint` - Run Biome linter
- `cd packages/client && bun run format` - Run Biome formatter
- Server uses root-level biome.json configuration

### Database Migrations
- `bun run server:migration:generate` - Generate new migration with Drizzle
- `bun run server:migration:apply` - Apply migrations to production D1 database
- `bun run server:migration:apply:local` - Apply migrations to local D1 database

### Deployment
- `bun run client:deploy` - Build and deploy client to Cloudflare Pages
- `bun run server:deploy` - Build and deploy server to Cloudflare Workers

## Architecture

### Monorepo Structure
- Bun workspace with `packages/client` and `packages/server`
- Both packages deploy to Cloudflare (Pages/Workers)
- Shared TypeScript configuration and Biome linting rules

### Client (React SPA)
- **Tech Stack**: React 19, TanStack Router, TanStack Query, Vite, Tailwind CSS, DaisyUI
- **Authentication**: Stytch integration with OAuth and magic link support
- **Architecture**: Feature-based organization with dependency injection (Inversify)
- **Key Features**: `/auth`, `/profile` routes with session management

### Server (Hono API)
- **Tech Stack**: Hono framework, Cloudflare Workers, Drizzle ORM, D1 database
- **Authentication**: Session-based with Stytch integration and guard middleware
- **Architecture**: Feature-based handlers with middleware pipeline
- **API Routes**: 
  - `/api/core` - Core functionality and health checks
  - `/api/profile` - User profile management
  - `/api/ob` - Open banking integration (Tink)

### Key Architectural Patterns
- **IoC Container**: Uses Inversify for dependency injection in both client and server
- **Service Layer**: Abstract service interfaces with implementation swapping (e.g., Stytch services)
- **Type Safety**: Full TypeScript with Zod validation and Hono RPC client
- **Testing**: Mock services for unit testing, Cloudflare Workers testing environment
- **Middleware Pipeline**: CORS, service injection, and authentication guard on all routes

### Context & State Management
- Server: Hono context extended with `userId` and `sessionId` from guard middleware
- Client: TanStack Router context with query client integration
- Shared types between client/server via Hono RPC pattern