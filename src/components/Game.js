// import { useTheme } from '@emotion/react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { gameNext, newGame } from 'store/actions';
import { useCurrentGame } from 'store/selector';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Box, Stack } from '@mui/material';

import GameEnd from './gameComponents/GameEnd';
import GameProgress from './gameComponents/GameProgress';
import GameQuestion from './gameComponents/GameQuestion';
import MainButton from './ui/MainButton';

const Game = () => {
    const dispatch = useDispatch();
    // const theme = useTheme();
    const { t } = useTranslation();

    const game = useCurrentGame();

    if (!game) {
        return null;
    }

    const phase = game.currentPhase;
    const isEnd = game.currentTurn >= game.questions.length;

    const handleNext = () => {
        if (phase === 1) {
            dispatch(gameNext());
        }
    };
    const handleClickHome = () => {
        dispatch(newGame());
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
            sx={{
                width: '100%',
                flexGrow: 1,
            }}
        >
            {isEnd ? (
                <GameEnd game={game} />
            ) : (
                <>
                    <GameProgress game={game} />
                    <GameQuestion game={game} />
                </>
            )}
            <Stack
                justifyContent="center"
                flexDirection="column"
                spacing={1}
                sx={{
                    my: 4,
                    width: 'auto', // isEnd ? 'auto' : '100%',
                }}
            >
                {isEnd ? (
                    <MainButton
                        buttonP={{
							color: "success",
							size: "large",
							onClick: handleClickHome,
							startIcon: <ArrowCircleLeftIcon />,
                        }}
                    >
                        {t('Home')}
                    </MainButton>
                ) : (
                    <MainButton
                        buttonP={{
							color: "success",
							size: "large",
                        	disabled: (phase === 0),
							onClick: handleNext,
							endIcon: <ArrowCircleRightIcon />,
                        }}
						typoP={{
							fontSize: "20px",
							fontWeight: "700",
						}}
                    >
                            {t('Next')}
                    </MainButton>
                )}
            </Stack>
        </Box>
    );
};

export default Game;
