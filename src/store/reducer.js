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
    nbChoices: 4,
    flashCardMode: false,
};

export const gameModes = [
    {
        key: 0,
        name: 'Country\'s Capital',
        questionProperty: 'name',
        questionSubProperty: 'common',
        answerProperty: 'capital',
        answerSubProperty: undefined,
    },
    {
        key: 1,
        name: 'Capital\'s Country',
        questionProperty: 'capital',
        questionSubProperty: undefined,
        answerProperty: 'name',
        answerSubProperty: 'common',
    },
    {
        key: 2,
        name: 'Flag\'s Country',
        questionProperty: undefined,
        questionSubProperty: 'flag',
        answerProperty: 'name',
        answerSubProperty: 'common',
    },
    {
        key: 3,
        name: 'Borders\'s Country',
        questionProperty: 'borders',
        questionSubProperty: undefined,
        answerProperty: 'name',
        answerSubProperty: 'common',
    },
];

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

const getChoices = (nbChoices, answers, answersFrom) => {
    const choices = [];
    const indexUsed = [];
    const max = answersFrom.length;
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

const reducer = (state = defaultState, { type, ...payload }) => {
    // console.log(state, type, payload);
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
            const independentCountries = shuffle(
                Object.values(data).filter((c) => c.independent === true)
            );

            const mode = gameModes[gameDefaultState.mode];

            const allAnswers = independentCountries.reduceRight(
                (cAnswers, c, test) => {
                    const answers = mode.answerSubProperty
                        ? c[mode.answerProperty][mode.answerSubProperty]
                        : c[mode.answerProperty];
                    return cAnswers.concat(...answers);
                },
                []
            );

            const questions = independentCountries.map((c) => {
                const question = mode.questionSubProperty
                    ? c[mode.questionProperty][mode.questionSubProperty]
                    : c[mode.questionProperty];
                const answers = (
                    mode.answerSubProperty
                        ? c[mode.answerProperty][mode.answerSubProperty]
                        : c[mode.answerProperty]
                ).join(', ');
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

            // console.log(questions);

            return {
                ...state,
                currentGame: {
                    ...gameDefaultState,
                    mode,
                    questions,
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

export default reducer;
