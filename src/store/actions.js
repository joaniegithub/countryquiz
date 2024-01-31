import * as constants from 'store/constants';

// ACTIONS
export const editSettings = (_settingsData) => {
    return {
        type: constants.EDIT_SETTINGS,
        settings: _settingsData,
    };
};

export const setInWiki = (_inWiki) => {
    return {
        type: constants.IN_WIKI,
        inWiki: _inWiki,
    };
};

export const newGame = () => {
    return {
        type: constants.NEW_GAME,
    };
};

export const startGame = (
    _chosenGameMode,
    _chosenRegion,
    _chosenDifficultyLevel,
    _choosenIndependantOnly
) => {
    return {
        type: constants.START_GAME,
        chosenGameMode: _chosenGameMode,
        chosenRegion: _chosenRegion,
        chosenDifficultyLevel: _chosenDifficultyLevel,
        chosenIndependantOnly: _choosenIndependantOnly,
    };
};

export const gameNext = () => {
    return {
        type: constants.GAME_NEXT,
    };
};

export const gameAnswer = (_chosenAnswer) => {
    return {
        type: constants.GAME_ANSWER,
        chosenAnswer: _chosenAnswer,
    };
};

// export const openRules = (_visibility) => {
//     return {
//         type: constants.SHOW_RULES,
//         visibility: _visibility,
//     };
// };
