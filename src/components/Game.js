
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
    const rightAnswer = question ? question.answers : undefined;

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
                flexDirection="row"
                justifyContent="space-between"
                sx={{
                    my: 2,
                    width: '100%',
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={(game.currentTurn / game.questions.length) * 100}
                    sx={{
                        flexGrow: 1,
                        marginRight: '16px',
                    }}
                />
                <Stack
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        px: 0,
                    }}
                >
                    <Typography
                        color="secondary"
                        fontSize="14px"
                        textAlign="right"
                        fontWeight="800"
                        width="100%"
                    >
                        {game.currentTurn + ' / ' + game.questions.length}
                        {/*game.currentScore*/}
                    </Typography>
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
                    <Typography
                        color="secondary"
                        fontSize="18px"
                        textAlign="center"
                        fontWeight="500"
                        lineHeight="24px"
                        mb={2}
                    >
                        {game.gameMode.questionPhrase[i18n.language]}
                    </Typography>
                    {game.gameMode.key === COUNTRY_BY_FLAG ? (
                        <React.Fragment>
                            <GameFlag country={question.country.toLowerCase()} />
                        </React.Fragment>
                    ) : (
                        <Typography
                            fontSize="22px"
                            fontWeight="700"
                            lineHeight="24px"
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
                    variant="outlined"
                    color="secondary"
                    disabled={phase === 0}
                    onClick={handleNext}
                    endIcon={<ArrowCircleRightIcon />}
                >
                    {t("Next")}
                </Button>
            </Stack>
        </Box>
    );
};

export default Game;