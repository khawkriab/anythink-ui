export const DEFAULT_BREAKPOINTS_SIZE = {
  SM: 576,
  XS: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1440,
  XXXL: 1680,
};

function breakpoint(bp: 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL' | 'XXXL', mediafeature: 'min' | 'max' = 'max') {
  const isExistingBreakpoint = Object.keys(DEFAULT_BREAKPOINTS_SIZE).some((b) => b === bp);

  if (isExistingBreakpoint) {
    return `@media screen and (${mediafeature}-width: ${DEFAULT_BREAKPOINTS_SIZE[bp]}px)`;
  }

  return `@media screen and (${mediafeature}-width: ${bp})`;
}

export default breakpoint;
