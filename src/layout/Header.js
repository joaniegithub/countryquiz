// import { wrapperForAbsolute, mainPadding, colors } from "styles/styles";
import * as React from 'react';

import Menu from '@mui/icons-material/Menu';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import {
    Box,
    IconButton,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery,
} from '@mui/material';
// import { useCurrentGame, changeOverrideMode } from "store/actions";
// import { useDispatch } from "react-redux";
import { alpha } from '@mui/material/styles';

import { SIDE_NAV_WIDTH } from './SideNav';

export const TOP_NAV_HEIGHT = 64;

const Header = (props) => {
    // const { } = props;
    // const game = useCurrentGame();
    // const dispatch = useDispatch();

    const { onNavOpen } = props;
    const mdgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    // const handleClickLock = () => {
    // 	dispatch(changeOverrideMode());
    // };

    return (
        <Box
            component="header"
            sx={{
                backdropFilter: 'blur(6px)',
                backgroundColor: (theme) =>
                    alpha(theme.palette.background.default, 0.8),
                left: {
                    md: `${SIDE_NAV_WIDTH}px`,
                    position: 'relative',
                },
                width: {
                    md: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                },
            }}
        >
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{
                    minHeight: TOP_NAV_HEIGHT,
                    px: 2,
                }}
            >
                <Stack alignItems="center" direction="row" spacing={2}>
                    {!mdgUp && (
                        <IconButton onClick={onNavOpen}>
                            <SvgIcon fontSize="small">
                                <Menu />
                            </SvgIcon>
                        </IconButton>
                    )}
                    <OfflineBoltIcon
                        color="primary"
                        sx={{
                            fontSize: 36,
                            marginRight: '4px',
                        }}
                    />
                    <Typography
                        variant="h1"
                        color="primary"
                        sx={{
                            fontSize: 32,
                            marginRight: '4px',
                            fontWeight: 800,
                        }}
                    >
                        Country Quiz
                    </Typography>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                    <div>
                        {/*game && (
					<IconButton
						aria-label="close"
						onClick={handleClickLock}
						size="small"
						sx={{
							color: "#ccc",
						}}
					>
						{game.overrideMode ? <LockOpenIcon /> : <LockIcon />}
					</IconButton>
					)*/}
                    </div>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Header;
