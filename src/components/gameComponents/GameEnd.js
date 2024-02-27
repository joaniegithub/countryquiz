import { useTheme } from '@emotion/react';
import { difficultyLevels } from 'data/config';
import regionsData from 'data/regions.json';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameMode } from 'store/selector';

import { Stack, Typography } from '@mui/material';

import FunTypo from '../ui/FunTypo';

const GameEnd = (props) => {
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const gameMode = useGameMode();
    const { game } = props;
    const region = regionsData.find((r) => r.eng === game.region);

    return (
        <Stack
            display="flex"
            alignItems="center"
            direction="column"
            justifyContent="center"
            sx={{
                my: 2,
                flexGrow: 1,
                width: '100%',
            }}
        >
            <Typography
                display="block"
                color="primary"
                fontSize="32px"
                lineHeight="36px"
                fontWeight={800}
                textAlign="center"
                mb={-1}
            >
                {gameMode.shortName[i18n.language]} {region.article[i18n.language]}
                {region[i18n.language]}
            </Typography>
            <Typography display="block" color="secondary" fontSize="32px" fontWeight={800} mb={2}>
                {t(game.difficultyLevel)}
            </Typography>
            <Typography display="block">
                <FunTypo
                    text={t('Final')}
                    color={theme.palette.text.title.replace('#', '')}
                    stroke={true}
                    strokeWidth="2px"
                    distance="5px"
                    sx={{
                        display: 'block',
                        fontSize: '64px',
                        lineHeight: '72px',
                        fontWeight: 800,
                        textAlign: 'center',
                        mb: '-32px',
                        transition: '0.25s ease',
                    }}
                />
                <FunTypo
                    text={t('Score')}
                    color={theme.palette.text.title.replace('#', '')}
                    stroke={false}
                    strokeWidth="2px"
                    distance="6px"
                    sx={{
                        display: 'block',
                        fontSize: '72px',
                        lineHeight: '84px',
                        fontWeight: 800,
                        textAlign: 'center',
                        transition: '0.25s ease',
                    }}
                />
            </Typography>
            <Stack
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
                direction="row"
                sx={{
                    width: 'auto',
                }}
            >
                <FunTypo
                    text={game.currentScore}
                    color={theme.palette.primary.contrast.replace('#', '')}
                    stroke={false}
                    distance="7px"
                    flexGrow={0}
                    sx={{
                        display: 'block',
                        fontSize: '96px',
                        lineHeight: '108px',
                        fontWeight: 800,
                        width: 'auto',
                    }}
                />
                <FunTypo
                    text={'/' + game.questions.length}
                    color={theme.palette.secondary.main.replace('#', '')}
                    stroke={false}
                    distance="7px"
                    flexGrow={0}
                    sx={{
                        display: 'block',
                        fontSize: '72px',
                        lineHeight: '84px',
                        fontWeight: 800,
                        width: 'auto',
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default GameEnd;
