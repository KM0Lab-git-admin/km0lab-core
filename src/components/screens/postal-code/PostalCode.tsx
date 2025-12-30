'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { MediaFrame } from '@/components/ui/media-frame';
import { Button } from '@/components/ui/primitives/button';
import { Input, ZipCodeIcon } from '@/components/ui/primitives/input';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Title } from '@/components/ui/primitives/title';
import { LogoHeader } from '@/components/ui/logo-header';
import { ContentCard } from '@/components/ui/content-card';
import { ContentShell } from '@/components/ui/content-shell';
import { PageContainer } from '@/components/ui/page-container';
import { cn } from '@/components/ui/primitives/utils';
import { checkPostalCodeAvailability } from '@/features/postal-code';
import { getValidatorById } from '@/validation/validators';
import {
  postalCodeButton,
  postalCodeButtonContainer,
  postalCodeForm,
  postalCodeInputContainer,
  postalCodeNotifyButton,
  postalCodeTitleContainer,
} from './postal-code.styles';

type AvailabilityStatus = 'idle' | 'checking' | 'available' | 'unavailable';

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('size-4 animate-spin', className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

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

  // Mostrar error de formato solo si:
  // 1. El validador detecta caracteres no numéricos (muestra error inmediatamente), O
  // 2. Ha completado los 5 caracteres y no son válidos
  // Si son números pero incompletos (< 5), no mostrar error (permitir que siga escribiendo)
  const hasFormatError = formatValidation.message && !formatValidation.isValid;
  const shouldShowFormatError = hasFormatError;
  const inputError = shouldShowFormatError || isUnavailable;

  const inputMessage = (() => {
    if (!hasValue) return t('helper');
    if (shouldShowFormatError) return formatValidation.message || t('format_error');
    if (isUnavailable) return t('unavailable_error');
    if (isAvailable) return t('success');
    return t('helper');
  })();

  const handlePostalCodeChange = (nextValue: string) => {
    setPostalCode(nextValue);
  };

  const handleContinue = () => {
    if (!isAvailable) return;
    if (!locale) return;
    router.push(`/${locale}/chat`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleContinue();
  };

  const scale = 'md';
  const showCityName = isAvailable && cityName;

  return (
    <PageContainer>
      <ContentShell scale={scale}>
        <LogoHeader scale={scale} logoScale={scale} />

        <ContentCard scale={scale}>
          <form
            className={postalCodeForm({ scale })}
            onSubmit={handleSubmit}
            aria-label={t('form_aria')}
          >
            <MediaFrame
              src="/images/glovo-style-discover.png"
              alt={t('image_alt')}
              badgeText={t('xp_badge')}
              className="w-full"
            />

            {!showCityName && (
              <div className={postalCodeTitleContainer({ scale })}>
                <Title as="h1" size="h2" align="center" uppercase>
                  {t('title')}
                </Title>
                <Subtitle size="sm" align="center" tone="muted">
                  {t('subtitle')}
                </Subtitle>
              </div>
            )}

            {showCityName && (
              <div className={postalCodeTitleContainer({ scale })}>
                <Title
                  as="h1"
                  size="h2"
                  align="center"
                  className="text-km0-success-500"
                >
                  {cityName}
                </Title>
              </div>
            )}

            <div className={postalCodeInputContainer({ scale })}>
              <label htmlFor={inputId} className="sr-only">
                {t('input_label')}
              </label>
              <Input
                id={inputId}
                value={postalCode}
                onChange={(event) => handlePostalCodeChange(event.target.value)}
                placeholder={t('placeholder')}
                iconLeft={<ZipCodeIcon />}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                error={inputError}
                variant={isAvailable ? 'success' : undefined}
                message={inputMessage}
                aria-label={t('input_aria')}
              />
            </div>

            <div className={postalCodeButtonContainer({ scale })}>
              <Button
                type="submit"
                onClick={handleContinue}
                disabled={!isAvailable || isChecking}
                aria-label={t('continue_aria')}
                className={postalCodeButton({ scale })}
              >
                {isChecking ? (
                  <>
                    <LoadingSpinner className="text-white" />
                    {t('checking')}
                  </>
                ) : (
                  t('continue')
                )}
              </Button>

              {isUnavailable && (
                <button
                  type="button"
                  aria-label={t('notify_aria')}
                  onClick={() => {}}
                  className={postalCodeNotifyButton({ scale })}
                >
                  {t('notify')}
                </button>
              )}
            </div>
          </form>
        </ContentCard>
      </ContentShell>
    </PageContainer>
  );
}

