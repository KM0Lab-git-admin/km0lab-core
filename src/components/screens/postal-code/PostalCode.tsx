'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { MediaFrame } from '@/components/ui/media-frame';
import { Button } from '@/components/ui/primitives/button';
import { Input, ZipCodeIcon } from '@/components/ui/primitives/input';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Title } from '@/components/ui/primitives/title';
import { AppHeader } from '@/components/ui/layout/AppHeader';
import { MobileFrame } from '@/components/ui/layout/MobileFrame';
import { cn } from '@/components/ui/primitives/utils';
import { checkPostalCodeAvailability } from '@/features/postal-code';
import { getValidatorById } from '@/validation/validators';

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
      return;
    }

    if (!formatValidation.isValid) {
      setAvailabilityStatus('idle');
      return;
    }

    setAvailabilityStatus('checking');
    const requestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = requestId;

    checkPostalCodeAvailability(trimmedPostalCode)
      .then((isAvailable) => {
        if (latestRequestIdRef.current !== requestId) return;
        setAvailabilityStatus(isAvailable ? 'available' : 'unavailable');
      })
      .catch(() => {
        if (latestRequestIdRef.current !== requestId) return;
        setAvailabilityStatus('unavailable');
      });
  }, [formatValidation.isValid, hasValue, trimmedPostalCode]);

  const isChecking = availabilityStatus === 'checking';
  const isUnavailable = availabilityStatus === 'unavailable';
  const isAvailable = availabilityStatus === 'available';

  const inputError = (hasValue && !formatValidation.isValid) || isUnavailable;

  const inputMessage = (() => {
    if (!hasValue) return t('helper');
    if (!formatValidation.isValid) return t('format_error');
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
    router.push(`/${locale}/postal-code-welcome`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleContinue();
  };

  return (
    <div className="min-h-dvh-fallback flex flex-col items-stretch justify-center overflow-hidden px-2 xs:px-3 sm:px-4 pt-1 xs:pt-2 sm:pt-3">
      <MobileFrame className="flex-1 min-h-0 w-full">
        <AppHeader />

        <form
          className="w-full flex flex-col items-center gap-2 xs:gap-3 sm:gap-4 flex-1 min-h-0"
          onSubmit={handleSubmit}
          aria-label={t('form_aria')}
        >
          <MediaFrame
            src="/images/glovo-style-discover.png"
            alt={t('image_alt')}
            badgeText={t('xp_badge')}
            className="w-full"
          />

          <div className="w-full text-center flex flex-col gap-1 xs:gap-2">
            <Title as="h1" size="h2" align="center" uppercase>
              {t('title')}
            </Title>
            <Subtitle size="sm" align="center" tone="muted">
              {t('subtitle')}
            </Subtitle>
          </div>

          <div className="w-full flex flex-col gap-2">
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

          <div className="w-full flex flex-col gap-2">
            <Button
              type="submit"
              onClick={handleContinue}
              disabled={!isAvailable || isChecking}
              aria-label={t('continue_aria')}
              className={cn(
                'w-full rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center',
                'shadow-sm hover:opacity-90 transition-opacity',
              )}
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
                className="w-full text-center text-sm font-semibold text-km0-blue-700 underline underline-offset-2"
              >
                {t('notify')}
              </button>
            )}
          </div>
        </form>
      </MobileFrame>
    </div>
  );
}


