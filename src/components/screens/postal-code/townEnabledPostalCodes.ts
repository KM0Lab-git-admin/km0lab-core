export const townEnabledPostalCodes = new Set(['08380']);

export const isTownEnabled = (postalCode: string): boolean =>
  townEnabledPostalCodes.has(postalCode.trim());
