'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ContentShell } from '@/components/ui/content-shell';
import { ContentCard } from '@/components/ui/content-card';
import { NavigationFooter } from '@/components/ui/navigation-footer';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/primitives/button';
import { getPostalCodeCity } from '@/features/postal-code';

import { NotificationBellButton } from '@/components/ui/notification-bell';
import {
  TownHallIcon,
  ProductsIcon,
  ServicesIcon,
  HomeIcon,
  InfoIcon,
  ProfileIcon,
} from './icons';

import {
  townHomeHeader,
  townHomeHeaderLeft,
  townHomeHeaderLogo,
  townHomeHeaderTitle,
  townHomeHero,
  townHomeHeroTitle,
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
      {/* Header: izquierda (nombre + logo apilados) | derecha (campanilla) */}
      <header className={townHomeHeader()}>
        <div className={townHomeHeaderLeft()}>
          <h2 className={townHomeHeaderTitle()}>{townName}</h2>
          <div className={townHomeHeaderLogo()}>
            <Logo alt="KM0 LAB" />
          </div>
        </div>
        <NotificationBellButton
          size="md"
          dotColor="coral"
          hasNotification
          aria-label={t('notifications_aria')}
        />
      </header>

      <ContentCard>
        {/* Seccion hero */}
        <div className={townHomeHero()}>
          <h1 className={townHomeHeroTitle()}>{townName}</h1>
          <div className={townHomeChatLogo()}>
            <img
              src={t('chatLogo_src')}
              alt={t('chatLogo_alt')}
              className="size-full object-contain"
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
