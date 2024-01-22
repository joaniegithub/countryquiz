import * as React from 'react';
import { useState } from 'react';

import { Box, Container } from '@mui/material';

import Footer from './Footer';
import Header from './Header';
import SideNav from './SideNav';
import { SIDE_NAV_WIDTH } from './SideNav';

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

const Layout = (props) => {
    const { deferredPrompt } = props;
    const [openNav, setOpenNav] = useState(false);

    return (
        <Container
            maxWidth="md"
            sx={{
                // backdropFilter: "blur(6px)",
                // backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                // position: "sticky",
                // top: 0,
                // width: {
                // 	md: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                // },
                // zIndex: (theme) => theme.zIndex.appBar,
                maxWidth: (theme) => theme.breakpoints.values.sm,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                px: 2,
            }}
            md={{
                maxWidth: (theme) => theme.breakpoints.values.md,
            }}
        >
            <SideNav
                deferredPrompt={deferredPrompt}
                onClose={() => setOpenNav(false)}
                open={openNav}
            />
            <Header images={images} onNavOpen={() => setOpenNav(true)} />
            <Box
                component="main"
                sx={{
                    // backdropFilter: "blur(6px)",
                    // backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    // position: "sticky",
					display: "flex",
					flexDirection: "column",
                    left: {
                        md: `${SIDE_NAV_WIDTH}px`,
                        position: 'relative',
                    },
                    // top: 0,
                    width: {
                        md: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                    },
                    // zIndex: (theme) => theme.zIndex.appBar,
                    flexGrow: 1,
                    px: 2,
                }}
            >
                {props.children}
            </Box>
            <Footer
                sx={{
                    left: {
                        md: `${SIDE_NAV_WIDTH}px`,
                        position: 'relative',
                    },
                    width: {
                        md: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                    },
                }}
            />
        </Container>
    );
};
export default Layout;
