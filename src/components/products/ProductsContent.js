'use client';

import { useState } from 'react';
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

const PRODUCTS = [
  {
    id: 1,
    slug: 'fm200-clean-agent-suppression-system',
    category: 'fire-protection',
    name: 'FM200 Clean Agent Suppression System',
    brand: 'Kidde',
    img: '/images/product-fire-extinguisher.png',
    isRender: true,
  },
  {
    id: 2,
    slug: 'emergency-fire-equipment-cabinet',
    category: 'fire-protection',
    name: 'Emergency Fire Equipment Cabinet',
    brand: 'Gloria',
    img: '/images/product-fire-equipment.jpg',
  },
  {
    id: 3,
    slug: 'ceiling-cassette-fcu-4-way-blow',
    category: 'hvac',
    name: 'Ceiling Cassette FCU — 4-Way Blow',
    brand: 'Daikin',
    img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 4,
    slug: 'vrf-outdoor-condensing-unit-8hp',
    category: 'hvac',
    name: 'VRF Outdoor Condensing Unit 8HP',
    brand: 'Mitsubishi Electric',
    img: 'https://images.unsplash.com/photo-1563166423-482a8c14b2d6?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 5,
    slug: 'online-ups-system-10-kva',
    category: 'electrical',
    name: 'Online UPS System 10 kVA',
    brand: 'APC by Schneider',
    img: 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 6,
    slug: 'armoured-electrical-cable-3-core',
    category: 'electrical',
    name: 'Armoured Electrical Cable 3-Core',
    brand: 'Prysmian',
    img: 'https://images.unsplash.com/photo-1585585825759-979ec75438cc?w=400&h=300&fit=crop&q=80',
    modelSrc: '/models/electrical-cable.gltf',
  },
  {
    id: 7,
    slug: 'galvanized-steel-pipe-fitting-set',
    category: 'plumbing',
    name: 'Galvanized Steel Pipe Fitting Set',
    brand: 'Georg Fischer',
    img: '/images/product-pipe-fitting.png',
    isRender: true,
  },
  {
    id: 8,
    slug: 'pressure-gauge-testing-kit',
    category: 'plumbing',
    name: 'Pressure Gauge & Testing Kit',
    brand: 'WIKA',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 9,
    slug: 'ip-ptz-security-camera-4k',
    category: 'lv-systems',
    name: 'IP PTZ Security Camera 4K',
    brand: 'Hikvision',
    img: 'https://images.unsplash.com/photo-1688841747582-41097036109d?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 10,
    slug: 'access-control-intercom-panel',
    category: 'lv-systems',
    name: 'Access Control & Intercom Panel',
    brand: 'Honeywell',
    img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=400&h=300&fit=crop&q=80',
  },
];

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
      <div className="relative h-48 bg-brand-blue-light overflow-hidden">
        {show3D && product.modelSrc ? (
          <ModelViewer src={product.modelSrc} alt={product.name} className="w-full h-full" />
        ) : (
          <Image
            src={product.img}
            alt={product.name}
            fill
            className={`transition-transform duration-500 group-hover:scale-105 ${
              product.isRender ? 'object-contain p-4' : 'object-cover'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        {product.isRender && !show3D && (
          <div className="absolute top-2 end-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-semibold px-2 py-1 rounded-full">
            3D Render
          </div>
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
        <span className="inline-flex items-center bg-brand-blue-light text-brand-blue text-xs font-semibold rounded-full px-3 py-1 mb-3">
          {CATEGORY_LABELS[product.category]}
        </span>
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

export default function ProductsContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, index) => (
              <AnimateIn key={product.id} variant="fadeUp" delay={index * 0.07}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
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
