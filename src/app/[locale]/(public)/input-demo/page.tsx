'use client';

import { useState, type ChangeEvent } from 'react';
import {
  Input,
  EmailIcon,
  PhoneIcon,
  DateIcon,
  ZipCodeIcon,
  CheckIcon,
  XIcon,
} from '@/components/ui/primitives/input';
import { Button } from '@/components/ui/primitives/button';
import { getValidatorById, validators } from '@/validation/validators';

const neutralHelperText = 'Introduce un valor';
const inputId = 'input-demo-playground-input';

export default function InputDemoPage() {
  const [playgroundValue, setPlaygroundValue] = useState('');
  const [playgroundPlaceholder, setPlaygroundPlaceholder] =
    useState('Email');
  const [showLeftIcon, setShowLeftIcon] = useState(true);
  const [showRightIcon, setShowRightIcon] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    'neutral' | 'success' | 'error'
  >('neutral');
  const [helperText, setHelperText] = useState(neutralHelperText);
  const [validatorId, setValidatorId] = useState('email');
  const [hasValidated, setHasValidated] = useState(false);

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

  const resetValidation = () => {
    setValidationStatus('neutral');
    setHelperText(neutralHelperText);
    setHasValidated(false);
  };

  const handlePlaygroundChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setPlaygroundValue(nextValue);
    applyLiveValidation(nextValue, validatorId);
  };

  const handleValidate = () => {
    const validator = getValidatorById(validatorId);
    const result = validator.validate(playgroundValue);
    setValidationStatus(result.isValid ? 'success' : 'error');
    setHelperText(
      result.message ??
        (result.isValid ? 'Correcto.' : 'Valor invalido.'),
    );
    setHasValidated(true);
  };

  const handleReset = () => {
    setPlaygroundValue('');
    setPlaygroundPlaceholder('Email');
    setShowLeftIcon(false);
    setShowRightIcon(true);
    setIsDisabled(false);
    setValidatorId('email');
    resetValidation();
  };

  const handleValidatorChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
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

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-brand font-bold text-km0-blue mb-8">
          Playground
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 max-w-5xl items-start">
          <div className="rounded-lg border border-black/10 p-6 space-y-5 bg-white">
            <h2 className="text-lg font-brand font-semibold">
              Controles
            </h2>

            <label className="flex items-center gap-3 text-sm font-ui text-[#111112]">
              <input
                type="checkbox"
                className="size-4 accent-black"
                checked={showLeftIcon}
                onChange={(event) => setShowLeftIcon(event.target.checked)}
              />
              Icono izquierda
            </label>

            <label className="flex items-center gap-3 text-sm font-ui text-[#111112]">
              <input
                type="checkbox"
                className="size-4 accent-black"
                checked={showRightIcon}
                onChange={(event) => setShowRightIcon(event.target.checked)}
              />
              Icono derecha
            </label>

            <label className="flex items-center gap-3 text-sm font-ui text-[#111112]">
              <input
                type="checkbox"
                className="size-4 accent-black"
                checked={isDisabled}
                onChange={(event) => setIsDisabled(event.target.checked)}
              />
              Disabled
            </label>

            <label className="flex flex-col gap-2 text-sm font-ui text-[#111112]">
              Value
              <input
                type="text"
                className="h-10 rounded border border-black/20 px-3 text-sm font-ui"
                value={playgroundValue}
                onChange={handlePlaygroundChange}
                placeholder="Escribe un valor"
                disabled={isDisabled}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-ui text-[#111112]">
              Placeholder
              <input
                type="text"
                className="h-10 rounded border border-black/20 px-3 text-sm font-ui"
                value={playgroundPlaceholder}
                onChange={(event) =>
                  setPlaygroundPlaceholder(event.target.value)
                }
                placeholder="Placeholder"
                disabled={isDisabled}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-ui text-[#111112]">
              Tipo de validacion
              <select
                className="h-10 rounded border border-black/20 px-3 text-sm font-ui bg-white"
                value={validatorId}
                onChange={handleValidatorChange}
                disabled={isDisabled}
              >
                {validators.map((validator) => (
                  <option key={validator.id} value={validator.id}>
                    {validator.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded border border-black/20 text-sm font-brand font-semibold text-[#111112]"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 p-6 bg-white">
            <h2 className="text-lg font-brand font-semibold mb-4">
              Preview
            </h2>
            <div className="space-y-2">
              <label
                className="text-sm font-ui text-[#111112]"
                htmlFor={inputId}
              >
                Valor a validar
              </label>
              <Input
                id={inputId}
                placeholder={playgroundPlaceholder}
                value={playgroundValue}
                onChange={handlePlaygroundChange}
                disabled={isDisabled}
                iconLeft={
                  showLeftIcon ? (
                    validatorId === 'phone' ? (
                      <PhoneIcon />
                  ) : validatorId === 'date' ? (
                    <DateIcon />
                  ) : validatorId === 'postal-code' ? (
                    <ZipCodeIcon />
                  ) : (
                    <EmailIcon />
                  )
                  ) : undefined
                }
                iconRight={
                  hasValidated && validationStatus === 'success' ? (
                    <span className="text-[#00CC66]">
                      <CheckIcon />
                    </span>
                  ) : hasValidated && validationStatus === 'error' ? (
                    <span className="text-[#e30000]">
                      <XIcon />
                    </span>
                  ) : undefined
                }
                error={hasValidated && validationStatus === 'error'}
                variant={
                  hasValidated && validationStatus === 'success'
                    ? 'success'
                    : undefined
                }
                message={hasValidated ? helperText : neutralHelperText}
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="button" onClick={handleValidate} disabled={isDisabled}>
                  Validar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
