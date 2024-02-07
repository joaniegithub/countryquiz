export const GAME_VERSION = '1.06';

export const DIFFICULTY_FLASHCARD = 'flashCard';
export const DIFFICULTY_NORMAL = 'normal';
export const DIFFICULTY_HARD = 'hard';
export const DIFFICULTY_EXPERT = 'expert';

export const CAPITAL = 'capital';
export const COUNTRY_BY_CAPITAL = 'country_capital';
export const FLAG = 'flag';
export const COUNTRY_BY_FLAG = 'country_flag';
export const TRIVIA = 'trivia';

export const NB_CHOICES = 4;

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

export const questionTypes = [
	{
		key: 'capital',
		questionPhrase: {
			fra: "Quelle est la capitale de ce pays?",
			eng: "What is this country's capital?",
		},
		questionProperty: 'name-common',
		answerProperty: 'capital',
		disabled: false,
	},
	{
		key: 'not_capital',
		questionPhrase: {
			fra: "Laquelle de ces villes n'est pas la capitale d'un pays?",
			eng: "Wich of theses cities is not a capital?",
		},
		questionProperty: 'name-common', // wrong
		answerProperty: 'capital', // wrong
		disabled: false,
	},
	{
		key: 'country_capital',
        questionPhrase: {
            fra: "De quel pays cette ville est-elle la capitale?",
            eng: 'Which country is this capital from?',
        },
        questionProperty: 'capital',
        answerProperty: 'name-common',
        disabled: false,
	},
	{
		key: 'flag',
        questionPhrase: {
            fra: "Quel est le drapeau de ce pays?",
            eng: "Which country does this flag belongs to?",
        },
		questionProperty: 'name-common',
        answerProperty: 'cca3',
        disabled: false,
	},
	{
		key: 'country_flag',
        questionPhrase: {
            fra: "À quel pays appartient ce drapeau?",
            eng: "Which country does this flag belong to?",
        },
        questionProperty: 'cca3',
        answerProperty: 'name-common',
        disabled: false,
	},
	{
		key: 'name_official',
        questionPhrase: {
            fra: "Quel est le nom officiel de ce pays?",
            eng: "What is this country's official name?",
        },
        questionProperty: 'name-common',
        answerProperty: 'name-official',
        disabled: true,
	},
	{
		key: 'name_official_wrong',
        questionPhrase: {
            fra: "Lequel de ces pays n'existe pas?",
            eng: "Which of these countries does not exist?",
        },
        questionProperty: undefined,
        answerProperty: 'name-official',
        disabled: true,
	},
	{
		key: 'name_official_good',
        questionPhrase: {
            fra: "Un seul de ces pays existe. Lequel?",
            eng: "Only one of these countries does exist. Which one?",
        },
        questionProperty: undefined,
        answerProperty: 'name-official',
        disabled: true,
	},
];

export const questionTypeIndex = {};
questionTypes.forEach(q => {
	questionTypeIndex[q.key] = q;
});

export const gameModes = [
    {
        key: CAPITAL,
        name: {
            fra: "Pays - Capitale",
            eng: "Country's Capital",
        },
        shortName: {
            fra: "Capitales",
            eng: "Capitals",
        },
		questionType: questionTypeIndex.capital,
    },
    {
        key: COUNTRY_BY_CAPITAL,
        name: {
            fra: "Capitale - Pays",
            eng: "Capital's Country",
        },
        shortName: {
            fra: "Capitales",
            eng: "Capitals",
        },
		questionType: questionTypeIndex.country_capital,
    },
    {
        key: COUNTRY_BY_FLAG,
        name: {
            fra: "Drapeau - Pays",
            eng: "Flag's Country",
        },
        shortName: {
            fra: "Drapeaux",
            eng: "Flags",
        },
		questionType: questionTypeIndex.country_flag,
    },
    // {
    //     key: FLAG,
    //     name: {
    //         fra: "Pays - Drapeau",
    //         eng: "Country's Flag's",
    //     },
    //     shortName: {
    //         fra: "Drapeaux",
    //         eng: "Flags",
    //     },
	// 	questionType: questionTypeIndex.flag,
    // },
];

export const officials = {
	usuals: [
		"Republic of ___",
		"Commonwealth of ___",
		"Kingdom of ___",
		"State of ___",
		"___ Republic",
		"Democratic Republic of ___",
		"___",
	],
	rare: [
		"Principality of ___",
		"Federal Republic of ___",
		"Federal Democratic Republic of ___",
		"People's Republic of ___",
		"Independent State of ___",
		"Socialist Republic of ___",
	],
	unique: [
		"Commonwealth of the ___",
		"Sultanate of ___",
		"Country of ___",
		"Federative Republic of ___",
		"Federated States of ___",
		"Co-operative Republic of ___",
		"United States of ___",
		"Collectivity of ___",
		"Plurinational State of ___",
		"Bolivarian Republic of ___",
		"United Republic of ___",
		"Nation of ___",
		"Most Serene Republic of ___",
		"Democratic People's Republic of ___",
		"___ Confederation",
		"___ State",
		"___ Federation",
	],
	noBorders: [
		"___ Island", // (when no borders)
	],
	noBordersMany: [
		"___ Islands", // (when no borders and name with ' and ' and no island)
	],
	dependant: [
		"Territory of ___", // (when dependant)
	],
	regionBoundRare: [
		"Islamic Republic of ___", // Southern Asia, Western Africa. Include also in: Northern Africa, Western Asia
	],
	regionBoundUnique: [
		"Arab Republic of ___", // Northern Africa, Western Asia. Include also in: Southern Asia, Western Africa.
		"___ Arab Republic", // Western Asia. Include also in:
		"Oriental Republic of ___", // South America. Include also in:
	],
};

/*

Capitals:
Wich of theses cities is not a capital
What is this capital's country
What is this coutry's capital

Flags:
What is this flag's country
What is this coutry's flag


Official Name:
What is the official name of COUNTRY
*/

/*
Borders:
Which of these countries...
	does not share a border with <COUNTRY>
	shares a border with COUNTRY
	has a common border with COUNTRY
	has the more land borders (similar -+3)
	has the less land borders (similar -+2 but all >= 2)
	has no land borders (choices from thoses who only have one)

Dependance:
Which of these countries...
	has COUNTRY as Sovereign State (choices from dependant states)
	is the Sovereign State of COUNTRY (choices from countries who are sovereign states)
	is not independent

Languages:

Currencies:

Area:
Water %:
https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area
Which has the highest
which has the lowest
what is this country's area

Population:
Which has the highest
which has the lowest
what is this country's population

Timezones:


*/