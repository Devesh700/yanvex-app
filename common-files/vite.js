import { brandName, isTs, projectName as appName } from "../args.js";

export const vite = {
  'index.html': `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${brandName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${isTs ? 'tsx' : 'jsx'}"></script>
  </body>
</html>
`,
  'package.json': `
{
  "name": "${appName}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"${isTs ? ',\n    "typecheck": "tsc --noEmit"' : ''}
  },
  "dependencies": {
    "@react-router/node": "^7.3.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.3.0",
    "tailwind-merge": "^3.0.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22.13.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@typescript-eslint/eslint-plugin": "^8.24.0",
    "@typescript-eslint/parser": "^8.24.0",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.20.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "shadcn": "^2.3.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.3",
    "vite": "^6.1.0"
    }
}
`,
  'vite.config.js': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`,
  'README.md': `
# ${brandName}

Generated with \`create-yanvex-app\`.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## Routes

- \`/\` public branded home page
- \`/login\` auth page
- \`/dashboard\` protected route

Demo login accepts any non-empty email and password.
`,
  '.gitignore': `
node_modules
dist
.env
.env.local
.DS_Store
`,
  'src/index.css': `
@import "tailwindcss";

:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #111827;
  background: #f8fafc;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}
`,
}