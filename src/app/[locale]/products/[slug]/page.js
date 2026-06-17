import { prisma } from '@/lib/prisma';
import PageHero from '@/components/shared/PageHero';
import ProductDetail from '@/components/products/ProductDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const p = await prisma.product.findUnique({ where: { slug } });
    return {
      title: p ? `${p.nameEn || p.nameAr} | Teknomech` : 'Product | Teknomech',
      description: (p?.descriptionEn || '').slice(0, 160),
    };
  } catch {
    return { title: 'Product | Teknomech' };
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product = null;
  try {
    product = await prisma.product.findUnique({ where: { slug } });
  } catch {}

  const title = product ? (product.nameEn || product.nameAr || 'Product Details') : 'Product Details';
  const subtitle = product
    ? `${product.brand} · ${product.category}`
    : 'Technical specifications and product information.';

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: title },
        ]}
      />
      <ProductDetail product={product} />
    </>
  );
}
