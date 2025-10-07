# MoneyFlow - AI-Powered Budget Tracker

A modern, AI-powered budget tracking application built with React, TypeScript, and cutting-edge web technologies.

## Features

- 🤖 **AI-Powered Insights** - Get intelligent recommendations and spending analysis
- 📊 **3D Visualizations** - Beautiful Three.js charts and interactive graphics
- 💰 **Smart Budgeting** - Set and track budgets with real-time updates
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Clean, intuitive interface built with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
MoneyFlow/
├── config/                    # All configuration files
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.*.json
│   └── vite.config.ts
├── docs/                     # Documentation
│   ├── backend.md
│   ├── troubleshooting-steps.md
│   └── TODO.md
├── public/                   # Static assets & entry point
│   ├── data/                # Mock JSON data files
│   ├── fonts/               # Font files
│   └── index.html           # Vite entry point
├── src/
│   └── frontend/            # Main application code
│       ├── components/      # Reusable UI components
│       │   ├── budgets/     # Budget-related components
│       │   ├── Dashboard/   # Dashboard components
│       │   ├── Layout/      # Layout components
│       │   ├── Transactions/# Transaction components
│       │   └── UI/          # Reusable UI components
│       ├── pages/           # Main application pages
│       ├── services/        # API services and data fetching
│       ├── store/           # Zustand state management
│       ├── types/           # TypeScript type definitions
│       ├── utils/           # Utility functions and constants
│       └── data/            # Runtime data files
└── README.md                # This file
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details