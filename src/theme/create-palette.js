import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

import { error, indigo, info, neutral, purple, success, warning } from './colors';

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
            default: common.white,
            paper: common.white,
        },
        divider: neutral[100],
        error,
        info,
        mode: 'light',
        neutral,
        primary: purple,
        secondary: indigo,
        success,
        text: {
            title: common.black,
            main: neutral[900],
            primary: neutral[900],
            secondary: neutral[500],
            disabled: alpha(neutral[900], 0.38),
        },
        warning,
        shadow: neutral[1000],
    };
}
