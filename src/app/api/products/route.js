import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where = { isActive: true };
    if (category) where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const products = await prisma.product.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      ...(limit ? { take: parseInt(limit) } : {}),
    });

    return Response.json(products);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({ data: body });
    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    if (error.code === 'P2002') {
      return Response.json({ error: 'A product with this slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
