# Inventory Management System

The Inventory Management System is a web application built with Nuxt.js (Vue.js) and Tailwind CSS for the frontend. The backend is powered by MongoDB and Express.js, providing a robust system for users to manage their inventory efficiently. The system offers product tracking, monthly statistics visualization through graphs, and downloadable reports in CSV format within a user-friendly dashboard.

## Features
- User Authentication: Secure authentication using middleware.

- Inventory Management: Add, update, and delete products seamlessly.

- Graphical Insights: View product statistics with dynamic charts.

- CSV Export: Download reports of inventory data for analysis.

- Dashboard Overview: Get an overview of your inventory status at a glance.

## Technology Stack

Frontend:

- Nuxt.js (Vue.js) – A powerful framework for building performant Vue applications.

- Tailwind CSS – A utility-first CSS framework for rapid UI development.

Backend:

- MongoDB – NoSQL database for storing inventory data.

- Express.js – A minimalist web framework for Node.js.

## Project Structure
<pre>└── sunny8212-inventory-management---frontend/
    ├── README.md
    ├── app.vue
    ├── nuxt.config.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── assets/
    │   └── css/
    │       ├── main.css
    │       └── tailwind.css
    ├── middleware/
    │   └── auth.js
    ├── pages/
    │   ├── dashboard.vue
    │   ├── index.vue
    │   └── register.vue
    ├── public/
    │   └── robots.txt
    └── server/
        └── tsconfig.json</pre>

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
