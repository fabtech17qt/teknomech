import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { MapPin } from 'lucide-react';
import { prisma } from '@/lib/prisma';

function ProjectCard({ project, delay = 0 }) {
  return (
    <AnimateIn variant="fadeUp" delay={delay}>
      <Link href={`/projects/${project.slug}`} className="block group relative overflow-hidden rounded-2xl">
        <div className="relative w-full aspect-[4/3] bg-brand-blue-soft">
          {project.images?.[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-blue-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-block bg-brand-orange text-white text-xs font-bold rounded-full px-3 py-1 mb-2">
              {project.completedYear}
            </span>
            <h3 className="text-white font-bold text-base leading-snug mb-1">{project.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white/70 text-xs">
                <MapPin size={11} /> {project.location}
              </div>
              <span className="text-white/60 text-xs">{project.category}</span>
            </div>
          </div>
        </div>
      </Link>
    </AnimateIn>
  );
}

export default async function ProjectsSection() {
  let projects = [];
  try {
    const raw = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { completedYear: 'desc' }],
      take: 4,
    });
    projects = raw.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.titleEn || p.titleAr || 'Untitled',
      location: p.location,
      category: p.category,
      completedYear: p.completedYear,
      images: p.images,
    }));
  } catch {}

  return (
    <section className="py-28 bg-brand-light">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">Featured Projects</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
              Delivered Across{' '}
              <span className="text-brand-orange">Qatar</span>
            </h2>
          </AnimateIn>
          {projects.length > 0 && (
            <AnimateIn variant="fadeLeft">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-brand-blue font-semibold hover:gap-2.5 transition-all text-sm shrink-0"
              >
                View All Projects →
              </Link>
            </AnimateIn>
          )}
        </div>

        {projects.length === 0 ? (
          <AnimateIn variant="fadeUp">
            <div className="rounded-3xl border-2 border-dashed border-brand-orange/30 bg-white flex flex-col items-center justify-center py-24 px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange-soft flex items-center justify-center mb-6">
                <MapPin size={28} className="text-brand-orange" />
              </div>
              <h3 className="text-2xl font-black text-brand-text mb-3">Projects Coming Soon</h3>
              <p className="text-brand-sub text-sm max-w-md leading-relaxed">
                We are currently building our project portfolio. Check back soon to see our completed works across Qatar.
              </p>
            </div>
          </AnimateIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
