import { prisma } from '@/lib/prisma';

const BASE_URL = 'https://www.teknomech.com';
const locales = ['en', 'ar'];

const staticRoutes = [
  { path: '',          priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about',    priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/blog',     priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact',  priority: 0.7, changeFrequency: 'monthly' },
];

export default async function sitemap() {
  const entries = [];

  for (const locale of locales) {
    for (const { path, priority, changeFrequency } of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    for (const { slug, updatedAt } of products) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/products/${slug}`,
          lastModified: updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  } catch {}

  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    for (const { slug, updatedAt } of posts) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/blog/${slug}`,
          lastModified: updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  } catch {}

  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    for (const { slug, updatedAt } of projects) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/projects/${slug}`,
          lastModified: updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  } catch {}

  return entries;
}
