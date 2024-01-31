import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

import {
    error,
    indigoDarkMode,
    info,
    neutral,
    purpleDarkMode,
    success,
    warning,
} from '../colors';


const neutralConversion = {
    50: 1000,
    100: 900,
    200: 800,
    300: 700,
    400: 600,
    450: 500,
    500: 450,
    600: 400,
    700: 300,
    800: 200,
    900: 100,
    1000: 50,
}

const neutralDark = {};
Object.keys(neutral).forEach((key) => {
	neutralDark[key] = neutral[neutralConversion[key]];
});

export function createPalette() {
    return {
        action: {
            active: neutralDark[700],
            disabled: alpha(neutralDark[900], 0.38),
            disabledBackground: alpha(neutralDark[900], 0.12),
            focus: alpha(neutralDark[900], 0.16),
            hover: alpha(neutralDark[900], 0.04),
            selected: alpha(neutralDark[900], 0.12),
        },
        background: {
            default: neutralDark[50],
            paper: neutralDark[50],
        },
        divider: neutralDark[300],
        error,
        info,
        mode: 'dark',
        neutral: neutralDark,
        primary: purpleDarkMode,
        secondary: indigoDarkMode,
        success,
        text: {
            title: common.white,
            main: neutralDark[1000],
            primary: neutralDark[1000],
            secondary: neutralDark[500],
            disabled: alpha(neutralDark[1000], 0.38),
        },
        warning,
		shadow: neutral[1000],
    };
}
