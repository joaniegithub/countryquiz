import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CssBaseline, ThemeProvider } from '@mui/material';

import './App.css';
import Game from './components/Game';
import Home from './components/Home';
import Layout from './layout/Layout';
import Wiki from './components/Wiki';

import { useInGame, useInWiki, useIsDarkMode } from './store/selector';
import { createTheme as createMyTheme } from './theme';
import { createTheme as createMyThemeDark } from './theme/dark';

const theme = createMyTheme();
const darkTheme = createMyThemeDark();

const CountryQuizApp = (props) => {
    const [deferredPrompt, setDeferredPrompt] = useState(undefined);

	const { i18n } = useTranslation();
	// console.log(i18n);
    
    const inGame = useInGame();
    const inWiki = useInWiki();
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
                {inGame ? <Game /> : inWiki ? <Wiki /> : <Home />}
                {/* <InfoModal openInfoModal={showRules} onCloseInfoModal={handleCloseInfoModal} /> */}
            </Layout>
        </ThemeProvider>
    );
};

export default CountryQuizApp;
