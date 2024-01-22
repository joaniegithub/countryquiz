import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from 'store/actions';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { Button, Stack } from '@mui/material';

import NewGame from './NewGame';

const Home = (props) => {
    const [showGameOptions, setShowGameOptions] = useState(false);
    // const game = useCurrentGame();
    const dispatch = useDispatch();

    const handleClickStart = () => {
        dispatch(startGame());
    };

    const handleClickNewGame = () => {
        setShowGameOptions(true);
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
                {showGameOptions ? (
                    <NewGame onClickStart={handleClickStart} />
                ) : (
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<OfflineBoltIcon />}
                        onClick={handleClickNewGame}
                    >
                        New Game
                    </Button>
                )}
            </Stack>
        </React.Fragment>
    );
};

export default Home;
