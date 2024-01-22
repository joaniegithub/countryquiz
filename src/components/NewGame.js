import * as React from 'react';
// import { useState } from 'react';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import {
    Button,
    Card,
    Stack,
} from '@mui/material';

const NewGame = (props) => {
    const { onClickStart } = props;

    return (
        <React.Fragment>
            <Stack
                alignItems="center"
                direction="column"
                justifyContent="center"
				height="100%"
				flexGrow={1}
            >
                <Card
                    sx={{
                        px: 2,
                        py: 2,
                        mt: 1,
                        textAlign: 'center',
                    }}
                >
                    <div>mode:</div><br/>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<OfflineBoltIcon />}
                        onClick={onClickStart}
                    >
                        Start Game
                    </Button>
                </Card>
            </Stack>
        </React.Fragment>
    );
};

export default NewGame;
