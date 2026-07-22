import { getSupabaseAdmin } from '@/lib/supabase';

const BUCKET_CONFIG = {
  media: { public: true, allowedMimeTypes: ['image/*'], fileSizeLimit: 5242880 },
  documents: { public: true, allowedMimeTypes: ['application/pdf'], fileSizeLimit: 10485760 },
};

async function ensureBucket(supabase, bucket) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === bucket);
  if (!exists) {
    await supabase.storage.createBucket(bucket, BUCKET_CONFIG[bucket] || { public: true });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') === 'document' ? 'document' : 'image';
    const bucket = formData.get('bucket') || (type === 'document' ? 'documents' : 'media');
    const folder = formData.get('folder') || 'uploads';

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    if (type === 'document') {
      if (file.type !== 'application/pdf') {
        return Response.json({ error: 'Only PDF files are allowed' }, { status: 400 });
      }
      if (file.size > 10 * 1024 * 1024) {
        return Response.json({ error: 'File must be under 10 MB' }, { status: 400 });
      }
    } else {
      if (!file.type.startsWith('image/')) {
        return Response.json({ error: 'Only image files are allowed' }, { status: 400 });
      }
      if (file.size > 5 * 1024 * 1024) {
        return Response.json({ error: 'Image must be under 5 MB' }, { status: 400 });
      }
    }

    const supabase = getSupabaseAdmin();

    await ensureBucket(supabase, bucket);

    const ext = file.name.split('.').pop().toLowerCase();
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);

    return Response.json({ url: publicUrl, path: filename });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
