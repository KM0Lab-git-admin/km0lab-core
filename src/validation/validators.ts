export type ValidationResult = { isValid: boolean; message?: string };
export type Validator = {
  id: string;
  label: string;
  validate: (value: string) => ValidationResult;
};

const emailValidator: Validator = {
  id: 'email',
  label: 'Email',
  validate: (value) => {
    const trimmed = value.trim();
    if (trimmed.length < 6) {
      return { isValid: false, message: 'Email invalido.' };
    }
    const atIndex = trimmed.indexOf('@');
    const dotIndex = trimmed.lastIndexOf('.');
    const isValid
                = atIndex > 0
                  && dotIndex > atIndex + 1
                  && dotIndex < trimmed.length - 1;
    return isValid
      ? { isValid: true, message: 'Correcto.' }
      : { isValid: false, message: 'Email invalido.' };
  },
};

const phoneValidator: Validator = {
  id: 'phone',
  label: 'Telefono',
  validate: (value) => {
    const trimmed = value.trim();
    const isValid = /^\d{9}$/.test(trimmed);
    return isValid
      ? { isValid: true, message: 'Correcto.' }
      : { isValid: false, message: 'Telefono invalido.' };
  },
};

const dateValidator: Validator = {
  id: 'date',
  label: 'Fecha (YYYY-MM-DD)',
  validate: (value) => {
    const trimmed = value.trim();
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
    if (!match) {
      return { isValid: false, message: 'Fecha invalida.' };
    }
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const isValid
                = year >= 1900
                  && year <= 2100
                  && month >= 1
                  && month <= 12
                  && day >= 1
                  && day <= 31;
    return isValid
      ? { isValid: true, message: 'Correcto.' }
      : { isValid: false, message: 'Fecha invalida.' };
  },
};

const postalCodeValidator: Validator = {
  id: 'postal-code',
  label: 'Codigo postal',
  validate: (value) => {
    const trimmed = value.trim();

    // Si está vacío, no es válido pero no mostramos error (se maneja en el componente)
    if (trimmed.length === 0) {
      return { isValid: false };
    }

    // Detectar si hay caracteres no numéricos (letras u otros caracteres)
    const hasNonNumericChars = /\D/.test(trimmed);
    if (hasNonNumericChars) {
      return { isValid: false, message: 'Codigo postal invalido. Usa 5 numeros.' };
    }

    // Si son todos números pero incompletos (< 5), no es válido pero no mostramos error
    // (el usuario está escribiendo, permitimos que continúe)
    if (trimmed.length < 5) {
      return { isValid: false };
    }

    // Verificar que tenga exactamente 5 dígitos (ya sabemos que son todos números)
    const isValid = /^\d{5}$/.test(trimmed);
    return isValid
      ? { isValid: true, message: 'Correcto.' }
      : { isValid: false, message: 'Codigo postal invalido. Usa 5 numeros.' };
  },
};

const noneValidator: Validator = {
  id: 'none',
  label: 'Ninguna',
  validate: () => ({ isValid: true, message: 'Correcto.' }),
};

export const validators: Validator[] = [
  emailValidator,
  phoneValidator,
  dateValidator,
  postalCodeValidator,
  noneValidator,
];

export const getValidatorById = (id: string) =>
  validators.find(validator => validator.id === id) ?? noneValidator;
