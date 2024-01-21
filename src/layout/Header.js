// import { wrapperForAbsolute, mainPadding, colors } from "styles/styles";
import * as React from 'react';
import { useState } from 'react';

import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Menu from '@mui/icons-material/Menu';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery,
} from '@mui/material';
// import { useCurrentGame, changeOverrideMode } from "store/actions";
// import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

const styles = () => ({
    header: {
        position: 'relative',
        display: 'flex !important',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // ...wrapperForAbsolute,
        // ...mainPadding,
        backgroundColor: '#fafafa',
        paddingTop: '4px',
        paddingBottom: '4px',
    },
    mainTitle: {
        fontFamily: 'Staatliches',
        fontSize: '24px',
        lineHeight: '40px',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
    },
});

const Header = (props) => {
    const { classes, deferredPrompt } = props;
    // const game = useCurrentGame();
    // const dispatch = useDispatch();

    const { onNavOpen } = props;
    const [showInstallButton, setShowInstallButton] = useState(true);
    const mdgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

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

    return (
        <Box
            component="header"
            sx={{
                backdropFilter: 'blur(6px)',
                backgroundColor: (theme) =>
                    alpha(theme.palette.background.default, 0.8),
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
                    {!mdgUp && (
                        <IconButton onClick={onNavOpen}>
                            <SvgIcon fontSize="small">
                                <Menu />
                            </SvgIcon>
                        </IconButton>
                    )}
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
                    <div>
                        {/*game && (
					<IconButton
						aria-label="close"
						onClick={handleClickLock}
						size="small"
						sx={{
							color: "#ccc",
						}}
					>
						{game.overrideMode ? <LockOpenIcon /> : <LockIcon />}
					</IconButton>
					)*/}

                        {deferredPrompt && showInstallButton && (
                            <IconButton
                                aria-label="close"
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
                    </div>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Header;
