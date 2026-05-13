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

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { completedYear: 'desc' }],
      ...(limit ? { take: parseInt(limit) } : {}),
    });

    return Response.json(projects);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({ data: body });
    return Response.json(project, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return Response.json({ error: 'A project with this slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
