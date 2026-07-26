'use client';

import { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Check, X } from 'lucide-react';

function getCroppedBlob(image, pixelCrop, mimeType) {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(pixelCrop.width * scaleX);
  canvas.height = Math.round(pixelCrop.height * scaleY);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    pixelCrop.x * scaleX, pixelCrop.y * scaleY,
    pixelCrop.width * scaleX, pixelCrop.height * scaleY,
    0, 0, canvas.width, canvas.height
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType || 'image/jpeg', 0.92);
  });
}

export default function ImageCropModal({ imageSrc, fileName, mimeType, onCancel, onConfirm }) {
  const [crop, setCrop] = useState({ unit: '%', x: 5, y: 5, width: 90, height: 90 });
  const [pixelCrop, setPixelCrop] = useState(null);
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef(null);

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    setPixelCrop({ unit: 'px', x: width * 0.05, y: height * 0.05, width: width * 0.9, height: height * 0.9 });
  }, []);

  async function handleConfirm() {
    if (!pixelCrop || !imgRef.current) return;
    setProcessing(true);
    try {
      const blob = await getCroppedBlob(imgRef.current, pixelCrop, mimeType);
      const croppedFile = new File([blob], fileName, { type: blob.type });
      onConfirm(croppedFile);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,35,0.72)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onCancel}
    >
      <div
        style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620, maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', display: 'block' }}>Crop Image</span>
            <span style={{ fontSize: 11, color: '#8B9CB4' }}>Drag the handles to crop any shape or size — or leave as-is to keep the full image.</span>
          </div>
          <button type="button" onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A6B82', display: 'flex', flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', background: '#0A2342', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setPixelCrop(c)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={imageSrc} alt="" onLoad={onImageLoad} style={{ maxHeight: '60vh', display: 'block' }} />
          </ReactCrop>
        </div>

        <div style={{ padding: 20, display: 'flex', gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={processing}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#B8893D', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1 }}
          >
            <Check size={15} /> {processing ? 'Applying…' : 'Apply Crop'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ flex: 1, background: '#F1F5F9', color: '#5A6B82', border: 'none', borderRadius: 10, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
