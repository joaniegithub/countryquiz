import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

import { error, info, neutral, purple, secondary, success, warning } from './colors';

export function createPalette() {
    return {
        action: {
            active: neutral[500],
            disabled: alpha(neutral[900], 0.38),
            disabledSelected: alpha(neutral[900], 0.56),
            disabledBackground: alpha(neutral[900], 0.12),
            focus: alpha(neutral[900], 0.16),
            hover: alpha(neutral[900], 0.04),
            selected: alpha(neutral[900], 0.12),
        },
        background: {
            default: neutral[100],
            paper: neutral[50],
        },
        divider: neutral[100],
        error,
        info,
        mode: 'light',
        neutral,
        primary: purple,
        secondary: secondary,
        success,
        text: {
            title: common.black,
            main: neutral[700],
            primary: neutral[700],
            secondary: neutral[500],
            disabled: alpha(neutral[900], 0.38),
        },
        warning,
        shadow: neutral[1000],
    };
}
