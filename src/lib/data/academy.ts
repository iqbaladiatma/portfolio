export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface Chapter {
  slug: string;
  title: string;
  description: string;
  duration: number; // minutes
  order: number;
  videoId: string; // youtube id
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string | null;
  level: Level;
  price: number; // 0 = free, IDR
  chapters: Chapter[];
  students: number;
  category: string;
  tags: string[];
  featured: boolean;
  updatedAt: string;
}

export const academyData: Course[] = [
  {
    slug: 'sveltekit-fullstack-modern',
    title: 'SvelteKit Full-Stack Modern Web Development',
    description: 'Build production-ready full-stack apps with SvelteKit, TypeScript, and modern tooling from scratch.',
    longDescription: 'A comprehensive course covering SvelteKit from the ground up. You will learn routing, server-side rendering, API routes, authentication, database integration, and deployment. Perfect for developers who want to build fast, modern web applications.',
    thumbnail: null,
    level: 'intermediate',
    price: 0,
    students: 128,
    category: 'Web Development',
    tags: ['SvelteKit', 'TypeScript', 'Full-Stack'],
    featured: true,
    updatedAt: '2024-11',
    chapters: [
      { slug: 'intro-sveltekit', title: 'Introduction to SvelteKit', description: 'Overview of SvelteKit, why it matters, and what we will build.', duration: 12, order: 1, videoId: 'demoId1' },
      { slug: 'routing-basics', title: 'File-based Routing', description: 'Understanding the +page.svelte, +layout.svelte, and route params.', duration: 18, order: 2, videoId: 'demoId2' },
      { slug: 'load-functions', title: 'Load Functions & Data Fetching', description: 'Server-side and universal load functions, PageData types.', duration: 22, order: 3, videoId: 'demoId3' },
      { slug: 'form-actions', title: 'Form Actions & Mutations', description: 'Progressive enhancement with SvelteKit form actions.', duration: 20, order: 4, videoId: 'demoId4' },
      { slug: 'auth-session', title: 'Authentication & Sessions', description: 'Implementing auth with Lucia or custom JWT sessions.', duration: 28, order: 5, videoId: 'demoId5' },
      { slug: 'database-drizzle', title: 'Database with Drizzle ORM', description: 'Connecting PostgreSQL and writing type-safe queries.', duration: 25, order: 6, videoId: 'demoId6' },
      { slug: 'deployment', title: 'Deployment to Vercel & Cloudflare', description: 'Adapters, environment variables, and production checklist.', duration: 15, order: 7, videoId: 'demoId7' },
    ]
  },
  {
    slug: 'laravel-tall-stack',
    title: 'Laravel TALL Stack — Build Real Apps',
    description: 'Master the TALL Stack (Tailwind, Alpine.js, Livewire, Laravel) by building a complete SaaS application.',
    longDescription: 'Deep dive into the TALL Stack ecosystem. This course walks you through building a real SaaS product with Laravel 11, Livewire 3, Alpine.js, and Tailwind CSS. Covers multi-tenancy, payments, and advanced Livewire patterns.',
    thumbnail: null,
    level: 'intermediate',
    price: 149000,
    students: 94,
    category: 'Web Development',
    tags: ['Laravel', 'Livewire', 'PHP', 'TALL Stack'],
    featured: true,
    updatedAt: '2024-10',
    chapters: [
      { slug: 'laravel-setup', title: 'Laravel 11 Project Setup', description: 'Scaffolding, Breeze, and project structure overview.', duration: 14, order: 1, videoId: 'demoId1' },
      { slug: 'livewire-basics', title: 'Livewire 3 Fundamentals', description: 'Components, properties, actions, and lifecycle hooks.', duration: 24, order: 2, videoId: 'demoId2' },
      { slug: 'alpine-interactivity', title: 'Alpine.js for Interactivity', description: 'x-data, x-show, x-transition, and Livewire entangle.', duration: 18, order: 3, videoId: 'demoId3' },
      { slug: 'eloquent-advanced', title: 'Advanced Eloquent Patterns', description: 'Scopes, observers, polymorphic relations, and eager loading.', duration: 30, order: 4, videoId: 'demoId4' },
      { slug: 'filament-admin', title: 'Admin Panel with Filament', description: 'Building a full admin dashboard with Filament v3.', duration: 35, order: 5, videoId: 'demoId5' },
      { slug: 'payments-midtrans', title: 'Payment Integration (Midtrans)', description: 'Snap payment gateway, webhooks, and subscription logic.', duration: 28, order: 6, videoId: 'demoId6' },
    ]
  },
  {
    slug: 'flutter-mobile-apps',
    title: 'Flutter Mobile Development — Zero to Production',
    description: 'Build beautiful cross-platform mobile apps with Flutter and Dart. From UI to Firebase backend.',
    longDescription: 'A practical Flutter course focused on building real mobile applications. Covers Dart fundamentals, widget tree, state management with Riverpod, Firebase integration, and publishing to Play Store and App Store.',
    thumbnail: null,
    level: 'beginner',
    price: 0,
    students: 211,
    category: 'Mobile Development',
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    featured: true,
    updatedAt: '2024-09',
    chapters: [
      { slug: 'dart-basics', title: 'Dart Language Fundamentals', description: 'Types, null safety, async/await, and OOP in Dart.', duration: 20, order: 1, videoId: 'demoId1' },
      { slug: 'flutter-widgets', title: 'Flutter Widget Tree', description: 'Stateless vs Stateful, layout widgets, and theming.', duration: 25, order: 2, videoId: 'demoId2' },
      { slug: 'navigation-routing', title: 'Navigation & Routing', description: 'GoRouter setup, deep links, and nested navigation.', duration: 18, order: 3, videoId: 'demoId3' },
      { slug: 'riverpod-state', title: 'State Management with Riverpod', description: 'Providers, AsyncNotifier, and dependency injection.', duration: 32, order: 4, videoId: 'demoId4' },
      { slug: 'firebase-flutter', title: 'Firebase Integration', description: 'Auth, Firestore, Storage, and Cloud Messaging.', duration: 28, order: 5, videoId: 'demoId5' },
      { slug: 'publish-app', title: 'Publishing Your App', description: 'Build, sign, and publish to Play Store and App Store.', duration: 16, order: 6, videoId: 'demoId6' },
    ]
  },
  {
    slug: 'solana-web3-dev',
    title: 'Solana Web3 Development with Anchor',
    description: 'Build decentralized applications on Solana using the Anchor framework and modern Web3 tooling.',
    longDescription: 'Learn to build on Solana from scratch. This course covers the Solana programming model, writing smart contracts (programs) with Anchor, building a frontend with SvelteKit and wallet adapters, and deploying to devnet and mainnet.',
    thumbnail: null,
    level: 'advanced',
    price: 299000,
    students: 47,
    category: 'Blockchain',
    tags: ['Solana', 'Anchor', 'Web3', 'Blockchain'],
    featured: false,
    updatedAt: '2024-08',
    chapters: [
      { slug: 'solana-model', title: 'Solana Programming Model', description: 'Accounts, programs, transactions, and the runtime.', duration: 22, order: 1, videoId: 'demoId1' },
      { slug: 'anchor-setup', title: 'Anchor Framework Setup', description: 'Workspace, IDL, and your first program.', duration: 20, order: 2, videoId: 'demoId2' },
      { slug: 'token-program', title: 'SPL Token Program', description: 'Minting tokens, creating ATAs, and transfer logic.', duration: 30, order: 3, videoId: 'demoId3' },
      { slug: 'frontend-wallet', title: 'Frontend with Wallet Adapter', description: 'Connecting Phantom, signing transactions in SvelteKit.', duration: 25, order: 4, videoId: 'demoId4' },
      { slug: 'deploy-mainnet', title: 'Deploying to Mainnet', description: 'Program verification, upgrade authority, and monitoring.', duration: 18, order: 5, videoId: 'demoId5' },
    ]
  },
  {
    slug: 'typescript-mastery',
    title: 'TypeScript Mastery — From Basics to Advanced',
    description: 'Master TypeScript with practical examples. Generics, utility types, decorators, and real-world patterns.',
    longDescription: 'A thorough TypeScript course that goes beyond the basics. You will learn advanced type system features, write type-safe APIs, use TypeScript with popular frameworks, and adopt patterns used in large codebases.',
    thumbnail: null,
    level: 'intermediate',
    price: 0,
    students: 183,
    category: 'Language',
    tags: ['TypeScript', 'JavaScript', 'Types'],
    featured: false,
    updatedAt: '2024-12',
    chapters: [
      { slug: 'ts-basics', title: 'TypeScript Basics & Setup', description: 'tsconfig, basic types, interfaces vs types.', duration: 16, order: 1, videoId: 'demoId1' },
      { slug: 'generics', title: 'Generics In Depth', description: 'Generic functions, constraints, conditional types.', duration: 24, order: 2, videoId: 'demoId2' },
      { slug: 'utility-types', title: 'Utility Types & Mapped Types', description: 'Partial, Pick, Omit, Record, and custom mapped types.', duration: 20, order: 3, videoId: 'demoId3' },
      { slug: 'type-narrowing', title: 'Type Narrowing & Guards', description: 'Discriminated unions, type predicates, and assertion functions.', duration: 18, order: 4, videoId: 'demoId4' },
      { slug: 'ts-patterns', title: 'Real-World TypeScript Patterns', description: 'Builder pattern, repository pattern, and typed event emitters.', duration: 26, order: 5, videoId: 'demoId5' },
    ]
  },
  {
    slug: 'node-rest-api',
    title: 'Node.js REST API — Production Ready',
    description: 'Build scalable REST APIs with Node.js, Express, and PostgreSQL. Auth, validation, testing, and deployment.',
    longDescription: 'A production-focused Node.js course. Build a complete REST API with Express, implement JWT authentication, input validation with Zod, database access with Prisma, write integration tests, and deploy with Docker.',
    thumbnail: null,
    level: 'intermediate',
    price: 99000,
    students: 76,
    category: 'Backend',
    tags: ['Node.js', 'Express', 'REST API', 'PostgreSQL'],
    featured: false,
    updatedAt: '2024-07',
    chapters: [
      { slug: 'express-setup', title: 'Express Project Structure', description: 'Layered architecture, middleware, and error handling.', duration: 18, order: 1, videoId: 'demoId1' },
      { slug: 'jwt-auth', title: 'JWT Authentication', description: 'Access tokens, refresh tokens, and secure cookie storage.', duration: 26, order: 2, videoId: 'demoId2' },
      { slug: 'prisma-db', title: 'Database with Prisma', description: 'Schema design, migrations, and type-safe queries.', duration: 22, order: 3, videoId: 'demoId3' },
      { slug: 'validation-zod', title: 'Input Validation with Zod', description: 'Schema validation, error formatting, and middleware integration.', duration: 16, order: 4, videoId: 'demoId4' },
      { slug: 'testing-api', title: 'Testing with Vitest & Supertest', description: 'Unit tests, integration tests, and test database setup.', duration: 24, order: 5, videoId: 'demoId5' },
      { slug: 'docker-deploy', title: 'Docker & Deployment', description: 'Dockerfile, docker-compose, and deploying to Railway.', duration: 20, order: 6, videoId: 'demoId6' },
    ]
  }
];

export const categories = [...new Set(academyData.map(c => c.category))];
export const levels: Level[] = ['beginner', 'intermediate', 'advanced'];

export const levelLabel: Record<Level, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

export const levelColor: Record<Level, string> = {
  beginner: '#16a34a',
  intermediate: '#d97706',
  advanced: '#dc2626'
};

export function getTotalDuration(course: Course): number {
  return course.chapters.reduce((sum, c) => sum + c.duration, 0);
}
