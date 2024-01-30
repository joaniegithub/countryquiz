
import * as React from 'react';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box, Button, Stack, Typography } from '@mui/material';


import { TOP_NAV_HEIGHT } from 'layout/Header';
import NewGame from './NewGame';
import FunTypo from './ui/FunTypo';
// import GameFlag from './ui/GameFlag';
// import countriesData from 'data/countries.json';
import { setInWiki } from 'store/actions';
import { useDispatch } from 'react-redux';

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
        <React.Fragment>
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
                    justifyContent="center"
                    sx={{
                        height: showHome
                            ? 'calc(60vh - ' + (TOP_NAV_HEIGHT + 24) + 'px)'
                            : 'calc(25vh - ' + (TOP_NAV_HEIGHT + 24) + 'px)',
                        transition: 'height 0.25s ease',
                        // overflowY: "hidden",
                    }}
                >
                    <Typography variant="h1" display="block" mt="-20px">
                        <FunTypo
                            text={t("Country")}
                            color={theme.palette.text.title.replace('#', '')}
                            stroke={true}
                            strokeWidth="2px"
                            distance={6 * (showHome ? 1 : 0.75) + 'px'}
                            sx={{
                                display: 'block',
                                fontSize:
                                    84 * (showHome ? 1 : 0.75) + 'px',
                                lineHeight:
                                    110 * (showHome ? 1 : 0.75) + 'px',
                                fontWeight: 800,
                                textAlign: 'center',
                                mb: -56 * (showHome ? 1 : 0.75) + 'px',
                                transition: '0.25s ease',
                            }}
                        />
                        <FunTypo
                            text={t("Quiz")}
                            color={theme.palette.text.title.replace('#', '')}
                            stroke={false}
                            strokeWidth="2px"
                            distance={7 * (showHome ? 1 : 0.75) + 'px'}
                            sx={{
                                display: 'block',
                                fontSize:
                                    120 * (showHome ? 1 : 0.75) + 'px',
                                lineHeight:
                                    132 * (showHome ? 1 : 0.75) + 'px',
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
                    justifyContent="center"
					width="100%"
                    sx={{
                        height: showHome ? '5vh' : '65vh',
                        transition: 'height 0.25s ease',
                        // overflowY: "hidden",
                    }}
                >
                    {showGameOptions && <NewGame />}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    sx={{
                        height: showHome ? '35vh' : '10vh',
                        transition: 'height 0.25s ease',
                    }}
                >
                    {showHome ? (
						<Stack
                			spacing={2}
							// display="flex"
							// flexDirection="column"
							// sx={{
							// 	display: showGameOptions ? '65vh' : '5vh',
							// 	transition: 'height 0.25s ease',
							// 	// overflowY: "hidden",
							// }}
						>
							<Button
								variant="contained"
								size="large"
								onClick={handleClickNewGame}
							>
								<FunTypo
									text={t("Play")}
									color="fff"
									stroke={false}
									strokeWidth="2px"
									distance="3px"
									sx={{
										fontSize: '24px',
										lineHeight: '24px',
										fontWeight: 700,
										mb: '4px',
									}}
								/>
							</Button>
							<Button
								variant="contained"
								size="large"
								onClick={handleClickWiki}
							>
								<FunTypo
									text={t("Wiki")}
									color="fff"
									stroke={false}
									strokeWidth="2px"
									distance="3px"
									sx={{
										fontSize: '24px',
										lineHeight: '24px',
										fontWeight: 700,
										mb: '4px',
									}}
								/>
							</Button>
						</Stack>
                    ) : (
                        <Button
                            color="secondary"
							size="large"
							variant="contained"
                            onClick={handleClickHome}
                            startIcon={<ArrowCircleLeftIcon />}
                        >
                            <FunTypo
                                text={t("Home")}
								color="fff"
                                stroke={false}
                                strokeWidth="2px"
                                distance="3px"
                                sx={{
                                    fontSize: '24px',
                                    lineHeight: '24px',
                                    fontWeight: 800,
                                    mb: '4px',
                                }}
                            />
                        </Button>
                    )}
                </Box>
            </Stack>
			{/*Object.values(countriesData).map(c => {
				return (
					<React.Fragment>
						<Typography><br/>{c.cca3} {c.name.common}</Typography>
						<GameFlag country={c.cca3.toLowerCase()} />
					</React.Fragment>
				);
			})*/}
        </React.Fragment>
    );
};

export default Home;
