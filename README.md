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

## Color theme

The site follows the system light/dark preference through `prefers-color-scheme`,
including changes while the page is open. Theme colors live in `app/globals.css`;
Tailwind dark variants use the same media query. No saved preference or JavaScript
is required. The embedded Substack signup form retains its own light styling.

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

If RSS fails (including Goodreads returning 404), the server reads the public
profile's `currentlyReadingReviews` section. This limited fallback selects the
first displayed book, not the newest RSS date, because the profile does not expose
that date or the entire shelf. It never reads other activity sections. Missing or
changed profile markup remains an error rather than clearing the cached shelf.
Both requests share a ten-second deadline. No sign-in or private shelf access is used.

Next.js caches the validated result for 24 hours. The next visit after expiration
serves the previous result while refreshing in the background. Failed refreshes
leave that result intact; a valid empty shelf replaces it with an empty state.
This requires hosting with persistent Next.js Data Cache support. If the cache is
lost and Goodreads is unavailable, the card links to the profile instead.

Run `yarn test:goodreads` to check parsing, selection, and upstream errors.
Refresh failures are logged server-side as `Goodreads refresh failed`.

## Substack newsletter

`/blog` uses Substack's native signup iframe and displays the latest posts from
the publication's public RSS feed at `https://leira.substack.com`.
`SUBSTACK_URL` in `constants/substack.ts` controls the signup form, RSS link,
archive link, and post source together. No Substack API key is needed.

The posts section renders at request time so a build-time outage cannot bake
the unavailable message into the cached blog page. Validated posts are cached
for one hour using the Next.js Data Cache. Failed
refreshes retain the previous cached result. If no cached result is available,
the page links readers to Substack. RSS can contain only recent posts, so “View
all posts” opens the full Substack archive. Existing `/blog/[slug]` articles
remain available at their original URLs.
Feed failures are logged server-side as `Substack refresh failed`.

Run `npm run test:substack` to check feed parsing and upstream failures.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Tina dependency upgrades

TinaCMS 3.14.0, its CLI 3.0.0, and the Cloudinary adapter 27.0.4 are
updated together. CLI 3 generates typed rich-text fields that require Tina 3,
and Cloudinary 27 requires Tina 3. The admin app is kept at 2.5.14, the
matching CLI release, to avoid installing a second, newer Tina version through
its version range. Upgrade this group together when moving past these versions.

Run `node --test tests/*.test.cjs` for the local parser and mocked media-adapter
regressions. Media-provider credentials and live upload acceptance are separate
from these tests.
