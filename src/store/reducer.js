import data from 'data/countries.json';
import * as constants from 'store/constants';

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
    // nbTurns: -1,
    // turnNumbers: [],
    // dealer: -1,
    currentScore: 0,
    currentTurn: 0,
    currentPhase: 0,
    // nbCards: 52,
    // overrideMode: false,
    // overridePhase: -1,
    // overrideTurn: -1,
    mode: 0,
    difficultyLevel: "normal",
    nbChoices: 4,
    flashCardMode: false,
};

export const gameModes = [
    {
        key: "0",
        name: 'Country\'s Capital',
        questionPhrase: {
            fra: "Quelle est la capitale de ce pays?",
            eng: "What is this country's capital?"
        },
        questionProperty: 'name',
        questionSubProperty: 'common',
        answerProperty: 'capital',
        answerSubProperty: undefined,
        disabled: false,
    },
    {
        key: "1",
        name: 'Capital\'s Country',
        questionPhrase: {
            fra: "De quel pays cette ville est-elle la capitale?",
            eng: "Which country is this capital from?"
        },
        questionProperty: 'capital',
        questionSubProperty: undefined,
        answerProperty: 'name',
        answerSubProperty: 'common',
        disabled: false,
    },
    {
        key: "2",
        name: 'Flag\'s Country',
        questionPhrase: {
            fra: "À quel pays appartient ce drapeau?",
            eng: "Which country does this flag belong to?"
        },
        questionProperty: undefined,
        questionSubProperty: 'flag',
        answerProperty: 'name',
        answerSubProperty: 'common',
        disabled: true,
    },
    {
        key: "3",
        name: 'Borders\'s Country',
        questionPhrase: {
            fra: "Quel pays partage une frontière avec chacun d'eux?",
            eng: "Which country shares a border with them?"
        },
        questionProperty: 'borders',
        questionSubProperty: undefined,
        answerProperty: 'name',
        answerSubProperty: 'common',
        disabled: true,
    },
];

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
            
            const mode = gameModes.find(gm => gm.key === chosenGameMode);

            const independentCountries = Object.values(data).filter((c) => c.independent === true);
            const allCountries = chosenRegion === "all" 
                ? independentCountries 
                : independentCountries.filter(c => c.region === chosenRegion)

                // todo: make sure answers at hard mode will be unique with first and last letter
                // utiliser un utilitaire qui sera ailleurs, et y déplacer shuffle
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
            // question.result = result;
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
}; // {reducer, startState, middleware}

const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

const getChoices = (nbChoices, answers, answersFrom, difficultyLevel) => {
    const choices = [];
    const indexUsed = [];
    const max = answersFrom.length;
    // todo: utiliser difficultyLevel; ajouter plein de villes qui ne sont pas des capitales,
    // et prendre des villes de la même région
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
