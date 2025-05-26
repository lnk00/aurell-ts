# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Client (React + Vite)
```bash
# Navigate to client directory
cd packages/client

# Development server
bun run dev  # Runs on port 5173

# Building
bun run build  # Runs vite build + typescript compilation

# Testing
bun run test  # Runs vitest

# Code quality
bun run lint    # Biome linting
bun run format  # Biome formatting
bun run check   # Biome check (lint + format)
```

### Server (Hono + Cloudflare Workers)
```bash
# Navigate to server directory
cd packages/server

# Development server
bun run dev  # Runs on port 3000

# Building
bun run build  # Builds for Cloudflare Workers

# Testing
bun run test  # Runs vitest with Cloudflare Workers pool

# Cloudflare deployment
bun run preview  # Local preview with wrangler
bun run deploy   # Deploy to Cloudflare Workers
bun run cf-typegen  # Generate Cloudflare types
```

### Root Commands
```bash
# Install all dependencies
bun install
```

## Architecture Overview

### Monorepo Structure
- **packages/client**: React frontend with Vite, TanStack Router/Query, Stytch authentication
- **packages/server**: Hono API server deployed on Cloudflare Workers with D1 database

### Authentication Flow
- **Client**: Uses Stytch SDK for magic link authentication with cookie-based sessions
- **Server**: JWT validation middleware (`guard.middleware.ts`) validates Stytch session tokens from cookies
- **Services**: Dependency injection pattern with Inversify container for auth services

### Key Technologies
- **Frontend**: React 19, TanStack Router/Query, Tailwind CSS, DaisyUI
- **Backend**: Hono framework, Cloudflare Workers, D1 database, Stytch authentication
- **Tooling**: Biome for linting/formatting, Vitest for testing, Bun package manager

### Service Architecture
Client uses dependency injection pattern with Inversify:
- Services are bound in `libs/ioc.lib.ts`
- Abstract interfaces in `services/` directories
- Stytch implementations in `implementations/` subdirectories

### Environment Configuration
Server requires these Cloudflare environment variables:
- `STYTCH_PROJECT_ID`: Stytch project identifier
- `STYTCH_SECRET`: Stytch secret key
- `CLIENT_URL`: Frontend application URL
- `DB`: D1 database binding (configured in wrangler.jsonc)