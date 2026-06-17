import { getSupabaseAdmin } from '@/lib/supabase';

async function ensureBucket(supabase, bucket) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === bucket);
  if (!exists) {
    await supabase.storage.createBucket(bucket, { public: true, allowedMimeTypes: ['image/*'], fileSizeLimit: 5242880 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const bucket = formData.get('bucket') || 'media';
    const folder = formData.get('folder') || 'uploads';

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return Response.json({ error: 'Only image files are allowed' }, { status: 400 });
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
