import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { MapPin, Calendar, Tag, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export const metadata = {
  title: 'Project Details | Teknomech',
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

      <section className="py-20 bg-white">
        <div className="container-max">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-brand-sub hover:text-brand-blue text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Image grid placeholder */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="col-span-2 h-64 bg-brand-blue-soft rounded-2xl border border-brand-border animate-pulse" />
                {[1, 2].map((i) => (
                  <div key={i} className="h-40 bg-brand-blue-soft rounded-2xl border border-brand-border animate-pulse" />
                ))}
              </div>

              <SectionLabel className="mb-4">Project Overview</SectionLabel>
              <h2 className="text-2xl font-black text-brand-text mb-4">
                Scope of <span className="text-brand-orange">Work</span>
              </h2>
              <p className="text-brand-sub leading-relaxed mb-6">
                Project description will be loaded from the database once configured. This section will show
                the full project details including scope of work, systems installed, and project highlights.
              </p>

              {/* Scope items placeholder */}
              <div className="space-y-2.5">
                {['Fire Detection & Suppression Systems', 'HVAC Design & Installation', 'Electrical Distribution', 'Plumbing & Drainage', 'Authority Approvals & Handover'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-orange-soft flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-brand-orange" />
                    </div>
                    <span className="text-brand-text text-sm">{item}</span>
                  </div>
                ))}
              </div>
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
                    <p className="text-brand-text font-semibold">Doha, Qatar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange-soft flex items-center justify-center shrink-0">
                    <Calendar size={14} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-brand-sub text-xs mb-0.5">Year</p>
                    <p className="text-brand-text font-semibold">2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange-soft flex items-center justify-center shrink-0">
                    <Tag size={14} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-brand-sub text-xs mb-0.5">Sector</p>
                    <p className="text-brand-text font-semibold">Commercial</p>
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
        </div>
      </section>
    </>
  );
}
