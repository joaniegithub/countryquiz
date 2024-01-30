
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { gameNext, newGame } from 'store/actions';
import { useCurrentGame } from 'store/selector';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {
    Box,
    Button,
    Stack,
} from '@mui/material';

import FunTypo from './ui/FunTypo';
import GameQuestion from './gameComponents/GameQuestion';
import GameProgress from './gameComponents/GameProgress';
import GameEnd from './gameComponents/GameEnd';

const Game = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
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
				<React.Fragment>
					<GameProgress game={game} />
					<GameQuestion game={game} />
				</React.Fragment>
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
				) : (
					<Button
						variant="contained"
						color="secondary"
						size="large"
						disabled={phase === 0}
						onClick={handleNext}
						endIcon={<ArrowCircleRightIcon />}
					>
						<FunTypo
							text={t("Next")}
							color={(phase === 0 ? theme.palette.text.primary : theme.palette.text.primary).replace(
								'#',
								''
							)}
							stroke={false}
							strokeWidth="2px"
							distance="3px"
							sx={{
								fontSize: '24px',
								lineHeight: '24px',
								fontWeight: 700,
								mb: '4px',
								...(phase === 0 ? {opacity: 0.38} : {}),
							}}
						/>
					</Button>
				)}
            </Stack>
        </Box>
    );
};

export default Game;
