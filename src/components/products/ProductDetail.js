'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import ModelViewer from '@/components/ui/ModelViewer';
import { Phone, Download, ArrowLeft, CheckCircle, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=800&h=600&fit=crop&q=80';

function mapProduct(raw) {
  if (!raw) return null;
  return {
    name: raw.nameEn || raw.nameAr || 'Untitled',
    brand: raw.brand || '',
    category: raw.category || '',
    description: raw.descriptionEn || raw.descriptionAr || '',
    images: raw.images?.length > 0 ? raw.images : [FALLBACK_IMG],
    specs: raw.specifications && typeof raw.specifications === 'object' && !Array.isArray(raw.specifications)
      ? raw.specifications : {},
    certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
    variants: Array.isArray(raw.variants) ? raw.variants : [],
    specSheet: raw.specSheet || null,
  };
}

/* ── Variant Selector ── */
function VariantSelector({ variants }) {
  const [selected, setSelected] = useState(() => {
    const init = {};
    variants.forEach((v) => { init[v.name] = v.options[0]; });
    return init;
  });

  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.name}>
          <p className="text-brand-text text-sm font-semibold mb-2">
            {variant.name}:{' '}
            <span className="text-brand-blue font-bold">{selected[variant.name]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected((s) => ({ ...s, [variant.name]: opt }))}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200',
                  selected[variant.name] === opt
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20'
                    : 'bg-white text-brand-text border-brand-border hover:border-brand-blue hover:text-brand-blue'
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Image Gallery ── */
function ImageGallery({ images, name, modelSrc }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl overflow-hidden bg-brand-blue-light border border-brand-border aspect-square">
        {show3D && modelSrc ? (
          <ModelViewer src={modelSrc} alt={name} className="w-full h-full" />
        ) : (
          <Image
            src={images[activeIdx]}
            alt={name}
            fill
            className="object-contain transition-all duration-300"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        )}
        {modelSrc && (
          <button
            onClick={() => setShow3D(!show3D)}
            className="absolute top-4 start-4 flex items-center gap-1.5 bg-brand-blue text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg hover:bg-brand-blue-dark transition-colors z-10"
          >
            <Box size={12} />
            {show3D ? 'Photo View' : '3D View'}
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); setShow3D(false); }}
              className={cn(
                'relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',
                activeIdx === i ? 'border-brand-blue' : 'border-brand-border hover:border-brand-blue/40'
              )}
            >
              <Image src={img} alt="" fill className="object-contain" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main ProductDetail component ── */
export default function ProductDetail({ product: rawProduct }) {
  const product = mapProduct(rawProduct);

  if (!product) {
    return (
      <section className="section-padding bg-brand-light">
        <div className="container-max text-center py-20">
          <h2 className="heading-md mb-4 text-brand-text">Product Not Found</h2>
          <p className="text-brand-sub mb-6">This product may have been moved or is not yet listed.</p>
          <Link href="/products" className="btn-primary">Browse All Products</Link>
        </div>
      </section>
    );
  }

  const hasSpecs = Object.keys(product.specs).length > 0;

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        <Link href="/products"
          className="inline-flex items-center gap-2 text-brand-sub hover:text-brand-blue text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          {/* Left — Gallery + Specs */}
          <div>
            <ImageGallery
              images={product.images}
              name={product.name}
              modelSrc={null}
            />

            {hasSpecs && (
              <div className="mt-8 bg-white rounded-2xl border border-brand-border shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-brand-border bg-brand-light">
                  <SectionLabel>Technical Specifications</SectionLabel>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={cn('border-b border-brand-border last:border-0', i % 2 === 0 ? 'bg-white' : 'bg-brand-light/50')}>
                        <td className="px-6 py-3.5 text-brand-sub font-semibold w-2/5">{key}</td>
                        <td className="px-6 py-3.5 text-brand-text">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {product.certifications.length > 0 && (
              <div className="mt-6">
                <p className="text-brand-text font-semibold text-sm mb-3">Certifications & Compliance</p>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((c) => (
                    <span key={c} className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <CheckCircle size={11} /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Info + Variants + CTA */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-brand-border shadow-md p-6">
              <h1 className="text-2xl font-extrabold text-brand-text leading-snug mb-1">
                {product.name}
              </h1>
              <p className="text-brand-sub text-sm mb-4 font-medium">{product.brand}</p>
              <p className="text-brand-sub text-sm leading-relaxed">{product.description}</p>
            </div>

            {product.variants.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border shadow-md p-6">
                <p className="text-brand-text font-bold text-sm mb-4">Select Configuration</p>
                <VariantSelector variants={product.variants} />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-brand-border shadow-md p-6 space-y-3">
              <Link href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white rounded-full py-3.5 font-semibold hover:bg-brand-orange-dark transition-colors text-sm">
                Request a Quote
              </Link>
              <a href="tel:+97444445555"
                className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue rounded-full py-3.5 font-semibold hover:bg-brand-blue hover:text-white transition-colors text-sm">
                <Phone size={15} /> Call Our Team
              </a>
              <a href="https://wa.me/97444445555" target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border-2 border-green-500 text-green-700 rounded-full py-3.5 font-semibold hover:bg-green-500 hover:text-white transition-colors text-sm">
                WhatsApp Us
              </a>
              {product.specSheet && (
                <a href={product.specSheet} target="_blank" rel="noopener noreferrer" download
                  className="w-full flex items-center justify-center gap-2 border border-brand-border text-brand-sub rounded-full py-3 text-sm hover:bg-brand-light transition-colors">
                  <Download size={14} /> Download MSDS / Datasheet
                </a>
              )}
            </div>

            <div className="bg-brand-blue-light rounded-2xl p-5 border border-brand-blue/10">
              <p className="text-brand-blue text-xs font-semibold uppercase tracking-widest mb-3">Why Buy From Teknomech</p>
              {[
                'Genuine manufacturer-sourced products',
                'Expert installation & commissioning',
                'Full warranty support',
                'QCDD & UPDA compliant supply',
              ].map((point) => (
                <div key={point} className="flex items-start gap-2 text-sm text-brand-text mb-2 last:mb-0">
                  <CheckCircle size={14} className="text-brand-blue shrink-0 mt-0.5" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
