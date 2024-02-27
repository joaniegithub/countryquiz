import countriesData from 'data/countries.json';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setInWiki } from 'store/actions';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Autocomplete, Box, Card, TextField } from '@mui/material';

import CountryCard from './ui/CountryCard';
import GameFlag from './ui/GameFlag';
import MainButton from './ui/MainButton';

const Wiki = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [country, setCountry] = useState(countriesData[0]);
    const [countryIndex, setCountryIndex] = useState(0);

    const handleChangeCountry = (event, newInputValue) => {
        setCountry(newInputValue);
        setCountryIndex(countriesData.indexOf(newInputValue));
    };

    const handleClickHome = () => {
        dispatch(setInWiki(false));
    };
    const handleClickPrevious = () => {
        const newIndex = countryIndex - 1 < 0 ? countriesData.length - 1 : countryIndex - 1;
        setCountry(countriesData[newIndex]);
        setCountryIndex(newIndex);
    };
    const handleClickNext = () => {
        const newIndex = countryIndex + 1 > countriesData.length ? 0 : countryIndex + 1;
        setCountry(countriesData[newIndex]);
        setCountryIndex(newIndex);
    };

    const handleClickCountry = (country) => {
        setCountry(country);
        setCountryIndex(countriesData.indexOf(country));
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
                    width: '100%',
                    height: '100%',
                }}
            >
                <Autocomplete
                    id="country-select"
                    sx={{ width: '300px', mt: 2 }}
                    options={countriesData}
                    // autoHighlight
                    blurOnSelect
                    getOptionLabel={(option) => option.name.common}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 1 } }} {...props}>
                            <Box
                                sx={{
                                    width: '36px',
                                }}
                            >
                                <GameFlag country={option.cca3.toLowerCase()} />
                            </Box>
                            {option.name.common}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('Choose a country')}
                            inputProps={{
                                ...params.inputProps,
                                // autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                    value={country}
                    onChange={handleChangeCountry}
                />
                <CountryCard
                    country={country}
                    onNext={handleClickNext}
                    onClickCountry={handleClickCountry}
                    onPrevious={handleClickPrevious}
                />
                <Box
                    my={2}
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <MainButton
                        buttonP={{
                            color: 'secondary',
                            onClick: handleClickHome,
                            startIcon: <ArrowCircleLeftIcon />,
                        }}
                    >
                        {t('Home')}
                    </MainButton>
                </Box>
            </Box>
        </>
    );
};

export default Wiki;
