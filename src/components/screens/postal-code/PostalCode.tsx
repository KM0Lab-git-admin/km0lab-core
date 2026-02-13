'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { MediaFrame } from '@/components/ui/media-frame';
import { Button } from '@/components/ui/primitives/button';
import { Input, ZipCodeIcon } from '@/components/ui/primitives/input';
import { TitleSubtitle } from '@/components/ui/title-subtitle';
import { LogoHeader } from '@/components/ui/logo-header';
import { ContentCard } from '@/components/ui/content-card';
import { ContentShell } from '@/components/ui/content-shell';
import { cn } from '@/components/ui/primitives/utils';
import { checkPostalCodeAvailability, isTownEnabled } from '@/features/postal-code';
import { getValidatorById } from '@/validation/validators';
import {
  postalCodeButton,
  postalCodeButtonContainer,
  postalCodeForm,
  postalCodeInputContainer,
  postalCodeNotifyButton,
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
    if (isTownEnabled(trimmedPostalCode)) {
      router.push(`/${locale}/town?cp=${trimmedPostalCode}`);
    } else {
      router.push(`/${locale}/chat`);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleContinue();
  };

  const handleBack = () => {
    if (!locale) return;
    router.push(`/${locale}/onboarding`);
  };

  const showCityName = isAvailable && cityName;

  return (
    <ContentShell>
      <LogoHeader
        scale="sm"
        logoScale="md"
        leftAction={(
          <Button
            size="icon"
            variant="ghost"
            onClick={handleBack}
            aria-label="Volver al onboarding"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
        )}
      />

      <ContentCard>
        <form
          className={postalCodeForm()}
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
            <TitleSubtitle
              title={t('title')}
              subtitle={t('subtitle')}
              size="sm"
              titleClassName="uppercase"
            />
          )}

          {showCityName && (
            <TitleSubtitle
              title={cityName}
              size="sm"
              titleClassName="text-km0-success-500"
            />
          )}

          <div className={postalCodeInputContainer()}>
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

          <div className={postalCodeButtonContainer()}>
            <Button
              type="submit"
              onClick={handleContinue}
              disabled={!isAvailable || isChecking}
              aria-label={t('continue_aria')}
              className={postalCodeButton()}
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
                className={postalCodeNotifyButton()}
              >
                {t('notify')}
              </button>
            )}
          </div>
        </form>
      </ContentCard>
    </ContentShell>
  );
}
