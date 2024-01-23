import * as React from 'react';
import { useCallback, useState } from 'react';
import regionsData from 'data/regions.json';
import { useDispatch } from 'react-redux';
import { startGame } from 'store/actions';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import { difficultyLevels, gameModes } from 'data/config';

const NewGame = (props) => {
    const [ region, setRegion ] = useState("all");
    const [ gameMode, setGameMode ] = useState("0");
    const [ difficultyLevel, setDifficultyLevel ] = useState("normal");
    const dispatch = useDispatch();

    const handleChangeMode = useCallback((event) => {
        setGameMode(event.target.value);
    }, []);

    const handleChangeRegion = useCallback((event) => {
        setRegion(event.target.value);
    }, []);

    const handleChangeDifficultyLevel = useCallback((event) => {
        setDifficultyLevel(event.target.value);
    }, []);

    const handleClickStart = () => {
        dispatch(startGame(gameMode, region, difficultyLevel));
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
                <Card
                    sx={{
                        px: 4,
                        py: 4,
                        textAlign: 'center',
                        minWidth: "240px",
                    }}
                >
                    <Stack
                        spacing={3}
                    >
                        <Typography 
                            variant="h2"
                            color="secondary"
                            sx={{
                                fontSize: 20,
                                fontWeight: 800,
                            }}
                        >
                            Game Options
                        </Typography>
                        <TextField
                            fullWidth
                            label="Mode"
                            name="Mode"
                            onChange={handleChangeMode}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={gameMode || 0}
                        >
                            {gameModes.map((option) => (
                                <option key={option.key} value={option.key} disabled={option.disabled}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Region"
                            name="Region"
                            onChange={handleChangeRegion}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={region}
                            
                        >
                            <option key="all" value="all">
                                World
                            </option>
                            {regionsData.map((option) => option.name === "Antarctic" ? null : (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Difficulty"
                            name="Difficulty"
                            onChange={handleChangeDifficultyLevel}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={difficultyLevel}
                            
                        >
                            {difficultyLevels.map((option) => (
                                <option key={option.key} value={option.key} disabled={option.disabled}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        {/*<FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Difficulty</FormLabel>
                            <RadioGroup
                                sx={{
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                }}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={handleChangeDifficultyLevel}
                                value={difficultyLevel}
                            >
                                {/* TODO: link levels avec les niveaux disponibles pour le mode choisi * /}
                                <FormControlLabel value="flashcard" control={<Radio size="small" />} label="Flashcard" disabled={true} />
                                <FormControlLabel value="normal" control={<Radio size="small" />} label="Normal" />
                                <FormControlLabel value="hard" control={<Radio size="small" />} label="Hard" />
                                <FormControlLabel value="expert" control={<Radio size="small" />} label="Expert" disabled={true} />
                            </RadioGroup>
                        </FormControl>*/}
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<OfflineBoltIcon />}
                            onClick={handleClickStart}
                        >
                            Start Game
                        </Button>
                    </Stack>
                </Card>
            </Stack>
        </React.Fragment>
    );
};

export default NewGame;
