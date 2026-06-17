import PageHero from '@/components/shared/PageHero';
import ProjectsContent from '@/components/projects/ProjectsContent';

export const metadata = {
  title: 'Our Projects | Teknomech',
  description:
    'MEP and Fire Protection projects delivered by Teknomech across Qatar — commercial, industrial, healthcare and government sectors.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="MEP and Fire Protection works delivered across Qatar's commercial, industrial and government sectors."
        breadcrumbs={[{ label: 'Projects' }]}
      />
      <ProjectsContent />
    </>
  );
}
