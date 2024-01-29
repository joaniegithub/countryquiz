
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { gameAnswer, gameNext } from 'store/actions';
import { useCurrentGame } from 'store/selector';
import { COUNTRY_BY_FLAG, DIFFICULTY_EXPERT, DIFFICULTY_HARD } from 'data/config';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {
    Box,
    Button,
    Card,
    LinearProgress,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material';

import GameButton from './ui/GameButton';
import GameFlag from './ui/GameFlag';
import FunTypo from './ui/FunTypo';

const Game = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
	const { t, i18n } = useTranslation();
    
    const [chosenAnswer, setChosenAnswer] = useState('');
    const game = useCurrentGame();

    if (!game) {
        return null;
    }

    const turn = game.currentTurn;
    const phase = game.currentPhase;
    const difficultyLevel = game.difficultyLevel;
    const question = game.questions && game.questions[turn];
    const rightAnswer = question ? question.answer : undefined;

    const handleNext = () => {
        if (phase === 1) {
            dispatch(gameNext());
        }
    };

    const handleChoiceClick = (_chosenAnswer) => {
        if (phase === 0) {
            setChosenAnswer(_chosenAnswer);
            dispatch(gameAnswer(_chosenAnswer));
        }
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
            <Stack
                display="flex"
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                sx={{
                    my: 2,
                    width: '100%',
                }}
            >
				<Stack
					display="flex"
					alignItems="center"
					direction="row"
					sx={{
						width: 'auto',
					}}
				>
					<Typography
						color="secondary.contrast"
						fontSize="18px"
						textAlign="right"
						fontWeight="800"
						flexGrow={0}
					>
						{game.currentTurn + ' / ' + game.questions.length}
						{/*game.currentScore*/}
					</Typography>
            	</Stack>
                <LinearProgress
					color="secondary"
                    variant="determinate"
                    value={(game.currentTurn / game.questions.length) * 100}
					flexGrow={1}
                    sx={{
                        flexGrow: 1,
                        marginRight: '16px',
                        marginLeft: '16px',
                    }}
                />
				<Stack
					display="flex"
					alignItems="center"
					direction="row"
					sx={{
						width: 'auto',
					}}
				>
					<FunTypo
						text={game.currentScore+159}
						color={theme.palette.secondary.contrast.replace(
							'#',
							''
						)}
						stroke={false}
						distance="2px"
						flexGrow={0}
						sx={{
							display: 'block',
							fontSize: '20px',
							lineHeight: '24px',
							fontWeight: 800,
							width: 'auto',
						}}
					/>
				</Stack>
            </Stack>
            <Stack
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
                spacing={2}
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Card
                    sx={{
                        px: 2,
                        py: 4,
                        mt: 1,
                        textAlign: 'center',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
					<FunTypo
						text={game.gameMode.questionPhrase[i18n.language]}
						color={theme.palette.primary.contrast.replace(
							'#',
							''
						)}
						stroke={false}
						distance="2px"
						sx={{
							display: 'block',
							fontSize: '24px',
							lineHeight: '24px',
							fontWeight: 600,
							mb: '16px',
						}}
					/>
                    {game.gameMode.key === COUNTRY_BY_FLAG ? (
                        <React.Fragment>
                            <GameFlag country={question.country.toLowerCase()} />
                        </React.Fragment>
                    ) : (
                        <Typography
                            fontSize="24px"
                            fontWeight="800"
                            lineHeight="28px"
                        >
                            {question
                                ? question.question /*+(question.flag ? " "+question.flag : '')*/
                                : ''}
                        </Typography>
                    )}
                </Card>
                {question && question.choices
                    ? question.choices.map((choice, index) => {
                          return (
                              <GameButton
                                  onClick={() => {
                                      handleChoiceClick(choice);
                                  }}
                                  colorEffect={theme.palette.primary.main.replace(
                                      '#',
                                      ''
                                  )}
                                  key={choice}
                                  phase={phase}
                                  choice={choice}
                                  rightAnswer={rightAnswer}
                                  chosenAnswer={chosenAnswer}
                              >
                                  {difficultyLevel === DIFFICULTY_EXPERT &&
                                  phase === 0
                                      ? choice[0] +
                                        ' * * * ' +
                                        choice[choice.length - 1]
                                      : choice}
                              </GameButton>
                          );
                      })
                    : null}
            </Stack>
            <Stack
                justifyContent="center"
                flexDirection="column"
                spacing={1}
                sx={{
                    my: 4,
                    width: '100%',
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
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
            </Stack>
        </Box>
    );
};

export default Game;
