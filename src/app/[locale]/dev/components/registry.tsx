'use client';

import type React from 'react';
import ChatKitComponent from '@/components/chat/ChatKit/ChatKit';
import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
import FilesList from '@/components/files/FilesList/FilesList';
import OnboardingScreen from '@/components/screens/onboarding/Onboarding';
import ColorPaletteGuide from '@/components/screens/welcome/Colour';
import { CounterForm } from '@/components/screens/welcome/CounterForm';
import { DemoBanner } from '@/components/screens/welcome/DemoBanner';
import DesignSystemShowcase from '@/components/screens/welcome/DesignSystemShowcase';
import { LocaleSwitcher } from '@/components/screens/welcome/LocaleSwitcher';
import WelcomeOnboarding from '@/components/screens/welcome/Onboarding';
import SafeHydration from '@/components/screens/welcome/SafeHydration';
import Slide from '@/components/screens/welcome/Slide';
import { Sponsors } from '@/components/screens/welcome/Sponsors';
import { XPBadge } from '@/components/screens/welcome/XPBadge';
import {
  CarouselSlide,
  CarouselTrack,
  CarouselViewport,
  useCarousel,
} from '@/components/ui/carousel';
import { HeroSlide } from '@/components/ui/hero-slide';
import { AppHeader } from '@/components/ui/layout/AppHeader';
import { MobileFrame } from '@/components/ui/layout/MobileFrame';
import { StatusBar } from '@/components/ui/layout/StatusBar';
import { ContentCard } from '@/components/ui/content-card';
import { MediaFrame } from '@/components/ui/media-frame';
import { Badge } from '@/components/ui/primitives/badge';
import { Button } from '@/components/ui/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/primitives/card';
import { CheckIcon, DateIcon, EmailIcon, Input, PhoneIcon, XIcon, ZipCodeIcon } from '@/components/ui/primitives/input';
import { Progress } from '@/components/ui/primitives/progress';
import { Separator } from '@/components/ui/primitives/separator';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs';
import { Title } from '@/components/ui/primitives/title';
import {
  SimpleSliderNavigation,
  SliderArrowButton,
  SliderCount,
  SliderDots,
} from '@/components/ui/slider';
import { getValidatorById, validators } from '@/validation/validators';
import { useState } from 'react';

/**
 * Cómo añadir un nuevo componente al catálogo:
 * 1) Importa el componente real arriba (sin autodescubrimiento).
 * 2) Añade un objeto al array `componentRegistry` con su metadata (id único, grupo, rutas).
 * 3) Si necesita controles interactivos, crea un Demo (React) y asígnalo en la entrada.
 * 4) Sin Demo, pon el componente en `Component` y saldrá con el aviso “Demo pendiente”.
 */
export type ComponentEntry = {
  id: string;
  title: string;
  description?: string;
  group: 'ui' | 'screens' | 'features';
  filePath: string;
  importPath: string;
  exportName?: string;
  exportType?: 'default' | 'named';
  Component?: React.ComponentType<any>;
  Demo?: React.ComponentType<any>;
  notes?: string[];
};

const badgeVariants = ['default', 'secondary', 'destructive', 'outline'] as const;
const buttonVariants = ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'] as const;
const buttonSizes = ['default', 'sm', 'lg', 'icon'] as const;
const titleSizes = ['h1', 'h2', 'h3', 'xl', 'lg', 'md', 'sm'] as const;
const titleTones = ['default', 'muted', 'brand'] as const;
const titleAlignments = ['left', 'center'] as const;
const subtitleSizes = ['lg', 'md', 'sm', 'xs'] as const;
const subtitleTones = ['default', 'muted'] as const;
const subtitleAlignments = ['left', 'center'] as const;

const ServerOnlyNotice = ({ label }: { label: string }) => (
  <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
    {label}
    {' '}
    es Server Component / depende de backend. No se renderiza aquí; revisa el import y úsalo en un entorno server.
  </div>
);

