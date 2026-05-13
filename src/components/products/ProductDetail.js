'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import ModelViewer from '@/components/ui/ModelViewer';
import { Phone, Mail, Download, ArrowLeft, CheckCircle, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Static product catalogue (replace with DB fetch when connected) ── */
export const PRODUCTS_DETAIL = {
  'fm200-clean-agent-suppression-system': {
    name: 'FM200 Clean Agent Suppression System',
    brand: 'Kidde',
    category: 'Fire Protection',
    description:
      'The FM200 (HFC-227ea) clean agent suppression system is a fast-acting, non-corrosive fire suppression solution ideal for occupied spaces, data centres, server rooms, and critical equipment areas. It leaves no residue, causes no collateral damage, and is safe for use around people.',
    images: ['/images/product-fire-extinguisher.png'],
    modelSrc: null,
    isRender: true,
    specs: {
      Agent: 'HFC-227ea (FM200)',
      'Coverage Volume': 'Up to 200 m³',
      'Operating Pressure': '25 bar / 42 bar',
      'Discharge Time': '< 10 seconds',
      'Storage Temperature': '0°C to 54°C',
      Certification: 'UL Listed, FM Approved',
      Compliance: 'NFPA 2001, ISO 14520',
    },
    variants: [
      { name: 'Cylinder Capacity', options: ['25L', '50L', '80L', '120L', '180L'] },
      { name: 'Pressure Rating', options: ['25 bar', '42 bar'] },
    ],
    certifications: ['UL Listed', 'FM Approved', 'QCDD Compliant', 'NFPA 2001'],
  },
  'emergency-fire-equipment-cabinet': {
    name: 'Emergency Fire Equipment Cabinet',
    brand: 'Gloria',
    category: 'Fire Protection',
    description:
      'Steel-fabricated fire equipment cabinet for hose reels, extinguishers and emergency tools. Available in surface-mount or recessed installation with safety glass or acrylic glazing.',
    images: ['/images/product-fire-equipment.jpg'],
    modelSrc: null,
    isRender: false,
    specs: {
      Material: 'Powder-coated steel',
      'Door Configuration': 'Single / Double door',
      Glazing: 'Safety glass / Acrylic',
      'RAL Colour': 'Fire red RAL 3000',
      Mounting: 'Surface / Recessed',
      Compliance: 'BS 9999, QCDD',
    },
    variants: [
      { name: 'Cabinet Size', options: ['600×600 mm', '700×700 mm', '900×900 mm'] },
      { name: 'Door Type', options: ['Single Door', 'Double Door'] },
      { name: 'Glazing', options: ['Safety Glass', 'Acrylic'] },
    ],
    certifications: ['BS 9999', 'QCDD Compliant'],
  },
  'ceiling-cassette-fcu-4-way-blow': {
    name: 'Ceiling Cassette FCU — 4-Way Blow',
    brand: 'Daikin',
    category: 'HVAC',
    description:
      'Four-way blow ceiling cassette fan coil unit with 360° air distribution. Designed for commercial spaces with concealed installation for a clean aesthetic finish.',
    images: ['https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=800&h=600&fit=crop&q=80'],
    modelSrc: null,
    isRender: false,
    specs: {
      'Air Distribution': '4-way',
      'Cooling Capacity Range': '2.2 – 14.0 kW',
      'Heating Capacity Range': '2.5 – 16.0 kW',
      'Refrigerant': 'R-32',
      'Energy Rating': 'A+++',
      'Noise Level': '26–46 dB(A)',
      Compliance: 'ASHRAE 90.1',
    },
    variants: [
      { name: 'Capacity', options: ['2.2 kW', '3.5 kW', '5.6 kW', '7.1 kW', '9.0 kW', '14.0 kW'] },
      { name: 'Refrigerant', options: ['R-32', 'R-410A'] },
    ],
    certifications: ['CE Mark', 'ASHRAE Compliant', 'ISO 5151'],
  },
  'online-ups-system-10-kva': {
    name: 'Online UPS System 10 kVA',
    brand: 'APC by Schneider Electric',
    category: 'Electrical',
    description:
      'Double-conversion online UPS providing continuous power protection for critical loads. Zero transfer time ensures servers, network equipment, and medical devices remain protected at all times.',
    images: ['https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=800&h=600&fit=crop&q=80'],
    modelSrc: null,
    isRender: false,
    specs: {
      Topology: 'Double conversion (online)',
      'Output Power': '10 kVA / 10 kW',
      'Transfer Time': '0 ms (zero transfer)',
      'Input Voltage': '220–240V AC ±15%',
      'Output Voltage': '230V AC ±2%',
      'Battery Backup': '8–15 minutes at full load',
      'Communication': 'SNMP, USB, RS-232',
    },
    variants: [
      { name: 'Capacity', options: ['6 kVA', '10 kVA', '15 kVA', '20 kVA', '40 kVA'] },
      { name: 'Runtime', options: ['Standard', 'Extended (external battery)'] },
    ],
    certifications: ['UL Listed', 'CE Mark', 'IEC 62040'],
  },
  'armoured-electrical-cable-3-core': {
    name: 'Armoured Electrical Cable 3-Core',
    brand: 'Prysmian',
    category: 'Electrical',
    description:
      'XLPE-insulated steel wire armoured (SWA) power cable for underground and direct burial installations. Suitable for power distribution up to 1000V in industrial, commercial and infrastructure projects.',
    images: ['https://images.unsplash.com/photo-1585585825759-979ec75438cc?w=800&h=600&fit=crop&q=80'],
    modelSrc: '/models/electrical-cable.gltf',
    isRender: false,
    specs: {
      'Insulation': 'XLPE (Cross-linked Polyethylene)',
      'Armour': 'Steel Wire Armour (SWA)',
      'Sheath': 'PVC outer sheath',
      'Voltage Rating': '0.6/1 kV (1000V)',
      'Conductor Material': 'Plain copper',
      'Standard': 'BS 5467, IEC 60502-1',
      'Installation': 'Underground, direct burial, duct',
    },
    variants: [
      { name: 'Cross Section', options: ['2.5 mm²', '4 mm²', '6 mm²', '10 mm²', '16 mm²', '25 mm²', '35 mm²', '50 mm²'] },
      { name: 'Core Count', options: ['3 Core', '4 Core', '5 Core'] },
    ],
    certifications: ['BS 5467', 'IEC 60502-1', 'CE Mark'],
  },
  'galvanized-steel-pipe-fitting-set': {
    name: 'Galvanized Steel Pipe Fitting Set',
    brand: 'Georg Fischer',
    category: 'Plumbing',
    description:
      'Hot-dip galvanized carbon steel threaded pipe fittings for potable water distribution, fire protection and industrial piping. BSP threaded connections, fully galvanized inside and out for superior corrosion resistance.',
    images: ['/images/product-pipe-fitting.png'],
    modelSrc: '/models/belt-drive.glb',
    isRender: true,
    specs: {
      Material: 'Carbon steel, hot-dip galvanized',
      'Thread Standard': 'BSP (BS 21)',
      'Pressure Rating': 'PN 16 (16 bar)',
      'Temperature Range': '-10°C to 120°C',
      Standard: 'BS 1387, EN 10255',
      Coating: 'Hot-dip galvanized (min. 45 µm)',
    },
    variants: [
      { name: 'Pipe Size', options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'] },
      { name: 'Fitting Type', options: ['Elbow 90°', 'Elbow 45°', 'Tee Equal', 'Reducer', 'Coupling', 'Cap', 'Union'] },
    ],
    certifications: ['BS 1387', 'EN 10255', 'ISO 65', 'WRAS Approved'],
  },
  'ip-ptz-security-camera-4k': {
    name: 'IP PTZ Security Camera 4K',
    brand: 'Hikvision',
    category: 'LV Systems',
    description:
      '4K Ultra-HD pan-tilt-zoom IP network camera with 36× optical zoom, IR night vision up to 100m and intelligent motion tracking. Suitable for large-area surveillance in commercial, industrial and government facilities.',
    images: ['https://images.unsplash.com/photo-1688841747582-41097036109d?w=800&h=600&fit=crop&q=80'],
    modelSrc: null,
    isRender: false,
    specs: {
      Resolution: '4K (3840×2160)',
      'Optical Zoom': '36×',
      'IR Night Vision': 'Up to 100m',
      'Pan Range': '360° continuous',
      'Tilt Range': '-15° to 90°',
      'Network Protocol': 'TCP/IP, HTTP, RTSP, ONVIF',
      'Power': 'PoE+ (802.3at) / 24V AC',
    },
    variants: [
      { name: 'Resolution', options: ['2MP (1080p)', '4MP', '8MP (4K)'] },
      { name: 'Optical Zoom', options: ['16×', '25×', '36×'] },
    ],
    certifications: ['CE Mark', 'FCC', 'ONVIF Profile S/G/T'],
  },
  'pressure-gauge-testing-kit': {
    name: 'Pressure Gauge & Testing Kit',
    brand: 'WIKA',
    category: 'Plumbing',
    description:
      'Precision pressure testing kit for commissioning water, gas and fire suppression systems. Includes calibrated gauges, fittings and test records for QCDD and consultant acceptance.',
    images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop&q=80'],
    modelSrc: null,
    isRender: false,
    specs: {
      'Pressure Range': '0–600 bar (gauge selection)',
      'Accuracy Class': '0.6 / 1.0 / 1.6',
      'Dial Size': '63 mm / 100 mm / 160 mm',
      'Connection': 'BSP / NPT ¼" to 1"',
      'Wetted Parts': 'Stainless steel, brass',
      Standard: 'EN 837-1, ASME B40.100',
    },
    variants: [
      { name: 'Pressure Range', options: ['0–10 bar', '0–16 bar', '0–25 bar', '0–40 bar', '0–60 bar', '0–100 bar'] },
      { name: 'Dial Size', options: ['63 mm', '100 mm', '160 mm'] },
    ],
    certifications: ['EN 837-1', 'ASME B40.100'],
  },
};

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
function ImageGallery({ images, name, isRender, modelSrc }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="space-y-3">
      {/* Main view */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-blue-light border border-brand-border" style={{ height: 420 }}>
        {show3D && modelSrc ? (
          <ModelViewer src={modelSrc} alt={name} className="w-full h-full" />
        ) : (
          <Image
            src={images[activeIdx]}
            alt={name}
            fill
            className={cn('transition-all duration-300', isRender ? 'object-contain p-8' : 'object-cover')}
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
        {isRender && !show3D && (
          <span className="absolute top-4 end-4 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-semibold px-2.5 py-1.5 rounded-full">
            3D Render
          </span>
        )}
      </div>

      {/* Thumbnails */}
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
              <Image src={img} alt="" fill className={isRender ? 'object-contain p-1' : 'object-cover'} sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main ProductDetail component ── */
export default function ProductDetail({ slug }) {
  const product = PRODUCTS_DETAIL[slug];

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

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        {/* Back link */}
        <Link href="/products"
          className="inline-flex items-center gap-2 text-brand-sub hover:text-brand-blue text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          {/* Left — Gallery */}
          <div>
            <ImageGallery
              images={product.images}
              name={product.name}
              isRender={product.isRender}
              modelSrc={product.modelSrc}
            />

            {/* Specifications table */}
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

            {/* Certifications */}
            {product.certifications?.length > 0 && (
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
            {/* Product info card */}
            <div className="bg-white rounded-2xl border border-brand-border shadow-md p-6">
              <span className="inline-flex items-center bg-brand-blue-light text-brand-blue text-xs font-semibold rounded-full px-3 py-1 mb-4">
                {product.category}
              </span>
              <h1 className="text-2xl font-extrabold text-brand-text leading-snug mb-1">
                {product.name}
              </h1>
              <p className="text-brand-sub text-sm mb-4 font-medium">{product.brand}</p>
              <p className="text-brand-sub text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border shadow-md p-6">
                <p className="text-brand-text font-bold text-sm mb-4">Select Configuration</p>
                <VariantSelector variants={product.variants} />
              </div>
            )}

            {/* CTA */}
            <div className="bg-white rounded-2xl border border-brand-border shadow-md p-6 space-y-3">
              <Link href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white rounded-full py-3.5 font-semibold hover:bg-orange-700 transition-colors text-sm">
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
              <button className="w-full flex items-center justify-center gap-2 border border-brand-border text-brand-sub rounded-full py-3 text-sm hover:bg-brand-light transition-colors">
                <Download size={14} /> Download Spec Sheet
              </button>
            </div>

            {/* Trust badges */}
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
