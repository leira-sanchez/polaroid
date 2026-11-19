import { MetadataRoute } from 'next'
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://leirasanchez.com';
  const blogSlugs = (await getPosts()).map(post => post.slug);

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
