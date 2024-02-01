import {
    createTheme,
    filledInputClasses,
    inputLabelClasses,
    outlinedInputClasses,
    paperClasses,
    tableCellClasses,
    toggleButtonClasses,
    toggleButtonGroupClasses,
} from '@mui/material';

// Used only to create transitions
const muiTheme = createTheme();

export function createComponents(config) {
    const { palette } = config;

    return {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                },
                sizeSmall: {
                    padding: '6px 16px',
                },
                sizeMedium: {
                    padding: '8px 20px',
                },
                sizeLarge: {
                    padding: '11px 24px',
                },
                textSizeSmall: {
                    padding: '7px 12px',
                },
                textSizeMedium: {
                    padding: '9px 16px',
                },
                textSizeLarge: {
                    padding: '12px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: palette.background,
                    borderRadius: 20,
                    [`&.${paperClasses.elevation1}`]: {
                        boxShadow:
                            '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                    },
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						borderRadius: 8,
                        backgroundColor: palette.background,
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: palette.neutral[400],
						minHeight: 30,
                        width: "5px",
						border: "3px solid "+palette.neutral[200],
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
						backgroundColor: palette.neutral[400],
					},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
						backgroundColor: palette.neutral[400],
					},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
						backgroundColor: palette.neutral[400],
					},
					"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                        backgroundColor: palette.background,
					},
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px',
                    },
                },
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: 'h6',
                },
                subheaderTypographyProps: {
                    variant: 'body2',
                },
            },
            styleOverrides: {
                root: {
                    padding: '32px 24px 16px',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%',
                    overflow: 'hidden',
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                },
                '#__next': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                },
                '#nprogress': {
                    pointerEvents: 'none',
                },
                '#nprogress .bar': {
                    backgroundColor: palette.primary.main,
                    height: 3,
                    left: 0,
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 2000,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                    '&::placeholder': {
                        color: palette.text.secondary,
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderColor: palette.neutral[200],
                    transition: muiTheme.transitions.create([
                        'border-color',
                        'box-shadow',
                    ]),
                    '&:hover': {
                        // backgroundColor: palette.action.hover,
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.neutral[400],
                        },
                    },
                    '&:before': {
                        display: 'none',
                    },
                    '&:after': {
                        display: 'none',
                    },
                    [`&.${filledInputClasses.disabled}`]: {
                        backgroundColor: 'transparent',
                    },
                    [`&.${filledInputClasses.focused}`]: {
                        backgroundColor: 'transparent',
                        borderColor: palette.primary.main,
                        // boxShadow: `${palette.primary.main} 0 0 0 2px`,
                    },
                    [`&.${filledInputClasses.error}`]: {
                        borderColor: palette.error.main,
                        // boxShadow: `${palette.error.main} 0 0 0 2px`,
                    },
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
            },
        },
        MuiPopper: {
            // defaultProps: {
            //     titleTypographyProps: {
            //         variant: 'h6',
            //     },
            //     subheaderTypographyProps: {
            //         variant: 'body2',
            //     },
            // },
            styleOverrides: {
                root: {
					// // scrollbarColor: "#6b6b6b #2b2b2b",
					// scrollbarColor: "#6b6b6b #2b2b2b",
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						borderRadius: 8,
						backgroundColor: palette.neutral[100],
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: palette.neutral[400],
						minHeight: 30,
						border: "3px solid "+palette.neutral[100],
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
						backgroundColor: palette.neutral[400],
					},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
						backgroundColor: palette.neutral[400],
					},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
						backgroundColor: palette.neutral[400],
					},
					"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
						backgroundColor: palette.neutral[100],
					},
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        // backgroundColor: palette.action.hover,
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.neutral[400],
                        },
                    },
                    [`&.${outlinedInputClasses.focused}`]: {
                        backgroundColor: 'transparent',
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.primary.main,
                            // boxShadow: `${palette.primary.main} 0 0 0 2px`,
                        },
                    },
                    [`&.${filledInputClasses.error}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.error.main,
                            // boxShadow: `${palette.error.main} 0 0 0 2px`,
                        },
                    },
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
                notchedOutline: {
                    borderColor: palette.neutral[200],
                    transition: muiTheme.transitions.create([
                        'border-color',
                        // 'box-shadow',
                    ]),
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    [`&.${inputLabelClasses.filled}`]: {
                        transform: 'translate(12px, 18px) scale(1)',
                    },
                    [`&.${inputLabelClasses.shrink}`]: {
                        [`&.${inputLabelClasses.standard}`]: {
                            transform: 'translate(0, -1.5px) scale(0.85)',
                        },
                        [`&.${inputLabelClasses.filled}`]: {
                            transform: 'translate(12px, 6px) scale(0.85)',
                        },
                        [`&.${inputLabelClasses.outlined}`]: {
                            transform: 'translate(14px, -9px) scale(0.85)',
                        },
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderColor: palette.primary.alpha4,
                    borderStyle: 'solid',
                    borderWidth: 3,
                    height: '12px',
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                sizeSmall: {
                    padding: 4,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.71,
                    minWidth: 'auto',
                    paddingLeft: 0,
                    paddingRight: 0,
                    textTransform: 'none',
                    '& + &': {
                        marginLeft: 24,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: palette.divider,
                    // padding: '15px 16px',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    borderBottom: 'none',
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                        backgroundColor: palette.neutral[50],
                        color: palette.neutral[700],
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                    },
                    [`& .${tableCellClasses.paddingCheckbox}`]: {
                        paddingTop: 4,
                        paddingBottom: 4,
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    [`& .${toggleButtonGroupClasses.grouped}:not(:first-of-type)`]:
                        {
                            margin: '0 2px',
                            borderLeft: 'none',
                            borderTopLeftRadius: '8px',
                            borderBottomLeftRadius: '8px',
                        },
                    [`& .${toggleButtonGroupClasses.grouped}:not(:last-of-type)`]:
                        {
                            borderRight: 'none',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                        },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: 'none',
                    backgroundColor: 'transparent',
                    margin: '0 2px',

                    [`&.${toggleButtonClasses.disabled}`]: {
                        border: 'none',
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        // MuiTextField: {
        //     defaultProps: {
        //         variant: 'filled',
        //     },
        // },
    };
}
