import {
    createTheme,
    filledInputClasses,
    inputLabelClasses,
    outlinedInputClasses,
    paperClasses,
    switchClasses,
    tableCellClasses,
    toggleButtonClasses,
    toggleButtonGroupClasses,
} from '@mui/material';

// Used only to create transitions
const muiTheme = createTheme();

const pxToRem = (px, oneRemPx = 17) => `${px / oneRemPx}rem`;
const borderWidth = 0;
const width = pxToRem(40);
const height = pxToRem(24);
const size = pxToRem(18);
const gap = (24 - 18) / 2;

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
                root: ({ ownerState }) => ({
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.075)',
                    // ...(ownerState.variant === 'outlined' &&
                    // 	/*ownerState.color === 'primary' &&*/ {
                    // 		borderWidth: '2px',
                    // 	}),
                }),
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
                // outlined: {
                // 	borderWidth: '2px',
                // },
            },
            variants: [
                {
                    props: { variant: 'mode' },
                    style: {
                        border: 0,
                        backgroundColor: palette.background.paper,
                    },
                },
                // {
                // 	props: { variant: 'dashed', color: 'secondary' },
                // 	style: {
                // 		border: `4px dashed rgba(0, 200, 0, 0.2)`,
                // 	},
                // },
            ],
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: palette.background,
                    borderRadius: 20,
                    [`&.${paperClasses.elevation1}`]: {
                        boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                    },
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        borderRadius: 8,
                        backgroundColor: palette.background,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: palette.neutral[400],
                        minHeight: 30,
                        width: '5px',
                        border: '3px solid ' + palette.neutral[200],
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: palette.neutral[400],
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: palette.neutral[400],
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: palette.neutral[400],
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
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
                    minHeight: '100vh',
                    width: '100%',
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: '100%',
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
                    transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
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
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        borderRadius: 8,
                        backgroundColor: palette.neutral[100],
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: palette.neutral[400],
                        minHeight: 30,
                        border: '3px solid ' + palette.neutral[100],
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: palette.neutral[400],
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: palette.neutral[400],
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: palette.neutral[400],
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
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
                    backgroundColor: palette.neutral[300],
                    borderColor: palette.neutral[300],
                    borderStyle: 'solid',
                    borderWidth: 0,
                    borderRadius: 8,
                    height: '14px',
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
        MuiSwitch: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        width,
                        height,
                        padding: 0,
                        margin: theme.spacing(1),
                        overflow: 'unset',
                        [`& .${switchClasses.switchBase}`]: {
                            padding: pxToRem(gap),
                            [`&.${switchClasses.checked}`]: {
                                color: '#fff',
                                transform: `translateX(calc(${width} - ${size} - ${pxToRem(2 * gap)}))`,
                                [`& + .${switchClasses.track}`]: {
                                    backgroundColor: theme.palette.primary.main,
                                    opacity: 1,
                                    border: 'none',
                                },
                                [`& .${switchClasses.thumb}`]: {
                                    backgroundColor: '#fff',
                                },
                            },
                        },
                        [`& .${switchClasses.thumb}`]: {
                            boxShadow: 'none',
                            backgroundColor: theme.palette.grey[400],
                            width: size,
                            height: size,
                        },
                        [`& .${switchClasses.track}`]: {
                            borderRadius: 40,
                            border: `solid ${theme.palette.grey[400]}`,
                            borderWidth,
                            backgroundColor: theme.palette.grey[200],
                            opacity: 1,
                            transition: theme.transitions.create(['background-color', 'border']),
                            boxSizing: 'border-box',
                        },
                    };
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
                    [`& .${switchClasses.root}`]: {
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
                root: ({ theme }) => {
                    return {
						[`& .${toggleButtonGroupClasses.grouped}.${toggleButtonClasses.selected}:not(:first-of-type)`]: {
							borderLeftColor: theme.palette.secondary.contrast,
						},
						[`& .${toggleButtonGroupClasses.grouped}.${toggleButtonClasses.selected}:not(:last-of-type)`]: {
							borderRightColor: theme.palette.secondary.contrast,
						},
						// [`& .${toggleButtonClasses.disabled}`]: {
						// 	color: theme.palette.neutral[100],
						// },
			            // [`& .${toggleButtonClasses.selected}`]: {
			            //     color: palette.action.disabledSelected,
			            // },
					};
				},
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
			            // border: 'none',
			            backgroundColor: 'transparent',
			            // margin: '0 2px',
						color: theme.palette.neutral[400],
						// [`&.${toggleButtonClasses.disabled}`]: {
						// 	border: 'none',
						// 	backgroundColor: 'transparent',
						// 	color: theme.palette.neutral[400],
						// },
			            [`&.${toggleButtonClasses.selected}`]: {
							borderColor: theme.palette.secondary.contrast,
							color: theme.palette.secondary.contrast,
							// backgroundColor: theme.palette.secondary.lightContrast,
			            	// backgroundColor: theme.palette.primary.contrast,
							// color: theme.palette.secondary.contrast,
			            },
					};
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
