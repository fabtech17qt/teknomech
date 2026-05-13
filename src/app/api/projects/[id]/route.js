import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });
    return Response.json(project);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const project = await prisma.project.update({ where: { id }, data: body });
    return Response.json(project);
  } catch (error) {
    if (error.code === 'P2025') {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    if (error.code === 'P2025') {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
