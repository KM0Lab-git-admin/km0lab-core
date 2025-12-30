import { postalCodeDb } from './postalCodeDb';

type CheckPostalCodeAvailabilityOptions = {
  delayMs?: number;
};

export const checkPostalCodeAvailability = async (
  postalCode: string,
  options: CheckPostalCodeAvailabilityOptions = {},
): Promise<boolean> => {
  const trimmedPostalCode = postalCode.trim();
  const delayMs = options.delayMs ?? 650;

  await new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

  return postalCodeDb.has(trimmedPostalCode);
};



