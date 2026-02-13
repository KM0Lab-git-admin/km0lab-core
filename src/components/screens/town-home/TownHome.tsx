'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ContentShell } from '@/components/ui/content-shell';
import { ContentCard } from '@/components/ui/content-card';
import { NavigationFooter } from '@/components/ui/navigation-footer';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/primitives/button';
import { getPostalCodeCity } from '@/features/postal-code';

import {
  NotificationBellIcon,
  TownHallIcon,
  ProductsIcon,
  ServicesIcon,
  HomeIcon,
  InfoIcon,
  ProfileIcon,
} from './icons';

import {
  townHomeHeader,
  townHomeHeaderTitle,
  townHomeHero,
  townHomeHeroTitle,
  townHomeChatLabel,
  townHomeChatLogo,
  townHomeCardsContainer,
  townHomeCategoryCard,
  townHomeCategoryIcon,
  townHomeCategoryText,
  townHomeCategoryTitle,
  townHomeCategoryDescription,
} from './town-home.styles';

function TownHomeContent() {
  const t = useTranslations('TownHome');
  const searchParams = useSearchParams();

  const postalCode = searchParams.get('cp') || '';
  const townName = getPostalCodeCity(postalCode) || t('defaultTown');

  const categories = [
    {
      id: 'townHall',
      icon: <TownHallIcon />,
      title: t('townHall.title'),
      description: t('townHall.description'),
    },
    {
      id: 'products',
      icon: <ProductsIcon />,
      title: t('products.title'),
      description: t('products.description'),
    },
    {
      id: 'services',
      icon: <ServicesIcon />,
      title: t('services.title'),
      description: t('services.description'),
    },
  ];

  return (
    <ContentShell>
      {/* Header: campanita | nombre poblacion | logo KM0 */}
      <header className={townHomeHeader()}>
        <button type="button" aria-label={t('notifications_aria')}>
          <NotificationBellIcon />
        </button>
        <h2 className={townHomeHeaderTitle()}>{townName}</h2>
        <Logo scale="sm" alt="KM0 LAB" />
      </header>

      <ContentCard>
        {/* Seccion hero */}
        <div className={townHomeHero()}>
          <h1 className={townHomeHeroTitle()}>{townName}</h1>
          <span className={townHomeChatLabel()}>{t('chatLabel')}</span>
          <div className={townHomeChatLogo()}>
            <Image
              src="/assets/logos/chat_blue.png"
              alt={t('chatLogo_alt')}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Tarjetas de categoria */}
        <div className={townHomeCardsContainer()}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={townHomeCategoryCard()}
              aria-label={cat.title}
              onClick={() => {}}
            >
              <div className={townHomeCategoryIcon()}>
                {cat.icon}
              </div>
              <div className={townHomeCategoryText()}>
                <span className={townHomeCategoryTitle()}>{cat.title}</span>
                <span className={townHomeCategoryDescription()}>
                  {cat.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </ContentCard>

      {/* Navegacion inferior */}
      <NavigationFooter
        left={
          <Button variant="ghost" size="icon" aria-label={t('nav.home')}>
            <HomeIcon />
          </Button>
        }
        center={
          <Button variant="ghost" size="icon" aria-label={t('nav.info')}>
            <InfoIcon />
          </Button>
        }
        right={
          <Button variant="ghost" size="icon" aria-label={t('nav.profile')}>
            <ProfileIcon />
          </Button>
        }
      />
    </ContentShell>
  );
}

export default function TownHome() {
  return (
    <Suspense fallback={null}>
      <TownHomeContent />
    </Suspense>
  );
}
