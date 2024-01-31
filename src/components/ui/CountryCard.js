import * as React from 'react';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Card, IconButton, Table, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import GameFlag from './GameFlag';
import countriesData from 'data/countries.json';
import regionsData from 'data/regions.json';

const CountryCard = (props) => {
    const { country, onNext, onPrevious } = props;
	const { i18n, t } = useTranslation();
    const theme = useTheme();

	if (!country) {
		return null;
	}

	const region = regionsData.find(r => r.eng === country.region);
	const subregion = region.subregions ? region.subregions.find(sr => sr.eng === country.subregion) : undefined;

	const borders = country.borders && country.borders.length 
		? country.borders.map((border, index) => {
			return (
				<>
					{index > 0 ? ", " : ""}
					{countriesData.find(c => c.cca3 === border).name.common}
					<GameFlag
						border={false} 
						country={border.toLowerCase()}
						sxOverrides={{
							maxWidth: "20px",
							maxHeight: "none",
							width: 'auto',
							height: '12px',
							marginLeft: '2px',
						}}
					/>
				</>
			);
		})//.join(", ") 
		: "";
	const languages = (country.languages ? Object.values(country.languages).join(", ") : "");
	const currencies = (country.currencies ? Object.keys(country.currencies).map(key => country.currencies[key].name).join(", ") : "");

    return (
        <Card
			position="relative"
			sx={{
				px: 2,
				py: 2,
				mt: 2,
				textAlign: 'center',
				width: '100%',
				boxSizing: 'border-box',
				overflow: 'auto',
				flexGrow: 1,
			}}
        >
			<IconButton
				onClick={onPrevious}
				sx={{
					backgroundColor: theme.palette.secondary.main,
					position: 'absolute',
					left: '-20px',
					top: '50%',
					transform: 'translate(0, -10px)',
				}}
			>
				<ArrowBackIosNewIcon />
			</IconButton>
			<GameFlag
				border={false} 
				country={country.cca3.toLowerCase()}
			/>
			<Typography
				fontSize="20px"
				fontWeight="700"
				lineHeight="28px"
				pt="12px"
			>
				{country.name.common}
			</Typography>
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
						<CellProp><TypographyTable>{t("Official Name")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{country.name.official}</TypographyTable></CellValue>
					</Row>
					<Row>
						<CellProp><TypographyTable>{t("ISO codes")}</TypographyTable></CellProp>
						<CellValue><TypographyTable>{country.cca2}, {country.cca3}</TypographyTable></CellValue>
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
			<IconButton
				onClick={onNext}
				sx={{
					backgroundColor: theme.palette.secondary.main,
					position: 'absolute',
					right: '-20px',
					top: '50%',
					transform: 'translate(0, -10px)',
				}}
			>
				<ArrowForwardIosIcon />
			</IconButton>
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
				verticalAlign: 'middle',
				width: '125px',
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
				verticalAlign: 'middle',
			}}
		>
			{props.children}
		</Typography>
	);
}

export default CountryCard;