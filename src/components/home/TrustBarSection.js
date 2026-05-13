import { useTranslations } from 'next-intl';
import { Award, Shield, CheckCircle, HeartHandshake } from 'lucide-react';
import { AnimateIn } from '@/components/ui/AnimateIn';

const ICONS = [Award, Shield, CheckCircle, HeartHandshake];
const ITEMS = ['item1', 'item2', 'item3', 'item4'];

export default function TrustBarSection() {
  const t = useTranslations('home.trust');

  return (
    <section className="bg-brand-steel border-y border-white/5">
      <div className="container-max py-8">
        <AnimateIn variant="fadeIn">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-white/10">
            {ITEMS.map((key, i) => {
              const Icon = ICONS[i];
              return (
                <div key={key} className={`flex items-center gap-3 ${i > 0 ? 'lg:ps-6' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-snug">{t(`${key}Title`)}</p>
                    <p className="text-white/50 text-xs">{t(`${key}Desc`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
