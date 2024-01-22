import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGame, useCurrentGame } from 'store/actions';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery,
} from '@mui/material';

const NewGame = (props) => {
    const game = useCurrentGame();
    const dispatch = useDispatch();

    // const handleClickNewGame = () => {
    // 	dispatch(newGame());
    // };
    const handleClickStart = () => {
        dispatch(startGame());
    };

    return (
        <React.Fragment>
            <Stack
                alignItems="center"
                direction="column"
                justifyContent="center"
				height="100%"
				flexGrow={1}
            >
				<Button
					variant="contained"
					size="large"
					endIcon={<OfflineBoltIcon />}
					onClick={handleClickStart}
				>
					Nouvelle partie
				</Button>
            </Stack>
        </React.Fragment>
    );
};

export default NewGame;
