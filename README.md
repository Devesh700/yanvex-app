# create-yanvex-app

Create a Vite React app with Tailwind CSS v4, JavaScript/TypeScript choice, demo auth page, public routes, protected routes, and a branded home page.

## Use locally before publishing

```bash
npm link
create-yanvex-app my-client-app --brand "Your Brand" --template ts
cd my-client-app
npm install
npm run dev
```

Or interactive mode:

```bash
create-yanvex-app
```

## CLI options

```bash
create-yanvex-app <project-name> --brand "Brand Name" --template ts
create-yanvex-app <project-name> --brand "Brand Name" --template js
```

Accepted template values:

- `ts` / `typescript`
- `js` / `javascript`

## Generated app includes

- Vite React setup
- Tailwind CSS v4 using `@tailwindcss/vite`
- React Router
- Public route: `/`
- Auth route: `/login`
- Protected route: `/dashboard`
- Demo localStorage-based auth
- Branded home page

## Publish to npm

First update the package name in `package.json`. Use a unique npm package name, for example:

```json
{
  "name": "create-yourbrand-vite-app"
}
```

Then login and publish:

```bash
npm login
npm publish --access public
```

After publishing, users can run:

```bash
npm create yourbrand-vite-app@latest my-app
```

or:

```bash
npx create-yourbrand-vite-app my-app --brand "Your Brand" --template ts
```

## Important naming rule

For `npm create yourbrand-vite-app@latest`, the published package name must be:

```text
create-yourbrand-vite-app
```

NPM automatically maps `npm create yourbrand-vite-app` to `create-yourbrand-vite-app`.
