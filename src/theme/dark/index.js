import { createTheme as createMuiTheme } from '@mui/material';

import { createComponents } from '../create-components';
import { createShadows } from '../create-shadows';
import { createTypography } from '../create-typography';
import { createPalette } from './create-palette';

export function createTheme() {
    const palette = createPalette();
    const components = createComponents({ palette });
    const shadows = createShadows();
    const typography = createTypography();

    return createMuiTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1440,
            },
        },
        components,
        palette,
        shadows,
        shape: {
            borderRadius: 8,
        },
        typography,
    });
}

// const themeOptions: ThemeOptions = {
//   palette: {
//     action: {
//       active: '#7e8a9a',
//       disabled: 'rgba(243, 244, 246, 0.38)',
//       disabledBackground: 'rgba(243, 244, 246, 0.12)',
//       focus: 'rgba(243, 244, 246, 0.16)',
//       hover: 'rgba(243, 244, 246, 0.04)',
//       selected: 'rgba(243, 244, 246, 0.12)',
//     },
//     background: {
//       default: '#0a0f18',
//       paper: '#0a0f18',
//     },
//     divider: '#2F3746',
//     error: {
//       lightest: '#FEF3F2',
//       light: '#FEE4E2',
//       main: '#F04438',
//       dark: '#B42318',
//       darkest: '#7A271A',
//       contrastText: '#FFFFFF',
//       alpha4: 'rgba(240, 68, 56, 0.04)',
//       alpha8: 'rgba(240, 68, 56, 0.08)',
//       alpha12: 'rgba(240, 68, 56, 0.12)',
//       alpha30: 'rgba(240, 68, 56, 0.3)',
//       alpha50: 'rgba(240, 68, 56, 0.5)',
//     },
//     info: {
//       lightest: '#ECFDFF',
//       light: '#CFF9FE',
//       main: '#06AED4',
//       dark: '#0E7090',
//       darkest: '#164C63',
//       contrastText: '#FFFFFF',
//       alpha4: 'rgba(6, 174, 212, 0.04)',
//       alpha8: 'rgba(6, 174, 212, 0.08)',
//       alpha12: 'rgba(6, 174, 212, 0.12)',
//       alpha30: 'rgba(6, 174, 212, 0.3)',
//       alpha50: 'rgba(6, 174, 212, 0.5)',
//     },
//     mode: 'dark',
//     neutral: {
//       50: '#0a0f18',
//       100: '#111927',
//       200: '#1C2536',
//       300: '#2F3746',
//       400: '#4D5761',
//       450: '#6C737F',
//       500: '#7e8a9a',
//       600: '#9DA4AE',
//       700: '#D2D6DB',
//       800: '#E5E7EB',
//       900: '#F3F4F6',
//       1000: '#F8F9FA',
//     },
//     primary: {
//       lightest: '#312E81',
//       light: '#4338CA',
//       main: '#6366F1',
//       dark: '#8386F3',
//       darkest: '#8386F3',
//       contrast: '#F5F7FF',
//       contrastText: '#FFFFFF',
//       alpha4: 'rgba(99, 102, 241, 0.04)',
//       alpha8: 'rgba(99, 102, 241, 0.08)',
//       alpha12: 'rgba(99, 102, 241, 0.12)',
//       alpha30: 'rgba(99, 102, 241, 0.3)',
//       alpha50: 'rgba(99, 102, 241, 0.5)',
//     },
//     secondary: {
//       lightest: '#312E81',
//       light: '#312E81',
//       main: '#312E81',
//       dark: '#8386F3',
//       darkest: '#8386F3',
//       contrast: '#F5F7FF',
//       contrastText: '#FFFFFF',
//       alpha4: 'rgba(49, 46, 129, 0.04)',
//       alpha8: 'rgba(49, 46, 129, 0.08)',
//       alpha12: 'rgba(49, 46, 129, 0.12)',
//       alpha30: 'rgba(49, 46, 129, 0.3)',
//       alpha50: 'rgba(49, 46, 129, 0.5)',
//     },
//     success: {
//       lightest: '#F0FDF9',
//       light: '#3FC79A',
//       main: '#10B981',
//       dark: '#0B815A',
//       darkest: '#134E48',
//       contrastText: '#FFFFFF',
//       alpha4: 'rgba(16, 185, 129, 0.04)',
//       alpha8: 'rgba(16, 185, 129, 0.08)',
//       alpha12: 'rgba(16, 185, 129, 0.12)',
//       alpha30: 'rgba(16, 185, 129, 0.3)',
//       alpha50: 'rgba(16, 185, 129, 0.5)',
//     },
//     text: {
//       title: '#fff',
//       main: '#F3F4F6',
//       primary: '#F3F4F6',
//       secondary: '#7e8a9a',
//       disabled: 'rgba(243, 244, 246, 0.38)',
//     },
//     warning: {
//       lightest: '#FFFAEB',
//       light: '#FEF0C7',
//       main: '#F79009',
//       dark: '#B54708',
//       darkest: '#7A2E0E',
//       contrastText: '#FFFFFF',
//       alpha4: 'rgba(247, 144, 9, 0.04)',
//       alpha8: 'rgba(247, 144, 9, 0.08)',
//       alpha12: 'rgba(247, 144, 9, 0.12)',
//       alpha30: 'rgba(247, 144, 9, 0.3)',
//       alpha50: 'rgba(247, 144, 9, 0.5)',
//     },
//   },
// };