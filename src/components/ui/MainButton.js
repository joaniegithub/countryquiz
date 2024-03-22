import { useTheme } from '@emotion/react';
import * as React from 'react';

import { Button, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

const MainButton = (props) => {
    const theme = useTheme();
    const { buttonP, typoP, isFlag, children } = props;
	
    return (
        <Button
			color="primary"
			size="large"
			variant={isFlag ? "outlined" : "contained"}
			{...buttonP}
			sx={{
				...buttonP?.sx,
				'svg': {
                    filter: `drop-shadow(2px 2px 0px ${alpha(theme.palette.shadow, 0.2)})`,
				}
			}}
		>
			{isFlag ? <>{children}</> : (
				<Typography
					component="span"
					fontSize="24px"
					fontWeight="800"
					{...typoP}
					sx={{
						textShadow: `2px 2px 0px ${alpha(theme.palette.shadow, 0.2)}`,
					}}
				>
					{children}
				</Typography>
			)}
        </Button>
    );
};

export default MainButton;
