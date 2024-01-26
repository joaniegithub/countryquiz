import * as React from 'react';

import { Box, Typography } from '@mui/material';

const HEIGHT = 24;

const Footer = (props) => {
    // const dispatch = useDispatch();

    // const handleClickRules = () => {
    // 	dispatch(openRules(true));
    // };

    return (
        <Box component="footer">
            <Typography
                component="p"
                fontSize="12px"
                textAlign="center"
                lineHeight={`${HEIGHT}px`}
            >
                Country Quiz @2024 Joanie Lessnick
            </Typography>
        </Box>
    );
};

export default Footer;
