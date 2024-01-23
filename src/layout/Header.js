// import { wrapperForAbsolute, mainPadding, colors } from "styles/styles";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newGame, useCurrentGame } from 'store/actions';

import CancelIcon from '@mui/icons-material/Cancel';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Stack, // SvgIcon,
    Typography, // useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// import { SIDE_NAV_WIDTH } from './SideNav';

export const TOP_NAV_HEIGHT = 64;

const Header = (props) => {
    const { deferredPrompt } = props;
    const [showInstallButton, setShowInstallButton] = useState(true);
    const game = useCurrentGame();
    const dispatch = useDispatch();

    // const { onNavOpen } = props;
    // const mdgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    // const handleClickLock = () => {
    // 	dispatch(changeOverrideMode());
    // };

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

    const handleClickSettings = (e) => {};
    const handleClickClose = (e) => {
        setConfirmCancelGameOpen(true);
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

    return (
        <React.Fragment>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) =>
                        alpha(theme.palette.background.default, 0.8),
                    left: {
                        // md: `${SIDE_NAV_WIDTH}px`,
                        position: 'relative',
                    },
                    // width: {
                    //     md: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                    // },
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2,
                    }}
                >
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {/*!mdgUp && (
                            <IconButton onClick={onNavOpen}>
                                <SvgIcon fontSize="small">
                                    <Menu />
                                </SvgIcon>
                            </IconButton>
                        )*/}
                        <OfflineBoltIcon
                            color="primary"
                            sx={{
                                fontSize: 36,
                                marginRight: '4px',
                            }}
                        />
                        <Typography
                            variant="h1"
                            color="primary"
                            sx={{
                                fontSize: 32,
                                marginRight: '4px',
                                fontWeight: 800,
                            }}
                        >
                            Country Quiz
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {game ? (
                            <IconButton
                                aria-label="close"
                                onClick={handleClickClose}
                                size="small"
                                // sx={{
                                //     color: "#ccc",
                                // }}
                            >
                                <CancelIcon />
                            </IconButton>
                        ) : (
                            <React.Fragment>
                                {deferredPrompt && showInstallButton && (
                                    <IconButton
                                        aria-label="Install"
                                        onClick={handleClickInstall}
                                        size="small"
                                        sx={{
                                            color: '#ccc',
                                        }}
                                    >
                                        {isMobile ? (
                                            <InstallMobileIcon />
                                        ) : (
                                            <InstallDesktopIcon />
                                        )}
                                    </IconButton>
                                )}
                                <IconButton
                                    aria-label="Settings"
                                    onClick={handleClickSettings}
                                    size="small"
                                    sx={{
                                        color: '#ccc',
                                    }}
                                >
                                    <SettingsIcon />
                                </IconButton>
                            </React.Fragment>
                        )}
                    </Stack>
                </Stack>
            </Box>
            <Dialog
                open={confirmCancelGameOpen}
                onClose={handleConfirmCancelGameClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{`Abandon the game?`}</DialogTitle>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleConfirmCancelGameDisagree}
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmCancelGameClose}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Header;
