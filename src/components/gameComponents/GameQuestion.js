import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { gameAnswer } from 'store/actions';
import { useGameMode } from 'store/selector';

import {
    Card,
    Stack,
    Typography,
} from '@mui/material';

import { COUNTRY_BY_FLAG, DIFFICULTY_EXPERT, DIFFICULTY_HARD } from 'data/config';

import GameButton from './GameButton';
import GameFlag from '../ui/GameFlag';
import FunTypo from '../ui/FunTypo';

const GameQuestion = (props) => {
    const  { game } = props;

    const dispatch = useDispatch();
	const { i18n } = useTranslation();
    const theme = useTheme();

    const [chosenAnswer, setChosenAnswer] = useState('');

    const turn = game.currentTurn;
    const question = game.questions && game.questions[turn];
    const difficultyLevel = game.difficultyLevel;
    const rightAnswer = question ? question.answer : undefined;
	const gameMode = useGameMode();

    const handleChoiceClick = (_chosenAnswer) => {
        if (phase === 0) {
            setChosenAnswer(_chosenAnswer);
            dispatch(gameAnswer(_chosenAnswer));
        }
    };
	
    const phase = game.currentPhase;

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
					py: 4,
					mt: 1,
					textAlign: 'center',
					width: '100%',
					boxSizing: 'border-box',
				}}
			>
				<FunTypo
					text={gameMode.questionType.questionPhrase[i18n.language]}
					color={theme.palette.primary.contrast.replace(
						'#',
						''
					)}
					stroke={false}
					distance="2px"
					sx={{
						display: 'block',
						fontSize: '24px',
						lineHeight: '24px',
						fontWeight: 600,
						mb: '16px',
					}}
				/>
				{gameMode.key === COUNTRY_BY_FLAG ? (
					<React.Fragment>
						<GameFlag country={question.country.toLowerCase()} />
					</React.Fragment>
				) : (
					<Typography
						fontSize="24px"
						fontWeight="800"
						lineHeight="28px"
					>
						{question
							? question.question /*+(question.flag ? " "+question.flag : '')*/
							: ''}
					</Typography>
				)}
			</Card>
			{question && question.choices
				? question.choices.map((choice, index) => {
						return (
							<GameButton
								onClick={() => {
									handleChoiceClick(choice);
								}}
								colorEffect={theme.palette.primary.main.replace(
									'#',
									''
								)}
								key={choice}
								phase={phase}
								choice={choice}
								rightAnswer={rightAnswer}
								chosenAnswer={chosenAnswer}
							>
								{difficultyLevel === DIFFICULTY_EXPERT &&
								phase === 0
									? choice[0] +
									' * * * ' +
									choice[choice.length - 1]
									: choice}
							</GameButton>
						);
					})
				: null}
		</Stack>
	);
};

export default GameQuestion;
