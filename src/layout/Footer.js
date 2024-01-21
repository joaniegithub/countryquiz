import * as React from 'react';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
// import { openRules } from "store/actions";
// import { mainPadding } from "styles/styles";
// import { useDispatch } from "react-redux";
import { Link } from '@mui/material';
import { Stack } from '@mui/material';

const styles = () => ({
    footer: {
        display: 'flex !important',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // ...mainPadding,
        backgroundColor: '#fafafa',
        paddingTop: '4px',
        paddingBottom: '4px',
    },
    footerLinks: {
        display: 'block',
    },
    footerCopyright: {
        display: 'block',
        fontSize: '12px',
        lineHeight: '20px',
        width: '100%',
        textAlign: 'right',
        margin: '0',
    },
});

const Footer = (props) => {
    const { classes } = props;
    // const dispatch = useDispatch();

    // const handleClickRules = () => {
    // 	dispatch(openRules(true));
    // };

    return (
        <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
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
    );
};

export default Footer;
