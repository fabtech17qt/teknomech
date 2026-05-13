import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { Link } from '@/i18n/navigation';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Product Details',
};

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // In production: fetch product from DB using slug
  // const product = await prisma.product.findUnique({ where: { slug } });

  return (
    <>
      <PageHero
        title="Product Details"
        subtitle="Technical specifications and product information."
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: slug },
        ]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Images */}
            <div className="lg:col-span-2">
              <div className="bg-brand-steel rounded-xl h-72 flex items-center justify-center mb-6 border border-white/5">
                <FileText size={48} className="text-brand-subtext/30" />
              </div>
              <SectionLabel variant="red" className="mb-4">Specifications</SectionLabel>
              <div className="card-dark overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[['Category', 'Fire Protection'], ['Brand', 'Placeholder Brand'], ['Model', 'PH-1000'], ['Coverage Area', '20 m²'], ['Operating Voltage', '230V AC']].map(([k, v]) => (
                      <tr key={k} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-3 text-brand-subtext font-medium w-1/3">{k}</td>
                        <td className="px-4 py-3 text-brand-text">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card-dark p-6">
                <span className="text-brand-gold text-xs font-medium uppercase tracking-wider">Fire Protection</span>
                <h1 className="text-brand-text font-bold text-2xl mt-2 mb-1">Placeholder Product Name</h1>
                <p className="text-brand-subtext text-sm mb-5">Placeholder Brand</p>
                <p className="text-brand-subtext text-sm leading-relaxed mb-6">Product description will appear here once connected to the database.</p>
                <Link href="/contact" className="btn-primary w-full justify-center mb-3">
                  Request a Quote
                </Link>
                <a href="#" className="btn-secondary w-full justify-center text-sm">
                  Download Spec Sheet
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
