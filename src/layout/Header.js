import { useTheme } from '@emotion/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Settings from 'components/Settings';
import FunTypo from 'components/ui/FunTypo';
import MainButton from 'components/ui/MainButton';

import { newGame } from 'store/actions';
import { useInGame, useCurrentGame, useInWiki } from 'store/selector';

import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Dialog, DialogActions, DialogTitle, IconButton, Stack, Typography } from '@mui/material';

export const TOP_NAV_HEIGHT = 64;

const Header = (props) => {
    const { deferredPrompt } = props;
    const inGame = useInGame();
    const game = useCurrentGame();
    const inWiki = useInWiki();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // const mdgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const handleClickCloseGame = (e) => {
        setConfirmCancelGameOpen(true);
    };

    // Settings Delete Dialog
    const [settingsOpen, setSettingsOpen] = useState(false);
    const handleClickSettings = (e) => {
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        setSettingsOpen(false);
    };
    // Confirm Quit Game Dialog
    const [confirmCancelGameOpen, setConfirmCancelGameOpen] = useState(false);
    const handleConfirmCancelGameClose = () => {
        setConfirmCancelGameOpen(false);
        dispatch(newGame());
    };
    const handleConfirmCancelGameDisagree = () => {
        setConfirmCancelGameOpen(false);
    };
    const closeRef = React.useRef < HTMLElement > null;
    const handleEntering = () => {
        if (closeRef.current != null) {
            closeRef.current.focus();
        }
    };
    const isEnd = game.currentTurn >= game.questions.length;

    return (
        <React.Fragment>
            <Box
                component="header"
                sx={{
                    position: 'relative',
                }}
            >
                {(inGame || inWiki) && (
                    <Typography
                        component="h1"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: TOP_NAV_HEIGHT,
                            lineHeight: TOP_NAV_HEIGHT + 'px',
                            textAlign: 'center',
                            px: 2,
                            mt: '-2px',
                        }}
                    >
                        <FunTypo
                            text={t('Country')}
                            color={theme.palette.text.title.replace('#', '')}
                            stroke={true}
                            strokeWidth="1px"
                            distance="2px"
                            sx={{
                                fontSize: '36px',
                                lineHeight: TOP_NAV_HEIGHT + 'px',
                                fontWeight: 800,
                                textAlign: 'center',
                            }}
                        />
                        &nbsp;
                        <FunTypo
                            text={t('Quiz')}
                            color={theme.palette.text.title.replace('#', '')}
                            stroke={false}
                            strokeWidth="1px"
                            distance="2px"
                            sx={{
                                fontSize: '36px',
                                lineHeight: TOP_NAV_HEIGHT + 'px',
                                fontWeight: 800,
                                textAlign: 'center',
                            }}
                        />
                    </Typography>
                )}
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 0,
                    }}
                >
                    {inGame ? (
                        <>
                            {isEnd && (
                                <IconButton aria-label={t('Close')} onClick={handleClickCloseGame} size="large" color="text">
                                    <CancelIcon />
                                </IconButton>
                            )}
                        </>
                    ) : (
                        <React.Fragment>
                            <IconButton
                                aria-label={t('Settings')}
                                onClick={handleClickSettings}
                                size="large"
                                color="text"
                            >
                                <SettingsIcon />
                            </IconButton>
                        </React.Fragment>
                    )}
                </Stack>
            </Box>
            <Dialog
                open={confirmCancelGameOpen}
                TransitionProps={{ onEntering: handleEntering }}
                // onClose={handleConfirmCancelGameClose}
                aria-labelledby="quit-dialog-title"
            >
                <DialogTitle id="quit-dialog-title">{t('Quit the game?')}</DialogTitle>
                <DialogActions
                    sx={{
                        p: '12px',
                        justifyContent: 'center',
                    }}
                >
                    <MainButton
                        buttonP={{
                            variant: 'outlined',
                            onClick: handleConfirmCancelGameDisagree,
                        }}
                        typoP={{
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        {t('No')}
                    </MainButton>
                    <MainButton
                        buttonP={{
                            onClick: handleConfirmCancelGameClose,
                        }}
                        typoP={{
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        {t('Yes')}
                    </MainButton>
                </DialogActions>
            </Dialog>
            <Settings
                settingsDialogOpen={settingsOpen}
                handleClose={handleSettingsClose}
                deferredPrompt={deferredPrompt}
            />
        </React.Fragment>
    );
};

export default Header;
