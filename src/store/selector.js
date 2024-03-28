import { gameModes } from 'data/config';
import { useSelector } from 'react-redux';

// SELECTOR HOOKS
export const useSettings = () => {
    return useSelector((state) => {
        return state.settings;
    });
};
export const useIsDarkMode = () => {
    return useSelector((state) => {
        return state.settings.isDarkMode;
    });
};
export const useShowAdvancedOptions = () => {
    return useSelector((state) => {
        return state.settings.showAdvancedOptions;
    });
};
export const useLanguage = () => {
    return useSelector((state) => {
        return state.settings.language;
    });
};
export const useInGame = () => {
    return useSelector((state) => {
        return state.inGame;
    });
};
export const useInWiki = () => {
    return useSelector((state) => {
        return state.inWiki;
    });
};
export const useCurrentGame = () => {
    return useSelector((state) => {
        return state.currentGame;
    });
};
export const useGameOptions = () => {
    return useSelector((state) => {
        return state.gameOptions;
    });
};
export const useGameMode = () => {
    return useSelector((state) => {
        if (state.currentGame) {
            return gameModes.find((gm) => gm.key === state.currentGame.gameMode);
        }
        return undefined;
    });
};
// export const useShowRules = () => {
//     return useSelector((state) => {
//         return state.showRules;
//     });
// };
export const useCountriesData = () => {
    return useSelector((state) => {
        return state.countriesData;
    });
};

// export const getGameCanGoNext = (game) => {
//     if (game.currentPhase === 0) {
//         // Betting phase
//         let total = 0;
//         const bets = game.players.find((player) => {
//             if (player.bets[game.currentTurn] !== undefined) {
//                 total += player.bets[game.currentTurn];
//                 return false;
//             }
//             return true;
//         });
//         const nb = (bets && bets.length) || 0;
//         const valid = nb === 0 && total !== game.turnNumbers[game.currentTurn];
//         return valid;
//     }

//     if (game.currentPhase === 2) {
//         // Betting phase
//         let total = 0;
//         const tricks = game.players.find((player) => {
//             if (player.tricks[game.currentTurn] !== undefined) {
//                 total += player.tricks[game.currentTurn];
//                 return false;
//             }
//             return true;
//         });
//         const nb = (tricks && tricks.length) || 0;
//         const valid = nb === 0 && total === game.turnNumbers[game.currentTurn];
//         return valid;
//     }

//     if (game.currentPhase === 1 || game.currentPhase === 3) {
//         return true;
//     }
// };

// export const getGameTotalBetOrTricks = (game) => {
//     const total = game.players.reduce((a, b) => {
//         const betsOrtricksProp = game.currentPhase === 0 ? b.bets : b.tricks;
//         return (
//             a +
//             (betsOrtricksProp[game.currentTurn]
//                 ? betsOrtricksProp[game.currentTurn]
//                 : 0)
//         );
//     }, 0);
//     return total;
// };
