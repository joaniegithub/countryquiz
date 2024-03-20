import { useTheme } from '@emotion/react';
import { CAPITAL, DIFFICULTY_NORMAL, TRIVIA, difficultyLevels, gameModes } from 'data/config';
import regionsData from 'data/regions.json';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { startGame } from 'store/actions';
import { useGameOptions } from 'store/selector';

import { ReactComponent as WorldMap } from 'assets/images/worldMap.svg';
import { ReactComponent as Location } from 'assets/images/location.svg';
import { ReactComponent as Flag } from 'assets/images/flag.svg';
import { ReactComponent as Brain } from 'assets/images/brain.svg';

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

import FunTypo from './ui/FunTypo';
import MainButton from './ui/MainButton';

const NewGame = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t, i18n } = useTranslation();

	const [step, setStep] = useState(0);

    const gameOptions = useGameOptions();

    const [independantOnly, setIndependantOnly] = useState((gameOptions && gameOptions.independantOnly) ?? true);
    const [gameMode, setGameMode] = useState((gameOptions && gameOptions.gameMode) || CAPITAL);
    const [region, setRegion] = useState((gameOptions && gameOptions.region) || 'all');
    const [difficultyLevel, setDifficultyLevel] = useState(
        (gameOptions && gameOptions.difficultyLevel) ?? DIFFICULTY_NORMAL
    );

    // const handleChangeLength = (event) => {
    //     // setGameMode(event.target.value);
    // };

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

	const getSVG = (mode) => {
		let svg;
		switch (mode) {
			case 'capital':
				svg = <Location />;
				break;
			case 'country_map':
				svg = <WorldMap />;
				break;
			case 'flag':
				svg = <Flag />;
				break;
			case 'trivia':
				svg = <Brain />;
				break;
		}
		return svg;
	};

    return (
        <React.Fragment>
            <Stack alignItems="center" direction="column" justifyContent="center" height="100%" flexGrow={1}>
				{step === 0 && (
					<Stack 
						direction="row"
						flexWrap="wrap"
						spacing={2}
						useFlexGap
						sx={{
							maxWidth: '100%',
							width: '360px',
						}}
					>
							{gameModes.filter((option) => option.isMain).map((option) => {
								return (
									<Button
										variant="mode"
										size="large"
										sx={{
											width: 'calc(50% - 8px)',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
										// endIcon={<PlayCircleFilledIcon />}
										// onClick={(e) => handleClickStart(e, option.key)}
									>
										{getSVG(option.key)}
										{option.name[i18n.language]}
									</Button>
								);
							})}
					</Stack>
				)}
				{step === 1 && (
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
								display="block"
								mt="-20px !important"
								sx={
									{
										// fontSize: 20,
										// fontWeight: 800,
									}
								}
							>
								<FunTypo
									text={t('Game Options')}
									color={theme.palette.text.main.replace('#', '')}
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
							<TextField
								fullWidth
								label={t('Mode')}
								name="Mode"
								onChange={handleChangeMode}
								required
								select
								SelectProps={{ native: true }}
								value={gameMode}
							>
								{gameModes.map((option) => (
									<option key={option.key} value={option.key} disabled={option.disabled}>
										{option.name[i18n.language]}
									</option>
								))}
							</TextField>
							<FormControlLabel
								disabled={gameMode === TRIVIA}
								control={<Checkbox checked={independantOnly} />}
								onChange={handleChangeIndependant}
								label={
									<Typography fontSize="12px" color="textSecondary">
										{t('Independent countries only')}
									</Typography>
								}
								sx={{
									mt: '0 !important',
								}}
							/>
							<TextField
								disabled={gameMode === TRIVIA}
								fullWidth
								label={t('Region')}
								name="Region"
								onChange={handleChangeRegion}
								required
								select
								SelectProps={{ native: true }}
								value={region}
							>
								<option key="all" value="all">
									{t('World')}
								</option>
								{regionsData.map((option) =>
									option.eng === 'Antarctic' ? null : (
										<option key={option.eng} value={option.eng}>
											{option[i18n.language]}
										</option>
									)
								)}
							</TextField>
							<ToggleButtonGroup
								disabled={gameMode === TRIVIA}
								color="primary"
								value={difficultyLevel}
								exclusive
								onChange={handleChangeDifficultyLevel}
								aria-label={t('Difficulty')}
								label={t('Difficulty')}
								name="Difficulty"
								size="small"
								sx={{
									justifyContent: 'center',
								}}
							>
								{difficultyLevels.map((option) => (
									<ToggleButton key={option.key} value={option.key} disabled={option.disabled}>
										{t(option.name)}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
							<MainButton
								buttonP={{
									color: "primary",
									size: "large",
									onClick: handleClickStart,
								}}
								typoP={{
									fontSize: "20px",
									fontWeight: "700",
								}}
							>
								{t('Start Game')}
							</MainButton>
						</Stack>
                	</Card>
				)}
{/*}=======
								{t("Long")}
							</ToggleButton>
                        </ToggleButtonGroup>* /}
                        <TextField
                            fullWidth
                            label={t('Mode')}
                            name="Mode"
                            onChange={handleChangeMode}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={gameMode}
                        >
                            {gameModes.map((option) => (
                                <option key={option.key} value={option.key} disabled={option.disabled}>
                                    {option.name[i18n.language]}
                                </option>
                            ))}
                        </TextField>
                        <FormControlLabel
                            disabled={gameMode === TRIVIA}
                            control={<Checkbox checked={independantOnly} />}
                            onChange={handleChangeIndependant}
                            label={
                                <Typography fontSize="12px" color="textSecondary">
                                    {t('Independent countries only')}
                                </Typography>
                            }
                            sx={{
                                mt: '0 !important',
                            }}
                        />
                        <TextField
                            disabled={gameMode === TRIVIA}
                            fullWidth
                            label={t('Region')}
                            name="Region"
                            onChange={handleChangeRegion}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={region}
                        >
                            <option key="all" value="all">
                                {t('World')}
                            </option>
                            {regionsData.map((option) =>
                                option.eng === 'Antarctic' ? null : (
                                    <option key={option.eng} value={option.eng}>
                                        {option[i18n.language]}
                                    </option>
                                )
                            )}
                        </TextField>
                        <ToggleButtonGroup
                            disabled={gameMode === TRIVIA}
                            color="primary"
                            value={difficultyLevel}
                            exclusive
                            onChange={handleChangeDifficultyLevel}
                            aria-label={t('Difficulty')}
                            label={t('Difficulty')}
                            name="Difficulty"
                            size="small"
                            sx={{
                                justifyContent: 'center',
                            }}
                        >
                            {difficultyLevels.map((option) => (
                                <ToggleButton key={option.key} value={option.key} disabled={option.disabled}>
                                    {t(option.name)}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
						<MainButton
							buttonP={{
								color: "primary",
								size: "large",
								onClick: handleClickStart,
							}}
							typoP={{
                                fontSize: "20px",
                                fontWeight: "700",
							}}
						>
                            {t('Start Game')}
						</MainButton>
                    </Stack>
                </Card>
						>>>>>>> main*/}
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
