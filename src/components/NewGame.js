import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { CAPITAL, DIFFICULTY_NORMAL, difficultyLevels, gameModes } from 'data/config';
import regionsData from 'data/regions.json';
import { startGame } from 'store/actions';
import { useGameOptions } from 'store/selector';

import {
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import FunTypo from './ui/FunTypo';

const NewGame = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
	const { t, i18n } = useTranslation();

    const gameOptions = useGameOptions();

    const [independantOnly, setIndependantOnly] = useState(
        (gameOptions && gameOptions.independantOnly)
    );
    const [gameMode, setGameMode] = useState(
        (gameOptions && gameOptions.gameMode) || CAPITAL
    );
    const [region, setRegion] = useState(
        (gameOptions && gameOptions.region) || 'all'
    );
    const [difficultyLevel, setDifficultyLevel] = useState(
        (gameOptions && gameOptions.difficultyLevel) || DIFFICULTY_NORMAL
    );

    const handleChangeLength = (event) => {
        // setGameMode(event.target.value);
    };

    const handleChangeIndependant = (event) => {
        setIndependantOnly(event.target.checked);
    };
    
    const handleChangeMode = (event) => {
        setGameMode(event.target.value);
    };

    const handleChangeRegion = (event) => {
        setRegion(event.target.value);
    };

    const handleChangeDifficultyLevel = (event) => {
        setDifficultyLevel(event.target.value);
    };

    const handleClickStart = () => {
        dispatch(startGame(gameMode, region, difficultyLevel, independantOnly));
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
                        minWidth: '240px',
                    }}
                >
                    <Stack spacing={2}>
                        <Typography
                            variant="h2"
                            color="secondary"
                            display="block"
                            mt="-20px"
                            sx={
                                {
                                    // fontSize: 20,
                                    // fontWeight: 800,
                                }
                            }
                        >
                            <FunTypo
                                text={t("Game Options")}
                                color={theme.palette.primary.contrast.replace(
                                    '#',
                                    ''
                                )}
                                stroke={false}
                                strokeWidth="2px"
                                distance="3px"
                                sx={{
                                    fontSize: '32px',
                                    lineHeight: '48px',
                                    fontWeight: 800,
                                    // mb:"6px",
                                }}
                            />
                        </Typography>
                        {/*<ToggleButtonGroup
                            color="primary"
                            value={difficultyLevel}
                            exclusive
                            onChange={handleChangeLength}
                            aria-label={t("Length")}
                            label={t("Length")}
                            name="Length"
                            size="short"
							disabled={true}
							sx={{
								justifyContent: 'center',
							}}
                        >
							<ToggleButton
								value="short"
							>
								{t("Short")}
							</ToggleButton>
							<ToggleButton
								value="long"
							>
								{t("Long")}
							</ToggleButton>
                        </ToggleButtonGroup>*/}
                        <FormControlLabel
                            control={<Checkbox defaultChecked={independantOnly} />}
                            onChange={handleChangeIndependant}
                            label={<Typography fontSize="12px" color="textSecondary">{t("Independent countries only")}</Typography>}
                            sx={{
                                mt: '0 !important',
                            }}
                        />
                        <TextField
                            fullWidth
                            label={t("Mode")}
                            name="Mode"
                            onChange={handleChangeMode}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={gameMode || CAPITAL}
                        >
                            {gameModes.map((option) => (
                                <option
                                    key={option.key}
                                    value={option.key}
                                    disabled={option.disabled}
                                >
                                    {option.name[i18n.language]}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label={t("Region")}
                            name="Region"
                            onChange={handleChangeRegion}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={region}
                        >
                            <option key="all" value="all">
								{t("World")}
                            </option>
                            {regionsData.map((option) =>
                                option.eng === 'Antarctic' ? null : (
                                    <option
                                        key={option.eng}
                                        value={option.eng}
                                    >
                                        {option[i18n.language]}
                                    </option>
                                )
                            )}
                        </TextField>
                        <ToggleButtonGroup
                            color="primary"
                            value={difficultyLevel}
                            exclusive
                            onChange={handleChangeDifficultyLevel}
                            aria-label={t("Difficulty")}
                            label={t("Difficulty")}
                            name="Difficulty"
                            size="small"
							sx={{
								justifyContent: 'center',
							}}
                        >
                            {difficultyLevels.map((option) => (
                                <ToggleButton
                                    key={option.key}
                                    value={option.key}
                                    disabled={option.disabled}
                                >
                                    {t(option.name)}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        <Button
                            variant="contained"
                            size="large"
                            // endIcon={<PlayCircleFilledIcon />}
                            onClick={handleClickStart}
                        >
							<Typography
								fontSize="20px"
								fontWeight="700"
								sx={{
									textShadow: `2px 2px 0px ${alpha(theme.palette.background.default, 0.3)}`,
								}}
							>
								{t("Start Game")}
							</Typography>
                        </Button>
                    </Stack>
                </Card>
            </Stack>
        </React.Fragment>
    );
};

export default NewGame;

/*

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
		onChange={handleChangeDifficultyLevel}
		value={difficultyLevel}
	>
		{/* TODO: link levels avec les niveaux disponibles pour le mode choisi * /}
		<FormControlLabel value="flashcard" control={<Radio size="small" />} label="Flashcard" disabled={true} />
		<FormControlLabel value="normal" control={<Radio size="small" />} label="Normal" />
		<FormControlLabel value="hard" control={<Radio size="small" />} label="Hard" />
		<FormControlLabel value="expert" control={<Radio size="small" />} label="Expert" disabled={true} />
	</RadioGroup>
</FormControl>
*/
