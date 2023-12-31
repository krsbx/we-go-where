export const FONT_SIZE_TYPE = {
  EXTRA_EXTRA_LARGE: 'EXTRA_EXTRA_LARGE',
  EXTRA_LARGE: 'EXTRA_LARGE',
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
  EXTRA_SMALL: 'EXTRA_SMALL',
  EXTRA_EXTRA_SMALL: 'EXTRA_EXTRA_SMALL',
} as const;

export const FONT_SIZE = {
  [FONT_SIZE_TYPE.EXTRA_EXTRA_LARGE]: 32,
  [FONT_SIZE_TYPE.EXTRA_LARGE]: 28,
  [FONT_SIZE_TYPE.LARGE]: 23,
  [FONT_SIZE_TYPE.MEDIUM]: 18,
  [FONT_SIZE_TYPE.SMALL]: 14,
  [FONT_SIZE_TYPE.EXTRA_SMALL]: 12,
  [FONT_SIZE_TYPE.EXTRA_EXTRA_SMALL]: 11,
} as const;
