import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameAnswer, gameNext, useCurrentGame } from 'store/actions';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Box,
    Button,
    Card,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material';

const Game = (props) => {
    const [chosenAnswer, setChosenAnswer] = useState('');
    const game = useCurrentGame();
    const dispatch = useDispatch();

    if (!game) {
        return null;
    }

    const turn = game.currentTurn;
    const phase = game.currentPhase;
    const question = game.questions && game.questions[turn];
    const rightAnswer = question ? question.answers : undefined;

    const handleNext = () => {
        if (phase === 1) {
            dispatch(gameNext());
        }
        // setTimeout(function () {
        // 	document.getElementById("tableContainer").scrollTo(1000, 0);
        // }, 200);
    };

    const handleChoiceClick = (_chosenAnswer) => {
        if (phase === 0) {
            setChosenAnswer(_chosenAnswer);
            dispatch(gameAnswer(_chosenAnswer));
        }
        // setTimeout(function () {
        // 	document.getElementById("tableContainer").scrollTo(1000, 0);
        // }, 200);
    };

    // const handleNew = () => {
    //     dispatch(newGame());
    // };

    return (
        <React.Fragment>
            <Box
                sx={{
                    my: 2,
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography>
                        {game.currentTurn + 1}. Quelle est la capitale de...
                    </Typography>
                    <Typography>
                        {game.currentScore + ' / ' + game.questions.length}
                    </Typography>
                </Stack>
                <Card
                    sx={{
                        px: 2,
                        py: 2,
                        mt: 1,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >
                        {question ? question.question /*+(question.flag ? " "+question.flag : '')*/ : ''}
                    </Typography>
                </Card>
            </Box>
            <Stack
                alignItems="center"
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{}}
            >
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
                                      {choice}
                                  </Typography>
                              </Button>
                          );
                      })
                    : null}
            </Stack>
            <Stack
                justifyContent="center"
                direction="column"
                spacing={1}
                sx={{
                    my: 4,
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    disabled={phase === 0}
                    onClick={handleNext}
                >
                    Tour suivant
                </Button>
            </Stack>
        </React.Fragment>
    );
};

export default Game;
