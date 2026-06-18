# DevFolio Client Panel 💻✨

DevFolio is a premium, developer-first SaaS platform designed to help programmers, designers, and creators construct, manage, and publish high-performance web portfolios. This repository contains the frontend client application built with **React**, **Vite**, **Tailwind CSS**, and **Ant Design**.

Live portfolios are generated dynamically and served under custom user URLs at `portfolio/:username`.

---

## 🚀 Key Features

* **Overview Dashboard**: Renders dynamic metrics (Total Skills, Total Projects, Total Categories, Status) alongside an interactive **Portfolio Completion Checklist** prompting you with missing fields. Includes a one-click public URL copy and preview container.
* **Personal Info Tab**: Manage your display name, professional role, bio details, and upload profile avatars.
* **About Section**: Detailed rich description area detailing your work philosophy, career path, or education history.
* **Skills Management (CRUD)**: Add, edit, and delete elements of your tech stack in a modern tabular display.
* **Projects Manager (CRUD)**: Tabular overview displaying project details, custom cover previews, live/code repository links, and tech stack tags. Supports image files uploads and **Project Categories** (Web Development, Mobile Development, Graphic Design, Data Analysis, etc.).
* **Search & Filter Controls**: Features live client-side search and category filtering for dashboard projects.
* **Forgot Password Flow**: Integrated a multi-step password recovery flow (`/auth/forgot-password`) with secure OTP verification and password reset forms, styled with the application's premium dark glassmorphism aesthetic.
* **Dynamic Public Profiles**: Fully responsive, dark-themed glassmorphic portfolio views featuring shifting gradient backdrops, project cards, category filters, and active social redirect buttons.
* **Responsive Layouts**: Mobile-first design that moves the dashboard sidebar to a sticky bottom tab bar on mobile/tablet viewports, with fully scrollable data tables for smaller screens.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 & Vite 8 (high-performance build tool and HMR dev server)
* **Design & Styling**: 
  * **Tailwind CSS (v4)** for layout grids, positioning, and responsive styles.
  * **Ant Design (v6)** customized with global dark algorithms, blue primary color schemes (`#2563eb`), and custom input field tokens.
* **Animations**: **Framer Motion** for smooth page reveals, step transitions, and animated backdrop gradients.
* **State & Networking**: 
  * Context API (`AuthContext`) for auth session validation.
  * **Axios** for cross-origin API integration (using `withCredentials` token sharing).

---

## ⚙️ Project Setup

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed locally.

### 2. Configure Environment Variables
Create a `.env` file in the root of the `Client` directory:

```bash
VITE_BACKEND_URL=http://localhost:3000
VITE_PORTFOLIO_URL=localhost:5173/portfolio/
```

### 3. Install Dependencies
Run the following command in the `Client` folder:
```bash
npm install
```

### 4. Run Development Server
Start the local development environment:
```bash
npm run dev
```
The application will run locally on `http://localhost:5173`.

### 5. Build for Production
Bundle and optimize the client-side files for deployment:
```bash
npm run build
```

---

## 🌐 Production & Vercel Deployment

This project is optimized for deployment on **Vercel** with the following production configurations:

* **Vercel Proxy Rewrites (`vercel.json`)**: Configured to proxy all requests starting with `/api` to the backend production server. This makes cookies **first-party** to solve the issue of browsers (Safari, Chrome Incognito) blocking third-party auth cookies.
* **SPA Routing**: Configured rewrite rules to route all non-API paths back to `/index.html` to prevent 404 errors on browser page reloads.

---

## 📂 Project Structure

```text
Client/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Global styles and styling assets
│   ├── components/         # Reusable structural components (Navbar, Footer, ProtectedRoute)
│   ├── context/            # AuthContext provider
│   ├── pages/
│   │   ├── Auth/           # Login, Signup & Forgot Password screens
│   │   ├── Dashboard/      # Admin overview panel and CRUD screens (Skills, Projects, Profile details)
│   │   └── Frontend/       # Landing page (Hero, Features, Showcase) & Public Portfolio View
│   ├── App.jsx             # Main router root
│   └── main.jsx            # Entry point mount
├── package.json            # Scripts and dependencies
├── vercel.json             # Vercel deployment routes and proxy rules
└── vite.config.js          # Vite configuration and aliases
```

---

## 📄 License
This project is licensed under the MIT License.
