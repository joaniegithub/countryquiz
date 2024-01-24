import * as React from 'react';

import { Typography } from '@mui/material';



const FunTypo = (props) => {
	const {
		text,
		color = "000",
		stroke = false,
		strokeWidth = "2px",
		distance = "3px",
		patternZoom = 1,
		// fontSize,
		// fontWeight,
		// lineHeight,
		// mb
		sx,
	} = props;

    // const title = "Country";
    // const title2 = "Quiz";
    // const color = "000";
    // const strokeWidth = "px";

    return (
		<Typography
			component="span"
			sx={{
				...sx,
				position: "relative",
				textAlign: "center",
				width: "100%",
				zIndex: 2,
				...(stroke ? {
					"-webkit-text-stroke-width": strokeWidth,
					"-moz-text-stroke-width": strokeWidth,
					"-webkit-text-stroke-color": "#"+color,
					"-moz-text-stroke-color": "#"+color,
					color: "transparent",
				} : {
					color: "#"+color,
				}),

				'&:before': {
					pointerEvents: "none",
					content: '"'+text+'"',
					background: 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg" width="'+(6*patternZoom)+'px" height="'+(4*patternZoom)+'px"><defs></defs><polygon points="0 0 6 4 6 3 1.5 0" fill="%23'+color+'"></polygon><polygon points="0 4 1.5 4 0 3" fill="%23'+color+'"></polygon></svg>\') repeat',
					left: "calc(50% + "+distance+")",
					position: "absolute",
					top: "calc(50% + "+distance+")",
					transform: "translate(-50%, -50%)",
					zIndex: 1,
					width: "100%",
					"-webkit-text-stroke-width": 0,
					"-moz-text-stroke-width": 0,
					"-webkit-background-clip": "text",
					"-moz-background-clip": "text",
					"background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"-moz-text-fill-color": "transparent",
				}
			}}
		>
			{text}
		</Typography>
    );
};

export default FunTypo;