const BadgeDemo = () => {
  const [variant, setVariant] = useState<(typeof badgeVariants)[number]>('default');
  const [text, setText] = useState('New');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={variant}>{text}</Badge>
        <Badge variant={variant} className="uppercase tracking-wide">
          {text}
          {' '}
          Pill
        </Badge>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm text-slate-600">
          Texto
          <input
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <label className="text-sm text-slate-600">
          Variante
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={variant}
            onChange={e => setVariant(e.target.value as (typeof badgeVariants)[number])}
          >
            {badgeVariants.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

const ButtonDemo = () => {
  const [variant, setVariant] = useState<(typeof buttonVariants)[number]>('default');
  const [size, setSize] = useState<(typeof buttonSizes)[number]>('default');
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState('Launch');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={variant} size={size} disabled={disabled}>
          {label}
        </Button>
        <Button variant="outline" size="icon" aria-label="icon only">
          <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 10h10" />
            <path d="M10 5v10" />
          </svg>
        </Button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm text-slate-600">
          Texto
          <input
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </label>
        <label className="text-sm text-slate-600">
          Variante
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={variant}
            onChange={e => setVariant(e.target.value as (typeof buttonVariants)[number])}
          >
            {buttonVariants.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Tamaño
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={size}
            onChange={e => setSize(e.target.value as (typeof buttonSizes)[number])}
          >
            {buttonSizes.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={disabled}
            onChange={e => setDisabled(e.target.checked)}
          />
          Disabled
        </label>
      </div>
    </div>
  );
};

const InputDemo = () => {
  const neutralHelperText = 'Introduce un valor';
  const [playgroundValue, setPlaygroundValue] = useState('');
  const [playgroundPlaceholder, setPlaygroundPlaceholder] = useState('Email');
  const [showLeftIcon, setShowLeftIcon] = useState(true);
  const [showRightIcon, setShowRightIcon] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'neutral' | 'success' | 'error'>('neutral');
  const [helperText, setHelperText] = useState(neutralHelperText);
  const [validatorId, setValidatorId] = useState('email');
  const [hasValidated, setHasValidated] = useState(false);

  const resetValidation = () => {
    setValidationStatus('neutral');
    setHelperText(neutralHelperText);
    setHasValidated(false);
  };

  const applyLiveValidation = (value: string, nextValidatorId: string) => {
    if (value.trim().length === 0) {
      if (validationStatus !== 'neutral') {
        resetValidation();
      }
      return;
    }

    if (nextValidatorId === 'phone') {
      const digitsOnly = /^\d+$/.test(value);
      if (!digitsOnly) {
        setValidationStatus('error');
        setHelperText('Telefono invalido.');
        setHasValidated(true);
        return;
      }
      if (value.length === 9) {
        setValidationStatus('success');
        setHelperText('Correcto.');
        setHasValidated(true);
        return;
      }
      if (validationStatus !== 'neutral') {
        resetValidation();
      }
      return;
    }

    const validator = getValidatorById(nextValidatorId);
    const result = validator.validate(value);

    if (result.isValid) {
      setValidationStatus('success');
      setHelperText(result.message ?? 'Correcto.');
      setHasValidated(true);
      return;
    }

    if (validationStatus !== 'neutral') {
      resetValidation();
    }
  };

  const handlePlaygroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setPlaygroundValue(nextValue);
    applyLiveValidation(nextValue, validatorId);
  };

  const handleValidate = () => {
    const validator = getValidatorById(validatorId);
    const result = validator.validate(playgroundValue);
    setValidationStatus(result.isValid ? 'success' : 'error');
    setHelperText(result.message ?? (result.isValid ? 'Correcto.' : 'Valor invalido.'));
    setHasValidated(true);
  };

  const handleReset = () => {
    setPlaygroundValue('');
    setPlaygroundPlaceholder('Email');
    setShowLeftIcon(true);
    setShowRightIcon(true);
    setIsDisabled(false);
    setValidatorId('email');
    resetValidation();
  };

  const handleValidatorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextValidatorId = event.target.value;
    setValidatorId(nextValidatorId);
    setPlaygroundPlaceholder(
      nextValidatorId === 'email'
        ? 'Email'
        : nextValidatorId === 'phone'
          ? 'Telefono'
          : nextValidatorId === 'date'
            ? 'Fecha (YYYY-MM-DD)'
            : nextValidatorId === 'postal-code'
              ? 'Codigo postal'
              : 'Introduce un valor',
    );
    applyLiveValidation(playgroundValue, nextValidatorId);
  };

  const getLeftIcon = () => {
    if (!showLeftIcon) {
      return undefined;
    }
    if (validatorId === 'phone') {
      return <PhoneIcon />;
    }
    if (validatorId === 'date') {
      return <DateIcon />;
    }
    if (validatorId === 'postal-code') {
      return <ZipCodeIcon />;
    }
    return <EmailIcon />;
  };

  const getRightIcon = () => {
    if (!showRightIcon) {
      return undefined;
    }
    if (hasValidated && validationStatus === 'success') {
      return (
        <span className="text-[#00CC66]">
          <CheckIcon />
        </span>
      );
    }
    if (hasValidated && validationStatus === 'error') {
      return (
        <span className="text-[#e30000]">
          <XIcon />
        </span>
      );
    }
    return undefined;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4 items-start">
      <div className="rounded-lg border border-slate-200 p-4 space-y-4 bg-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Controles</p>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={showLeftIcon}
            onChange={e => setShowLeftIcon(e.target.checked)}
          />
          Icono izquierda
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={showRightIcon}
            onChange={e => setShowRightIcon(e.target.checked)}
          />
          Icono derecha
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={isDisabled}
            onChange={e => setIsDisabled(e.target.checked)}
          />
          Disabled
        </label>

        <label className="text-sm text-slate-600">
          Value
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={playgroundValue}
            onChange={handlePlaygroundChange}
            placeholder="Escribe un valor"
            disabled={isDisabled}
          />
        </label>

        <label className="text-sm text-slate-600">
          Placeholder
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={playgroundPlaceholder}
            onChange={e => setPlaygroundPlaceholder(e.target.value)}
            placeholder="Placeholder"
            disabled={isDisabled}
          />
        </label>

        <label className="text-sm text-slate-600">
          Tipo de validacion
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={validatorId}
            onChange={handleValidatorChange}
            disabled={isDisabled}
          >
            {validators.map(v => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleReset}
          className="w-full px-3 py-2 rounded border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
        >
          Reset
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 p-4 bg-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Preview</p>
        <div className="space-y-3">
          <Input
            placeholder={playgroundPlaceholder}
            value={playgroundValue}
            onChange={handlePlaygroundChange}
            disabled={isDisabled}
            iconLeft={getLeftIcon()}
            iconRight={getRightIcon()}
            error={hasValidated && validationStatus === 'error'}
            variant={hasValidated && validationStatus === 'success' ? 'success' : undefined}
            message={hasValidated ? helperText : neutralHelperText}
          />
          <Button type="button" onClick={handleValidate} disabled={isDisabled}>
            Validar
          </Button>
        </div>
      </div>
    </div>
  );
};

const TitleDemo = () => (
  <div className="space-y-4">
    <div className="grid gap-3 sm:grid-cols-2">
      {titleSizes.map(size => (
        <div key={size} className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Size
            {' '}
            {size}
          </p>
          <Title size={size} className="mt-1">
            Title
            {' '}
            {size.toUpperCase()}
          </Title>
        </div>
      ))}
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      {titleTones.map(tone => (
        <div key={tone} className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Tone
            {' '}
            {tone}
          </p>
          <Title size="lg" tone={tone}>
            KM0 Lab Title
          </Title>
        </div>
      ))}
      {titleAlignments.map(align => (
        <div key={align} className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Align
            {' '}
            {align}
          </p>
          <Title size="md" align={align} className="w-full">
            Alignment Test
          </Title>
        </div>
      ))}
    </div>
  </div>
);

const SubtitleDemo = () => (
  <div className="space-y-4">
    <div className="grid gap-3 sm:grid-cols-2">
      {subtitleSizes.map(size => (
        <div key={size} className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Size
            {' '}
            {size}
          </p>
          <Subtitle size={size} className="mt-1">
            Subtitle size
            {' '}
            {size}
          </Subtitle>
        </div>
      ))}
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      {subtitleTones.map(tone => (
        <div key={tone} className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Tone
            {' '}
            {tone}
          </p>
          <Subtitle size="md" tone={tone}>
            UI subtitle copy
          </Subtitle>
        </div>
      ))}
      {subtitleAlignments.map(align => (
        <div key={align} className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Align
            {' '}
            {align}
          </p>
          <Subtitle size="sm" align={align} className="w-full">
            Alignment sample text.
          </Subtitle>
        </div>
      ))}
    </div>
  </div>
);

const CardDemo = () => {
  const [withFooter, setWithFooter] = useState(true);
  const [title, setTitle] = useState('Card title');
  const [desc, setDesc] = useState('Descripción corta del card para testear layout.');

  return (
    <div className="space-y-3">
      <Card className="max-w-lg border-slate-200 shadow-sm">
        <CardHeader>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </div>
          <CardDescription data-slot="card-action">
            <Badge variant="secondary">UI</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-slate-700">
          Contenido libre para tarjetas, dashboards o layouts modulares.
        </CardContent>
        {withFooter && (
          <CardFooter className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Footer activo</span>
            <Button size="sm">Acción</Button>
          </CardFooter>
        )}
      </Card>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm text-slate-600">
          Título
          <input
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label className="text-sm text-slate-600 sm:col-span-2">
          Descripción
          <input
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={withFooter}
            onChange={e => setWithFooter(e.target.checked)}
          />
          Mostrar footer
        </label>
      </div>
    </div>
  );
};

const ProgressDemo = () => {
  const [value, setValue] = useState(45);

  return (
    <div className="space-y-3">
      <Progress value={value} />
      <label className="text-sm text-slate-600">
        Valor:
        {' '}
        <span className="font-semibold text-slate-800">
          {value}
          %
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="mt-2 block w-full accent-indigo-600"
        />
      </label>
    </div>
  );
};

const TabsDemo = () => {
  const [value, setValue] = useState('account');

  return (
    <div className="space-y-3">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="rounded-lg border border-slate-200 bg-white p-4">
          Datos de cuenta y perfil.
        </TabsContent>
        <TabsContent value="billing" className="rounded-lg border border-slate-200 bg-white p-4">
          Gestión de facturación y métodos de pago.
        </TabsContent>
        <TabsContent value="team" className="rounded-lg border border-slate-200 bg-white p-4">
          Roles y miembros del equipo.
        </TabsContent>
      </Tabs>
      <div className="text-xs text-slate-500">
        Valor actual:
        {' '}
        <span className="font-semibold text-slate-700">{value}</span>
      </div>
    </div>
  );
};

const SeparatorDemo = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <div className="text-sm text-slate-600">Horizontal</div>
      <Separator />
    </div>
    <div className="flex items-center gap-4">
      <div className="text-sm text-slate-600">Vertical</div>
      <div className="flex items-center gap-3">
        <span>A</span>
        <Separator orientation="vertical" className="h-6" />
        <span>B</span>
      </div>
    </div>
  </div>
);

const AppHeaderDemo = () => {
  const [alt, setAlt] = useState('KM0 LAB');
  return (
    <div className="space-y-3">
      <AppHeader logoAlt={alt} />
      <label className="text-sm text-slate-600">
        logoAlt
        <input
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          value={alt}
          onChange={e => setAlt(e.target.value)}
        />
      </label>
    </div>
  );
};

const MobileFrameDemo = () => (
  <MobileFrame>
    <div className="w-full rounded-xl bg-white p-4 shadow">
      <p className="text-sm text-slate-700">Content inside MobileFrame</p>
      <div className="mt-2 flex gap-2">
        <Badge variant="secondary">frame</Badge>
        <Badge>rounded</Badge>
      </div>
    </div>
  </MobileFrame>
);

const SimpleSliderNavigationDemo = () => {
  const [total, setTotal] = useState(5);
  const [current, setCurrent] = useState(2);
  const [layout, setLayout] = useState<'default' | 'compact'>('default');
  const [showDots, setShowDots] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const [arrowVariant, setArrowVariant] = useState<'ghost' | 'solid'>('ghost');
  const [dotsTone, setDotsTone] = useState<'default' | 'brand'>('default');

  const clamp = (value: number, totalSlides: number) => Math.max(0, Math.min(value, totalSlides - 1));
  const safeCurrent = clamp(current, total);

  return (
    <div className="space-y-3">
      <SimpleSliderNavigation
        totalSlides={total}
        currentSlide={safeCurrent}
        onPrev={() => setCurrent(prev => clamp(prev - 1, total))}
        onNext={() => setCurrent(prev => clamp(prev + 1, total))}
        onDotSelect={idx => setCurrent(clamp(idx, total))}
        layout={layout}
        showDots={showDots}
        showArrows={showArrows}
        arrowVariant={arrowVariant}
        dotsTone={dotsTone}
      />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm text-slate-600">
          Total slides
          <input
            type="number"
            min={1}
            max={10}
            value={total}
            onChange={(e) => {
              const nextTotal = Math.max(1, Number(e.target.value));
              setTotal(nextTotal);
              setCurrent(prev => clamp(prev, nextTotal));
            }}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Current
          <input
            type="number"
            min={0}
            max={total - 1}
            value={safeCurrent}
            onChange={e => setCurrent(clamp(Number(e.target.value), total))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Layout
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={layout}
            onChange={e => setLayout(e.target.value as 'default' | 'compact')}
          >
            <option value="default">default</option>
            <option value="compact">compact</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Arrow variant
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={arrowVariant}
            onChange={e => setArrowVariant(e.target.value as 'ghost' | 'solid')}
          >
            <option value="ghost">ghost</option>
            <option value="solid">solid</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Dots tone
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={dotsTone}
            onChange={e => setDotsTone(e.target.value as 'default' | 'brand')}
          >
            <option value="default">default</option>
            <option value="brand">brand</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={showDots}
            onChange={e => setShowDots(e.target.checked)}
          />
          Show dots
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={showArrows}
            onChange={e => setShowArrows(e.target.checked)}
          />
          Show arrows
        </label>
      </div>
    </div>
  );
};

const SliderDotsDemo = () => {
  const [total, setTotal] = useState(5);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [tone, setTone] = useState<'default' | 'brand'>('default');
  const [interactive, setInteractive] = useState(true);
  const clamp = (value: number) => Math.max(0, Math.min(value, total - 1));
  const safeCurrent = clamp(current);

  return (
    <div className="space-y-3">
      <SliderDots
        total={total}
        current={safeCurrent}
        size={size}
        tone={tone}
        onSelect={interactive ? idx => setCurrent(clamp(idx)) : undefined}
      />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm text-slate-600">
          Total
          <input
            type="number"
            min={2}
            max={10}
            value={total}
            onChange={(e) => {
              const nextTotal = Math.max(2, Number(e.target.value));
              setTotal(nextTotal);
              setCurrent(prev => Math.max(0, Math.min(prev, nextTotal - 1)));
            }}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Current
          <input
            type="number"
            min={0}
            max={total - 1}
            value={safeCurrent}
            onChange={e => setCurrent(clamp(Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Size
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={size}
            onChange={e => setSize(e.target.value as 'sm' | 'md')}
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Tone
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={tone}
            onChange={e => setTone(e.target.value as 'default' | 'brand')}
          >
            <option value="default">default</option>
            <option value="brand">brand</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={interactive}
            onChange={e => setInteractive(e.target.checked)}
          />
          Interactive
        </label>
      </div>
    </div>
  );
};

const SliderArrowButtonDemo = () => {
  const [index, setIndex] = useState(1);
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [variant, setVariant] = useState<'ghost' | 'solid'>('ghost');
  const [disabled, setDisabled] = useState(false);
  const maxIndex = 4;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
        <SliderArrowButton
          direction="prev"
          ariaLabel="Anterior"
          size={size}
          variant={variant}
          disabled={disabled || index <= 0}
          onClick={() => setIndex(prev => Math.max(0, prev - 1))}
        />
        <div className="text-sm font-semibold text-slate-800">
          Step
          {' '}
          {index + 1}
        </div>
        <SliderArrowButton
          direction="next"
          ariaLabel="Siguiente"
          size={size}
          variant={variant}
          disabled={disabled || index >= maxIndex}
          onClick={() => setIndex(prev => Math.min(maxIndex, prev + 1))}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm text-slate-600">
          Size
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={size}
            onChange={e => setSize(e.target.value as 'sm' | 'md')}
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Variant
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={variant}
            onChange={e => setVariant(e.target.value as 'ghost' | 'solid')}
          >
            <option value="ghost">ghost</option>
            <option value="solid">solid</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={disabled}
            onChange={e => setDisabled(e.target.checked)}
          />
          Disabled
        </label>
        <label className="text-sm text-slate-600 sm:col-span-2 lg:col-span-3">
          Step
          <input
            type="range"
            min={0}
            max={maxIndex}
            value={index}
            onChange={e => setIndex(Number(e.target.value))}
            className="mt-2 block w-full accent-indigo-600"
          />
        </label>
      </div>
    </div>
  );
};

const SliderCountDemo = () => {
  const [current, setCurrent] = useState(2);
  const [total, setTotal] = useState(5);
  const [label, setLabel] = useState('Skip');
  const [layout, setLayout] = useState<'default' | 'compact'>('default');
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [showAction, setShowAction] = useState(true);
  const safeCurrent = Math.min(Math.max(current, 0), total);

  return (
    <div className="space-y-3">
      <SliderCount
        current={safeCurrent}
        total={total}
        layout={layout}
        size={size}
        actionLabel={showAction ? label : undefined}
        onAction={showAction ? () => alert('Action clicked') : undefined}
      />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm text-slate-600">
          Current
          <input
            type="number"
            min={0}
            max={total}
            value={safeCurrent}
            onChange={e => setCurrent(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Total
          <input
            type="number"
            min={1}
            max={10}
            value={total}
            onChange={e => setTotal(Math.max(1, Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Layout
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={layout}
            onChange={e => setLayout(e.target.value as 'default' | 'compact')}
          >
            <option value="default">default</option>
            <option value="compact">compact</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Size
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={size}
            onChange={e => setSize(e.target.value as 'sm' | 'md')}
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Action label
          <input
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={showAction}
            onChange={e => setShowAction(e.target.checked)}
          />
          Show action
        </label>
      </div>
    </div>
  );
};

const carouselDemoSlides = [
  { id: 'demo-1', titleLine1: 'BIENVENIDO', titleLine2: 'A KM0', subtitle: 'Tu comercio local, más cerca.', imageSrc: '/images/glovo-style-welcome.png', bgColor: 'bg-km0-yellow-100', xpBadge: '+ 10 XP' },
  { id: 'demo-2', titleLine1: 'DESCUBRE', titleLine2: 'TIENDAS', subtitle: 'Explora los mejores productos.', imageSrc: '/images/glovo-style-discover.png', bgColor: 'bg-km0-blue-100', xpBadge: '+ 10 XP' },
  { id: 'demo-3', titleLine1: 'CONECTA', titleLine2: 'VECINOS', subtitle: 'Comunidad activa y solidaria.', imageSrc: '/images/glovo-style-connect.png', bgColor: 'bg-km0-coral-100', xpBadge: '+ 10 XP' },
];

const CarouselDemo = () => {
  const {
    currentIndex,
    dragOffset,
    isDragging,
    next,
    prev,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  } = useCarousel({ totalSlides: carouselDemoSlides.length });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Carousel interactivo (drag/swipe)
        </p>
        <div className="rounded-xl bg-gradient-white-beige p-4">
          <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md">
            <CarouselViewport
              className="h-64"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              ariaLabel="Demo carousel"
            >
              <CarouselTrack
                currentIndex={currentIndex}
                dragOffset={dragOffset}
                isDragging={isDragging}
              >
                {carouselDemoSlides.map((slide, index) => (
                  <CarouselSlide
                    key={slide.id}
                    slideId={slide.id}
                    isActive={index === currentIndex}
                    layout="stack"
                    className="p-4"
                  >
                    <div className={`rounded-lg ${slide.bgColor} p-3`}>
                      <img
                        src={slide.imageSrc}
                        alt={slide.titleLine1}
                        className="mx-auto h-24 object-contain"
                        draggable={false}
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <h3 className="font-brand text-lg font-bold">
                        {slide.titleLine1}
                        {' '}
                        {slide.titleLine2}
                      </h3>
                      <p className="text-sm text-slate-500">{slide.subtitle}</p>
                    </div>
                  </CarouselSlide>
                ))}
              </CarouselTrack>
            </CarouselViewport>
            <div className="flex items-center justify-center gap-4 border-t border-slate-100 p-3">
              <button
                type="button"
                onClick={prev}
                disabled={currentIndex === 0}
                className="rounded bg-slate-100 px-3 py-1 text-sm disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm font-semibold">
                {currentIndex + 1}
                /
                {carouselDemoSlides.length}
              </span>
              <button
                type="button"
                onClick={next}
                disabled={currentIndex === carouselDemoSlides.length - 1}
                className="rounded bg-slate-100 px-3 py-1 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSlideDemo = () => {
  const [layout, setLayout] = useState<'stack' | 'side'>('stack');

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm text-slate-600">
          Layout
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={layout}
            onChange={e => setLayout(e.target.value as 'stack' | 'side')}
          >
            <option value="stack">stack (vertical - default)</option>
            <option value="side">side (horizontal - forzado)</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Layout:
          {' '}
          {layout}
        </p>
        <div
          className={`flex rounded-xl bg-gradient-white-beige p-4 ${
            layout === 'side' ? 'flex-row items-start gap-6' : 'flex-col items-center'
          }`}
        >
          <HeroSlide
            title={(
              <>
                BIENVENIDO
                {' '}
                <span className="text-km0-blue-700">A KM0 LAB</span>
              </>
            )}
            subtitle="Tu comercio local, más cerca que nunca. Descubre una nueva forma de interactuar con tus vecinos."
            imageSrc="/images/glovo-style-welcome.png"
            badgeText="+ 10 XP"
            bgColor="bg-km0-yellow-100"
            layout={layout}
          />
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
        El layout
        {' '}
        <code>stack</code>
        {' '}
        cambia automáticamente a horizontal (side) en
        {' '}
        <code>landscape</code>
        {' '}
        (orientation: landscape). Esto aplica tanto en móvil landscape como en desktop apaisado.
      </div>
    </div>
  );
};

const MediaFrameDemo = () => {
  const [layout, setLayout] = useState<'stack' | 'side'>('stack');
  const [bgColor, setBgColor] = useState('bg-km0-yellow-100');
  const [showBadge, setShowBadge] = useState(true);

  const bgOptions = [
    { value: 'bg-km0-yellow-100', label: 'Yellow' },
    { value: 'bg-km0-blue-100', label: 'Blue' },
    { value: 'bg-km0-coral-100', label: 'Coral' },
    { value: 'bg-km0-success-100', label: 'Success' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="text-sm text-slate-600">
          Layout
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={layout}
            onChange={e => setLayout(e.target.value as 'stack' | 'side')}
          >
            <option value="stack">stack</option>
            <option value="side">side</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Background
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={bgColor}
            onChange={e => setBgColor(e.target.value)}
          >
            {bgOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={showBadge}
            onChange={e => setShowBadge(e.target.checked)}
          />
          Show badge
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="mx-auto max-w-xs">
          <MediaFrame
            src="/images/glovo-style-discover.png"
            alt="Demo image"
            badgeText={showBadge ? '+ 10 XP' : undefined}
            layout={layout}
            className={bgColor}
          />
        </div>
      </div>
    </div>
  );
};

const ContentCardDemo = () => {
  const [scale, setScale] = useState<'sm' | 'md' | 'lg'>('md');
  const [as, setAs] = useState<'section' | 'div' | 'article' | 'aside'>('section');

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm text-slate-600">
          Escala
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={scale}
            onChange={e => setScale(e.target.value as 'sm' | 'md' | 'lg')}
          >
            <option value="sm">sm (pequeño)</option>
            <option value="md">md (mediano)</option>
            <option value="lg">lg (grande)</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Elemento HTML
          <select
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={as}
            onChange={e => setAs(e.target.value as 'section' | 'div' | 'article' | 'aside')}
          >
            <option value="section">section</option>
            <option value="div">div</option>
            <option value="article">article</option>
            <option value="aside">aside</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-gradient-white-beige p-4">
        <div className="mx-auto max-w-2xl">
          <ContentCard scale={scale} as={as}>
            <div className="flex flex-col gap-4">
              <Title size="h2">Título de ejemplo</Title>
              <Subtitle size="md">
                Este es un ejemplo de ContentCard con escala
                {' '}
                {scale}
                {' '}
                y elemento
                {' '}
                {as}
                .
              </Subtitle>
              <div className="rounded-lg bg-km0-blue-50 p-4">
                <p className="text-sm text-slate-700">
                  El componente ContentCard proporciona un contenedor con estilos responsivos,
                  sombra personalizada y variantes de escala para diferentes contextos.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Reutilizable</Badge>
                <Badge variant="secondary">Responsive</Badge>
                <Badge variant="secondary">Flexible</Badge>
              </div>
            </div>
          </ContentCard>
        </div>
      </div>
    </div>
  );
};

const ChatKitDemo = () => (
  <div className="space-y-2">
    <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs text-indigo-900">
      Requiere endpoint
      {' '}
      <code>/api/chatkit/session</code>
      . El componente maneja loading y error internamente.
    </div>
    <ChatKitComponent className="w-full" />
  </div>
);

const FilesListDemo = () => (
  <div className="space-y-2">
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
      Llama a
      {' '}
      <code>/api/files/list</code>
      . Si no hay backend, mostrará el estado de error controlado.
    </div>
    <FilesList />
  </div>
);

const BreakpointIndicatorDemo = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          checked={show}
          onChange={e => setShow(e.target.checked)}
        />
        Mostrar overlay (solo visible en dev)
      </label>
      {show && <BreakpointIndicator />}
    </div>
  );
};

const OnboardingScreenDemo = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <OnboardingScreen />
  </div>
);

const WelcomeOnboardingDemo = () => (
  <div className="max-h-[520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="max-h-[520px] overflow-y-auto">
      <WelcomeOnboarding />
    </div>
  </div>
);

const ColorGuideDemo = () => (
  <div className="max-h-[520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="max-h-[520px] overflow-y-auto">
      <ColorPaletteGuide />
    </div>
  </div>
);

const DesignSystemShowcaseDemo = () => (
  <div className="max-h-[520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="max-h-[520px] overflow-y-auto">
      <DesignSystemShowcase />
    </div>
  </div>
);

const CounterFormDemo = () => (
  <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="text-xs text-slate-500">
      Usa
      {' '}
      <code>/api/counter</code>
      {' '}
      y next-intl. Útil para probar formularios con zod y react-hook-form.
    </div>
    <CounterForm />
  </div>
);

const LocaleSwitcherDemo = () => (
  <div className="space-y-2">
    <p className="text-sm text-slate-600">
      Cambia la URL respetando
      {' '}
      <code>localePrefix</code>
      .
    </p>
    <LocaleSwitcher />
  </div>
);

const SafeHydrationDemo = () => (
  <SafeHydration>
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
      Renderizado solo en cliente (evita hydration mismatch).
    </div>
  </SafeHydration>
);

const SlideDemo = () => (
  <div className="max-w-lg">
    <Slide
      title={<span className="font-bold">KM0 Drop</span>}
      subtitle="Descubre lo nuevo cerca de ti"
      imageSrc="/images/glovo-style-discover.png"
      xp={25}
      logoSrc="/assets/images/nextjs-boilerplate-saas.png"
    />
  </div>
);

const SponsorsDemo = () => (
  <div className="overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
    <Sponsors />
  </div>
);

const XPBadgeDemo = () => {
  const [points, setPoints] = useState(120);
  return (
    <div className="space-y-2">
      <XPBadge points={points} />
      <label className="text-sm text-slate-600">
        Puntos
        <input
          type="number"
          min={0}
          max={9999}
          value={points}
          onChange={e => setPoints(Number(e.target.value))}
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
        />
      </label>
    </div>
  );
};

// Demos y listado completo abajo.
export const componentRegistry: ComponentEntry[] = [
  {
    id: 'badge',
    title: 'Badge',
    description: 'Píldoras con variantes para etiquetas y estados.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/badge.tsx',
    importPath: '@/components/ui/primitives/badge',
    exportName: 'Badge',
    exportType: 'named',
    Component: Badge,
    Demo: BadgeDemo,
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Botón accesible con variantes y tamaños.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/button.tsx',
    importPath: '@/components/ui/primitives/button',
    exportName: 'Button',
    exportType: 'named',
    Component: Button,
    Demo: ButtonDemo,
  },
  {
    id: 'input',
    title: 'Input',
    description: 'Campo de entrada con variantes, iconos y mensajes de validación.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/input/input.tsx',
    importPath: '@/components/ui/primitives/input',
    exportName: 'Input',
    exportType: 'named',
    Component: Input,
    Demo: InputDemo,
    notes: ['Incluye iconos: EmailIcon, PhoneIcon, DateIcon, ZipCodeIcon, CheckIcon, XIcon, ChevronDownIcon.'],
  },
  {
    id: 'title',
    title: 'Title',
    description: 'Heading brand con variantes de tamaИo, tono y alineaciИn.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/title/title.tsx',
    importPath: '@/components/ui/primitives/title',
    exportName: 'Title',
    exportType: 'named',
    Component: Title,
    Demo: TitleDemo,
  },
  {
    id: 'subtitle',
    title: 'Subtitle',
    description: 'Texto auxiliar para UI con escala tipogrИfica responsive.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/subtitle/subtitle.tsx',
    importPath: '@/components/ui/primitives/subtitle',
    exportName: 'Subtitle',
    exportType: 'named',
    Component: Subtitle,
    Demo: SubtitleDemo,
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Layout de tarjeta con header/content/footer.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/card.tsx',
    importPath: '@/components/ui/primitives/card',
    exportName: 'Card',
    exportType: 'named',
    Component: Card,
    Demo: CardDemo,
    notes: ['Incluye CardHeader, CardContent, CardFooter, CardDescription, CardAction.'],
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Barra de progreso basada en Radix.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/progress.tsx',
    importPath: '@/components/ui/primitives/progress',
    exportName: 'Progress',
    exportType: 'named',
    Component: Progress,
    Demo: ProgressDemo,
  },
  {
    id: 'separator',
    title: 'Separator',
    description: 'Separador horizontal/vertical.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/separator.tsx',
    importPath: '@/components/ui/primitives/separator',
    exportName: 'Separator',
    exportType: 'named',
    Component: Separator,
    Demo: SeparatorDemo,
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Pestañas Radix con triggers y contenido.',
    group: 'ui',
    filePath: 'src/components/ui/primitives/tabs.tsx',
    importPath: '@/components/ui/primitives/tabs',
    exportName: 'Tabs',
    exportType: 'named',
    Component: Tabs,
    Demo: TabsDemo,
    notes: ['Incluye TabsList, TabsTrigger y TabsContent.'],
  },
  {
    id: 'app-header',
    title: 'AppHeader',
    description: 'Header con logo centrado.',
    group: 'ui',
    filePath: 'src/components/ui/layout/AppHeader.tsx',
    importPath: '@/components/ui/layout/AppHeader',
    exportName: 'AppHeader',
    exportType: 'named',
    Component: AppHeader,
    Demo: AppHeaderDemo,
  },
  {
    id: 'mobile-frame',
    title: 'MobileFrame',
    description: 'Contenedor estilo frame móvil.',
    group: 'ui',
    filePath: 'src/components/ui/layout/MobileFrame.tsx',
    importPath: '@/components/ui/layout/MobileFrame',
    exportName: 'MobileFrame',
    exportType: 'named',
    Component: MobileFrame,
    Demo: MobileFrameDemo,
  },
  {
    id: 'status-bar',
    title: 'StatusBar',
    description: 'Mock de status bar iOS.',
    group: 'ui',
    filePath: 'src/components/ui/layout/StatusBar.tsx',
    importPath: '@/components/ui/layout/StatusBar',
    exportName: 'StatusBar',
    exportType: 'named',
    Component: StatusBar,
  },
  {
    id: 'slider-arrow-button',
    title: 'SliderArrowButton',
    description: 'Arrow button for slider navigation.',
    group: 'ui',
    filePath: 'src/components/ui/slider/slider-arrow-button/slider-arrow-button.tsx',
    importPath: '@/components/ui/slider',
    exportName: 'SliderArrowButton',
    exportType: 'named',
    Component: SliderArrowButton,
    Demo: SliderArrowButtonDemo,
  },
  {
    id: 'slider-dots',
    title: 'SliderDots',
    description: 'Dot indicators for slider progress.',
    group: 'ui',
    filePath: 'src/components/ui/slider/slider-dots/slider-dots.tsx',
    importPath: '@/components/ui/slider',
    exportName: 'SliderDots',
    exportType: 'named',
    Component: SliderDots,
    Demo: SliderDotsDemo,
  },
  {
    id: 'simple-slider-navigation',
    title: 'SimpleSliderNavigation',
    description: 'Slider navigation with arrows and dots.',
    group: 'ui',
    filePath: 'src/components/ui/slider/simple-slider-navigation/simple-slider-navigation.tsx',
    importPath: '@/components/ui/slider',
    exportName: 'SimpleSliderNavigation',
    exportType: 'named',
    Component: SimpleSliderNavigation,
    Demo: SimpleSliderNavigationDemo,
  },
  {
    id: 'slider-count',
    title: 'SliderCount',
    description: 'Current/total counter with optional action.',
    group: 'ui',
    filePath: 'src/components/ui/slider/slider-count/slider-count.tsx',
    importPath: '@/components/ui/slider',
    exportName: 'SliderCount',
    exportType: 'named',
    Component: SliderCount,
    Demo: SliderCountDemo,
  },
  {
    id: 'carousel',
    title: 'Carousel',
    description: 'Carrusel genérico con drag/swipe. Incluye Viewport, Track y Slide.',
    group: 'ui',
    filePath: 'src/components/ui/carousel/index.ts',
    importPath: '@/components/ui/carousel',
    exportName: 'CarouselViewport',
    exportType: 'named',
    Component: CarouselViewport,
    Demo: CarouselDemo,
    notes: [
      'Usa useCarousel hook para lógica de eventos.',
      'CarouselSlide soporta layouts: stack (vertical) y side (horizontal).',
      'El layout side se activa en laptop-short para evitar scroll.',
    ],
  },
  {
    id: 'hero-slide',
    title: 'HeroSlide',
    description: 'Slide hero con imagen enmarcada y título/subtítulo. Layout stack por defecto, cambia a side automáticamente en landscape (orientation: landscape) vía CSS.',
    group: 'ui',
    filePath: 'src/components/ui/hero-slide/hero-slide.tsx',
    importPath: '@/components/ui/hero-slide',
    exportName: 'HeroSlide',
    exportType: 'named',
    Component: HeroSlide,
    Demo: HeroSlideDemo,
    notes: [
      'Layout stack: imagen arriba, texto abajo (default en portrait).',
      'En landscape, stack se convierte automáticamente en horizontal (imagen izquierda, texto derecha).',
      'Layout side: fuerza siempre horizontal, independientemente de la orientación.',
    ],
  },
  {
    id: 'media-frame',
    title: 'MediaFrame',
    description: 'Frame de imagen con fondo de color y badge XP opcional.',
    group: 'ui',
    filePath: 'src/components/ui/media-frame/media-frame.tsx',
    importPath: '@/components/ui/media-frame',
    exportName: 'MediaFrame',
    exportType: 'named',
    Component: MediaFrame,
    Demo: MediaFrameDemo,
    notes: [
      'Soporta diferentes colores de fondo vía bgColor prop.',
      'Badge opcional para mostrar XP u otro texto.',
    ],
  },
  {
    id: 'content-card',
    title: 'ContentCard',
    description: 'Tarjeta de contenido genérica con estilos responsivos, sombra y variantes de escala.',
    group: 'ui',
    filePath: 'src/components/ui/content-card/content-card.tsx',
    importPath: '@/components/ui/content-card',
    exportName: 'ContentCard',
    exportType: 'named',
    Component: ContentCard,
    Demo: ContentCardDemo,
    notes: [
      'Variantes de escala (sm, md, lg) con padding y max-width responsivos usando clamp().',
      'Soporta diferentes elementos HTML (section, div, article, aside).',
      'Incluye sombra km0-card-shadow y fondo blanco por defecto.',
    ],
  },
  {
    id: 'chatkit',
    title: 'ChatKit',
    description: 'Cliente UI para ChatKit (OpenAI).',
    group: 'features',
    filePath: 'src/components/chat/ChatKit/ChatKit.tsx',
    importPath: '@/components/chat/ChatKit/ChatKit',
    exportType: 'default',
    exportName: 'ChatKit',
    Component: ChatKitComponent,
    Demo: ChatKitDemo,
    notes: ['Requiere endpoint /api/chatkit/session.'],
  },
  {
    id: 'breakpoint-indicator',
    title: 'BreakpointIndicator',
    description: 'Overlay dev que muestra breakpoint actual.',
    group: 'features',
    filePath: 'src/components/devtools/BreakpointIndicator.tsx',
    importPath: '@/components/devtools/BreakpointIndicator',
    exportType: 'default',
    exportName: 'BreakpointIndicator',
    Component: BreakpointIndicator,
    Demo: BreakpointIndicatorDemo,
  },
  {
    id: 'files-list',
    title: 'FilesList',
    description: 'Listado de ficheros OpenAI con acciones básicas.',
    group: 'features',
    filePath: 'src/components/files/FilesList/FilesList.tsx',
    importPath: '@/components/files/FilesList/FilesList',
    exportType: 'default',
    exportName: 'FilesList',
    Component: FilesList,
    Demo: FilesListDemo,
    notes: ['Llama a /api/files/list y muestra errores manejados si no hay backend.'],
  },
  {
    id: 'onboarding-screen',
    title: 'Onboarding (App)',
    description: 'Onboarding estilo app móvil con slider.',
    group: 'screens',
    filePath: 'src/components/screens/onboarding/Onboarding.tsx',
    importPath: '@/components/screens/onboarding/Onboarding',
    exportType: 'default',
    exportName: 'Onboarding',
    Component: OnboardingScreen,
    Demo: OnboardingScreenDemo,
  },
  {
    id: 'welcome-onboarding',
    title: 'Onboarding (Welcome)',
    description: 'Onboarding alternativo con scroll interno.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/Onboarding.tsx',
    importPath: '@/components/screens/welcome/Onboarding',
    exportType: 'default',
    exportName: 'Onboarding',
    Component: WelcomeOnboarding,
    Demo: WelcomeOnboardingDemo,
  },
  {
    id: 'colour-guide',
    title: 'Colour Palette Guide',
    description: 'Guía de colores KM0 con escalas completas.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/Colour.tsx',
    importPath: '@/components/screens/welcome/Colour',
    exportType: 'default',
    exportName: 'Colour',
    Component: ColorPaletteGuide,
    Demo: ColorGuideDemo,
  },
  {
    id: 'design-system-showcase',
    title: 'DesignSystemShowcase',
    description: 'Showcase tipográfico y de estilos.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/DesignSystemShowcase.tsx',
    importPath: '@/components/screens/welcome/DesignSystemShowcase',
    exportType: 'default',
    exportName: 'DesignSystemShowcase',
    Component: DesignSystemShowcase,
    Demo: DesignSystemShowcaseDemo,
  },
  {
    id: 'counter-form',
    title: 'CounterForm',
    description: 'Formulario con react-hook-form + zod.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/CounterForm.tsx',
    importPath: '@/components/screens/welcome/CounterForm',
    exportType: 'named',
    exportName: 'CounterForm',
    Component: CounterForm,
    Demo: CounterFormDemo,
  },
  {
    id: 'current-count',
    title: 'CurrentCount',
    description: 'Server component que lee contador en DB.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/CurrentCount.tsx',
    importPath: '@/components/screens/welcome/CurrentCount',
    exportType: 'named',
    exportName: 'CurrentCount',
    Demo: () => <ServerOnlyNotice label="CurrentCount" />,
    notes: ['Server component. No se renderiza en cliente.'],
  },
  {
    id: 'hello',
    title: 'Hello',
    description: 'Server component con Clerk y next-intl.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/Hello.tsx',
    importPath: '@/components/screens/welcome/Hello',
    exportType: 'named',
    exportName: 'Hello',
    Demo: () => <ServerOnlyNotice label="Hello" />,
    notes: ['Server component con currentUser y next-intl.'],
  },
  {
    id: 'locale-switcher',
    title: 'LocaleSwitcher',
    description: 'Selector de idioma usando next-intl navigation.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/LocaleSwitcher.tsx',
    importPath: '@/components/screens/welcome/LocaleSwitcher',
    exportType: 'named',
    exportName: 'LocaleSwitcher',
    Component: LocaleSwitcher,
    Demo: LocaleSwitcherDemo,
  },
  {
    id: 'safe-hydration',
    title: 'SafeHydration',
    description: 'Renderiza niños solo en cliente para evitar mismatch.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/SafeHydration.tsx',
    importPath: '@/components/screens/welcome/SafeHydration',
    exportType: 'default',
    exportName: 'SafeHydration',
    Component: SafeHydration,
    Demo: SafeHydrationDemo,
  },
  {
    id: 'slide',
    title: 'Slide',
    description: 'Slide con imagen y badge de XP.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/Slide.tsx',
    importPath: '@/components/screens/welcome/Slide',
    exportType: 'default',
    exportName: 'Slide',
    Component: Slide,
    Demo: SlideDemo,
  },
  {
    id: 'sponsors',
    title: 'Sponsors',
    description: 'Tabla de sponsors con Next/Image.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/Sponsors.tsx',
    importPath: '@/components/screens/welcome/Sponsors',
    exportType: 'named',
    exportName: 'Sponsors',
    Component: Sponsors,
    Demo: SponsorsDemo,
  },
  {
    id: 'xp-badge',
    title: 'XPBadge',
    description: 'Badge de puntos gamificado.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/XPBadge.tsx',
    importPath: '@/components/screens/welcome/XPBadge',
    exportType: 'named',
    exportName: 'XPBadge',
    Component: XPBadge,
    Demo: XPBadgeDemo,
  },
  {
    id: 'demo-banner',
    title: 'DemoBanner',
    description: 'Banner fijo con CTA a auth.',
    group: 'screens',
    filePath: 'src/components/screens/welcome/DemoBanner.tsx',
    importPath: '@/components/screens/welcome/DemoBanner',
    exportType: 'named',
    exportName: 'DemoBanner',
    Component: DemoBanner,
    Demo: DemoBanner,
  },
];
