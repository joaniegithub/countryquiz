import { useTheme } from '@emotion/react';
import { ReactComponent as GlobeIcon } from 'assets/images/globe.svg';
import { TOP_NAV_HEIGHT } from 'layout/Header';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
// import GameFlag from './ui/GameFlag';
// import countriesData from 'data/countries.json';
import { setInWiki } from 'store/actions';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box, Stack, SvgIcon, Typography } from '@mui/material';

import NewGame from './NewGame';
import FunTypo from './ui/FunTypo';
import MainButton from './ui/MainButton';

const SCREEN_HOME = 0;
const SCREEN_GAME_OPTIONS = 1;
// const SCREEN_WIKI = 2;

const Home = () => {
    const [screen, setScreen] = useState(0);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleClickNewGame = () => {
        setScreen(SCREEN_GAME_OPTIONS);
    };
    const handleClickWiki = () => {
        dispatch(setInWiki(true));
    };

    const handleClickHome = () => {
        setScreen(SCREEN_HOME);
    };

    const showHome = screen === SCREEN_HOME;
    const showGameOptions = screen === SCREEN_GAME_OPTIONS;

    return (
        <>
            <Stack
                alignItems="center"
                direction="column"
                justifyContent="flex-start"
                height="100%"
                flexGrow={1}
                sx={
                    {
                        // background: "#000",
                    }
                }
            >
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="flex-end"
                    sx={{
                        height: showHome
                            ? 'calc(40vh - ' + TOP_NAV_HEIGHT + 'px)'
                            : 'calc(20vh - ' + TOP_NAV_HEIGHT + 'px)',
                        transition: 'height 0.25s ease',
                    }}
                >
                    <Typography variant="h1" display="block" mt="-20px">
                        <FunTypo
                            text={t('Country')}
                            color={theme.palette.text.title.replace('#', '')}
                            stroke={true}
                            strokeWidth="2px"
                            distance={6 * (showHome ? 1 : 0.75) + 'px'}
                            sx={{
                                display: 'block',
                                fontSize: 84 * (showHome ? 1 : 0.75) + 'px',
                                lineHeight: 110 * (showHome ? 1 : 0.75) + 'px',
                                fontWeight: 800,
                                textAlign: 'center',
                                mb: -52 * (showHome ? 1 : 0.75) + 'px',
                                transition: '0.25s ease',
                            }}
                        />
                        <FunTypo
                            text={t('Quiz')}
                            color={theme.palette.text.title.replace('#', '')}
                            stroke={false}
                            strokeWidth="2px"
                            distance={7 * (showHome ? 1 : 0.75) + 'px'}
                            sx={{
                                display: 'block',
                                fontSize: 120 * (showHome ? 1 : 0.75) + 'px',
                                lineHeight: 132 * (showHome ? 1 : 0.75) + 'px',
                                fontWeight: 800,
                                textAlign: 'center',
                                transition: '0.25s ease',
                            }}
                        />
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="flex-start"
                    width="100%"
                    sx={{
                        height: showHome ? '35vh' : '69vh',
                        transition: 'height 0.25s ease',
                    }}
                >
                    {showGameOptions ? (
                        <NewGame />
                    ) : (
                        <SvgIcon
                            sx={{
                                color:
                                    theme.palette.mode === 'dark'
                                        ? theme.palette.primary.light
                                        : theme.palette.secondary.main,
                                // color: purple.darkest,
                                height: '240px',
                                width: '240px',
                                opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
                            }}
                        >
                            <GlobeIcon />
                        </SvgIcon>
                    )}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="flex-start"
                    my={4}
                    sx={{
                        height: showHome ? '25vh' : '6vh',
                        transition: 'height 0.25s ease',
                    }}
                >
                    {showHome ? (
                        <Stack spacing={2}>
                            <MainButton
                                buttonP={{
                                    onClick: handleClickNewGame,
                                }}
                            >
                                {t('Play')}
                            </MainButton>
                            <MainButton
                                buttonP={{
                                	color: 'success',
                                    onClick: handleClickWiki,
                                }}
                            >
                                {t('Wiki')}
                            </MainButton>
                        </Stack>
                    ) : (
                        <MainButton
                            buttonP={{
                                color: 'success',
                                onClick: handleClickHome,
                                startIcon: <ArrowCircleLeftIcon />,
                            }}
                        >
                            {t('Home')}
                        </MainButton>
                    )}
                </Box>
            </Stack>
        </>
    );
};

export default Home;
