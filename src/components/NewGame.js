import { useTheme } from '@emotion/react';
import { ReactComponent as Brain } from 'assets/images/brain.svg';
import { ReactComponent as Flag } from 'assets/images/flag1.svg';
import { ReactComponent as Location } from 'assets/images/location.svg';
import { ReactComponent as WorldMap } from 'assets/images/map.svg';
import { CAPITAL, COUNTRY_BY_MAP, DIFFICULTY_NORMAL, FLAG, FULL, SHORT, TRIVIA, difficultyLevels, gameModes, questionTypes } from 'data/config';
import regionsData from 'data/regions.json';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { startGame } from 'store/actions';
import { useShowAdvancedOptions, useGameOptions } from 'store/selector';

import {
    Button,
    Card,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    alpha,
} from '@mui/material';
import FunTypo from './ui/FunTypo';
import MainButton from './ui/MainButton';

const NewGame = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    const [step, setStep] = useState(0);

    const gameOptions = useGameOptions();
    const showAdvancedOptions = useShowAdvancedOptions();
	console.log(showAdvancedOptions);

    const [independantOnly, setIndependantOnly] = useState((gameOptions && gameOptions.independantOnly) ?? true);
    const [gameMode, setGameMode] = useState((gameOptions && gameOptions.gameMode) || CAPITAL);
    const [gameSubMode, setSubGameMode] = useState((gameOptions && gameOptions.gameMode) || CAPITAL);
    const [gameLength, setGameLength] = useState((gameOptions && gameOptions.gameLength) || SHORT);
    const [region, setRegion] = useState((gameOptions && gameOptions.region) || 'all');
    const [difficultyLevel, setDifficultyLevel] = useState(
        (gameOptions && gameOptions.difficultyLevel) ?? DIFFICULTY_NORMAL
    );
    const [hideBackgroundMap, setHideBackgroundMap] = useState((gameOptions && gameOptions.hideBackgroundMap) ?? false);

    const handleClickMode = (event, gameModeKey) => {
        setGameMode(gameModeKey);
        setSubGameMode(gameModeKey);
        setStep(1);
    };
    const handleClickChangeMode = (event) => {
        setStep(0);
    };
    const handleChangeSubMode = (event) => {
        setSubGameMode(event.target.value);
    };

    const handleChangeLength = (event) => {
        setGameLength(event.target.value);
    };

    const handleChangeIndependant = (event) => {
        setIndependantOnly(event.target.checked);
    };

    const handleChangeRegion = (event) => {
        setRegion(event.target.value);
    };

    const handleChangeDifficultyLevel = (event) => {
        setDifficultyLevel(event.target.value);
    };

    const handleClickHideBackgroundMap = (event) => {
        setHideBackgroundMap(event.target.value);
    };

    const handleClickStart = () => {
        dispatch(startGame(gameSubMode, region, difficultyLevel, independantOnly, gameLength, hideBackgroundMap));
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
			default:
                svg = <Brain />;
                break;
        }
        return svg;
    };

    return (
        <>
            <Stack alignItems="center" direction="column" justifyContent="center" height="100%" flexGrow={1} gap={3}>
                {step === 0 && (
					<>
						<Typography
							variant="h2"
							display="block"
							pb="16px"
							width="100%"
							fontSize="32px"
							lineHeight="32px"
							fontWeight="800"
							textAlign="center"
						>
							<FunTypo
								text={t('Game modes')}
								color={theme.palette.text.main.replace('#', '')}
								stroke={false}
								strokeWidth="2px"
								distance="3px"
								sx={{
									fontSize: '40px',
									lineHeight: '42px',
									fontWeight: 800,
								}}
							/>
							{t('Game modes2') && (
								<>
									<br/>
									<FunTypo
										text={t('Game modes2')}
										color={theme.palette.text.main.replace('#', '')}
										stroke={false}
										strokeWidth="2px"
										distance="3px"
										sx={{
											fontSize: '40px',
											lineHeight: '42px',
											fontWeight: 800,
										}}
									/>
								</>
							)}
						</Typography>
						<Stack
							direction="row"
							flexWrap="wrap"
							spacing={3}
							useFlexGap
							sx={{
								maxWidth: '100%',
								width: '360px',
								px: '24px',
							}}
						>
							{gameModes
								.filter((option) => option.isMain)
								.map((option) => {
									const questionType = questionTypes.find(qt => option.questionType === qt.key);
									return (
										<Button
											variant="mode"
											size="large"
											key={option.key}
											disabled={questionType !== undefined && questionType.disabledOffline && !navigator.onLine}
											sx={{
												width: 'calc(50% - 12px)',
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												py: '32px',

												svg: {
													color: theme.palette.secondary.contrast,
													height: '64px',
													width: '64px',
													fill: 'currentColor',
													filter: `drop-shadow(2px 2px 0px ${alpha(theme.palette.shadow, 0.15)})`,
												},
											}}
											onClick={(e) => handleClickMode(e, option.key)}
										>
											{getSVG(option.key)}
											<Typography
												component="span"
												fontSize="20px"
												fontWeight="700"
												mt="8px"
												color="secondary.contrast"
												sx={{
													textShadow: `2px 2px 0px ${alpha(theme.palette.shadow, 0.1)}`,
												}}
											>
												{option.name[i18n.language]}
											</Typography>
										</Button>
									);
								})}
						</Stack>
					</>
                )}
                {step === 1 && (
                    <>
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
                                    fontSize="32px"
                                    lineHeight="32px"
                                    fontWeight="800"
                                    textAlign="center"
                                >
                                    {t('Options')}
                                </Typography>
								<div>
									<Button
										variant="outlined"
										size="medium"
										py="12px"
										sx={{
											svg: {
												color: theme.palette.secondary.contrast,
												height: '36px',
												width: '36px',
												fill: 'currentColor',
												mr: '12px',
												filter: `drop-shadow(2px 2px 0px ${alpha(theme.palette.shadow, 0.15)})`,
											},
											mb: '6px',
										}}
										onClick={handleClickChangeMode}
									>
										{getSVG(gameMode)}
										<Typography
											variant="h2"
											display="block"
											color="secondary.contrast"
											fontSize="24px"
											lineHeight="40px"
											mr="12px"
											sx={{
												textShadow: `2px 2px 0px ${alpha(theme.palette.shadow, 0.1)}`,
											}}
										>
											{gameModes.find((m) => m.key === gameMode).name[i18n.language]}
										</Typography>
									</Button>
								</div>
                                {(gameMode === FLAG || gameMode === CAPITAL) && (
									<>
                                        <ToggleButtonGroup
                                            variant="outlined"
                                            color="secondary"
                                            value={gameSubMode}
                                            exclusive
                                            onChange={handleChangeSubMode}
                                            aria-label={t('Mode')}
                                            label={t('Mode')}
                                            name="Mode"
                                            size="small"
                                            sx={{
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <ToggleButton key={gameMode} value={gameMode}>
                                                {gameModes.find((m) => m.key === gameMode).subModeLabel[i18n.language]}
                                            </ToggleButton>
                                            <ToggleButton key={`country_${gameMode}`} value={`country_${gameMode}`}>
                                                {
                                                    gameModes.find((m) => m.key === `country_${gameMode}`).subModeLabel[
                                                        i18n.language
                                                    ]
                                                }
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </>
                                )}
                                {gameMode !== TRIVIA && (
									<div>
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
											sx={{
												mt: '4px',
											}}
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
									</div>
                                )}
                                {<ToggleButtonGroup
									variant="outlined"
									color="secondary"
									value={gameLength}
									exclusive
									onChange={handleChangeLength}
									aria-label={t("Length")}
									label={t("Length")}
									name="Length"
									size="small"
									sx={{
										justifyContent: 'center',
									}}
								>
									<ToggleButton value={SHORT}>
										{t("Short")}
									</ToggleButton>
									<ToggleButton value={FULL}>
										{t("Full")}
									</ToggleButton>
								</ToggleButtonGroup>}
								<ToggleButtonGroup
									variant="outlined"
									color="secondary"
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
								{showAdvancedOptions && (
									<>
										{gameMode !== TRIVIA && (
											<>
												<div>
													<FormControlLabel
														disabled={gameMode === TRIVIA}
														control={<Switch checked={independantOnly} />}
														onChange={handleChangeIndependant}
														label={
															<Typography fontSize="14px" color="textSecondary">
																{t('Independent countries only')}
															</Typography>
														}
														sx={{
															margin: '-10px 0 -10px -7px',
														}}
													/>
												</div>
											</>
										)}
										{(gameMode === TRIVIA || gameMode === COUNTRY_BY_MAP) && (
											<div>
												<FormControlLabel
													control={<Switch checked={hideBackgroundMap} />}
													onChange={handleClickHideBackgroundMap}
													label={
														<Typography fontSize="14px" color="textSecondary">
															{t('Hide map background')}
														</Typography>
													}
													sx={{
														margin: '-10px 0 -10px -7px',
													}}
												/>
											</div>
										)}
									</>
								)}
                                <MainButton
                                    buttonP={{
                                        color: 'primary',
                                        size: 'large',
                                        onClick: handleClickStart,
                                    }}
                                >
                                    {t('Start Game')}
                                </MainButton>
                            </Stack>
                        </Card>
                    </>
                )}
            </Stack>
        </>
    );
};

export default NewGame;
