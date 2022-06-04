import { DefaultTheme } from 'styled-components';
import { ColorScheme } from './scheme/ColorScheme';

export const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

// input - bg, border, placeholder, text, white50, errorBg

export const theme: DefaultTheme = {
  colors: { ...ColorScheme },
  fontSize: {
    sm: '12px',
    nm: '16px',
    smd: '18px',
    md: '20px',
    lg: '24px',
    xlg: '32px',
    xxlg: '40px',
    xxxlg: '48px',
  },
  fontWeight: {
    thin: '100',
    xLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    xBold: '800',
    black: '900',
  },
  device,
};
