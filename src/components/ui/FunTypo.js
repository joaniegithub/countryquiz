import * as React from 'react';

import { Typography } from '@mui/material';

const FunTypo = (props) => {
    const {
        text,
        color = '000',
        stroke = false,
        strokeWidth = '2px',
        distance = '3px',
        patternZoom = 1,
        sx,
    } = props;

    return (
        <Typography
            component="span"
            sx={{
                ...sx,
                position: 'relative',
                textAlign: 'center',
                width: '100%',
                zIndex: 2,
                ...(stroke
                    ? {
                         WebkitTextStrokeWidth: strokeWidth,
                          MozTextStrokeWidth: strokeWidth,
                          WebkitTextStrokeColor: '#' + color,
                          MozTextStrokeColor: '#' + color,
                          color: 'transparent',
                      }
                    : {
                          color: '#' + color,
                      }),

                '&:before': {
                    pointerEvents: 'none',
                    content: '"' + text + '"',
                    background:
                        'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg" width="' +
                        6 * patternZoom +
                        'px" height="' +
                        4 * patternZoom +
                        'px"><defs></defs><polygon points="0 0 6 4 6 3 1.5 0" fill="%23' +
                        color +
                        '"></polygon><polygon points="0 4 1.5 4 0 3" fill="%23' +
                        color +
                        '"></polygon></svg>\') repeat',
                    left: 'calc(50% + ' + distance + ')',
                    position: 'absolute',
                    top: 'calc(50% + ' + distance + ')',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    width: '100%',
                    WebkitTextStrokeWidth: 0,
                    MozWebkitTextStrokeWidth: 0,
                    WebkitBackgroundClip: 'text',
                    MozBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    MozTextFillColor: 'transparent',
                },
            }}
        >
            {text}
        </Typography>
    );
};

export default FunTypo;
