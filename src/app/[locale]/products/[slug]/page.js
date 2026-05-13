import PageHero from '@/components/shared/PageHero';
import ProductDetail, { PRODUCTS_DETAIL } from '@/components/products/ProductDetail';

export function generateStaticParams() {
  return Object.keys(PRODUCTS_DETAIL).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS_DETAIL[slug];
  return {
    title: product ? `${product.name} | Teknomech` : 'Product | Teknomech',
    description: product?.description?.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = PRODUCTS_DETAIL[slug];

  return (
    <>
      <PageHero
        title={product?.name || 'Product Details'}
        subtitle={product ? `${product.brand} · ${product.category}` : 'Technical specifications and product information.'}
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: product?.name || slug },
        ]}
      />
      <ProductDetail slug={slug} />
    </>
  );
}
