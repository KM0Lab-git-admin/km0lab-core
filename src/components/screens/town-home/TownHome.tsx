'use client';

import { Suspense, useState } from 'react';
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
  townHomeTabBar,
  townHomeTabButton,
  townHomeTabIcon,
  townHomeTabLabel,
  townHomeBulletPanel,
  townHomeBulletItem,
  townHomeBulletDot,
  townHomeIndicator,
} from './town-home.styles';

type CategoryId = 'townHall' | 'products' | 'services';

function TownHomeContent() {
  const t = useTranslations('TownHome');
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<CategoryId>('townHall');

  const postalCode = searchParams.get('cp') || '';
  const townName = getPostalCodeCity(postalCode) || t('defaultTown');

  const getBullets = (key: CategoryId) => [
    t(`${key}.bullet0`),
    t(`${key}.bullet1`),
    t(`${key}.bullet2`),
  ];

  const categories = [
    {
      id: 'townHall' as CategoryId,
      icon: <TownHallIcon />,
      title: t('townHall.title'),
      bullets: getBullets('townHall'),
    },
    {
      id: 'products' as CategoryId,
      icon: <ProductsIcon />,
      title: t('products.title'),
      bullets: getBullets('products'),
    },
    {
      id: 'services' as CategoryId,
      icon: <ServicesIcon />,
      title: t('services.title'),
      bullets: getBullets('services'),
    },
  ];

  const activeCategory = categories.find((c) => c.id === activeTab)!;

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

        {/* Tab selector con degradado + panel de bullets */}
        <div className="w-full overflow-hidden rounded-xl shadow-sm">
          {/* Barra de tabs con degradado amarillo → blanco */}
          <div className={townHomeTabBar()} role="tablist">
            {categories.map((cat) => {
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={townHomeTabButton({ active: isActive })}
                  onClick={() => setActiveTab(cat.id)}
                >
                  <div className={townHomeTabIcon({ active: isActive })}>
                    {cat.icon}
                  </div>
                  <span className={townHomeTabLabel({ active: isActive })}>
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel de bullets (solo categoria activa) */}
          <div className={townHomeBulletPanel()} role="tabpanel">
            {activeCategory.bullets.map((bullet, i) => (
              <div key={i} className={townHomeBulletItem()}>
                <span className={townHomeBulletDot()} />
                <span>{bullet}</span>
              </div>
            ))}
            <div className={townHomeIndicator()} />
          </div>
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
