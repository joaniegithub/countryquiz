import { configureStore } from '@reduxjs/toolkit';
import { GAME_VERSION } from 'data/config';

import reducer, { defaultSettings } from './reducer';

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const stateToSave = { ...state };
        delete stateToSave.countriesData;
        delete stateToSave.inWiki;
        const serialisedState = JSON.stringify(stateToSave);
        localStorage.setItem('CountryQuizStore', serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('CountryQuizStore');
        if (serialisedState === null) return undefined;
        const parsedState = JSON.parse(serialisedState);
        const mergedSettings = {
            ...defaultSettings,
            ...parsedState.settings,
        };
        let resetCurrentGame = false;
        if (
            parsedState.currentGame &&
            (!parsedState.currentGame.version ||
                parsedState.currentGame.version !== GAME_VERSION)
        ) {
            resetCurrentGame = true;
        }
        const newState = {
            ...parsedState,
            settings: mergedSettings,
            showRules: false,
            ...(resetCurrentGame ? { currentGame: undefined } : {}),
            // countriesData: [...(Object.values(data))],
        };
        return newState;
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const storeCountryQuiz = configureStore({
    reducer,
    preloadedState: loadFromLocalStorage(),
});

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
storeCountryQuiz.subscribe(() =>
    saveToLocalStorage(storeCountryQuiz.getState())
);

export default storeCountryQuiz;
