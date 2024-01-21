import { useSelector } from 'react-redux';
import * as constants from 'store/constants';

export const useSettings = () => {
    return useSelector((state) => {
        return state.settings;
    });
};
export const useCurrentGame = () => {
    return useSelector((state) => {
        return state.currentGame;
    });
};
export const useShowRules = () => {
    return useSelector((state) => {
        return state.showRules;
    });
};
export const useCountriesData = () => {
    return useSelector((state) => {
        return state.countriesData;
    });
};

// export const editSettings = (_settingsData) => {
// 	return {
// 		type: constants.EDIT_SETTINGS,
// 		settings: _settingsData,
// 	};
// };

export const newGame = () => {
    return {
        type: constants.NEW_GAME,
    };
};
export const startGame = () => {
    return {
        type: constants.START_GAME,
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
export const openRules = (_visibility) => {
    return {
        type: constants.SHOW_RULES,
        visibility: _visibility,
    };
};
