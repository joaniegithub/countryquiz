import { CAPITAL, DIFFICULTY_NORMAL, GAME_VERSION, SHORT, gameModes } from 'data/config';
import countriesData from 'data/countries.json';
import * as constants from 'store/constants';
import { shuffle } from 'util/util';

import { getQuestions } from './QuizBuilder';

export const defaultSettings = {
    showAdvancedOptions: false,
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
    version: GAME_VERSION,
    currentScore: 0,
    currentTurn: 0,
    currentPhase: 0,
    // Used
    gameMode: CAPITAL,
    region: 'all',
    independantOnly: false,
    difficultyLevel: DIFFICULTY_NORMAL,
    gameLength: SHORT,
    questions: [],
    // mode: 0, // i think it's not used
};

export const getAllCountriesCodes = () => {
    return countriesData;
};

const reducer = (state = defaultState, { type, ...payload }) => {
    // console.log(state, type, payload);
    const game = state.currentGame;
    const settings = state.settings;

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
                          gameMode: game.gameMode,
                          region: game.region,
                          independantOnly: game.independantOnly,
                          difficultyLevel: game.difficultyLevel,
                          gameLength: game.gameLength,
                          hideBackgroundMap: game.hideBackgroundMap,
                      }
                    : undefined,
            };

        case constants.START_GAME:
            const chosenGameMode = payload.chosenGameMode;
            const chosenRegion = payload.chosenRegion;
            const chosenDifficultyLevel = payload.chosenDifficultyLevel;
            const chosenIndependantOnly = payload.chosenIndependantOnly;
            const chosenGameLength = payload.chosenGameLength;
            const chosenHideBackgroundMap = payload.chosenHideBackgroundMap;
            const mode = gameModes.find((gm) => gm.key === chosenGameMode);

            const questions = getQuestions(
                settings.language,
                mode,
                chosenRegion,
                chosenDifficultyLevel,
                chosenIndependantOnly,
				chosenGameLength
            );

            return {
                ...state,
                inGame: true,
                currentGame: {
                    ...gameDefaultState,
                    gameMode: mode.key,
                    region: chosenRegion,
                    independantOnly: chosenIndependantOnly,
                    difficultyLevel: chosenDifficultyLevel,
                    gameLength: chosenGameLength,
                    hideBackgroundMap: chosenHideBackgroundMap,
                    questions: shuffle(questions),
                },
            };

        case constants.GAME_ANSWER:
            const chosenAnswer = payload.chosenAnswer;
            const allQuestions = [...game.questions];
            const question = { ...allQuestions[game.currentTurn] };
            const result = chosenAnswer === question.answer;

            const currentScore = result ? game.currentScore + 1 : game.currentScore;

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

export default reducer;
