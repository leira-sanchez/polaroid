import { MetadataRoute } from 'next'
import { client } from "@/tina/__generated__/client";

async function fetchAllBlogSlugs() {
  const { data } = await client.queries.postConnection();
  return data?.postConnection?.edges?.map(edge => edge?.node?.slug).filter(Boolean) || [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://leirasanchez.com';
  const blogSlugs = await fetchAllBlogSlugs();

  const routes = ['', '/blog'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const blogRoutes = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogRoutes];
}
