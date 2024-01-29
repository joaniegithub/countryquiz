import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import regionsData from 'data/regions.json';
import countriesData from 'data/countries.json';
import { setInWiki } from 'store/actions';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {
	Autocomplete,
    Box,
    Button,
    Card,
	List,
	ListItem,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

import FunTypo from './ui/FunTypo';
import GameFlag from './ui/GameFlag';
import CountryCard from './ui/CountryCard';

const Wiki = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
	const { t, i18n } = useTranslation();

	const [country, setCountry] = useState(undefined);

	const handleChangeCountry = useCallback((event, newInputValue) => {
		console.log(newInputValue);
		setCountry(newInputValue);
	});

    const handleClickHome = () => {
        dispatch(setInWiki(false));
    };

    return (
        <React.Fragment>
			<Box
				display="flex"
                alignItems="center"
                flexDirection="column"
                justifyContent="flex-start"
                height="100%"
                flexGrow={1}
				position="relative"
				mt={2}
				sx={{
					position: 'relative',
					height: '100%',
					width: "100%",
				}}
			>
				<Card
					raised={true}
					sx={{
						px: 2,
						py: 2,
						mt: 2,
						textAlign: 'center',
						width: '100%',
						boxSizing: 'border-box',
					}}
				>
					<Autocomplete
						id="country-select"
						sx={{ width: "100%" }}
						options={countriesData}
						// autoHighlight
						blurOnSelect
						getOptionLabel={(option) => option.name.common}
						renderOption={(props, option) => (
							<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
								<Box
									sx={{
										width: '40px',
									}}
								>
									<GameFlag border={false} country={option.cca3.toLowerCase()} />
								</Box>
								{option.name.common}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label={t("Choose a country")}
								inputProps={{
									...params.inputProps,
									// autoComplete: 'new-password', // disable autocomplete and autofill
								}}
							/>
						)}
						value={country}
						onChange={handleChangeCountry}
					/>
				</Card>
				<CountryCard country={country} />
			</Box>
			<Box
				sx={{
					textAlign: 'center',
					height: '10vh',
				}}
			>
				<Button
					color="secondary"
					variant="contained"
					size="large"
					onClick={handleClickHome}
					startIcon={<ArrowCircleLeftIcon />}
				>
					<FunTypo
						text={t("Home")}
						color="fff"
						stroke={false}
						strokeWidth="2px"
						distance="3px"
						sx={{
							fontSize: '24px',
							lineHeight: '24px',
							fontWeight: 800,
							mb: '4px',
						}}
					/>
				</Button>
			</Box>
        </React.Fragment>
    );
};

export default Wiki;