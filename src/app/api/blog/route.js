import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = searchParams.get('limit');

    const where = {};
    if (published !== 'all') where.isPublished = true;

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      ...(limit ? { take: parseInt(limit) } : {}),
    });

    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = {
      ...body,
      publishedAt: body.isPublished ? new Date() : null,
    };
    const post = await prisma.blogPost.create({ data });
    return Response.json(post, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return Response.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
