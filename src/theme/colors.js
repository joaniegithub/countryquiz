import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
    return {
        ...color,
        alpha4: alpha(color.main, 0.04),
        alpha8: alpha(color.main, 0.08),
        alpha12: alpha(color.main, 0.12),
        alpha30: alpha(color.main, 0.3),
        alpha50: alpha(color.main, 0.5),
    };
};

export const neutral = {
    50: '#ffffff',
    100: '#f5f7fa',
    200: '#E5E7EB',
    300: '#d7dbe2',//#d3dde7
    400: '#9DA4AE',
    450: '#7e8a9a',
    500: '#5c6977',
    600: '#4D5761',
    700: '#354356',
    800: '#3b3860',
    900: '#232148',
    1000: '#171531',
};

export const purple = withAlphas({
    lightest: '#F5F7FF',
    light: '#b5c4ff',
    main: '#5968ff',
    dark: '#3d49f0',
    darkest: '#312E81',
    contrast: '#5968ff',
    contrastText: '#FFFFFF',
});
// export const purpleDarkMode = withAlphas({
//     lightest: '# F5F7FF',
//     light: '# b5b7ff',
//     main: '# 6366F1',
//     dark: '# 4338CA',
//     darkest: '# 312E81',
//     contrast: '# 6366F1',
//     contrastText: '# FFFFFF',
// });

// export const indigo = withAlphas({
//     lightest: '# F5F7FF',
//     light: '# EBEEFE',
//     main: '# 312E81',
//     dark: '# 282574',
//     darkest: '# 282574',
//     contrast: '# 282574',
//     contrastText: '# FFFFFF',
// });
export const secondary = withAlphas({
    lightest: '#F5F7FF',
    light: '#EBEEFE',
    main: '#312E81',
    dark: '#282574',
    darkest: '#282574',
    contrast: '#282574',
    contrastText: '#FFFFFF',
});
// export const indigoDarkMode = withAlphas({
//     lightest: '# F5F7FF',
//     light: '# EBEEFE',
//     main: '# 312E81',
//     dark: '# 282574',
//     darkest: '# 282574',
//     contrast: '# 6366F1',
//     contrastText: '# FFFFFF',
// });

export const success = withAlphas({
    lightest: '#F0FDF9',
    light: '#b0f4f0',
    main: '#00d9cd',
    dark: '#02b3bd',
    darkest: '#02b3bd',
    contrastText: '#FFFFFF',
});

export const info = withAlphas({
    lightest: '#ECFDFF',
    light: '#CFF9FE',
    main: '#06AED4',
    dark: '#0E7090',
    darkest: '#164C63',
    contrastText: '#FFFFFF',
});

export const warning = withAlphas({
    lightest: '#FFFAEB',
    light: '#FEF0C7',
    main: '#F79009',
    dark: '#B54708',
    darkest: '#7A2E0E',
    contrastText: '#FFFFFF',
});

export const error = withAlphas({
    lightest: '#FEF3F2',
    light: '#FEE4E2',
    main: '#ff4e4e',
    dark: '#da3838',
    darkest: '#b42a2a',
    contrastText: '#FFFFFF',
});
