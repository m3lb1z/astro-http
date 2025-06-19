# Astro HTTP Blog Project

## Overview
This is an Astro-based blog application with Vue.js integration, database functionality, and a like system for posts. The project is deployed on Cloudflare Pages.

## Tech Stack
- **Framework**: Astro 5.7.13
- **UI Framework**: Vue 3.5.14
- **Database**: Astro DB (@astrojs/db)
- **Deployment**: Cloudflare Pages
- **Content**: MDX for blog posts
- **Styling**: Global CSS

## Project Structure
```
src/
├── actions/           # Server actions for data operations
│   ├── greetings/    # Greeting-related actions
│   └── posts/        # Post-related actions (likes, etc.)
├── components/       # Reusable components
│   └── likes/        # Like system components (Vue)
├── content/          # Content collections
│   └── blog/         # Blog post markdown files
├── layouts/          # Page layouts
├── pages/            # File-based routing
│   ├── api/          # API endpoints
│   └── blog/         # Blog pages
└── styles/           # Global styles
```

## Database Schema
- **Clients**: id (number), name (text), age (number), isActive (boolean)
- **Posts**: id (text), title (text), likes (number)

## Development Commands
- `pnpm dev` - Start development server
- `pnpm dev:remote` - Start development server with remote DB
- `pnpm build` - Build for production
- `pnpm build:remote` - Build for production with remote DB
- `pnpm db:push` - Push database schema to remote

## Code Conventions
- Use TypeScript with strict mode enabled
- Import aliases: `@/*` maps to `./src/*`
- Vue components for interactive elements
- Astro components for static/server-rendered content
- Server actions pattern for data operations
- API routes follow RESTful conventions

## Key Features
- Blog system with markdown/MDX support
- Like counter functionality with real-time updates
- Client management system
- RSS feed generation
- Responsive design

## Deployment
- Site URL: https://astro-http-e1k.pages.dev
- Adapter: Cloudflare Pages
- Database: Remote Astro DB instance

## Notes
- Always use `pnpm` as package manager
- Remote database operations require `--remote` flag
- Vue components are used for interactive elements only
- Astro components handle static content and layouts