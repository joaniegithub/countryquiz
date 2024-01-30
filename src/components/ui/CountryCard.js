import * as React from 'react';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { Card, Table, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import GameFlag from './GameFlag';
import countriesData from 'data/countries.json';
import regionsData from 'data/regions.json';

const CountryCard = (props) => {
    const { country } = props;
	const { i18n, t } = useTranslation();

	if (!country) {
		return null;
	}

	const region = regionsData.find(r => r.eng === country.region);
	const subregion = region.subregions ? region.subregions.find(sr => sr.eng === country.subregion) : undefined;

	const borders = (country.borders && country.borders.length ? country.borders.map(border => countriesData.find(c => c.cca3 === border).name.common).join(", ") : "");
	const languages = (country.languages ? Object.values(country.languages).join(", ") : "");
	const currencies = (country.currencies ? Object.keys(country.currencies).map(key => country.currencies[key].name).join(", ") : "");

    return (
        <Card
			sx={{
				px: 2,
				py: 2,
				mt: 2,
				textAlign: 'center',
				width: '100%',
				boxSizing: 'border-box',
			}}
        >
			<GameFlag
				border={false} 
				country={country.cca3.toLowerCase()}
			/>
			<Table
				size="small"
				sx={{
					fontSize: "11px",
					lineHeight: "12px",
					mt: 2,
				}}
				aria-label={`Country ${country.name.common}`}
			>
				<TableBody>
					<Row>
						<CellProp><TypographyTable>{t("Name")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{country.name.common}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Official Name")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{country.name.official}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Status")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{country.independent ? t("independent") : t("dependent")}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Capital")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{country.capital && country.capital.join(", ")}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Other Cities")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{country.cities && country.cities.length && country.cities.join(", ")}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Region")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{region[i18n.language]}{subregion ? `, ${subregion[i18n.language]}` : ""}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Borders")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{borders}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Languages")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{languages}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("Currencies")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{currencies}</TypographyTable></CellValue>
					</Row>
				</TableBody>
			</Table>
		</Card>
    );
};

const Row = (props) => {
	return (
		<TableRow 
			{...props}
			sx={{
				'&:last-child td, &:last-child th': {
					border: 0,
				},
			}}
		>
			{props.children}
		</TableRow>
	);
};
const CellProp = (props) => {
	return (
		<TableCell 
			{...props}
			sx={{
				color: (theme) => theme.palette.text.secondary,
				paddingLeft: "10px",
				verticalAlign: 'baseline',
				minWidth: '125px',
			}}
		>
			{props.children}
		</TableCell>
	);
};
const CellValue = (props) => {
	return (
		<TableCell 
			{...props}
			sx={{
				paddingLeft: "10px",
				verticalAlign: 'baseline',

			}}
		>
			{props.children}
		</TableCell>
	);
};

const TypographyTable = (props) => {
	return (
		<Typography 
			{...props}
			sx={{
				fontSize: "14px",
				lineHeight: "16px",
			}}
		>
			{props.children}
		</Typography>
	);
}

export default CountryCard;
