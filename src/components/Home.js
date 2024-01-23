import * as React from 'react';
import { useState } from 'react';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { Button, Stack, Typography } from '@mui/material';

import NewGame from './NewGame';

const Home = (props) => {
    const [showGameOptions, setShowGameOptions] = useState(false);
    // const game = useCurrentGame();

    const handleClickNewGame = () => {
        setShowGameOptions(true);
    };

    const title = "Country";
    const title2 = "Quiz";
    const color = "ffffff";

    return (
        <React.Fragment>
            <Stack
                alignItems="center"
                direction="column"
                justifyContent="space-evenly"
                height="100%"
                flexGrow={1}
                sx={{
                    background: "#505",
                }}
            >
                {showGameOptions ? (
                    <NewGame />
                ) : (
                    <React.Fragment>
                    <Typography
                            variant="h1"
                            sx={{
                                // Stroke;
                                // "-webkit-text-stroke-width": "2px",
                                // "-moz-text-stroke-width": "2px",
                                // "-webkit-text-stroke-color": "#"+color,
                                // "-moz-text-stroke-color": "#"+color,
                                // color: "transparent",
                                
                                // Full
                                color: "#"+color,
                                
                                textAlign: "center",
                                mb: "40px",
                                fontWeight: "800",
                            }}
                        >
                            <Typography
                                sx={{
                                    position: "relative",         
                                    fontSize: "84px",
                                    fontWeight: "800",
                                    lineHeight: "110px",
                                    width: "100%",
                                    zIndex: 2,
                                    mb: "-36px",
                                    

                                    '&:before': {
                                        pointerEvents: "none",
                                        content: '"'+title+'"',
                                        background: 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg" width="6px" height="4px"><defs></defs><polygon points="0 0 6 4 6 3 1.5 0" fill="%23'+color+'"></polygon><polygon points="0 4 1.5 4 0 3" fill="%23'+color+'"></polygon></svg>\') repeat',
                                        left: "calc(50% + 6px)",
                                        position: "absolute",
                                        top: "calc(50% + 6px)",
                                        transform: "translate(-50%, -50%)",
                                        zIndex: 1,
                                        width: "100%",
                                        // @include stroke-width(0),
                                        "-webkit-text-stroke-width": 0,
                                        "-moz-text-stroke-width": 0,
                                        // @include background-clip(text),
                                        "-webkit-background-clip": "text",
                                        "-moz-background-clip": "text",
                                        "background-clip": "text",
                                        // @include fill-color(transparent),
                                        "-webkit-text-fill-color": "transparent",
                                        "-moz-text-fill-color": "transparent",
                                    }
                                }}>{title}</Typography>
                                <Typography
                                    sx={{
                                        position: "relative",
                                        fontSize: "120px",
                                        fontWeight: "800",
                                        lineHeight: "132px",
                                        width: "100%",
                                        zIndex: 2,
    
                                        '&:before': {
                                            pointerEvents: "none",
                                            content: '"'+title2+'"',
                                            background: 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg" width="6px" height="4px"><defs></defs><polygon points="0 0 6 4 6 3 1.5 0" fill="%23'+color+'"></polygon><polygon points="0 4 1.5 4 0 3" fill="%23'+color+'"></polygon></svg>\') repeat',
                                            left: "calc(50% + 7px)",
                                            position: "absolute",
                                            top: "calc(50% + 7px)",
                                            transform: "translate(-50%, -50%)",
                                            zIndex: 1,
                                            width: "100%",
                                            // @include stroke-width(0),
                                            "-webkit-text-stroke-width": 0,
                                            "-moz-text-stroke-width": 0,
                                            // @include background-clip(text),
                                            "-webkit-background-clip": "text",
                                            "-moz-background-clip": "text",
                                            "background-clip": "text",
                                            // @include fill-color(transparent),
                                            "-webkit-text-fill-color": "transparent",
                                            "-moz-text-fill-color": "transparent",
                                        }
                                    }}
                                >{title2}</Typography>
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<OfflineBoltIcon />}
                            onClick={handleClickNewGame}
                        >
                            New Game
                        </Button>
                    </React.Fragment>
                )}
            </Stack>
        </React.Fragment>
    );
};

export default Home;
