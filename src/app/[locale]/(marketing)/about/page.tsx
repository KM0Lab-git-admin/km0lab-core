import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

type AboutProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata(props: AboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function About(props: AboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('about_title')}</h1>
        <p className="text-lg text-gray-600">{t('about_subtitle')}</p>
      </section>

      {/* Content Section */}
      <section className="grid gap-8 md:grid-cols-2 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('our_mission')}</h2>
          <p className="text-gray-700">{t('about_paragraph')}</p>
        </div>
        <div className="relative h-64 md:h-auto">
          <Image
            src="/assets/images/about-hero.jpg"
            alt={t('hero_image_alt')}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </section>

      {/* Translation Credits */}
      <footer className="text-center border-t pt-8">
        <p className="text-sm text-gray-600 mb-4">
          {t('translation_powered_by')}
          {' '}
          <a
            href="https://l.crowdin.com/next-js"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('crowdin_link_aria')}
          >
            Crowdin
          </a>
        </p>

        <a
          href="https://l.crowdin.com/next-js"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
          aria-label={t('crowdin_logo_aria')}
        >
          <Image
            src="/assets/images/crowdin-dark.png"
            alt="Crowdin Translation Management System"
            width={128}
            height={26}
            className="mx-auto"
          />
        </a>
      </footer>
    </main>
  );
}
