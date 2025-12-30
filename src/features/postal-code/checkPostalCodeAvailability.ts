import { postalCodeDb, getPostalCodeCity } from './postalCodeDb';

type CheckPostalCodeAvailabilityOptions = {
  delayMs?: number;
};

type PostalCodeResult = {
  isAvailable: boolean;
  city?: string;
};

export const checkPostalCodeAvailability = async (
  postalCode: string,
  options: CheckPostalCodeAvailabilityOptions = {},
): Promise<PostalCodeResult> => {
  const trimmedPostalCode = postalCode.trim();
  const delayMs = options.delayMs ?? 650;

  await new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

  const isAvailable = postalCodeDb.has(trimmedPostalCode);
  const city = isAvailable ? getPostalCodeCity(trimmedPostalCode) : undefined;

  return {
    isAvailable,
    city,
  };
};



