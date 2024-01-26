
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
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
} from '@mui/material';

import { editSettings, useLanguage, useIsDarkMode } from '../store/actions';

const Settings = (props) => {
    const { settingsDialogOpen, handleClose, deferredPrompt } = props;
    const [ showInstallButton, setShowInstallButton ] = useState(true);
    // const [ language, setLanguage ] = useState("fra");
    const dispatch = useDispatch();
    const isDarkMode = useIsDarkMode();
    const language = useLanguage();
    console.log(language);

    const languages = [
        {
            key: "fra",
            name: {
                "fra": "Français",
                "eng": "French",
            }
        },
        {
            key: "eng",
            name: {
                "fra": "Anglais",
                "eng": "English",
            }
        }];

    const handleClickLightMode = () => {
        dispatch(editSettings({isDarkMode: !isDarkMode}));
    }
    const handleClickLanguage = (event) => {
        dispatch(editSettings({language: event.target.value}));
    }

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
        <Dialog
            open={settingsDialogOpen}
            onClose={handleClose}
            aria-labelledby="settings-dialog-title"
        >
            <DialogTitle id="settings-dialog-title">{`Settings`}</DialogTitle>
            <IconButton
                aria-label="close"
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
            <DialogContent >
                <Stack
                    justifyItems="center"
                    spacing={2}
                >
                    <Button
                        onClick={handleClickLightMode}
                        value={isDarkMode}
                        endIcon=
                            {isDarkMode ? (
                                <DarkModeIcon />
                            ) : (
                                <LightModeIcon />
                            )}
                    >
                        Dark Mode
                    </Button>
                    <ToggleButtonGroup
                        // color="secondary"
                        value={language}
                        exclusive
                        onChange={handleClickLanguage}
                        aria-label="Language"
                        label="Language"
                        name="Language"
                        size="small"
                        variant="text"
                        // disabled={true}
                        sx={{
                            justifyContent: "center",
                        }}
                    >
                        {languages.map((lang) => (
                            <ToggleButton key={lang.key} value={lang.key}>
                                {lang.name[language]}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    {deferredPrompt && showInstallButton && (
                        <Button
                            onClick={handleClickInstall}
                            endIcon=
                                {isMobile ? (
                                    <InstallMobileIcon />
                                ) : (
                                    <InstallDesktopIcon />
                                )}
                        >
                            Install Country Quiz
                        </Button>
                    )}
                </Stack>
            </DialogContent >
        </Dialog>
    );
};

export default Settings;