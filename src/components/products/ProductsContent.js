'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import ModelViewer from '@/components/ui/ModelViewer';
import { Link } from '@/i18n/navigation';
import { ExternalLink, Box } from 'lucide-react';

const CATEGORY_LABELS = {
  all: 'All Products',
  'fire-protection': 'Fire Protection',
  hvac: 'HVAC',
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  'lv-systems': 'LV Systems',
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=400&h=300&fit=crop&q=80';

const MODEL_SHOWCASES = [
  {
    name: 'Belt Drive Assembly',
    description:
      'Industrial belt drive mechanism used in HVAC air handling units and mechanical systems. Drag to rotate, scroll to zoom.',
    brand: 'Teknomech OEM',
    category: 'HVAC / Mechanical',
    modelSrc: '/models/belt-drive.glb',
  },
  {
    name: 'Electrical Cable System',
    description:
      'Multi-core armoured electrical cable assembly for high-current power distribution installations across Qatar.',
    brand: 'Prysmian',
    category: 'Electrical',
    modelSrc: '/models/electrical-cable.gltf',
  },
];

function ProductCard({ product }) {
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="relative aspect-square bg-brand-blue-light overflow-hidden">
        {show3D && product.modelSrc ? (
          <ModelViewer src={product.modelSrc} alt={product.name} className="w-full h-full" />
        ) : (
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        {product.modelSrc && (
          <button
            onClick={() => setShow3D(!show3D)}
            className="absolute top-2 start-2 flex items-center gap-1 bg-brand-blue text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-full shadow-md hover:bg-brand-blue-dark transition-colors z-10"
          >
            <Box size={10} />
            {show3D ? 'Photo' : '3D View'}
          </button>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-brand-text font-bold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-brand-sub text-xs mb-4">{product.brand}</p>
        <Link
          href={`/products/${product.slug}`}
          className="w-full py-2.5 rounded-xl border-2 border-brand-blue/20 text-brand-blue text-xs font-semibold hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200 flex items-center justify-center gap-1.5 min-h-[44px] mt-auto"
        >
          <ExternalLink size={12} />
          View Specifications
        </Link>
      </div>
    </div>
  );
}

function ModelShowcaseCard({ showcase }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-80 bg-brand-blue-light">
        <ModelViewer src={showcase.modelSrc} alt={showcase.name} className="w-full h-full" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-full px-3 py-1">
            Interactive 3D
          </span>
          <span className="text-brand-sub text-xs">{showcase.category}</span>
        </div>
        <h3 className="text-brand-text font-bold text-base mb-1">{showcase.name}</h3>
        <p className="text-brand-sub text-xs mb-3">{showcase.brand}</p>
        <p className="text-brand-sub text-sm leading-relaxed">{showcase.description}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-md overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-square bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-100 rounded-full w-24" />
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
        <div className="h-10 bg-slate-100 rounded-xl mt-4" />
      </div>
    </div>
  );
}

export default function ProductsContent() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        const mapped = (Array.isArray(data) ? data : []).map(p => ({
          id: p.id,
          slug: p.slug,
          category: p.category || 'other',
          name: p.nameEn || p.nameAr || 'Untitled',
          brand: p.brand || '',
          img: p.images?.[0] || FALLBACK_IMG,
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Products grid */}
      <section className="section-padding bg-brand-light">
        <div className="container-max">
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20'
                    : 'bg-white text-brand-sub border-brand-border hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-brand-sub text-sm">
              {activeCategory === 'all' ? 'No products available yet.' : 'No products in this category.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product, index) => (
                <AnimateIn key={product.id} variant="fadeUp" delay={index * 0.07}>
                  <ProductCard product={product} />
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3D Model Showcase */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">Interactive 3D</SectionLabel>
            <h2 className="heading-lg mb-3">Explore Components in 3D</h2>
            <p className="text-brand-sub text-lg mb-10 max-w-2xl leading-relaxed">
              Drag to rotate, scroll to zoom. Examine product assemblies in full detail before
              ordering.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MODEL_SHOWCASES.map((showcase, index) => (
              <AnimateIn key={showcase.name} variant="fadeUp" delay={index * 0.1}>
                <ModelShowcaseCard showcase={showcase} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
