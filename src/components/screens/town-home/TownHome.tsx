'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';

import { ContentShell } from '@/components/ui/content-shell';
import { ContentCard } from '@/components/ui/content-card';
import { NavigationFooter } from '@/components/ui/navigation-footer';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/primitives/button';
import { getPostalCodeCity } from '@/components/screens/postal-code/postalCodeDb';
import { ChatScreen } from '@/components/screens/chat';
import { useChatStore } from '@/stores/chatStore';

import {
  TownHallIcon,
  ProductsIcon,
  ServicesIcon,
  HomeIcon,
  ChatBubbleIcon,
  ProfileIcon,
} from './icons';

import {
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

  /* ---- Formatted date for banner ---- */
  const dateLabel = (() => {
    const d = new Date();
    try {
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return d.toLocaleDateString();
    }
  })();

  /* ---- Vista pueblo (por defecto) ---- */
  return (
    <ContentShell>
      {/* Header: back + city name + logo + robot avatar */}
      <header className="flex items-center gap-3 px-4 pb-2 pt-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex size-10 items-center justify-center rounded-xl border-2 border-dashed border-km0-yellow-500 text-km0-yellow-600 transition-all hover:bg-km0-yellow-50"
          aria-label="Back"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <h1 className="flex-1 font-brand text-2xl leading-none text-km0-blue-700">
          {townName}
        </h1>
        <Logo alt="KM0 LAB" />
        <img
          src="/assets/images/km0_robot_icon_v2.png"
          alt="KM0 Bot"
          className="size-10 rounded-full object-contain"
        />
      </header>

      {/* Date banner */}
      <div className="bg-km0-yellow-500 py-1.5 text-center">
        <span className="font-ui text-sm font-semibold text-km0-blue-800">
          {dateLabel}
        </span>
      </div>

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
