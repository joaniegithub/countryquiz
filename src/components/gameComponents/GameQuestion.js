import { useTheme } from '@emotion/react';
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
import GameMap from 'components/ui/GameMap';

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
    // const gameMode = useGameMode();

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
            // text = text.replace(new RegExp('{{'+i+'}}', 'g'), replacements[i]);
            text = text.split('{' + i + '}').join(replacements[i]);
        }
        return text;
    };

	const choiceButtons = <>
		{question && question.choices
			? question.choices.map((choice, index) => {
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
								country={choice.toLowerCase()}
								sxOverrides={{
									width: '85%',
									maxWidth: '150px',
									maxHeight: '25vw',
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
			: null}
		</>;

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
					{textReplace(
						question.questionType.questionPhrase[i18n.language],
						question.questionPhraseValues
					)}
				</Typography>
                {question.questionType.key === 'country_flag' ? (
                    <React.Fragment>
                        <GameFlag country={question.country.toLowerCase()} />
                    </React.Fragment>
                ) : question.questionType.key === 'country_map' ? (
					<GameMap
						country={question.country}
					/>
				) : (
                    <Typography color="secondary" fontSize="24px" fontWeight="800" lineHeight="28px">
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
        </Stack>
    );
};

export default GameQuestion;
