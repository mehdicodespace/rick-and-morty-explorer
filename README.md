# Rick and Morty

Character search and detail pages built with Nuxt 4, TypeScript, Tailwind CSS, and Pinia.

## Run locally

Use a Node version supported by `package.json`.

```sh
npm ci
cp .env.example .env
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env`. Open http://localhost:3000.

Set `NUXT_PUBLIC_API_BASE=https://rickandmortyapi.com/api` in `.env`.

## Features

- Search by name and browse 12 characters per page.
- View episodes, origin, and current location on character pages.
- Render pages on the server and cache API pages with Pinia for five minutes.
- Keep search and page numbers in the URL.

## Checks and production build

```sh
npm run check
npm run build
npm run preview
```

Set the same API environment variable on your production host.
