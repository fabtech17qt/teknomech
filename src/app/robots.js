export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/en/admin/', '/ar/admin/'],
      },
    ],
    sitemap: 'https://www.teknomech.com/sitemap.xml',
    host: 'https://www.teknomech.com',
  };
}
