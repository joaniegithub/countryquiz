import * as React from 'react';

import { Box, Container, Stack } from '@mui/material';

import Footer from './Footer';
import Header from './Header';

const images = [
    'arab_tile',
    'bush',
    'circuit',
    'full-bloom',
    'gplaypattern',
    'greek-vase',
    'herringbone',
    'hotel-wallpaper',
    'more-leaves',
    'moroccan-flower',
    'moroccan-flower-dark',
    'morocco-blue',
    'new_year_background',
    'regal',
    'ripples',
    'tree_bark',
    'trees',
];

// const styles = (theme) => ({
// 	container: {
// 		backgroundColor: "#fff",
// 		margin: "0",
// 		padding: "0 !important",

// 		minHeight: "100%",
// 		display: "flex !important",
// 		flexDirection: "column",
// 		"@media (min-width: 901px)": {
// 			border: "#ddd 1px solid",
// 			minHeight: "initial",
// 		},
// 	},
// 	// ["@media (mmin-width: 900px)"]: {
// 	// 	// eslint-disable-line no-useless-computed-key
// 	// 	minHeight: "initial",
// 	// },

// 	main: {
// 		// margin: "0 16px",
// 		flexGrow: 1,
// 	},
// });

const Layout = (props) => {
    const { deferredPrompt } = props;

    return (
        <Container maxWidth="md">
            <Header images={images} deferredPrompt={deferredPrompt} />
            <Box
                component="main"
                sx={{
                    // backdropFilter: "blur(6px)",
                    // backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    // position: "sticky",
                    // left: {
                    // 	md: `${SIDE_NAV_WIDTH}px`,
                    // },
                    // top: 0,
                    // width: {
                    // 	md: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                    // },
                    // zIndex: (theme) => theme.zIndex.appBar,
                    px: 2,
                }}
            >
                {props.children}
            </Box>
            <Footer />
        </Container>
    );
};
export default Layout;
