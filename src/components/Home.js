import * as React from 'react';
import { useState } from 'react';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { Button, Stack } from '@mui/material';

import NewGame from './NewGame';

const Home = (props) => {
    const [showGameOptions, setShowGameOptions] = useState(false);
    // const game = useCurrentGame();

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
                    <NewGame />
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
