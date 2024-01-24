import * as React from 'react';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
// import { openRules } from "store/actions";
// import { mainPadding } from "styles/styles";
// import { useDispatch } from "react-redux";
import { Box, Stack, Typography } from '@mui/material';

// import { SIDE_NAV_WIDTH } from './SideNav';

const HEIGHT = 36;

const Footer = (props) => {
    // const dispatch = useDispatch();

    // const handleClickRules = () => {
    // 	dispatch(openRules(true));
    // };

    return (
        <Box
            component="footer"
        >
			<Typography
				fontSize="12px"
				textAlign="center"
				lineHeight="24px"
			>
				Country Quiz @2024 Joanie Lessnick
			</Typography>
        </Box>
    );
};

export default Footer;
