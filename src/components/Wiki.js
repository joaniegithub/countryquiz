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
    Card,
    TextField,
} from '@mui/material';

import GameFlag from './ui/GameFlag';
import CountryCard from './ui/CountryCard';
import MainButton from './ui/MainButton';

const Wiki = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
	const { t, i18n } = useTranslation();

	const [country, setCountry] = useState(countriesData[0]);
	const [countryIndex, setCountryIndex] = useState(0);

	const handleChangeCountry = useCallback((event, newInputValue) => {
		setCountry(newInputValue);
		setCountryIndex(countriesData.indexOf(newInputValue));
	});

    const handleClickHome = () => {
        dispatch(setInWiki(false));
    };
    const handleClickPrevious = () => {
		const newIndex = countryIndex-1 < 0 ? countriesData.length-1 : countryIndex-1;
		setCountry(countriesData[newIndex]);
		setCountryIndex(newIndex);
    };
    const handleClickNext = () => {
		const newIndex = countryIndex+1 > countriesData.length ? 0 : countryIndex+1;
		setCountry(countriesData[newIndex]);
		setCountryIndex(newIndex);
    };

    return (
        <>
			<Box
				display="flex"
                alignItems="center"
                flexDirection="column"
                justifyContent="flex-start"
                height="100%"
                flexGrow={1}
				position="relative"
				sx={{
					position: 'relative',
					width: "100%",
					height: "100%",
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
				<CountryCard country={country} onNext={handleClickNext} onPrevious={handleClickPrevious} />
				<Box
					my={2}
					sx={{
						textAlign: 'center',
						// height: '10vh',
					}}
				>
					<MainButton
						buttonP={{
							color: 'secondary',
							onClick: handleClickHome,
							startIcon: (<ArrowCircleLeftIcon />),
						}}
					>
						{t("Home")}
					</MainButton>
				</Box>
			</Box>
        </>
    );
};

export default Wiki;