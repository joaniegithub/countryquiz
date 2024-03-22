import { useTheme } from '@emotion/react';
import MainButton from 'components/ui/MainButton';
import * as React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SvgIcon } from '@mui/material';

const GameButton = (props) => {
    const {
        // text,
        // colorEffect = '000',
        // // stroke = false,
        // distance = '3px',
        // patternZoom = 2,
        onClick,
        phase,
        choice,
        rightAnswer,
        chosenAnswer,
        isFlag,
        answerAdditionnalText,
    } = props;
    const theme = useTheme();

    let color = 'primary';
    let icon = undefined;
    if (phase === 1) {
        if (choice === rightAnswer && chosenAnswer === choice) {
            color = 'success';
            icon = <CheckCircleIcon />;
        } else if (choice === rightAnswer) {
            color = 'secondary';
        } else if (choice === chosenAnswer) {
            color = 'error';
            icon = <CancelIcon />;
        }
    }

    return (
        <MainButton
            buttonP={{
                color: color,
                onClick: onClick,
                variant: isFlag ? 'outlined' : 'contained',
                // variant: 'outlined',
                // variant: isFlag || (phase === 1 && choice !== rightAnswer && chosenAnswer !== choice) ? 'outlined' : 'contained',
                sx: {
                    position: 'relative',
                    ...(color === 'secondary' || color === 'success'
                        ? {
                              outlineOffset: '3px',
                              outline: `2px solid ${theme.palette[color].main}`,
                          }
                        : {}),
                    // ...(phase === 0 ? {
                    // backgroundColor: "#fff",
                    // '&:hover': {
                    // 	backgroundColor: "rgba(255,255,255,0.5)",
                    // },
                    // } : {}),
                    textAlign: 'center',
                    width: isFlag ? 'calc(50% - 8px)' : '100%',
                    ...(isFlag ? { minHeight: '100px' } : {}),
                    p: '11px',

                    // boxShadow: `2px 6px #${colorEffect}`,

                    /* '&:after': {
						pointerEvents: "none",
						content: '""',
						background: 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg" width="'+(4*patternZoom)+'px" height="'+(4*patternZoom)+'px"><defs></defs><polygon points="0 0 4 4 4 2 2 0" fill="%23'+colorEffect+'"></polygon><polygon points="0 4 2 4 0 2" fill="%23'+colorEffect+'"></polygon></svg>\') repeat',
						// background: 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg" width="'+(6*patternZoom)+'px" height="'+(4*patternZoom)+'px"><defs></defs><polygon points="0 0 6 4 6 3 1.5 0" fill="%23'+colorEffect+'"></polygon><polygon points="0 4 1.5 4 0 3" fill="%23'+colorEffect+'"></polygon></svg>\') repeat',
						display: "block",
						height: "100%",
						width: "100%",
						position: "absolute",
						left: "calc(50% + "+distance+")",
						top: "calc(50% + "+distance+")",
						transform: "translate(-50%, -50%)",
						borderRadius: "12px",
						zIndex: -1,
					} */
                },
                ...(!isFlag && icon
                    ? {
                          endIcon: <SvgIcon fontSize="20px">{icon}</SvgIcon>,
                      }
                    : {}),
            }}
            typoP={{
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '22px',
            }}
            isFlag={isFlag}
        >
            {props.children}
            {choice === rightAnswer && phase === 1 && answerAdditionnalText ? (
                <>
                    <br />
                    <sub>{answerAdditionnalText}</sub>
                </>
            ) : null}
            {isFlag && icon && (
                <SvgIcon
                    fontSize="large"
                    sx={{
                        position: 'absolute',
                        right: '8px',
                    }}
                >
                    {icon}
                </SvgIcon>
            )}
        </MainButton>
    );
};

export default GameButton;
