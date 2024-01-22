import * as React from 'react';
import { useCallback, useState } from 'react';
import regionsData from 'data/regions.json';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { Button, Card, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Slider, Stack, TextField, Typography } from '@mui/material';
import { gameModes } from 'store/reducer';
import { Box } from '@mui/system';

const NewGame = (props) => {
    const { onClickStart } = props;
    const [region, setRegion] = useState("all");
    const [mode, setMode] = useState(0);

    const handleChangeRegion = useCallback((event) => {
        setRegion(event.target.value);
        //   setValues((prevState) => ({
        //     ...prevState,
        //     [event.target.name]: event.target.value
        //   }));
    }, []);
    const handleChangeMode = useCallback((event) => {
        setMode(event.target.value);
        //   setValues((prevState) => ({
        //     ...prevState,
        //     [event.target.name]: event.target.value
        //   }));
    }, []);

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
                        container
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
                            value={mode || 0}
                        >
                            {gameModes.map((option) => (
                                <option key={option.key} value={option.name}>
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
                            {regionsData.map((option) => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        {/*<Box
                                sx={{
                                    px: 3,
                                }}
                        >
                            <InputLabel>
                                Difficulty
                            </InputLabel>
                            <Slider
                                aria-label="Small steps"
                                defaultValue={1}
                                label="Difficulty"
                                name="Difficulty"
                                step={1}
                                marks={[
                                    {
                                        value: 0,
                                        label: 'Flashcard',
                                    },
                                    {
                                        value: 1,
                                        label: 'Normal',
                                    },
                                    {
                                        value: 2,
                                        label: 'Hard',
                                    },
                                    {
                                        value: 3,
                                        label: 'Expert',
                                    },
                                ]}
                                min={0}
                                max={3}
                                valueLabelDisplay="auto"
                            />
                        </Box>*/}
                        <FormControl>
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
                            >
                                <FormControlLabel value="0" control={<Radio size="small" />} label="Flashcard" />
                                <FormControlLabel value="1" control={<Radio size="small" />} label="Normal" />
                                <FormControlLabel value="2" control={<Radio size="small" />} label="Hard" />
                                <FormControlLabel value="3" control={<Radio size="small" />} label="Expert" />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<OfflineBoltIcon />}
                            onClick={onClickStart}
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
