'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ContentShell } from '@/components/ui/content-shell';
import { ContentCard } from '@/components/ui/content-card';
import { NavigationFooter } from '@/components/ui/navigation-footer';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/primitives/button';
import { getPostalCodeCity } from '@/components/screens/postal-code/postalCodeDb';
import { ChatScreen } from '@/components/screens/chat';
import { useChatStore } from '@/stores/chatStore';

import { NotificationBellButton } from '@/components/ui/notification-bell';
import {
  TownHallIcon,
  ProductsIcon,
  ServicesIcon,
  HomeIcon,
  ChatBubbleIcon,
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

  const activeChatType = useChatStore((s) => s.activeChatType);
  const openChat = useChatStore((s) => s.openChat);

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

  /* ---- Vista chat: ocupa toda la pantalla, sin header ni footer ---- */
  if (activeChatType) {
    return (
      <ContentShell>
        <ChatScreen />
      </ContentShell>
    );
  }

  /* ---- Vista pueblo (por defecto) ---- */
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

      <ContentCard className="gap-2 tablet:gap-3">
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
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl shadow-sm">
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

          {/* Panel de bullets (sin scroll: contenedor ampliado para que todo el texto quepa) */}
          <div className={townHomeBulletPanel()} role="tabpanel">
            <div className="flex min-h-0 flex-1 flex-col gap-3">
              {activeCategory.bullets.map((bullet, i) => (
                <div key={i} className={townHomeBulletItem()}>
                  <span className={townHomeBulletDot()} />
                  <span className="min-w-0 flex-1 break-words">{bullet}</span>
                </div>
              ))}
            </div>
            <div className={townHomeIndicator()} />
          </div>
        </div>

        {/* Navegacion inferior: iconos grandes y azul del design system */}
        <NavigationFooter
          left={
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('nav.home')}
              className="size-12 text-km0-blue-700 [&_svg]:!size-8"
            >
              <HomeIcon />
            </Button>
          }
          center={
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('nav.chat')}
              className="size-12 text-km0-blue-700 [&_svg]:!size-8"
              onClick={() => openChat(activeTab)}
            >
              <ChatBubbleIcon />
            </Button>
          }
          right={
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('nav.profile')}
              className="size-12 text-km0-blue-700 [&_svg]:!size-8"
            >
              <ProfileIcon />
            </Button>
          }
        />
      </ContentCard>
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
