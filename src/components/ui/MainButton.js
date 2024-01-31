
import * as React from 'react';
import { useTheme } from '@emotion/react';
import { alpha } from '@mui/material/styles';

import { Button, Typography } from '@mui/material';

const MainButton = (props) => {
    const theme = useTheme();
	const {buttonP, typoP, children} = props;
	return (                        
		<Button
			color="primary"
			size="large"
			variant="contained"
			{...buttonP}
		>
			<Typography
				component="span"
				fontSize="20px"
				fontWeight="700"
				{...typoP}
				sx={{
					textShadow: `2px 2px 0px ${alpha(theme.palette.shadow, 0.3)}`,
				}}
			>
				{children}
			</Typography>
		</Button>
	);
};

export default MainButton;