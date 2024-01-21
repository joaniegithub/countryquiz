import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { newGame, useCurrentGame } from 'store/actions';
import { useDispatch } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    Drawer,
    IconButton,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery,
} from '@mui/material';

import { TOP_NAV_HEIGHT } from './Header';
import { SideNavItem } from './SideNavItem';

export const SIDE_NAV_WIDTH = 280;

export const SideNav = (props) => {
    const { open, onClose, deferredPrompt } = props;
    const [showInstallButton, setShowInstallButton] = useState(true);
    const mdgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const dispatch = useDispatch();
    const game = useCurrentGame();

    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

    // Installation must be done by a user gesture! Here, the button click
    const handleClickInstall = (e) => {
        // hide our user interface that shows our A2HS button
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                setShowInstallButton(false);
            } else {
                console.log('User dismissed the A2HS prompt');
            }
        });
    };
    
    // Confirm Delete Dialog
    const [confirmCancelGameOpen, setConfirmCancelGameOpen] = useState(false);
    const handleConfirmCancelGameClose = () => {
        setConfirmCancelGameOpen(false);
        dispatch(newGame());
    };
    const handleConfirmCancelGameDisagree = () => {
        setConfirmCancelGameOpen(false);
    };
    const handleCancelGame = () => {
        setConfirmCancelGameOpen(true);
    };

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Box
                component="nav"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 3,
                }}
            >
                <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0,
                    }}
                >
                    {game && (
                        <SideNavItem
                            // active={active}
                            // disabled={item.disabled}
                            // external={item.external}
                            key="Abandon"
                            title="Abandon"
                            onClick={handleCancelGame}
                        />
                    )}
                </Stack>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box
                component="nav"
                sx={{
                    px: 2,
                    py: 3,
                }}
            >
                <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0,
                    }}
                >
                    <SideNavItem
                        // active={active}
                        // disabled={item.disabled}
                        // external={item.external}
                        icon={
                            <SvgIcon fontSize="small">
                                <SettingsIcon />
                            </SvgIcon>
                        }
                        key="Settings"
                        title="Settings"
                    />
                    {deferredPrompt && showInstallButton && (
                        <SideNavItem
                            // active={active}
                            // disabled={item.disabled}
                            // external={item.external}
                            icon={
                                <SvgIcon fontSize="small">
                                    {isMobile ? (
                                        <InstallMobileIcon />
                                    ) : (
                                        <InstallDesktopIcon />
                                    )}
                                </SvgIcon>
                            }
                            key="Install Country Quiz"
                            title="Install Country Quiz"
                            onClick={handleClickInstall}
                        />
                    )}
                </Stack>
            </Box>
        </Box>
    );

    if (mdgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.800',
                        color: 'common.white',
                        width: SIDE_NAV_WIDTH,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                onClose={onClose}
                open={open}
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.800',
                        color: 'common.white',
                        width: 280,
                    },
                }}
                sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                variant="temporary"
            >
                <Stack
                    justifyContent="flex-end"
                    alignItems="center"
                    direction="row"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2,
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: '#ccc',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
                {content}
            </Drawer>
            <Dialog
                open={confirmCancelGameOpen}
                onClose={handleConfirmCancelGameClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{`Abandonner la partie?`}</DialogTitle>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleConfirmCancelGameDisagree}
                    >
                        Non
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmCancelGameClose}
                        autoFocus
                    >
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

SideNav.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};

export default SideNav;
