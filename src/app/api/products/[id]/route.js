import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });
    return Response.json(product);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const product = await prisma.product.update({ where: { id }, data: body });
    return Response.json(product);
  } catch (error) {
    if (error.code === 'P2025') {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
