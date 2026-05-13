import PageHero from '@/components/shared/PageHero';
import ProjectsContent from '@/components/projects/ProjectsContent';

export const metadata = {
  title: 'MEP Projects Portfolio | Teknomech',
  description:
    "Explore Teknomech's portfolio of 500+ completed MEP and fire protection projects across Qatar.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Our Projects Portfolio"
        subtitle="500+ completed MEP and fire protection projects across Qatar — from commercial towers to industrial facilities."
        breadcrumbs={[{ label: 'Projects' }]}
      />
      <ProjectsContent />
    </>
  );
}
