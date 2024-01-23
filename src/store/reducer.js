import { countryCites, gameModes } from 'data/config';
import data from 'data/countries.json';
import * as constants from 'store/constants';
import { shuffle } from 'util/util';

export const defaultSettings = {};

const defaultState = {
    name: 'CountryQuiz',
    settings: defaultSettings,
    currentGame: undefined,
    showRules: false,
    countriesData: [...Object.values(data)],
};

const gameDefaultState = {
    gameMode: 1,
    questions: [],
    currentScore: 0,
    currentTurn: 0,
    currentPhase: 0,
    mode: 0,
    difficultyLevel: "normal",
    nbChoices: 4,
    flashCardMode: false,
};

const reducer = (state = defaultState, { type, ...payload }) => {
    console.log(state, type, payload);
    const game = state.currentGame;

    switch (type) {
        case constants.EDIT_SETTINGS:
            return {
                ...state,
                settings: { ...state.settings, ...payload.settings },
            };

        case constants.NEW_GAME:
            return {
                ...state,
                currentGame: undefined,
            };

        case constants.START_GAME:
            const chosenGameMode = payload.chosenGameMode;
            const chosenRegion = payload.chosenRegion;
            const chosenDifficultyLevel = payload.chosenDifficultyLevel;

            // todo: d\u00e9placer la logique de construction dui quiz dans un utilitaire
            
            const mode = gameModes.find(gm => gm.key === chosenGameMode);
            
            // const independentCountries = Object.values(data);
            // countryCites.forEach(countryStr => {
            //     const countryData = countryStr.split("|");
            //     let line = "";
            //     if(countryData.length > 2) {
            //         const c = independentCountries.find(c => c.name.common === countryData[0]);
            //         for (let i=2; i<countryData.length; i++){
            //             if(c.capital.indexOf(countryData[i]) >= 0) {
            //                 continue;
            //             } else {
            //                 line += " | "+countryData[i];
            //             }
            //         }
            //         // console.log(c.name.common, c.capital[0], countryData[3]);
            //         console.log(c.name.common, c.capital[0], line);
            //     }
            // });
            const independentCountries = Object.values(data).filter((c) => c.independent === true);
            const allCountries = chosenRegion === "all" 
                ? independentCountries 
                : independentCountries.filter(c => c.region === chosenRegion)

                // todo: make sure answers at hard mode will be unique with first and last letter
                // utiliser un utilitaire qui sera ailleurs, et y d\u00e9placer shuffle
            const allAnswers = allCountries.reduceRight(
                (cAnswers, c) => {
                    const answers = mode.answerSubProperty
                        ? c[mode.answerProperty][mode.answerSubProperty]
                        : c[mode.answerProperty];
                    return cAnswers.concat(...(Array.isArray(answers) ? answers : [answers]));
                },
                []
            );

            const questions = allCountries.map((c) => {
                const question = mode.questionSubProperty
                    ? c[mode.questionProperty][mode.questionSubProperty]
                    : c[mode.questionProperty];
                let answers = mode.answerSubProperty
                    ? c[mode.answerProperty][mode.answerSubProperty]
                    : c[mode.answerProperty];
                    answers = Array.isArray(answers) ? answers.join(', ') : answers;
                const choices = getChoices(
                    gameDefaultState.nbChoices,
                    answers,
                    allAnswers
                );

                return {
                    country: c.cca3,
                    flag: c.flag,
                    question,
                    choices,
                    answers: answers,
                    result: undefined,
                };
            });

            return {
                ...state,
                currentGame: {
                    ...gameDefaultState,
                    gameMode: mode,
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

        // case constants.SAVE_SETTING_PROPERTY_SETTINGS:
        // 	return {
        // 		...state,
        // 		settings: { ...state.settings, ...payload.settings },
        // 	};

        default:
            return state;
    }
};

const getChoices = (nbChoices, answers, answersFrom, difficultyLevel) => {
    const choices = [];
    const indexUsed = [];
    const max = answersFrom.length;
    // todo: utiliser difficultyLevel; ajouter plein de villes qui ne sont pas des capitales,
    // et prendre des villes de la même r\u00e9gion
    while (choices.length < nbChoices - 1) {
        const rnd = Math.floor(Math.random() * max);
        if (
            indexUsed.indexOf(rnd) >= 0 ||
            answers.indexOf(answersFrom[rnd]) >= 0 ||
            choices.indexOf(answersFrom[rnd]) >= 0
        ) {
            // console.log(rnd, answersFrom[rnd]); // already in the choices
            continue;
        }
        choices.push(answersFrom[rnd]);
        indexUsed.push(rnd);
    }
    // console.log(choices, answers);
    choices.splice(((choices.length + 1) * Math.random()) | 0, 0, answers);
    // console.log(choices);
    return choices;
};

export default reducer;
