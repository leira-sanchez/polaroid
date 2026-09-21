This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Brand assets

`public/leira-logo.svg` is the full logo used in the shared site header.
`public/leira-bolt.svg` is the standalone mark used for section badges and the SVG favicon.
After updating the bolt, run `node scripts/generate-brand-icons.cjs` to regenerate
the PNG favicon, multi-size ICO, and white-background Apple touch icon from the same SVG.

## Goodreads reading card

The homepage reads Leira's public `currently-reading` shelf (profile `3518990`)
through `/api/currently-reading`. The newest `user_date_added` wins; equal or
missing dates retain feed order, with valid dates taking precedence over missing
dates. Titles, authors, and covers come from RSS; no Goodreads credentials are needed.

Next.js caches the validated result for 24 hours. The next visit after expiration
serves the previous result while refreshing in the background. Failed refreshes
leave that result intact; a valid empty shelf replaces it with an empty state.
This requires hosting with persistent Next.js Data Cache support. If the cache is
lost and Goodreads is unavailable, the card links to the profile instead.

Run `yarn test:goodreads` to check parsing, selection, and upstream errors.
Refresh failures are logged server-side as `Goodreads refresh failed`.

## Substack newsletter

`/blog` uses Substack's native signup iframe and displays the latest posts from
the publication's public RSS feed. Change `SUBSTACK_URL` in
`constants/substack.ts` when Leira's publication is ready; Mofongo Fiction is the
current placeholder. This updates the signup form, RSS link, archive link, and
post source together. No Substack API key is needed.

Validated posts are cached for one hour using the Next.js Data Cache. Failed
refreshes retain the previous cached result. If no cached result is available,
the page links readers to Substack. RSS can contain only recent posts, so “View
all posts” opens the full Substack archive. Existing `/blog/[slug]` articles
remain available at their original URLs.

Run `npm run test:substack` to check feed parsing and upstream failures.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
