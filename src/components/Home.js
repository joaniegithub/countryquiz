import * as React from 'react';
import { useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import NewGame from './NewGame';
import FunTypo from './ui/FunTypo';
import { useTheme } from '@emotion/react';
import { TOP_NAV_HEIGHT } from 'layout/Header';

const Home = (props) => {
    const [showGameOptions, setShowGameOptions] = useState(false);
    const theme = useTheme();
    // const game = useCurrentGame();

    const handleClickNewGame = () => {
        setShowGameOptions(true);
    };
    const handleClickBack = () => {
        setShowGameOptions(false);
    };

    return (
        <React.Fragment>
            <Stack
                alignItems="center"
                direction="column"
                justifyContent="flex-start"
                height="100%"
                flexGrow={1}
                sx={{
                    // background: "#000",
                }}
            >
				<Box
					display="flex"
					alignItems="center"
					direction="column"
					justifyContent="center"
					sx={{
						height: showGameOptions ? "calc(25vh - "+(TOP_NAV_HEIGHT+24)+"px)" : "calc(60vh - "+(TOP_NAV_HEIGHT+24)+"px)",
						transition: "height 0.25s ease",
						// overflowY: "hidden",
					}}
				>
					<Typography
						variant="h1"
						display="block"
						mt="-20px"
					>
						<FunTypo
							text="Country"
							color="000"
							stroke={true}
							strokeWidth="2px"
							distance={6*(showGameOptions?0.75:1)+"px"}
							sx={{
								display: "block",
								fontSize: 84 * (showGameOptions?0.75:1)+"px",
								lineHeight: 110 * (showGameOptions?0.75:1)+"px",
								fontWeight: 800,
								textAlign:"center",
								mb: -36 * (showGameOptions?0.75:1)+"px",
								transition: "0.25s ease",
							}}
						/>
						<FunTypo
							text="Quiz"
							color="000"
							stroke={false}
							strokeWidth="2px"
							distance={7*(showGameOptions?0.75:1)+"px"}
							sx={{
								display: "block",
								fontSize: 120 * (showGameOptions?0.75:1)+"px",
								lineHeight: 132 * (showGameOptions?0.75:1)+"px",
								fontWeight: 800,
								textAlign: "center",
								transition: "0.25s ease",
							}}
						/>
					</Typography>
				</Box>
				<Box
					display="flex"
					alignItems="center"
					direction="column"
					justifyContent="center"
					sx={{
						height: showGameOptions ? "65vh" : "5vh",
						transition: "height 0.25s ease",
						// overflowY: "hidden",
					}}
				>
					{showGameOptions && (
						<NewGame />
					)}
				</Box>
				<Box
					display="flex"
					alignItems="center"
					direction="column"
					justifyContent="center"
					sx={{
						height: showGameOptions ? "10vh" : "35vh",
						transition: "height 0.25s ease",
					}}
				>
					{showGameOptions ? (
						<Button
							color="secondary"
							variant="outlined"
							size="small"
							onClick={handleClickBack}
							startIcon={<ArrowCircleLeftIcon />}
						>
							<FunTypo
								text="Home"
								color={theme.palette.secondary.main.replace("#", "")}
								stroke={false}
								strokeWidth="2px"
								distance="3px"
								sx={{
									fontSize:"24px",
									lineHeight:"24px",
									fontWeight:700,
									mb:"4px",
								}}
							/>
						</Button>
					) : (
						<Button
							variant="contained"
							size="large"
							onClick={handleClickNewGame}
						>
							<FunTypo
								text="New Game"
								color="fff"
								stroke={false}
								strokeWidth="2px"
								distance="3px"
								sx={{
									fontSize:"24px",
									lineHeight:"24px",
									fontWeight:700,
									mb:"4px",
								}}
							/>
						</Button>
					)}
				</Box>
            </Stack>
        </React.Fragment>
    );
};

export default Home;
