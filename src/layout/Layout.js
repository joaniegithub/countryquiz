import * as React from 'react';
import { useMemo } from 'react';

import { Box, Container } from '@mui/material';

import Footer from './Footer';
import Header from './Header';
import BG from 'components/ui/BG';

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
    const bg = useMemo( () => <BG/>, [] );

    return (
        <React.Fragment>
            {bg}
            <Container
                maxWidth="md"
                sx={{
                    maxHeight: "100vh",
                    maxWidth: (theme) => {return {
                        xs: theme.breakpoints.values.sm,
                        // md: theme.breakpoints.values.md,
                    };},
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    px: 2,
                }}
            >
                <Header
                    images={images}
                    deferredPrompt={deferredPrompt}
                />
                <Box
                    component="main"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        px: 2,
                    }}
                >
                    {props.children}
                </Box>
                <Footer />
            </Container>
        </React.Fragment>
    );
};
export default Layout;
