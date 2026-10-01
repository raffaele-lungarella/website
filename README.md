# Personal website

Built with Astro and deployed as a static site.

## Requirements

- Node.js 22 or newer
- npm 11 or newer

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm test
npm run check
npm run lint
npm run format:check
npm run build
```

Run `npm run format` to format supported files. Oxfmt does not currently format `.astro` templates; `npm run check` validates them. Existing files may need formatting before `format:check` passes.

The production site is generated in `dist/`.
