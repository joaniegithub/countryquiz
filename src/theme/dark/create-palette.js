import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

import {
    error,
    indigo,
    indigoDark,
    info,
    neutral,
    success,
    warning,
} from '../colors';

export function createPalette() {
    return {
        action: {
            active: neutral[500],
            disabled: alpha(neutral[900], 0.38),
            disabledBackground: alpha(neutral[900], 0.12),
            focus: alpha(neutral[900], 0.16),
            hover: alpha(neutral[900], 0.04),
            selected: alpha(neutral[900], 0.12),
        },
        background: {
            default: neutral[1000],
            paper: neutral[900],
        },
        divider: '#F2F4F7',
        error,
        info,
        mode: 'dark',
        neutral,
        primary: indigo,
        secondary: indigo,
        success,
        text: {
            title: common.white,
            main: neutral[50],
            primary: neutral[50],
            secondary: neutral[50],
            disabled: alpha(neutral[50], 0.38),
        },
        warning,
    };
}
