import { useTheme } from '@emotion/react';
import * as React from 'react';

import { LinearProgress, Stack, Typography } from '@mui/material';

import FunTypo from '../ui/FunTypo';

const GameProgress = (props) => {
    const theme = useTheme();

    const { game } = props;

    return (
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
                <Typography fontSize="18px" textAlign="right" fontWeight="700">
                    {game.currentTurn + ' / ' + game.questions.length}
                </Typography>
            </Stack>
            <LinearProgress
                color="success"
                variant="determinate"
                value={(game.currentTurn / game.questions.length) * 100}
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
                    text={game.currentScore}
                    color={theme.palette.text.main.replace('#', '')}
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
    );
};

export default GameProgress;
