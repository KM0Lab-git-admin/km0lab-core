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
import { AppHeader } from '@/components/ui/layout/AppHeader';
import { MobileFrame } from '@/components/ui/layout/MobileFrame';
import { StatusBar } from '@/components/ui/layout/StatusBar';
import { Badge } from '@/components/ui/primitives/badge';
import { Button } from '@/components/ui/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/primitives/card';
import { CheckIcon, DateIcon, EmailIcon, Input, PhoneIcon, XIcon, ZipCodeIcon } from '@/components/ui/primitives/input';
import { Progress } from '@/components/ui/primitives/progress';
import { Separator } from '@/components/ui/primitives/separator';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/primitives/tabs';
import { Title } from '@/components/ui/primitives/title';
import { NavigationArrow } from '@/components/ui/slider/NavigationArrow';
import ProgressDots from '@/components/ui/slider/ProgressDots';
import { ProgressIndicator } from '@/components/ui/slider/ProgressIndicator';
import { SimpleSliderNavigation } from '@/components/ui/slider/SimpleSliderNavigation';
import { SlideIndicators } from '@/components/ui/slider/SlideIndicators';
import Slider from '@/components/ui/slider/Slider';
import SliderCount from '@/components/ui/slider/SliderCount';
import SliderNavigation from '@/components/ui/slider/SliderNavigation';
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

