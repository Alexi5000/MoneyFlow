# Troubleshooting Lucide Icon Import Errors

## 🔧 Common Solutions

### 1. Clear Node Modules and Reinstall
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

### 2. Check Import Statements
```typescript
// ❌ Wrong
import { LucideIcon } from 'lucide-react'
const MyIcon = () => <LucideIcon />

// ✅ Correct
import { Home } from 'lucide-react'
const MyIcon = () => <Home />
```

### 3. Verify TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 4. Check Vite Dev Server
```bash
# Restart Vite dev server
npm run dev

# Or with specific port
npm run dev -- --port 3000
```

### 5. Browser Cache Issues
```bash
# Clear browser cache or open in incognito mode
# In Chrome: Ctrl+Shift+R (hard refresh)
# In Firefox: Ctrl+F5
```

### 6. Module Resolution Debug
```typescript
// Add this to debug imports
console.log('Lucide React:', import('lucide-react'))

// Check what's actually exported
import * as LucideReact from 'lucide-react'
console.log('Available exports:', Object.keys(LucideReact))
```

## 🚨 Emergency Fixes

### If Nothing Else Works:

1. **Create a fresh Vite project:**
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install lucide-react
```

2. **Use CDN as temporary solution:**
```html
<!-- In index.html -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

3. **Alternative icon libraries:**
```bash
# React Icons (alternative)
npm install react-icons

# Heroicons (alternative)
npm install @heroicons/react
```

## 📋 Verification Checklist

- [ ] Package installed: `npm list lucide-react`
- [ ] Correct import syntax: `import { IconName } from 'lucide-react'`
- [ ] TypeScript types: `import type { LucideIcon } from 'lucide-react'`
- [ ] Vite config optimized: `optimizeDeps.include: ['lucide-react']`
- [ ] Node modules cleared and reinstalled
- [ ] Browser cache cleared
- [ ] Dev server restarted