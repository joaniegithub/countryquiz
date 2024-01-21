import * as React from 'react';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
// import { openRules } from "store/actions";
// import { mainPadding } from "styles/styles";
// import { useDispatch } from "react-redux";
import { Box, Stack } from '@mui/material';

import { SIDE_NAV_WIDTH } from './SideNav';

const HEIGHT = 36;

const Footer = (props) => {
    // const dispatch = useDispatch();

    // const handleClickRules = () => {
    // 	dispatch(openRules(true));
    // };

    return (
        <Box
            component="footer"
            sx={{
                left: {
                    md: `${SIDE_NAV_WIDTH}px`,
                    position: 'relative',
                },
                width: {
                    md: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                },
            }}
        >
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{
                    minHeight: HEIGHT,
                    px: 2,
                }}
            >
                {/* <Link onClick={() => handleClickRules()} size="small" component="button">
                About
            </Link> */}
                <p>Country Quiz @2024 Joanie Lessnick</p>
                <OfflineBoltIcon
                    sx={{
                        fontSize: 24,
                        marginRight: '4px',
                    }}
                />
            </Stack>
        </Box>
    );
};

export default Footer;
