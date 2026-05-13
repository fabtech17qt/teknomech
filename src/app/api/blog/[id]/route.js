import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return Response.json({ error: 'Post not found' }, { status: 404 });
    return Response.json(post);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = {
      ...body,
      publishedAt: body.isPublished && !body.publishedAt ? new Date() : body.publishedAt,
    };
    const post = await prisma.blogPost.update({ where: { id }, data });
    return Response.json(post);
  } catch (error) {
    if (error.code === 'P2025') {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
