'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, MapPin, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { Logo } from '@/components/ui/logo';
import { ContentShell } from '@/components/ui/content-shell';
import { cn } from '@/components/ui/primitives/utils';
import { checkPostalCodeAvailability } from './checkPostalCodeAvailability';
import { getValidatorById } from '@/validation/validators';

type AvailabilityStatus = 'idle' | 'checking' | 'available' | 'unavailable';

export default function PostalCode() {
  const t = useTranslations('PostalCode');
  const router = useRouter();
  const params = useParams();
  const inputId = useId();

  const [postalCode, setPostalCode] = useState('');
  const [availabilityStatus, setAvailabilityStatus] =
    useState<AvailabilityStatus>('idle');
  const [cityName, setCityName] = useState<string | null>(null);

  const latestRequestIdRef = useRef(0);

  const trimmedPostalCode = postalCode.trim();
  const hasValue = trimmedPostalCode.length > 0;

  const postalCodeValidator = useMemo(
    () => getValidatorById('postal-code'),
    [],
  );
  const formatValidation = useMemo(
    () => postalCodeValidator.validate(postalCode),
    [postalCode, postalCodeValidator],
  );

  const localeParam = params?.locale;
  const locale = typeof localeParam === 'string' ? localeParam : localeParam?.[0];

  useEffect(() => {
    if (!hasValue) {
      setAvailabilityStatus('idle');
      setCityName(null);
      return;
    }

    if (!formatValidation.isValid) {
      setAvailabilityStatus('idle');
      setCityName(null);
      return;
    }

    setAvailabilityStatus('checking');
    const requestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = requestId;

    checkPostalCodeAvailability(trimmedPostalCode)
      .then((result) => {
        if (latestRequestIdRef.current !== requestId) return;
        setAvailabilityStatus(result.isAvailable ? 'available' : 'unavailable');
        setCityName(result.city || null);
      })
      .catch(() => {
        if (latestRequestIdRef.current !== requestId) return;
        setAvailabilityStatus('unavailable');
        setCityName(null);
      });
  }, [formatValidation.isValid, hasValue, trimmedPostalCode]);

  const isChecking = availabilityStatus === 'checking';
  const isUnavailable = availabilityStatus === 'unavailable';
  const isAvailable = availabilityStatus === 'available';

  const hasFormatError = formatValidation.message && !formatValidation.isValid;
  const shouldShowFormatError = hasFormatError;
  const showNotFound = isUnavailable;
  const showCityName = isAvailable && cityName;

  const handlePostalCodeChange = (nextValue: string) => {
    setPostalCode(nextValue);
  };

  const handleContinue = () => {
    if (!isAvailable) return;
    if (!locale) return;
    router.push(`/${locale}/chat?cp=${trimmedPostalCode}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleContinue();
  };

  const handleBack = () => {
    if (!locale) return;
    router.push(`/${locale}/onboarding`);
  };

  return (
    <ContentShell className="items-center justify-start bg-gradient-to-b from-km0-beige-50 to-km0-beige-100">
      <div className="flex w-full max-w-[390px] flex-col gap-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="flex-1 flex justify-start">
            <button
              type="button"
              onClick={handleBack}
              className="flex size-11 items-center justify-center rounded-xl border-[2px] border-dashed border-km0-yellow-500 text-km0-yellow-600 transition-all duration-200 hover:scale-105 hover:bg-km0-yellow-50"
              aria-label="Back"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          </div>
          <Logo context="onboarding" alt="KM0 LAB" />
          <div className="flex-1" />
        </motion.div>

        {/* City illustration: max-w para reducir tamaño sin alterar posición de la cabecera */}
        <motion.div
          className="mx-auto w-full max-w-64 overflow-hidden rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src="/assets/images/km0_city_map.png"
            alt={t('image_alt')}
            className="h-auto w-full object-cover"
          />
        </motion.div>

        {/* Title + subtitle / City name */}
        <motion.div
          className="flex h-[52px] items-center justify-center px-2 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 }}
        >
          {showCityName ? (
            <h1 className="font-brand text-3xl font-medium leading-tight text-km0-teal-600">
              📍 {cityName}
            </h1>
          ) : (
            <div>
              <h1 className="mb-1 font-brand text-2xl font-bold leading-tight text-primary">
                {t('title')}
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>
          )}
        </motion.div>

        {/* Input */}
        <motion.form
          className="flex flex-col gap-2 px-2"
          onSubmit={handleSubmit}
          aria-label={t('form_aria')}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.4 }}
        >
          <div
            className={cn(
              'flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 shadow-sm transition-colors focus-within:border-km0-teal-400',
              isAvailable ? 'border-km0-teal-400' : 'border-km0-beige-200',
            )}
          >
            <MapPin className="shrink-0 text-km0-teal-500" size={22} />
            <label htmlFor={inputId} className="sr-only">
              {t('input_label')}
            </label>
            <input
              id={inputId}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder={t('placeholder')}
              value={postalCode}
              onChange={(e) => handlePostalCodeChange(e.target.value)}
              autoComplete="postal-code"
              className="flex-1 bg-transparent font-ui text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>

          {shouldShowFormatError && (
            <div className="flex items-center gap-1.5 px-1 font-ui text-sm text-km0-coral-500">
              <AlertTriangle size={14} />
              <span>{formatValidation.message || t('format_error')}</span>
            </div>
          )}

          {showNotFound && (
            <div className="flex items-center gap-1.5 px-1 font-ui text-sm text-km0-coral-500">
              <AlertTriangle size={14} />
              <span>{t('unavailable_error')}</span>
            </div>
          )}

          {/* CTA button */}
          <div className="mt-2">
            <button
              type="submit"
              onClick={handleContinue}
              disabled={!isAvailable || isChecking}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 font-ui text-sm font-semibold uppercase text-primary-foreground transition-all duration-200 hover:scale-[1.03] hover:bg-km0-blue-600 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
              aria-label={t('continue_aria')}
            >
              {isChecking ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                t('continue')
              )}
            </button>

            {isUnavailable && (
              <button
                type="button"
                aria-label={t('notify_aria')}
                onClick={() => {}}
                className="mt-2 w-full text-center font-ui text-sm text-km0-blue-500 underline transition-colors hover:text-km0-blue-700"
              >
                {t('notify')}
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </ContentShell>
  );
}
