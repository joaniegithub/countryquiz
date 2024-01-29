import {
    CAPITAL,
    DIFFICULTY_HARD,
    DIFFICULTY_NORMAL,
    GAME_VERSION,
    gameModes,
	DIFFICULTY_EXPERT,
} from 'data/config';
import countriesData from 'data/countries.json';
import * as constants from 'store/constants';
import { shuffle } from 'util/util';

export const defaultSettings = {
    isDarkMode: false,
    language: 'eng',
};

const defaultState = {
    name: 'CountryQuiz',
    settings: defaultSettings,
    inGame: false,
    inWiki: false,
    currentGame: undefined,
    showRules: false,
    countriesData: [...Object.values(countriesData)],
};

const gameDefaultState = {
    gameMode: CAPITAL,
    questions: [],
    currentScore: 0,
    currentTurn: 0,
    currentPhase: 0,
    mode: 0,
    difficultyLevel: DIFFICULTY_NORMAL,
    nbChoices: 4,
    flashCardMode: false,
    version: GAME_VERSION,
};

export const getAllCountriesCodes = () => {
	return countriesData;
}

const reducer = (state = defaultState, { type, ...payload }) => {
    // console.log(state, type, payload);
    const game = state.currentGame;

    switch (type) {
        case constants.EDIT_SETTINGS:
            return {
                ...state,
                settings: { ...state.settings, ...payload.settings },
            };

        case constants.IN_WIKI:
            return {
                ...state,
                inWiki: payload.inWiki,
            };

        case constants.NEW_GAME:
            return {
                ...state,
                currentGame: undefined,
                inGame: false,
                gameOptions: game
                    ? {
                          gameMode: game.gameMode.key,
                          region: game.region,
                          difficultyLevel: game.difficultyLevel,
                      }
                    : undefined,
            };

        case constants.START_GAME:
            const chosenGameMode = payload.chosenGameMode;
            const chosenRegion = payload.chosenRegion;
            const chosenDifficultyLevel = payload.chosenDifficultyLevel;
            const mode = gameModes.find((gm) => gm.key === chosenGameMode);

			const questions = getQuestions(mode, chosenRegion, chosenDifficultyLevel);

            return {
                ...state,
                inGame: true,
                currentGame: {
                    ...gameDefaultState,
                    gameMode: mode,
                    region: chosenRegion,
                    difficultyLevel: chosenDifficultyLevel,
                    questions: shuffle(questions),
                },
            };

        case constants.GAME_ANSWER:
            const chosenAnswer = payload.chosenAnswer;
            const allQuestions = [...game.questions];
            const question = { ...allQuestions[game.currentTurn] };
            const result = chosenAnswer === question.answers;

            const currentScore = result
                ? game.currentScore + 1
                : game.currentScore;

            return {
                ...state,
                currentGame: {
                    ...game,
                    questions: allQuestions.map((q, i) => {
                        return game.currentTurn === i ? { ...q, result } : q;
                    }),
                    currentPhase: 1,
                    currentScore,
                },
            };

        case constants.GAME_NEXT:
            const newTurn = game.currentTurn + 1;

            return {
                ...state,
                currentGame: {
                    ...game,
                    currentTurn: newTurn,
                    currentPhase: 0,
                },
            };

        case constants.SHOW_RULES:
            return {
                ...state,
                showRules: payload.visibility,
            };

        default:
            return state;
    }
};

const getQuestions = (mode, chosenRegion, chosenDifficultyLevel) => {
	const independentCountries = countriesData;
	// const independentCountries = Object.values(countriesData).filter(
	// 	(c) => c.independent === true
	// );
	const allCountries =
		chosenRegion === 'all'
			? independentCountries
			: independentCountries.filter(
					(c) => c.region === chosenRegion
				);

	// creer une structure différente si on est à hard et en mode world
	const allAnswers = allCountries.reduceRight((cAnswers, c) => {
		const answers = mode.answerSubProperty
			? c[mode.answerProperty][mode.answerSubProperty]
			: c[mode.answerProperty]; /*.map(a => {
					return {
						answer: a,
						region: chosenRegion === "all" ? c.region : c.subregion
					};
				})*/

		return cAnswers.concat(
			...(Array.isArray(answers) ? answers : [answers])
		);
	}, []);
	// console.log(allAnswers);

	const questions = allCountries.map((c) => {
		const question = mode.questionSubProperty
			? c[mode.questionProperty][mode.questionSubProperty]
			: c[mode.questionProperty];
		let answers = mode.answerSubProperty
			? c[mode.answerProperty][mode.answerSubProperty]
			: c[mode.answerProperty];
		const answer = Array.isArray(answers) ? answers.join(', ') : answers;
		const choices = getChoices(
			gameDefaultState.nbChoices,
			answer,
			allAnswers,
			c,
			mode,
			chosenDifficultyLevel
		);

		return {
			country: c.cca3,
			flag: c.flag,
			question,
			choices,
			answer: answer,
			result: undefined,
		};
	});

	return questions;
}
const getChoices = (
    nbChoices,
    answer,
    answersFrom,
    country,
    mode,
    difficultyLevel
) => {
    const choices = [];
    const hardChoices = [getHardAnswer(answer)];
    const indexUsed = [];
    const max = answersFrom.length;

    while (choices.length < nbChoices - 1) {
        const rnd = Math.floor(Math.random() * max);
        if ( indexUsed.indexOf(rnd) >= 0
            || answer.indexOf(answersFrom[rnd]) >= 0
            || choices.indexOf(answersFrom[rnd]) >= 0
        ) {
            continue;
        }
		if (difficultyLevel === DIFFICULTY_EXPERT && hardChoices.indexOf(getHardAnswer(answersFrom[rnd])) >= 0) {
			// console.log(hardChoices);
			// console.log(answersFrom[rnd]);
			continue;
		}
        choices.push(answersFrom[rnd]);
        indexUsed.push(rnd);
		hardChoices.push(getHardAnswer(answersFrom[rnd]));
		// aussi: choisir seulement parmis ceux de même région si on est en mode WORLD
    }

    if (mode.key === CAPITAL) {
    	if (difficultyLevel === DIFFICULTY_NORMAL) {
		// on inclut des villes pas rapport qui existent pas de temps en temps
            
    	} else if (difficultyLevel === DIFFICULTY_HARD) {
			// on inclut aussi des villes non capitales de temps en temps
            if (
                country.cities &&
                country.cities.length &&
                Math.random() * 2 < 1
            ) {
                const otherCities = country.cities;
                choices[Math.floor(Math.random() * choices.length)] =
                    otherCities[Math.floor(Math.random() * otherCities.length)];
            }
        }
    }

	// DIFFICULTY_EXPERT: s'Assurer que la premère et dernière lettre font en sorte que les choix sont uniques

    // ajouter la bonne réponse parmis les choix
    choices.splice(((choices.length + 1) * Math.random()) | 0, 0, answer);
    return choices;
};

export const getHardAnswer = (answer) => {
	return answer[0] + answer[answer.length - 1];
};

export default reducer;
