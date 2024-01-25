import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameAnswer, gameNext, useCurrentGame } from 'store/actions';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Box, Button, Card, LinearProgress, Stack, SvgIcon, Typography } from '@mui/material';
import { DIFFICULTY_EXPERT, DIFFICULTY_HARD } from 'data/config';

const Game = () => {
    const [chosenAnswer, setChosenAnswer] = useState('');
    const game = useCurrentGame();
    const dispatch = useDispatch();

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
                width: "100%",
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
                    width: "100%",
                }}
            >
                <LinearProgress 
                    variant="determinate"
                    value={(game.currentTurn / game.questions.length) * 100}
                    thickness={6}
                    sx={{
                        flexGrow: 1,
                        marginRight: "16px",
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
                        fontSize="12px"
                        textAlign="right"
                        fontWeight="bold"
                        width="100%"
                    >
                        {game.currentScore + ' / ' + game.questions.length}
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
                    width: "100%",
                }}
            >
                <Typography
                    color="secondary"
                    fontSize="20px"
                    textAlign="center"
                    fontWeight="500"
                >
                    {game.gameMode.questionPhrase.eng}
                </Typography>
                <Card
                    sx={{
                        px: 2,
                        py: 2,
                        mt: 1,
                        textAlign: 'center',
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >
                        {question
                            ? question.question /*+(question.flag ? " "+question.flag : '')*/
                            : ''}
                    </Typography>
                </Card>
                {question && question.choices
                    ? question.choices.map((choice, index) => {
                          let color = 'primary';
                          let icon = undefined;
                          if (phase === 1) {
                              if (
                                  choice === rightAnswer &&
                                  chosenAnswer === choice
                              ) {
                                  color = 'success';
                                  icon = <CheckCircleIcon />;
                              } else if (choice === rightAnswer) {
                                  color = 'secondary';
                              } else if (choice === chosenAnswer) {
                                  color = 'error';
                                  icon = <CancelIcon />;
                              }
                          }

                          return (
                              <Button
                                  onClick={() => {
                                      handleChoiceClick(choice);
                                  }}
                                  variant="contained"
                                  color={color}
                                  sx={{
                                      width: '100%',
                                  }}
                                  key={choice}
                                  {...(icon
                                      ? {
                                            endIcon: (
                                                <SvgIcon fontSize="small">
                                                    {icon}
                                                </SvgIcon>
                                            ),
                                        }
                                      : {})}
                              >
                                  <Typography
                                      sx={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                      }}
                                  >
                                      {difficultyLevel === DIFFICULTY_EXPERT && phase === 0 
                                        ? choice[0]+" * * * "+choice[choice.length-1]
                                        : choice
                                    }
                                  </Typography>
                              </Button>
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
                    width: "100%",
                }}
            >
                <Button
                    variant="outlined"
					color="secondary"
                    disabled={phase === 0}
                    onClick={handleNext}
					endIcon={<ArrowCircleRightIcon />}
                >
                    Next
                </Button>
            </Stack>
        </Box>
    );
};

export default Game;
