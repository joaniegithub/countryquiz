import * as React from 'react';
import { useCallback, useState } from 'react';
import regionsData from 'data/regions.json';
import { useDispatch } from 'react-redux';
import { startGame, useGameOptions } from 'store/actions';

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Box, Button, Card, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { DIFFICULTY_NORMAL, difficultyLevels, gameModes } from 'data/config';
import FunTypo from './ui/FunTypo';
import { useTheme } from '@emotion/react';

const NewGame = (props) => {
    const gameOptions = useGameOptions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [ gameMode, setGameMode ] = useState(gameOptions && gameOptions.gameMode || "0");
    const [ region, setRegion ] = useState(gameOptions && gameOptions.region || "all");
    const [ difficultyLevel, setDifficultyLevel ] = useState(gameOptions && gameOptions.difficultyLevel || DIFFICULTY_NORMAL);

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
								display="block"
								mt="-20px"
								pb="20px"
								sx={{
									// fontSize: 20,
									// fontWeight: 800,
								}}
							>
								<FunTypo
									text="Game Options"
									color={theme.palette.secondary.main.replace("#", "")}
									stroke={false}
									strokeWidth="2px"
									distance="3px"
									sx={{
										fontSize:"32px",
										lineHeight:"48px",
										fontWeight:800,
										// mb:"6px",
									}}
								/>
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
							<ToggleButtonGroup
								color="secondary"
								value={difficultyLevel}
								exclusive
								onChange={handleChangeDifficultyLevel}
								aria-label="Difficulty"
								label="Difficulty"
								name="Difficulty"
								size="small"
								variant="outlined"
							>
								{difficultyLevels.map((option) => (
									<ToggleButton key={option.key} value={option.key} disabled={option.disabled}>
										{option.name}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
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
								endIcon={<PlayCircleFilledIcon />}
								onClick={handleClickStart}
							>
								<FunTypo
									text="Start Game"
									color="fff"
									stroke={false}
									strokeWidth="2px"
									distance="3px"
									sx={{
										fontSize:"24px",
										lineHeight:"24px",
										fontWeight:700,
										mb:"4px",
									}}
								/>
							</Button>
						</Stack>
					</Card>
            </Stack>
        </React.Fragment>
    );
};

export default NewGame;
