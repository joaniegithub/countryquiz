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
            <Button
                variant="contained"
                size="small"
                endIcon={<OfflineBoltIcon />}
                onClick={handleClickStart}
            >
                Nouvelle partie
            </Button>
        </React.Fragment>
    );
};

export default NewGame;
