# StartupForge Client

[![Next.js Version](https://img.shields.io/badge/next.js-v16.2.9-black.svg?logo=next.js)](https://nextjs.org)
[![React Version](https://img.shields.io/badge/react-v19.2.7-blue.svg?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/tailwind_css-v4.3.1-blueviolet.svg?logo=tailwind-css)](https://tailwindcss.com)
[![TanStack Query](https://img.shields.io/badge/tanstack_query-v5.101.1-ff4154.svg?logo=react-query)](https://tanstack.com/query/latest)
[![HeroUI](https://img.shields.io/badge/HeroUI-v3.2.1-cyan.svg)](https://heroui.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Professional client interface for StartupForge, a premium Startup Team Builder Platform where startup founders can publish startup ideas, recruit collaborators, and build high-performing startup teams.

## Live Demo

- **Frontend Application URL**: `https://startup-forge-nine.vercel.app`
- **Backend Service API URL**: `https://startup-forge-server-phi.vercel.app`

## Features

The client interface is split into public-facing pages and role-specific dashboards with strict routing protections.

### Public Pages

- **Home**: Introducing StartupForge value propositions, platform stats, features overview, and interactive hero designs.
- **Browse Startups**: Explore active startups with interactive grid designs and filter parameters.
- **Startup Details**: Detailed view of a startup's pitch, founder contact info, team directory, and opportunity listings.
- **Browse Opportunities**: Interactive directory of startup jobs/roles with search filters and pagination.
- **Login / Register**: Clean email/password sign-in and Google Social Account linking, featuring error status messages.

### Founder Dashboard

- **Overview**: Founder metrics overview (Total Opportunities, Total Applications, Accepted Members) visualized with Recharts dashboards.
- **My Startup**: Startup profile builder (Create/Update Startup, set pitch and logos, status set to "pending" for admin review).
- **Add Opportunity**: Multi-step opportunity creator. Restricts free tier founders to a maximum of 3 active posts.
- **Manage Opportunities**: Update or delete existing job postings.
- **Applications**: Tabular applications tracker. Review collaborators, browse portfolios, accept (automatically appends applicant to the startup's team directory) or reject.

### Collaborator Dashboard

- **Overview**: Aggregates applications data and status trackers.
- **Browse Opportunities**: Navigate listings directly from the dashboard area.
- **Opportunity Details & Apply**: Single page details and one-click application submission with automated duplicate submission preventions.
- **My Applications**: Comprehensive tracking table displaying real-time application states (`Pending`, `Accepted`, `Rejected`) and dates.
- **Profile**: Update personal profiles including skills, bios, GitHub URLs, and portfolios.

### Admin Dashboard

- **Overview**: Admin system statistics (Users, Startups, Payments) visualized using AdminPieChart.
- **Manage Users**: Control user roles (change user roles) or block/unblock users (blocks access credentials instantly via middleware checks).
- **Manage Startups**: Review pending startup pitches, approve (changes status to `approved` to display them publicly) or remove.
- **Transactions**: View all premium transaction log logs of Stripe subscriptions.

## Tech Stack

The application dependencies are managed through Node/npm:
- **Framework**: Next.js (v16.2.9) with App Router
- **Runtime & Render Layer**: React (v19.2.7) / React DOM
- **UI Components**: HeroUI component libraries (`@heroui/react`, `@heroui/button`, `@heroui/input`, `@heroui/navbar`, `@heroui/select`, `@heroui/styles`)
- **Styling**: Tailwind CSS (v4.3.1) with `@tailwindcss/postcss`
- **Authentication**: Better Auth Client (v1.6.20)
- **Forms**: React Hook Form (v7.80.0) with `@hookform/resolvers` and Zod (v4.4.3) validators
- **Data Fetching**: TanStack React Query (v5.101.1) and Axios (v1.18.1)
- **Animations**: Framer Motion (v12.41.0) and Motion (v12.41.0)
- **Visualizations**: Recharts (v3.9.0)
- **Notifications**: React Toastify (v11.1.0)
- **Icons**: Lucide React (v1.21.0), React Icons (v5.6.0), `@gravity-ui/icons` (v2.18.0)

## Folder Structure

```
startupforge/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (public)/
│   │   │   ├── opportunities/
│   │   │   │   └── [id]/
│   │   │   └── startups/
│   │   │       └── [id]/
│   │   ├── dashboard/
│   │   │   ├── [role]/
│   │   │   │   └── profile/
│   │   │   │       └── edit/
│   │   │   ├── admin/
│   │   │   │   ├── startups/
│   │   │   │   ├── transactions/
│   │   │   │   └── users/
│   │   │   ├── collaborator/
│   │   │   │   └── applications/
│   │   │   ├── founder/
│   │   │   │   ├── applications/
│   │   │   │   ├── opportunities/
│   │   │   │   │   ├── create/
│   │   │   │   │   └── edit/
│   │   │   │   ├── premium/
│   │   │   │   ├── startup/
│   │   │   │   │   ├── create/
│   │   │   │   │   └── edit/
│   │   │   │   └── team/
│   │   │   └── page.jsx
│   │   ├── payment-success/
│   │   ├── profile/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.jsx
│   │   ├── not-found.jsx
│   │   └── page.js
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── opportunity/
│   │   ├── profile/
│   │   ├── shared/
│   │   └── startup/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── middleware.js
│   └── utils/
├── .env
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
└── postcss.config.mjs
```

## Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm package manager

### Local Setup
1. Clone the repository and navigate to the frontend directory:
   ```bash
   git clone <repository-url>
   cd startupforge
   ```
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Create a `.env` configuration file in the client root folder:
   ```env
   NEXT_PUBLIC_IMGBB_KEY=
   NEXT_PUBLIC_API_URL=
   NEXT_PUBLIC_CLIENT_URL=
   ```
4. Start the local Next.js development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Environment Variables

Only use these names in configuration files. Secrets are not required client-side:

```env
NEXT_PUBLIC_IMGBB_KEY=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_CLIENT_URL=
```

## Application Flow

```
Visitor (Public Access)
   │
   ▼
Authentication (Sign In / Register)
   │
   ▼
Role Detection Middleware (Reads Custom JWT Cookie)
   │
   ├─► Blocked User ──► Clear cookie & redirect to /login
   │
   └─► Authorized User
         │
         ▼
Dashboard Redirection (/dashboard ──► /dashboard/[role])
         │
         ├─► Founder ────────► Create/Manage startups & opportunities, upgrade to Premium
         ├─► Collaborator ───► Apply to startups, update profile, view applications
         └─► Admin ──────────► Block users, approve startups, inspect transactions
```

## Responsive Design

StartupForge supports fully responsive layout components matching standard viewport sizes:
- **Mobile devices**: Stacked lists, sliding dashboard navigation menus, optimized form controls.
- **Tablets / Laptops**: Multi-column grids (startups list, opportunity cards).
- **Desktop screens**: Side-by-side dashboard menus, wide analytics graphs.

## Animations

Dynamic animations are built with Framer Motion and Motion libraries:
- Smooth side-menu layouts and dashboard sidebar slides.
- Card transitions and hovering states for interactive panels.
- Micro-animations for button loads and form transition states.

## Deployment

The frontend application can be compiled and deployed on Next.js-focused hosting services like Vercel or Netlify:
1. Run the build command locally to test correct compilations:
   ```bash
   npm run build
   ```
2. Import the repository into your hosting dashboard.
3. Configure the environment variables (`NEXT_PUBLIC_API_URL`, etc.).
4. Set the build directory to `.next` (automatic on Vercel).

## Upcoming Features

These features are pending implementation:
- **Dark Mode**: High-contrast dark theme toggles and custom dark theme variable sets.
- **Bookmarks**: Storing opportunities for later collaborator reference.
- **Real-Time Toast Notifications**: Automatic notifications inside the topbar dropdown.
- **Skill Match Indicator**: Auto-matching percentage badge displayed on opportunity cards.

## Authors

- **Founder & Maintainer**: StartupForge Dev Team
- **License**: MIT License - see the LICENSE file for details.