const SliderDemo = () => {
  const [title, setTitle] = useState('Demo slide title');
  const [current, setCurrent] = useState(2);
  const [total, setTotal] = useState(5);

  const safeCurrent = Math.min(current, total);

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Slider
          title={title}
          description="Cambia props desde los controles para ver el estado del slider."
          current={safeCurrent}
          total={total}
          onSkip={() => alert('Skip pressed')}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="text-sm text-slate-600 sm:col-span-2">
          Título
          <input
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label className="text-sm text-slate-600">
          Total slides
          <input
            type="number"
            min={1}
            max={8}
            value={total}
            onChange={e => setTotal(Math.max(1, Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Slide actual
          <input
            type="number"
            min={0}
            max={total}
            value={safeCurrent}
            onChange={e => setCurrent(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
      </div>
    </div>
  );
};

const SliderNavigationDemo = () => {
  const [total, setTotal] = useState(5);
  const [current, setCurrent] = useState(0);

  const clamp = (value: number) => Math.max(0, Math.min(value, total - 1));

  return (
    <div className="space-y-3">
      <SliderNavigation
        totalSlides={total}
        currentSlide={current}
        onPrevious={() => setCurrent(prev => clamp(prev - 1))}
        onNext={() => setCurrent(prev => clamp(prev + 1))}
        onSlideSelect={idx => setCurrent(clamp(idx))}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm text-slate-600">
          Slides
          <input
            type="number"
            min={2}
            max={10}
            value={total}
            onChange={e => setTotal(Math.max(2, Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Actual
          <input
            type="number"
            min={0}
            max={total - 1}
            value={current}
            onChange={e => setCurrent(clamp(Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
      </div>
    </div>
  );
};

const SimpleSliderNavigationDemo = () => {
  const [total] = useState(4);
  const [current, setCurrent] = useState(1);

  const clamp = (value: number) => Math.max(0, Math.min(value, total - 1));

  return (
    <div className="space-y-3">
      <SimpleSliderNavigation
        totalSlides={total}
        currentSlide={current}
        onPrev={() => setCurrent(prev => clamp(prev - 1))}
        onNext={() => setCurrent(prev => clamp(prev + 1))}
      />
      <div className="text-xs text-slate-600">
        Slide:
        {' '}
        <span className="font-semibold text-slate-800">{current + 1}</span>
        /
        {total}
      </div>
    </div>
  );
};

const SlideIndicatorsDemo = () => {
  const [total, setTotal] = useState(6);
  const [current, setCurrent] = useState(2);
  const clamp = (value: number) => Math.max(0, Math.min(value, total - 1));

  return (
    <div className="space-y-3">
      <SlideIndicators totalSlides={total} currentSlide={current} />
      <label className="text-sm text-slate-600">
        Slide actual
        <input
          type="range"
          min={0}
          max={total - 1}
          value={current}
          onChange={e => setCurrent(clamp(Number(e.target.value)))}
          className="mt-2 block w-full accent-indigo-600"
        />
      </label>
      <label className="text-sm text-slate-600">
        Total
        <input
          type="number"
          min={2}
          max={10}
          value={total}
          onChange={e => setTotal(Math.max(2, Number(e.target.value)))}
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
        />
      </label>
    </div>
  );
};

const ProgressDotsDemo = () => {
  const [total, setTotal] = useState(5);
  const [current, setCurrent] = useState(1);
  const clamp = (value: number) => Math.max(0, Math.min(value, total - 1));

  return (
    <div className="space-y-3">
      <ProgressDots total={total} current={current} />
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm text-slate-600">
          Total
          <input
            type="number"
            min={2}
            max={10}
            value={total}
            onChange={e => setTotal(Math.max(2, Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Actual
          <input
            type="number"
            min={0}
            max={total - 1}
            value={current}
            onChange={e => setCurrent(clamp(Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
      </div>
    </div>
  );
};

const ProgressIndicatorDemo = () => {
  const [total, setTotal] = useState(4);
  const [current, setCurrent] = useState(0);
  const [chevrons, setChevrons] = useState(true);
  const clamp = (value: number) => Math.max(0, Math.min(value, total - 1));

  return (
    <div className="space-y-3">
      <ProgressIndicator
        total={total}
        current={current}
        showChevrons={chevrons}
        onPrevious={() => setCurrent(prev => clamp(prev - 1))}
        onNext={() => setCurrent(prev => clamp(prev + 1))}
      />
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="text-sm text-slate-600">
          Total
          <input
            type="number"
            min={2}
            max={10}
            value={total}
            onChange={e => setTotal(Math.max(2, Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="text-sm text-slate-600">
          Actual
          <input
            type="number"
            min={0}
            max={total - 1}
            value={current}
            onChange={e => setCurrent(clamp(Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            checked={chevrons}
            onChange={e => setChevrons(e.target.checked)}
          />
          Mostrar flechas
        </label>
      </div>
    </div>
  );
};

const NavigationArrowDemo = () => {
  const [index, setIndex] = useState(1);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
        <NavigationArrow
          direction="prev"
          ariaLabel="Anterior"
          disabled={index <= 0}
          onClick={() => setIndex(prev => Math.max(0, prev - 1))}
        />
        <div className="text-sm font-semibold text-slate-800">
          Paso
          {' '}
          {index + 1}
        </div>
        <NavigationArrow
          direction="next"
          ariaLabel="Siguiente"
          disabled={index >= 4}
          onClick={() => setIndex(prev => Math.min(4, prev + 1))}
        />
      </div>
      <label className="text-sm text-slate-600">
        Ajustar paso
        <input
          type="range"
          min={0}
          max={4}
          value={index}
          onChange={e => setIndex(Number(e.target.value))}
          className="mt-2 block w-full accent-indigo-600"
        />
      </label>
    </div>
  );
};

const SliderCountDemo = () => {
  const [current, setCurrent] = useState(2);
  const [total, setTotal] = useState(5);
  const [label, setLabel] = useState('SALTAR');

  return (
    <div className="space-y-3">
      <SliderCount
        current={current}
        total={total}
        skipText={label}
        onSkip={() => alert('Skip clicked')}
      />
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="text-sm text-slate-600">
          Actual
          <input
            type="number"
            min={0}
            max={total}
            value={current}
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
          Texto skip
          <input
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </label>
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
    id: 'navigation-arrow',
    title: 'NavigationArrow',
    description: 'Flechas accesibles para sliders.',
    group: 'ui',
    filePath: 'src/components/ui/slider/NavigationArrow.tsx',
    importPath: '@/components/ui/slider/NavigationArrow',
    exportName: 'NavigationArrow',
    exportType: 'named',
    Component: NavigationArrow,
    Demo: NavigationArrowDemo,
  },
  {
    id: 'progress-dots',
    title: 'ProgressDots',
    description: 'Indicadores de progreso por puntos.',
    group: 'ui',
    filePath: 'src/components/ui/slider/ProgressDots.tsx',
    importPath: '@/components/ui/slider/ProgressDots',
    exportType: 'default',
    exportName: 'ProgressDots',
    Component: ProgressDots,
    Demo: ProgressDotsDemo,
  },
  {
    id: 'progress-indicator',
    title: 'ProgressIndicator',
    description: 'Indicador de barra para slides/steps.',
    group: 'ui',
    filePath: 'src/components/ui/slider/ProgressIndicator.tsx',
    importPath: '@/components/ui/slider/ProgressIndicator',
    exportName: 'ProgressIndicator',
    exportType: 'named',
    Component: ProgressIndicator,
    Demo: ProgressIndicatorDemo,
  },
  {
    id: 'simple-slider-navigation',
    title: 'SimpleSliderNavigation',
    description: 'Navegación básica de slider con dots.',
    group: 'ui',
    filePath: 'src/components/ui/slider/SimpleSliderNavigation.tsx',
    importPath: '@/components/ui/slider/SimpleSliderNavigation',
    exportName: 'SimpleSliderNavigation',
    exportType: 'named',
    Component: SimpleSliderNavigation,
    Demo: SimpleSliderNavigationDemo,
  },
  {
    id: 'slide-indicators',
    title: 'SlideIndicators',
    description: 'Indicadores gruesos para carrusel.',
    group: 'ui',
    filePath: 'src/components/ui/slider/SlideIndicators.tsx',
    importPath: '@/components/ui/slider/SlideIndicators',
    exportName: 'SlideIndicators',
    exportType: 'named',
    Component: SlideIndicators,
    Demo: SlideIndicatorsDemo,
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'Hero slider con navegación simple.',
    group: 'ui',
    filePath: 'src/components/ui/slider/Slider.tsx',
    importPath: '@/components/ui/slider/Slider',
    exportType: 'default',
    exportName: 'Slider',
    Component: Slider,
    Demo: SliderDemo,
  },
  {
    id: 'slider-count',
    title: 'SliderCount',
    description: 'Contador + CTA de saltar.',
    group: 'ui',
    filePath: 'src/components/ui/slider/SliderCount.tsx',
    importPath: '@/components/ui/slider/SliderCount',
    exportType: 'default',
    exportName: 'SliderCount',
    Component: SliderCount,
    Demo: SliderCountDemo,
  },
  {
    id: 'slider-navigation',
    title: 'SliderNavigation',
    description: 'Navegación completa con dots y flechas.',
    group: 'ui',
    filePath: 'src/components/ui/slider/SliderNavigation.tsx',
    importPath: '@/components/ui/slider/SliderNavigation',
    exportType: 'default',
    exportName: 'SliderNavigation',
    Component: SliderNavigation,
    Demo: SliderNavigationDemo,
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
