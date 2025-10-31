# 🏛️ KJ Financial Expert Website

> A modern, responsive website for KJ Financial Expert featuring trading courses, market analysis, and financial education content.

[![Demo](https://img.shields.io/badge/Demo-Live-success)](http://localhost:3001)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple)](https://vitejs.dev/)

## 📑 Table of Contents

- [💻 System Requirements](#-system-requirements)
- [🚀 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [⚡ Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🌐 Available Scripts](#-available-scripts)
- [📦 Local Development](#-local-development-without-docker)
- [🐳 Docker Management](#-docker-management)
- [🎨 Key Features & Customization](#-key-features--customization)
- [📱 Responsive Design Showcase](#-responsive-design-showcase)
- [🚀 Performance Optimizations](#-performance-optimizations)
- [🏗️ Production Deployment](#️-production-deployment)
- [🔧 Development & Customization](#-development--customization)
- [🚨 Troubleshooting Common Issues](#-troubleshooting-common-issues)
- [🔍 Health Monitoring & Troubleshooting](#-health-monitoring--troubleshooting)
- [🤝 Contributing](#-contributing)
- [📞 Contact & Support](#-contact--support)
- [📄 License](#-license)

## 💻 System Requirements

### Minimum Requirements

| Component | Version | Status | Download |
|-----------|---------|--------|----------|
| **Node.js** | v20.19.5 | ✅ Required | [Download](https://nodejs.org/) |
| **npm** | v10.8.2+ | ✅ Required | Included with Node.js |
| **Yarn** | v1.22.22+ | ⭐ Recommended | `npm install -g yarn` |
| **Docker** | Latest | 🔧 Optional | [Download](https://www.docker.com/) |

### Operating System Support

- ✅ **macOS** 10.15 or later
- ✅ **Windows** 10/11 (with WSL2 for Docker)
- ✅ **Linux** (Ubuntu 20.04+, Debian, Fedora, etc.)

### Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

> **⚠️ Important Note:** This project is **specifically built and tested with Node.js v20.19.5**. Using other major versions may cause compatibility issues with dependencies.

---

## 🚀 Features

### 🎯 Core Features
- **🔥 Modern React Application** - Built with React 18, TypeScript, and Vite for lightning-fast performance
- **📱 Fully Responsive Design** - Mobile-first approach with enhanced responsive controls
- **🌐 Multi-language Support** - English, Arabic, and Kurdish with complete RTL support
- **🎨 Advanced Theme System** - Dark/Light/Auto themes with smooth transitions
- **⚡ Enhanced Animations** - Framer Motion powered smooth animations and interactions
- **🛠️ Professional UI Components** - Built with Radix UI and shadcn/ui for accessibility

### 🎯 Advanced Features
- **📧 Contact Forms** - Integrated contact and newsletter subscription forms
- **🔍 SEO Optimized** - Proper meta tags, semantic HTML, and performance optimization
- **🐳 Docker Support** - Complete containerization for development and production
- **⚙️ Enhanced Responsive Toolbar** - Smart adaptive controls for different screen sizes
- **🎭 Particle Effects** - Interactive background animations for modern feel
- **📊 Performance Optimized** - Lazy loading, code splitting, and optimized assets

### 🎯 Responsive Controls
- **Desktop (1024px+)**: Inline navigation controls
- **Tablet (768px-1023px)**: Slide-out panel from top-right
- **Mobile (480px-767px)**: Full-screen side panel
- **Small Mobile (<480px)**: Bottom slide-up panel

## 📁 Project Structure

```
kj-financial-website/
├── 📁 public/                    # Static assets and favicon
├── 📁 src/
│   ├── 📁 components/            # Reusable UI components
│   │   ├── 📁 sections/          # Page sections (Hero, About, Courses, etc.)
│   │   ├── 📁 ui/               # Base UI components (Button, Card, etc.)
│   │   ├── Navigation.tsx        # Enhanced navigation with responsive controls
│   │   ├── ResponsiveToolbar.tsx # Adaptive settings panel
│   │   ├── LanguageToggle.tsx    # Multi-language switcher
│   │   └── ThemeToggle.tsx       # Theme switching component
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 lib/                  # Utilities and configurations
│   ├── 📁 pages/                # Page components
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # App entry point
│   ├── i18n.ts                   # Internationalization setup
│   └── index.css                 # Global styles and Tailwind imports
├── 🐳 Dockerfile                # Docker configuration
├── 🐳 docker-compose.yml        # Docker Compose setup
├── ⚙️ nginx.conf               # Nginx configuration for production
├── 🔧 docker-scripts.sh        # Docker management scripts
├── 📄 index.html               # HTML template
├── 📦 package.json             # Dependencies and scripts
├── 🎨 tailwind.config.js       # Tailwind CSS configuration
├── 📝 tsconfig.json            # TypeScript configuration
└── ⚡ vite.config.ts           # Vite build configuration
```

## 🌐 Available Scripts

### Development Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` / `npm run dev` | 🚀 Start development server with HMR on port 3000 |
| `yarn build` / `npm run build` | 🏗️ Build optimized production bundle (TypeScript compilation + Vite build) |
| `yarn preview` / `npm run preview` | 👀 Preview production build locally on port 3000 |
| `yarn type-check` / `npm run type-check` | 🔍 Run TypeScript type checking without emitting files |
| `yarn lint` / `npm run lint` | 🧹 Run ESLint for code quality checks |

### Docker Scripts

| Command | Description |
|---------|-------------|
| `yarn docker:dev` | 🐳 Start development container with hot reload on port 3001 |
| `yarn docker:prod` | 🚀 Start production container with Nginx on port 8080 |
| `yarn docker:build` | 🏗️ Build both development and production Docker images |
| `yarn docker:stop` | ⏹️ Stop all running Docker containers |
| `yarn docker:clean` | 🧹 Remove all containers, images, volumes, and orphans |
| `yarn docker:logs:dev` | 📋 Show development container logs (real-time) |
| `yarn docker:logs:prod` | 📋 Show production container logs (real-time) |

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | v20.19.5 | Runtime environment |
| **React** | v18.3.1 | UI library with concurrent features |
| **TypeScript** | v5.6.3 | Type-safe development |
| **Vite** | v5.4.10 | Ultra-fast build tool and dev server |

### Frontend Framework & Build Tools
- **React 18.3.1** - Latest version with concurrent rendering and automatic batching
- **TypeScript 5.6.3** - Strongly typed JavaScript for better code quality
- **Vite 5.4.10** - Lightning-fast HMR and optimized production builds
- **Node.js v20.19.5** - JavaScript runtime with enhanced performance

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **shadcn/ui** - Beautiful, reusable components
- **Framer Motion** - Production-ready motion library

### Routing & State Management
- **Wouter** - Lightweight React router
- **TanStack Query** - Powerful data synchronization
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation

### Internationalization & Theming
- **react-i18next** - Complete i18n solution
- **next-themes** - Perfect dark mode support

### Development & Deployment
- **Docker & Docker Compose** - Containerization
- **Nginx** - Production web server
- **Multi-stage builds** - Optimized production images

## ⚡ Quick Start

### Prerequisites

**Required:**
- **Node.js v20.x** (Tested with v20.19.5) - [Download](https://nodejs.org/)
- **npm v10.x** (Comes with Node.js) or **Yarn v1.22.x** - Package manager

**Optional:**
- **Docker** (For containerized deployment)

> **⚠️ Important:** This project is built and tested with **Node.js v20.19.5**. Using other versions may cause compatibility issues.

### 🔍 Check Your Node Version

```bash
# Check Node.js version (should be v20.x)
node --version

# Check npm version (should be v10.x)
npm --version

# Check Yarn version (should be v1.22.x)
yarn --version
```

### 📥 Installation & Setup

#### Method 1: Local Development (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/bazhdarrzgar/Karzan_Jabar_KJ.git
cd Karzan_Jabar_KJ

# 2. Install dependencies (using Yarn - recommended)
yarn install

# OR using npm
npm install

# 3. Start development server
yarn dev

# OR using npm
npm run dev
```

🌐 **Development Server:** http://localhost:3000

> **Note:** The development server supports **hot module replacement (HMR)**, so changes will reflect automatically.

#### Method 2: Docker Development

```bash
# Quick start with Docker Compose
docker-compose up -d kj-website-dev

# OR use npm/yarn script
yarn docker:dev
npm run docker:dev
```

🌐 **Docker Development Server:** http://localhost:3001

---

### 🚀 Running the Application

Once dependencies are installed, you can run the project in different modes:

#### Development Mode (Hot Reload Enabled)
```bash
# Using Yarn (Recommended)
yarn dev

# Using npm
npm run dev

# Using pnpm
pnpm dev
```

The development server will start on **http://localhost:3000** with hot module replacement enabled.

#### Production Build & Preview
```bash
# 1. Build the application for production
yarn build       # or npm run build

# 2. Preview the production build locally
yarn preview     # or npm run preview
```

The preview server will start on **http://localhost:3000**

#### Type Checking & Linting
```bash
# Run TypeScript type checking
yarn type-check   # or npm run type-check

# Run ESLint
yarn lint         # or npm run lint
```

---

### 📦 Build Output

After running `yarn build`, the optimized production files will be in the `dist/` directory:

```
dist/
├── assets/          # Compiled JS, CSS, and other assets
├── index.html       # Main HTML file
└── ...             # Other static files
```

You can deploy the `dist/` folder to any static hosting service (Netlify, Vercel, AWS S3, etc.).

---

## 🐳 Docker Management

### Docker Management Script
The project includes a comprehensive Docker management script:

```bash
# Make script executable
chmod +x docker-scripts.sh

# Available commands:
./docker-scripts.sh dev      # 🚀 Start development environment
./docker-scripts.sh prod     # 🏭 Start production environment
./docker-scripts.sh build    # 🏗️ Build Docker images
./docker-scripts.sh stop     # ⏹️ Stop all containers
./docker-scripts.sh clean    # 🧹 Remove containers and images
./docker-scripts.sh logs     # 📋 Show container logs
./docker-scripts.sh shell    # 🐚 Access development container shell
./docker-scripts.sh health   # 🏥 Check container health
./docker-scripts.sh help     # ❓ Show help message
```

### Manual Docker Commands

```bash
# Build images
docker-compose build

# Start development (with hot reload)
docker-compose up -d kj-website-dev

# Start production (optimized build)
docker-compose up -d kj-website-prod

# View logs
docker-compose logs -f kj-website-dev

# Stop containers
docker-compose down

# Clean up everything
docker-compose down --rmi all --volumes --remove-orphans
```

## 📦 Local Development (Without Docker)

### Step-by-Step Setup

1. **Verify Node.js version:**
   ```bash
   node --version  # Should output v20.x.x
   ```
   
   > If you don't have Node.js v20, download it from [nodejs.org](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm):
   ```bash
   # Using nvm (Node Version Manager)
   nvm install 20
   nvm use 20
   ```

2. **Install dependencies:**
   ```bash
   # Using Yarn (Recommended for faster installs)
   yarn install
   
   # OR using npm
   npm install
   
   # OR using pnpm
   pnpm install
   ```

3. **Start development server with hot reload:**
   ```bash
   yarn dev       # Access at http://localhost:3000
   # OR
   npm run dev
   ```

4. **Build for production:**
   ```bash
   yarn build
   # OR
   npm run build
   ```
   
   This will:
   - Run TypeScript compilation (`tsc`)
   - Create optimized production bundle with Vite
   - Output files to `dist/` directory

5. **Preview production build locally:**
   ```bash
   yarn preview   # Access at http://localhost:3000
   # OR
   npm run preview
   ```

### Development Server Features

- ⚡ **Hot Module Replacement (HMR)** - Instant updates without full page reload
- 🔄 **Fast Refresh** - Preserves component state during edits
- 🌐 **Network Access** - Accessible at `0.0.0.0:3000` (configurable)
- 🐛 **Source Maps** - Easy debugging with original source code
- 📦 **Optimized Dependencies** - Pre-bundled for faster dev startup

---

## 🌐 Available Scripts

This section has been moved up. See the "Available Scripts" section above.

---

## 🎨 Key Features & Customization

### 🎯 Enhanced Responsive Design
The website features an advanced responsive toolbar system:

- **📱 Tablet (768px-1023px)**: Elegant slide-out panel from top-right corner
- **📱 Mobile (480px-767px)**: Full-width slide-out panel from right edge  
- **📱 Small Mobile (<480px)**: Bottom slide-up panel for easy thumb access

### 🎨 Theme System
- **🌞 Light Mode** - Clean and bright interface
- **🌙 Dark Mode** - Easy on the eyes
- **🖥️ System Mode** - Follows OS preference
- Persistent theme preference with smooth transitions

### 🌍 Internationalization
- **🇺🇸 English (en)** - Default language, LTR layout
- **🇸🇦 Arabic (ar)** - Complete RTL support
- **🇰🇼 Kurdish (ckb)** - Kurdish language support
- Language switcher in responsive navigation
- Persistent language preference

### 🎭 Advanced Animations
- **Framer Motion** powered smooth animations
- **Particle effects** for modern visual appeal
- **Spring-based transitions** for natural feel
- **Interactive hover effects** on all components

## 📱 Responsive Design Showcase

The website is fully responsive and optimized for all screen sizes:

| Device Type | Screen Size | Features |
|-------------|-------------|----------|
| 🖥️ **Desktop** | 1920px+ | Full navigation with inline controls |
| 💻 **Laptop** | 1024px-1919px | Compact navigation with enhanced toolbar |
| 📱 **Tablet** | 768px-1023px | Slide-out settings panel |
| 📱 **Mobile** | 480px-767px | Full-screen side panel |
| 📱 **Small Mobile** | 320px-479px | Bottom slide-up panel |

## 🚀 Performance Optimizations

- ⚡ **Vite Build Tool** - Lightning-fast development and builds
- 🔄 **Code Splitting** - Automatic route-based code splitting
- 🖼️ **Image Optimization** - Optimized assets and lazy loading
- 📦 **Bundle Analysis** - Optimized bundle size
- 🗜️ **Gzip Compression** - Compressed static assets
- 🏃‍♂️ **Fast Refresh** - Instant updates during development

## 🏗️ Production Deployment

### Docker Production Setup
The production environment uses optimized Docker configuration:

- **🐳 Multi-stage build** for minimal image size
- **🌐 Nginx** as lightweight web server
- **🗜️ Gzip compression** for faster loading
- **🔒 Security headers** for enhanced protection
- **⚡ SPA routing support** for client-side navigation
- **💾 Static asset caching** for performance
- **🏥 Health check endpoint** at `/health`

### Production Commands
```bash
# Start production environment
docker-compose up -d kj-website-prod

# Access at http://localhost:8080
# Health check: http://localhost:8080/health
```

## 🔧 Development & Customization

### 🎨 Theme Customization
Modify theme colors in `src/index.css`:
```css
:root {
  --primary: 48 79 255;        /* Primary blue */
  --secondary: 139 69 19;      /* Secondary brown */
  --accent: 255 193 7;         /* Accent yellow */
  /* Add your custom colors */
}
```

### 🌐 Adding Languages
1. Update `src/i18n.ts` with new translations:
```typescript
const resources = {
  en: { translation: enTranslations },
  ar: { translation: arTranslations },
  fr: { translation: frTranslations }, // New language
}
```

2. Add language to components:
```typescript
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "fr", name: "Français", flag: "🇫🇷" }, // New language
]
```

### 📄 Adding Sections
Create new sections in `src/components/sections/`:
```typescript
// src/components/sections/NewSection.tsx
export const NewSection = () => {
  return (
    <section id="new-section" className="py-20">
      {/* Your content */}
    </section>
  );
};
```

---

## 🚨 Troubleshooting Common Issues

### Issue: "Port already in use"
```bash
# Solution 1: Kill process using the port
lsof -ti:3000 | xargs kill -9   # macOS/Linux
netstat -ano | findstr :3000    # Windows (find PID and kill)

# Solution 2: Use different port
yarn dev --port 3001
```

### Issue: "Module not found" or dependency errors
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install

# OR with npm
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
```bash
# Run type checking
yarn type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Issue: Slow development server
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
yarn dev
```

### Issue: Build fails
```bash
# Check Node.js version
node --version  # Should be v20.x

# Clean install
rm -rf node_modules dist .vite
yarn install
yarn build
```

---

## 🔍 Health Monitoring & Troubleshooting

### Health Check
The production container includes health monitoring:
- **Endpoint**: `http://localhost:8080/health`
- **Response**: `200 OK` when healthy
- **Docker**: Automatic health checks enabled

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 🚨 Port already in use | Change port with `--port` flag or kill existing process |
| 📦 Dependencies failed | Clear `node_modules` and reinstall with `yarn install` |
| 🐳 Docker build fails | Ensure Docker daemon is running and check logs |
| 🔄 Hot reload not working | Check file watchers limit or restart dev server |
| ⚠️ Node version mismatch | Use Node.js v20.x (check with `node --version`) |
| 🐛 TypeScript errors | Run `yarn type-check` and fix reported issues |
| 💾 Build failures | Clear caches: `rm -rf node_modules/.vite dist` |

### Debug Commands
```bash
# Check running processes
ps aux | grep node

# Check Docker containers
docker ps -a

# View detailed logs
docker-compose logs -f kj-website-dev --tail=100

# Access container shell
docker exec -it kj-website-dev sh
```

## 🤝 Contributing

### Development Workflow
1. **🍴 Fork the repository**
2. **🌿 Create feature branch**: `git checkout -b feature/amazing-feature`
3. **💾 Commit changes**: `git commit -m 'Add amazing feature'`
4. **📤 Push to branch**: `git push origin feature/amazing-feature`
5. **🔄 Open Pull Request**

### Code Style
- Use **TypeScript** for type safety
- Follow **React best practices**
- Use **Tailwind CSS** for styling
- Add **proper error handling**
- Include **accessibility features**

## 📞 Contact & Support

### 🌐 KJ Financial Expert
- **📧 Email**: Contact form on website
- **🔗 Website**: [KJ Financial Expert](http://localhost:3001)
- **📱 Social**: Links available on website

### 🛠️ Technical Support
- **📋 Issues**: [GitHub Issues](https://github.com/bazhdarrzgar/Karzan_Jabar_KJ/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/bazhdarrzgar/Karzan_Jabar_KJ/discussions)
- **📖 Documentation**: This README and inline code comments

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **⚛️ React Team** - For the amazing React framework
- **🎨 Tailwind CSS** - For the utility-first CSS framework
- **🎭 Framer Motion** - For beautiful animations
- **🏗️ Vite** - For the lightning-fast build tool
- **🔧 Radix UI** - For accessible component primitives

---

<div align="center">

**Built with ❤️ for KJ Financial Expert**

[![GitHub stars](https://img.shields.io/github/stars/bazhdarrzgar/Karzan_Jabar_KJ?style=social)](https://github.com/bazhdarrzgar/Karzan_Jabar_KJ)
[![GitHub forks](https://img.shields.io/github/forks/bazhdarrzgar/Karzan_Jabar_KJ?style=social)](https://github.com/bazhdarrzgar/Karzan_Jabar_KJ)

*Containerized with Docker 🐳 | Powered by React ⚛️ | Styled with Tailwind 🎨*

</div>