# Sweet Delight Bakery

A responsive cake shopping website built for **Java Web Development Homework 1**. Sweet Delight Bakery presents a premium online bakery experience where customers can browse handcrafted cakes, explore categories, discover best sellers and new arrivals, and create an account.

<p align="center">
  <strong>Freshly baked luxury cakes for life's sweetest moments.</strong><br />
  <a href="https://github.com/wazed-md-abdul/JavaWebDevelopment-Homework1">View the repository</a>
</p>

## Visual Demo

Sweet Delight Bakery uses a dark, elegant bakery theme with rich red accents, glassmorphism cards, responsive layouts, and product-focused imagery.

### Home Page Preview

<p align="center">
  <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85" alt="Chocolate cake representing the Sweet Delight Bakery home page" width="850" />
</p>

<p align="center"><em>Featured Belgian dark truffle mousse cake used in the homepage hero section.</em></p>

### Experience Highlights

| Feature | Description |
| --- | --- |
| **Premium storefront** | A polished hero section introduces the bakery and its signature cakes. |
| **Category discovery** | Customers can browse curated cake categories using visual category cards. |
| **Best sellers** | Popular cakes are highlighted in a dedicated customer-favorites section. |
| **New arrivals** | Seasonal and recently added cakes are presented in a separate collection. |
| **Account experience** | Registration and login pages provide a clear customer entry point. |
| **Responsive interface** | Layouts adapt across mobile, tablet, and desktop screen sizes. |

> **Note:** The repository currently contains the application source and product imagery rather than captured browser screenshots. The visual preview above uses the same cake imagery featured by the homepage. To add exact browser screenshots, save captures to `docs/screenshots/` and replace the preview image with those files.

## Overview

The application is a multi-page storefront designed around a luxury bakery theme. It combines a dark red visual palette, liquid-glass UI elements, responsive layouts, reusable React components, and typed product data to create a polished shopping experience.

### Main Features

- Hero section promoting freshly baked artisan cakes
- Cake category browsing with dynamic category filters
- Best-selling and newly added cake collections
- Product cards with reusable presentation components
- Customer registration and login pages
- In-memory form validation without persistent browser storage
- Responsive design for mobile, tablet, and desktop screens
- Accessible navigation and descriptive image alt text
- Reusable Liquid Glass cards and buttons inspired by Lightswind components
- TypeScript-based data models and application structure

## Application Pages

- `/` – Bakery home page with featured content, categories, best sellers, and new arrivals
- `/categories` – Browse cakes by category
- `/hot` – View popular and best-selling cakes
- `/new` – View the latest cake creations
- `/register` – Create a new customer account
- `/login` – Sign in to an existing account

## Technology Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/) for icons
- `clsx` and `tailwind-merge` for composing utility classes
- ESLint for code quality checks

## Project Structure

```text
src/
├── app/             # App Router pages, layouts, and global styles
├── components/      # Reusable interface and cake components
├── context/         # Shared in-memory application state
├── data/            # Typed product and category data
└── types/           # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm, pnpm, yarn, or Bun

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/wazed-md-abdul/JavaWebDevelopment-Homework1.git
cd JavaWebDevelopment-Homework1
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

The development server supports hot reloading, so changes to the source files are reflected automatically.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates an optimized production build |
| `npm start` | Runs the production build locally |
| `npm run lint` | Checks the project with ESLint |

## Design and Implementation Notes

- Product and category content is stored in typed data files rather than duplicated inside page components.
- UI elements are built with reusable React components to keep the pages consistent and maintainable.
- Registration state and validation are handled in memory; the project does not use `localStorage`, `sessionStorage`, cookies, or a backend database.
- The interface is designed to remain usable across different screen sizes.
- External cake imagery is used for visual presentation in the storefront.

## Requirements Reference

The original project requirements are available in [`cake-shopping-website-requirements.md`](./cake-shopping-website-requirements.md).

## Deployment

This Next.js application can be deployed to platforms that support Next.js, including [Vercel](https://vercel.com/).

Create a production build before deployment:

```bash
npm run build
npm start
```

## Academic Project

This repository was created as part of a Java Web Development course assignment. The project demonstrates modern frontend development practices using Next.js, React, TypeScript, and Tailwind CSS.
