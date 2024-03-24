import { useTheme } from '@emotion/react';
import GameMap from 'components/ui/GameMap';
import { DIFFICULTY_EXPERT } from 'data/config';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { gameAnswer } from 'store/actions';

// import { useGameMode } from 'store/selector';
import { Card, Stack, Typography } from '@mui/material';

import GameFlag from '../ui/GameFlag';
import GameButton from './GameButton';

const GameQuestion = (props) => {
    const { game } = props;

    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const theme = useTheme();

    const [chosenAnswer, setChosenAnswer] = useState('');

    const turn = game.currentTurn;
    const question = game.questions && game.questions[turn];
    const difficultyLevel = game.difficultyLevel;
    const rightAnswer = question ? question.answer : undefined;

    // preload images for next Question
    const nextQuestionImages = () => {
        const nextQuestion = game.questions && game.questions.length >= turn && game.questions[turn + 1];
        const nextQuestionKey = nextQuestion?.questionType.key;
        if (nextQuestionKey === 'flag' || nextQuestionKey === 'country_flag') {
            const countries =
                nextQuestionKey === 'flag'
                    ? nextQuestion.choices.map((choice) => choice.toLowerCase())
                    : [nextQuestion.country.toLowerCase()];
            countries.forEach((c) => {
                var img = new Image();
                img.src = `${process.env.PUBLIC_URL}/assets/flagsAndGeo/${c}.svg`;
            });
        }
        return null;
    };

    const handleChoiceClick = (_chosenAnswer) => {
        if (phase === 0) {
            setChosenAnswer(_chosenAnswer);
            dispatch(gameAnswer(_chosenAnswer));
        }
    };

    const phase = game.currentPhase;

    const textReplace = (text, replacements) => {
        if (!replacements || replacements.length === 0) {
            return text;
        }
        for (var i = 0; i < replacements.length; i++) {
            text = text.split('{' + i + '}').join(replacements[i]);
        }
        return text;
    };

    const choiceButtons = (
        <>
            {question && question.choices
                ? question.choices.map((choice, index) => {
						// if (question.questionType.key === 'flag') {
						// 	var img = new Image();
						// 	img.src = `${process.env.PUBLIC_URL}/assets/flagsAndGeo/${choice.toLowerCase()}.svg`;
						// }
						return (
							<GameButton
								onClick={() => {
									handleChoiceClick(choice);
								}}
								colorEffect={theme.palette.primary.main.replace('#', '')}
								key={choice + index}
								phase={phase}
								choice={choice}
								rightAnswer={rightAnswer}
								chosenAnswer={chosenAnswer}
								isFlag={question.questionType.key === 'flag'}
								answerAdditionnalText={question.answerAdditionnalText}
							>
								{question.questionType.key === 'flag' ? (
									<GameFlag
										country={choice}
										svgOverrides={{
											mt: '5px',
											width: '90%',
											maxWidth: '180px',
											maxHeight: '100px',
											filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))',
										}}
									/>
								) : (
									<>
										{difficultyLevel === DIFFICULTY_EXPERT && phase === 0
											? choice[0] + ' * * * ' + choice[choice.length - 1]
											: choice}
									</>
								)}
							</GameButton>
						);
					})
				: null
			}
        </>
    );

    return (
        <Stack
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            spacing={2}
            sx={{
                flexGrow: 1,
                width: '100%',
                position: 'relative',
            }}
        >
            <Card
                sx={{
                    px: 2,
                    pt: question.questionType.key === 'country_map' ? 3 : 4,
                    pb: question.questionType.key === 'country_map' ? 2 : 4,
                    mt: 1,
                    textAlign: 'center',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <Typography fontSize="20px" fontWeight="600" lineHeight="24px" mb="16px">
                    {textReplace(question.questionType.questionPhrase[i18n.language], question.questionPhraseValues)}
                </Typography>
                {question.questionType.key === 'country_flag' ? (
                    <React.Fragment>
                        <GameFlag country={question.country} />
                    </React.Fragment>
                ) : question.questionType.key === 'country_map' ? (
                    <GameMap country={question.country} />
                ) : (
                    <Typography color="success.main" fontSize="24px" fontWeight="800" lineHeight="28px">
                        {question ? question.question /*+(question.flag ? " "+question.flag : '')*/ : ''}
                    </Typography>
                )}
            </Card>
            {question.questionType.key === 'flag' ? (
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    spacing={2}
                    useFlexGap
                    sx={{
                        width: '100%',
                    }}
                >
                    {choiceButtons}
                </Stack>
            ) : (
                <>{choiceButtons}</>
            )}
            {/*nextQuestionImages()*/}
        </Stack>
    );
};

export default GameQuestion;
