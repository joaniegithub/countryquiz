import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { newGame, useInGame } from 'store/actions';

import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import FunTypo from 'components/ui/FunTypo';
import Settings from 'components/Settings';

export const TOP_NAV_HEIGHT = 64;

const Header = (props) => {
    const { deferredPrompt } = props;
    const inGame = useInGame();
    const theme = useTheme();
    const dispatch = useDispatch();

    // const mdgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const handleClickCloseGame = (e) => {
        setConfirmCancelGameOpen(true);
    };

    // Settings Delete Dialog
    const [settingsOpen, setSettingsOpen] = useState(false);
    const handleClickSettings = (e) => {
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        setSettingsOpen(false);
    };
    // Confirm Quit Game Dialog
    const [confirmCancelGameOpen, setConfirmCancelGameOpen] = useState(false);
    const handleConfirmCancelGameClose = () => {
        setConfirmCancelGameOpen(false);
        dispatch(newGame());
    };
    const handleConfirmCancelGameDisagree = () => {
        setConfirmCancelGameOpen(false);
    };

    return (
        <React.Fragment>
            <Box
                component="header"
                sx={{
					position: "relative",
                }}
            >
				{inGame && (
					<Typography
						component="h1"
						sx={{
							position:"absolute",
							top: 0,
							left: 0,
							right: 0,
							height: TOP_NAV_HEIGHT,
							lineHeight: TOP_NAV_HEIGHT+"px",
							textAlign: "center",
							px: 2,
							mt: "-2px",
						}}
					>
						<FunTypo
							text="Country"
							color={theme.palette.text.title.replace("#", "")}
							stroke={true}
							strokeWidth="1px"
							distance="2px"
							sx={{
								fontSize:"32px",
								lineHeight:TOP_NAV_HEIGHT+"px",
								fontWeight:800,
								textAlign:"center",
							}}
						/>&nbsp;
						<FunTypo
							text="Quiz"
							color={theme.palette.text.title.replace("#", "")}
							stroke={false}
							strokeWidth="1px"
							distance="2px"
							sx={{
								fontSize:"32px",
								lineHeight:TOP_NAV_HEIGHT+"px",
								fontWeight:800,
								textAlign:"center",
							}}
						/>
					</Typography>
				)}
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2,
                    }}
                >
					{inGame ? (
						<IconButton
							aria-label="close"
							onClick={handleClickCloseGame}
							size="small"
						>
							<CancelIcon />
						</IconButton>
					) : (
						<React.Fragment>
							<IconButton
								aria-label="Settings"
								onClick={handleClickSettings}
								size="small"
								sx={{
									color: '#ccc',
								}}
							>
								<SettingsIcon />
							</IconButton>
						</React.Fragment>
					)}
                </Stack>
            </Box>
            <Dialog
                open={confirmCancelGameOpen}
                onClose={handleConfirmCancelGameClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{`Quit the game?`}</DialogTitle>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleConfirmCancelGameDisagree}
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmCancelGameClose}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Settings
                settingsDialogOpen={settingsOpen}
                handleClose={handleSettingsClose}
                deferredPrompt={deferredPrompt}
            />
        </React.Fragment>
    );
};

export default Header;
