export const GAME_VERSION = '1.05';

export const DIFFICULTY_FLASHCARD = 'flashCard';
export const DIFFICULTY_NORMAL = 'normal';
export const DIFFICULTY_HARD = 'hard';
export const DIFFICULTY_EXPERT = 'expert';

export const CAPITAL = 'capital';
export const COUNTRY_BY_CAPITAL = 'country_capital';
export const COUNTRY_BY_FLAG = 'country_flag';
export const COUNTRY_BY_BORDER = 'country_border';

export const difficultyLevels = [
    // {
    //     key: DIFFICULTY_FLASHCARD,
    //     name: 'Flashcard',
    //     disabled: true,
    // },
    {
        key: DIFFICULTY_NORMAL,
        name: 'Normal',
        disabled: false,
    },
    {
        key: DIFFICULTY_HARD,
        name: 'Hard',
        disabled: false,
    },
    {
        key: DIFFICULTY_EXPERT,
        name: 'Expert',
        disabled: false,
    },
];

export const gameModes = [
    {
        key: CAPITAL,
        name: "Country's Capital",
        questionPhrase: {
            fra: 'Quelle est la capitale de ce pays?',
            eng: "What is this country's capital?",
        },
        questionProperty: 'name',
        questionSubProperty: 'common',
        answerProperty: 'capital',
        answerSubProperty: undefined,
        disabled: false,
    },
    {
        key: COUNTRY_BY_CAPITAL,
        name: "Capital's Country",
        questionPhrase: {
            fra: 'De quel pays cette ville est-elle la capitale?',
            eng: 'Which country is this capital from?',
        },
        questionProperty: 'capital',
        questionSubProperty: undefined,
        answerProperty: 'name',
        answerSubProperty: 'common',
        disabled: false,
    },
    {
        key: COUNTRY_BY_FLAG,
        name: "Flag's Country",
        questionPhrase: {
            fra: 'À quel pays appartient ce drapeau?',
            eng: 'Which country does this flag belong to?',
        },
        questionProperty: 'cca3',
        questionSubProperty: undefined,
        answerProperty: 'name',
        answerSubProperty: 'common',
        disabled: false,
    },
    // {
    //     key: COUNTRY_BY_BORDER,
    //     name: "Borders's Country",
    //     questionPhrase: {
    //         fra: "Quel pays partage une frontière avec chacun d'eux?",
    //         eng: 'Which country shares a border with them?',
    //     },
    //     questionProperty: 'borders',
    //     questionSubProperty: undefined,
    //     answerProperty: 'name',
    //     answerSubProperty: 'common',
    //     disabled: true,
    // },
];
