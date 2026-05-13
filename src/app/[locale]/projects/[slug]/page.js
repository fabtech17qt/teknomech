import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { MapPin, Calendar, Tag } from 'lucide-react';

export const metadata = {
  title: 'Project Details',
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <PageHero
        title="Project Details"
        subtitle="Detailed overview of this MEP and fire protection project."
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          { label: slug },
        ]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`bg-brand-steel rounded-xl ${i === 1 ? 'col-span-2 h-64' : 'h-40'} animate-pulse`} />
                ))}
              </div>
              <SectionLabel variant="red" className="mb-4">Project Overview</SectionLabel>
              <p className="text-brand-subtext leading-relaxed">
                Project description will be loaded from the database once configured. This section will show the full project details including scope of work, systems installed, and project highlights.
              </p>
            </div>
            <div className="card-dark p-6 h-fit">
              <h3 className="text-brand-text font-semibold mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-brand-subtext">
                  <MapPin size={14} className="text-brand-red" />
                  <span>Doha, Qatar</span>
                </div>
                <div className="flex items-center gap-2 text-brand-subtext">
                  <Calendar size={14} className="text-brand-red" />
                  <span>2024</span>
                </div>
                <div className="flex items-center gap-2 text-brand-subtext">
                  <Tag size={14} className="text-brand-red" />
                  <span>Commercial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
