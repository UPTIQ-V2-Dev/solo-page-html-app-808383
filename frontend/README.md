# Single Page HTML Application

A modern single page application built with React 19, TypeScript, Tailwind CSS, and Shadcn/UI.

## Quick Fix for PNPM Issue

If you encounter the error "spawn pnpm ENOENT", it means pnpm is not installed. Here are the solutions:

### Solution 1: Use the automatic fix script (RECOMMENDED)
```bash
npm run fix-pnpm
```
This will automatically detect and fix the pnpm issue using multiple methods.

### Solution 2: Use the built-in setup script
```bash
npm run setup
```
This will install dependencies with npm and build the project.

### Solution 3: Use npx to run pnpm
```bash
npm run pnpm:install  # Installs dependencies using npx pnpm
npm run pnpm:build    # Builds using npx pnpm
npm run pnpm:dev      # Runs dev server using npx pnpm
```

### Solution 4: Install PNPM globally
```bash
npm install -g pnpm
pnpm install
pnpm run build
```

### Solution 5: Use NPM instead
```bash
# Remove pnpm-lock.yaml
rm pnpm-lock.yaml

# Install dependencies with npm
npm install

# Build the project
npm run build

# Start development server
npm run dev
```

### Solution 6: Use Yarn
```bash
# Remove pnpm-lock.yaml
rm pnpm-lock.yaml

# Install dependencies with yarn
yarn install

# Build the project
yarn build

# Start development server
yarn dev
```

## Project Structure

```
src/
├── App.tsx (main single page container)
├── components/
│   ├── Header.tsx (navigation with theme toggle)
│   ├── MainContent.tsx (orchestrates all sections)
│   ├── Footer.tsx (footer information)
│   ├── sections/
│   │   ├── HeroSection.tsx (landing area)
│   │   ├── FeaturesSection.tsx (feature cards)
│   │   ├── AboutSection.tsx (about information)
│   │   └── ContactSection.tsx (contact form & info)
│   └── ui/ (Shadcn components + custom components)
├── hooks/
│   ├── usePageState.ts (page-wide state management)
│   └── useScrollSpy.ts (navigation highlighting)
├── data/
│   ├── content.ts (static content)
│   └── features.ts (features data)
├── types/
│   ├── content.ts (content type definitions)
│   └── ui.ts (UI component types)
└── lib/
    ├── form-validation.ts (Zod schemas)
    └── scroll-utils.ts (smooth scrolling)
```

## Features Implemented

- ✅ **Responsive Design**: Mobile, tablet, and desktop support
- ✅ **Dark/Light Theme**: Toggle with persistence
- ✅ **Smooth Scrolling**: Navigation between sections
- ✅ **Interactive Forms**: Contact form with validation
- ✅ **Modern UI**: Beautiful components using Shadcn/UI
- ✅ **Performance**: Optimized with React 19 and Vite
- ✅ **Accessibility**: Semantic HTML and keyboard navigation
- ✅ **TypeScript**: Full type safety throughout

## Available Scripts

- `fix-pnpm`: Automatically fix PNPM issues (RECOMMENDED)
- `setup`: Install dependencies with npm and build
- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build
- `eslint`: Run ESLint
- `prettier`: Format code
- `test`: Run tests
- `pnpm:install`: Install dependencies using npx pnpm
- `pnpm:build`: Build using npx pnpm
- `pnpm:dev`: Start dev server using npx pnpm

## Deployment

The application builds to a single HTML file with all assets inlined, perfect for static hosting on any platform.