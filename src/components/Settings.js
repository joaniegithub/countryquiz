import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

import { editSettings } from '../store/actions';
import { useIsDarkMode, useLanguage } from '../store/selector';

const Settings = (props) => {
    const { settingsDialogOpen, handleClose, deferredPrompt } = props;
    const [showInstallButton, setShowInstallButton] = useState(true);
    const dispatch = useDispatch();
    const isDarkMode = useIsDarkMode();
    const language = useLanguage();
    const { t, i18n } = useTranslation();

    const handleClickLightMode = () => {
        dispatch(editSettings({ isDarkMode: !isDarkMode }));
    };
    const handleClickLanguage = (event) => {
        dispatch(editSettings({ language: event.target.value }));
        i18n.changeLanguage(event.target.value);
    };

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
        <Dialog open={settingsDialogOpen} onClose={handleClose} aria-labelledby="settings-dialog-title">
            <DialogTitle id="settings-dialog-title">{t('Settings')}</DialogTitle>
            <IconButton
                aria-label={t('Close')}
                onClick={handleClose}
                color="text"
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <Stack justifyItems="center" spacing={3}>
                    <ToggleButtonGroup
                        color="primary"
                        value={language}
                        exclusive
                        onChange={handleClickLanguage}
                        aria-label={t('Language')}
                        label={t('Language')}
                        name="Language"
                        size="small"
                        variant="text"
                        sx={{
                            justifyContent: 'center',
                        }}
                    >
                        {Object.keys(i18n.store.data).map((lang) => (
                            <ToggleButton key={lang} value={lang}>
                                {t(lang)}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <Button
                        onClick={handleClickLightMode}
                        value={isDarkMode}
                        endIcon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    >
                        {t(isDarkMode ? 'Light Mode' : 'Dark Mode')}
                    </Button>
                    {deferredPrompt && showInstallButton && (
                        <Button
                            variant="outlined"
                            onClick={handleClickInstall}
                            endIcon={isMobile ? <InstallMobileIcon /> : <InstallDesktopIcon />}
                        >
                            {`${t('Install')} ${t('Country')} ${t('Quiz')}`}
                        </Button>
                    )}
                    <Typography
                        component="p"
                        fontSize="10px"
                        textAlign="center"
                        // lineHeight={`${HEIGHT}px`}
                    >
                        {`${t('Country')} ${t('Quiz')}`} @2024 Joanie Lessnick
                    </Typography>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default Settings;
