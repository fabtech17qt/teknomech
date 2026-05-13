import PageHero from '@/components/shared/PageHero';
import ProductsContent from '@/components/products/ProductsContent';

export const metadata = {
  title: 'MEP Products & Equipment | Teknomech',
  description:
    "Browse Teknomech's range of MEP and fire protection equipment — fire suppression, HVAC, electrical, plumbing and LV systems.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="MEP Equipment & Systems"
        subtitle="Industry-grade MEP and fire protection equipment from leading global brands — sourced and supplied across Qatar."
        breadcrumbs={[{ label: 'Products' }]}
      />
      <ProductsContent />
    </>
  );
}
