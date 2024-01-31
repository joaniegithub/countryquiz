import * as React from 'react';
import { purple, indigo, neutral } from 'theme/colors';
import  { ReactComponent as GlobeIcon } from 'assets/images/globe.svg';

import { Box, SvgIcon } from '@mui/material';

const BG = (props) => {
    const colors = [
        // ...(Object.keys(neutral).map((key) => neutral[key])),
        // ...(Object.keys(purple).map((key) => purple[key])),
        // ...(Object.keys(indigo).map((key) => indigo[key])),
        purple.main,
        purple.light,
        purple.dark,
        indigo.main,
        indigo.light,
        indigo.dark,
        neutral[400],
        neutral[500],
        neutral[600],
        neutral[700],
        neutral[800],
        neutral[900],
    ];
    // console.log(colors);

    return (
        <Box
            component="span"
            sx={{
                pointerEvents: 'none',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: -1,
                // backgroundColor: (theme) => theme.palette.background,
            }}
        >
            {colors.map((color, i) => {
                const size = (Math.random() * 0.5 + 0.1) * 600 + 'px';
                // const rotate = (i / colors.length)*90+"deg";
                const patternZoom = Math.random() + 3;
                // const color = colors[Math.floor(Math.random() * colors.length)];
                return (
                    <React.Fragment
						key={"bg"+i}
					>
                        <Box
                            component="span"
                            sx={{
                                pointerEvents: 'none',
                                opacity: Math.random() * 0.025 + 0.025,
                                display: 'block',
                                backgroundColor: color,
                                position: 'absolute',
                                left: Math.random() * 100 + 'vw',
                                top: Math.random() * 100 + 'vh',
                                width: size,
                                height: size,
                                // transform: "rotate("+rotate+")",
                                zIndex: -1,
                            }}
                        />
                        <Box
                            component="span"
                            sx={{
                                pointerEvents: 'none',
                                opacity: Math.random() * 0.025 + 0.025,
                                display: 'block',
                                background:
                                    'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg" width="' +
                                    4 * patternZoom +
                                    'px" height="' +
                                    4 * patternZoom +
                                    'px"><defs></defs><polygon points="0 0 4 4 4 2 2 0" fill="%23' +
                                    color.substr(1) +
                                    '"></polygon><polygon points="0 4 2 4 0 2" fill="%23' +
                                    color.substr(1) +
                                    '"></polygon></svg>\') repeat',
                                position: 'absolute',
                                left: Math.random() * 100 + 'vw',
                                top: Math.random() * 100 + 'vh',
                                width: size,
                                height: size,
                                // transform: "rotate("+rotate+")",
                                zIndex: -1,
                            }}
                        />
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default BG;
/*

            <SvgIcon
                sx={{
                    color: purple.darkest,
                    height: '240px',
                    width: '240px',
                    opacity: 0.15,
                }}
            >
                <GlobeIcon />
            </SvgIcon>
*/