import { useEffect, useState } from 'react';

import { ThemeProvider } from '@mui/material';

import './App.css';
import Game from './components/Game';
import Home from './components/Home';
import Layout from './layout/Layout';
import { useCurrentGame } from './store/actions';
import { createTheme as createMyTheme } from './theme';

const theme = createMyTheme();
// const useStyles = makeStyles((theme) => {
// 	root: {
// 		// some CSS that accesses the theme
// 	}
// });
// const styles = () => ({
// 	box: {
// 		padding: "14px 0",
// 		display: "flex",
// 		flexDirection: "column",
// 		alignItems: "flex-start",
// 		justifyContent: "center",

// 		minHeight: "480px",
// 	},
// });

/*module.exports = {
	printWidth: 80,
	tabWidth: 4,
	trailingComma: "all",
	singleQuote: true,
	jsxBracketSameLine: true,
	semi: true,
	plugins: [require("./lib/src/index.js")],
	importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^@mui/(.*)$", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
*/

const CountryQuizApp = (props) => {
    // const { classes } = props;
    // const dispatch = useDispatch();
    const [deferredPrompt, setDeferredPrompt] = useState(undefined);

    const currentGame = useCurrentGame();

    // const handleCloseInfoModal = () => {
    // 	dispatch(openRules(false));
    // };

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', function (event) {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            event.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(event);
        });
    }, []);

    //<Box className={classes.box}>
    return (
        <ThemeProvider theme={theme}>
            <Layout deferredPrompt={deferredPrompt}>
                {currentGame ? (
                    <Game />
                ) : (
                    <Home />
                )}
                {/* <InfoModal openInfoModal={showRules} onCloseInfoModal={handleCloseInfoModal} /> */}
            </Layout>
        </ThemeProvider>
    );

    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>
    //           Edit <code>src/App.js</code> and save to reload.
    //         </p>
    //         <a
    //           className="App-link"
    //           href="https://reactjs.org"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           Learn React
    //         </a>
    //       </header>
    //     </div>
    //   );
};

export default CountryQuizApp;
