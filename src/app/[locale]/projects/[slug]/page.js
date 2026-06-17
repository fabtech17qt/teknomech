import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { MapPin, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    return {
      title: project
        ? `${project.titleEn || project.titleAr} | Teknomech Projects`
        : 'Project | Teknomech',
      description: (project?.descriptionEn || project?.descriptionAr || '').slice(0, 160),
    };
  } catch {
    return { title: 'Project | Teknomech' };
  }
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  let project = null;
  try {
    project = await prisma.project.findUnique({ where: { slug } });
  } catch {}

  const title = project ? (project.titleEn || project.titleAr || 'Project') : 'Project Not Found';
  const description = project ? (project.descriptionEn || project.descriptionAr || '') : '';

  return (
    <>
      <PageHero
        title={title}
        subtitle={description || 'Detailed overview of this MEP and fire protection project.'}
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          { label: title },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="container-max">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-brand-sub hover:text-brand-blue text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>

          {!project ? (
            <div className="py-20 text-center text-brand-sub text-sm">
              This project could not be found or has been removed.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2">
                {/* Images */}
                {project.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="col-span-2 relative h-64 rounded-2xl overflow-hidden border border-brand-border">
                      <Image
                        src={project.images[0]}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority
                      />
                    </div>
                    {project.images.slice(1, 3).map((img, i) => (
                      <div key={i} className="relative h-40 rounded-2xl overflow-hidden border border-brand-border">
                        <Image
                          src={img}
                          alt={`${title} ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <SectionLabel className="mb-4">Project Overview</SectionLabel>
                <h2 className="text-2xl font-black text-brand-text mb-4">
                  Scope of <span className="text-brand-orange">Work</span>
                </h2>
                {description && (
                  <div className="text-brand-sub leading-relaxed space-y-3">
                    {description.split('\n').filter(Boolean).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="bg-brand-blue-soft rounded-2xl border border-brand-blue/10 p-6 h-fit">
                <div className="w-8 h-1 bg-brand-orange rounded-full mb-5" />
                <h3 className="text-brand-text font-black text-lg mb-5">Project Info</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange-soft flex items-center justify-center shrink-0">
                      <MapPin size={14} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-brand-sub text-xs mb-0.5">Location</p>
                      <p className="text-brand-text font-semibold">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange-soft flex items-center justify-center shrink-0">
                      <Calendar size={14} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-brand-sub text-xs mb-0.5">Year</p>
                      <p className="text-brand-text font-semibold">{project.completedYear}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange-soft flex items-center justify-center shrink-0">
                      <Tag size={14} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-brand-sub text-xs mb-0.5">Sector</p>
                      <p className="text-brand-text font-semibold capitalize">{project.category}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-brand-blue/10">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white rounded-full py-3.5 font-bold hover:bg-brand-orange-dark transition-colors text-sm"
                  >
                    Request a Similar Project
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
