import { useEffect, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import './App.css';
import Game from './components/Game';
import Home from './components/Home';
import Layout from './layout/Layout';
import { useInGame, useIsDarkMode } from './store/actions';
import { createTheme as createMyTheme } from './theme';
import { createTheme as createMyThemeDark } from './theme/dark';

const theme = createMyTheme();
const darkTheme = createMyThemeDark();

const CountryQuizApp = (props) => {
    const [deferredPrompt, setDeferredPrompt] = useState(undefined);
    
    const inGame = useInGame();
    const isDarkMode = useIsDarkMode();

    const selectedTheme =
        isDarkMode ||
        (isDarkMode === undefined &&
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? darkTheme
            : theme;

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', function (event) {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            event.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(event);
        });
    }, []);

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Layout deferredPrompt={deferredPrompt}>
                {inGame ? <Game /> : <Home />}
                {/* <InfoModal openInfoModal={showRules} onCloseInfoModal={handleCloseInfoModal} /> */}
            </Layout>
        </ThemeProvider>
    );
};

export default CountryQuizApp;
