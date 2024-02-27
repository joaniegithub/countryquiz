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

/*
        <link rel="apple-touch-startup-image" media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/iPhone_11__iPhone_XR_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/12.9__iPad_Pro_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/10.9__iPad_Air_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/10.5__iPad_Air_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/10.2__iPad_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="splash_screens/8.3__iPad_Mini_landscape.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/iPhone_11__iPhone_XR_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/12.9__iPad_Pro_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/10.9__iPad_Air_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/10.5__iPad_Air_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/10.2__iPad_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="splash_screens/8.3__iPad_Mini_portrait.png">
*/
