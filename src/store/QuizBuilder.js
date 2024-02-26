
import countriesData from 'data/countries.json';
import {
    CAPITAL,
    DIFFICULTY_HARD,
    DIFFICULTY_NORMAL,
    // gameModes,
	DIFFICULTY_EXPERT,
	TRIVIA,
	officials,
	NB_CHOICES,
	questionTypes,
	COUNTRY_BY_CAPITAL,
	COUNTRY_BY_FLAG,
} from 'data/config';
import { shuffle } from 'util/util';

export const getQuestions = (language, mode, chosenRegion, chosenDifficultyLevel, chosenIndependantOnly) => {
	let allCountries = countriesData;

	let capitalChoices = [];
	let cityChoices = [];
	let countryChoices = [];
	let countryOfficialChoices = [];
	let flagChoices = [];

	if (mode.key === TRIVIA) {
		capitalChoices = getAllAnswers(allCountries, 'capital', language);
		cityChoices = getAllAnswers(allCountries, 'cities', language);
		countryChoices = getAllAnswers(allCountries, 'name-common', language);
		countryOfficialChoices = getAllAnswers(allCountries, 'name-official', 'eng'); // todo langue officiels
		flagChoices = getAllAnswers(allCountries, 'cca3', language);
	} else {
		if (chosenIndependantOnly) {
			allCountries = Object.values(countriesData).filter(
				(c) => c.independent === true
			);
		}

		if (chosenRegion !== 'all') {
			allCountries = allCountries.filter(
				(c) => c.region === chosenRegion
			);
		}
					
		if (mode.key === CAPITAL) {
			capitalChoices = getAllAnswers(allCountries, 'capital', language);
		} else if (mode.key === COUNTRY_BY_CAPITAL || mode.key === COUNTRY_BY_FLAG) {
			countryChoices = getAllAnswers(allCountries, 'name-common', language);
		}
	}

	const availableQuestionTypes = questionTypes.filter(qt => !qt.disabled);
	let questionType = mode.questionType;

	const questions = allCountries.map((c) => {
		
		let question;
		let answer;
		let choices;
		let borders;
		let nbTry = 0;

		while (!answer || !choices) {

			if (mode.key === TRIVIA) {
				if (nbTry > 0) {  // for test purpose
					questionType = getOneRandom(availableQuestionTypes);
				} else {
					questionType = availableQuestionTypes.find(qt => qt.key === 'share_no_border');
				}
			}

			switch (questionType.key) {
				case 'capital':
					question = getCountryValue(c, language, questionType.questionProperty);
					answer = getCountryValue(c, language, questionType.answerProperty);
					choices = answer ? getChoices(c, answer, capitalChoices, questionType, chosenDifficultyLevel) : undefined;
				break;
				case 'country_capital':
					question = getCountryValue(c, language, questionType.questionProperty);
					answer = getCountryValue(c, language, questionType.answerProperty);
					choices = answer ? getChoices(c, answer, countryChoices, questionType, chosenDifficultyLevel) : undefined;
				break;
				case 'is_capital':
					question = questionType.questionProperty;
					answer = getCountryValue(c, language, questionType.answerProperty);
					choices = answer ? getChoices(c, answer, cityChoices, questionType, DIFFICULTY_NORMAL) : undefined;
				break;
				case 'not_capital':
					question = questionType.questionProperty;
					answer = getCountryValue(c, language, 'city', 1);
					choices = answer ? getChoices(c, answer, capitalChoices, questionType, DIFFICULTY_NORMAL) : undefined;
				break;

				// case 'flag':
				case 'country_flag':
					question = getCountryValue(c, language, questionType.questionProperty);
					answer = getCountryValue(c, language, questionType.answerProperty);
					choices = answer ? getChoices(c, answer, countryChoices, questionType, chosenDifficultyLevel) : undefined;
				break;

				case 'name_official':
					question = c.name.common;
					answer = c.name.official;
					choices = getNameOfficialChoices(c, undefined, language);
				break;
				case 'name_official_good':
					question = questionType.questionProperty;
					answer = c.name.official;
					choices = getNameOfficialChoices(c, allCountries, language, answer);
				break;
				case 'name_official_wrong':
					question = questionType.questionProperty;
					answer = getNameOfficialAnswer(c, language);
					choices = answer ? getChoices(c, answer, countryOfficialChoices, questionType, chosenDifficultyLevel) : undefined;
				break;

				case 'share_border':
					question = getCountryValue(c, language, questionType.questionProperty);
					borders = getCountryValue(c, language, 'borders');
					if (borders.length >= 2) {
						answer = getOneRandom(borders);
					}
					if (answer) {
						answer = allCountries.find(c => c.cca3 === answer);
					}
					choices = answer ? getCountriesNotBorder(c, answer, allCountries, language) : undefined;
					if (answer) {
						answer = getCountryValue(answer, language, 'name-common');
					}
				break;
				case 'share_no_border':
					question = getCountryValue(c, language, questionType.questionProperty);
					console.log(question);
					borders = getCountryValue(c, language, 'borders');
					if (borders.length >= 3) {
						answer = getCountriesNotBorder(c, c, allCountries, language);
						choices = shuffle(borders).slice(0, 3).map(b => getCountryValue(allCountries.find(c => c.cca3 === b), language, 'name-common'));
						console.log(choices);
						choices.splice(((choices.length + 1) * Math.random()) | 0, 0, answer);
					}
				break;

			}
			console.log(question, answer, choices, questionType.key);

			if (!answer || !choices) {
				nbTry++;
			}
		}

		return {
			country: c.cca3,
			question,
			answer,
			choices,
			result: undefined,
			questionType,
		};
	});
	console.log(questions);
	return questions;
};

const getCountriesNotBorder = (country, answer, allCountries, language) => {
	
	const choices = [];
	const choices_cca3 = [];
	const onlyOne = country === answer;
	let nbChoices = 0;
	let countryBorder;
	let countryWithoutBorder;
	let countryWithoutBorderCommonName;
	let i = 0;

	const allBorders = shuffle([...new Set([...country.borders, ...answer.borders])]);
	console.log(allBorders, country.cca3, answer.cca3);

	while (nbChoices < NB_CHOICES-1 && i < allBorders.length) {
		countryBorder = allCountries.find(c => c.cca3 === allBorders[i]);
		// console.log(allBorders[i], countryBorder);
		countryWithoutBorder = shuffle(countryBorder.borders).find(b => !country.borders.includes(b) && !choices_cca3.includes(b) && b !== country.cca3); /*b !== country.cca3 && b !== answer.cca3*/
		if (countryWithoutBorder) {
			countryWithoutBorder = allCountries.find(c => c.cca3 === countryWithoutBorder);
			countryWithoutBorderCommonName = getCountryValue(countryWithoutBorder, language, 'name-common');
			
			if (onlyOne) {
				return countryWithoutBorderCommonName
			}
			choices.push(countryWithoutBorderCommonName);
			choices_cca3.push(countryWithoutBorder.cca3);
			nbChoices = choices.length;
		}
		i++;
	}

	if (nbChoices < NB_CHOICES-1) {
		return undefined;
	}
	
    // ajouter la bonne réponse parmis les choix
    choices.splice(((choices.length + 1) * Math.random()) | 0, 0, getCountryValue(answer, language, 'name-common'));
	console.log(country.name.common, answer.name.common, choices);
	console.log('---');
    return choices;
};

const getNameOfficialAnswer = (country, language) => {
	const officialName = country.name.official;
	const commonName = country.name.common;
	let term;
	let choice;
	while (!choice) {
		if (Math.random()*3 < 1) {
			if (country.borders.length === 0) {
				// noBorders
				if (officialName.indexOf("Island") > -1) {
					continue; // there is already the term in the name
				}
				term = commonName.indexOf(" and ") > 0 ? officials.noBordersMany : officials.noBorders;
			} else if (!country.independent) {
				// dependant
				term = officials.dependant;
			}
			continue;
		} else {
			term = officials.usuals;
		}
		choice = getOneRandom(term).replace("___", commonName);
	}
    return choice;
}

const getNameOfficialChoices = (country, allCountries, language, _answer) => {
	// English only

	let countryUsed = country;
	let answer = _answer ?? countryUsed.name.official;
	let commonName = countryUsed.name.common;

	const choices = [];
	let safeIndex = 100;
	let nbChoices = 0;
	let term;

	while (nbChoices < NB_CHOICES-1 && safeIndex > 0) {
		if (allCountries) {
			countryUsed = undefined;
			while (countryUsed === undefined || countryUsed === country) {
				countryUsed = getOneRandom(allCountries);
			}
			commonName = countryUsed.name.common;
		}
		
		// Logic: 
		// 1 choice from usuals (1/3 if no borders or dependent)
		// 4/5 another usual, 1/5 rare
		// 4/5 rare (and here 1/2 if in the rightRegion, choose region bound), 1/5 unique

		if (nbChoices === 0) {
			if (Math.random()*3 < 1) {
				if (country.borders.length === 0) {
					// noBorders
					if (answer.indexOf("Island") > -1) {
						continue; // there is already the term in the name
					}
					term = commonName.indexOf(" and ") > 0 ? officials.noBordersMany : officials.noBorders;
				} else if (!country.independent) {
					// dependant
					term = officials.dependant;
				}
				continue;
			} else {
				term = officials.usuals;
			}
		} else if (nbChoices === 1) {
			
			if (Math.random()*5 < 4) {
				term = officials.usuals;
			} else {
				term = officials.rare;
			}
		} else if (nbChoices === 2) {
			if (Math.random()*5 < 4) {
				term = officials.rare;
				if (Math.random()*2 < 1) {
					// todo: (here 1/2 if in the rightRegion, choose region bound
				}
			} else {
				term = officials.unique;
			}
		} else {
			term = officials.usuals;
		}

		const choice = getOneRandom(term).replace("___", commonName);
		
		if (choice === answer || choices.indexOf(choice) > -1) {
			continue;
		}
		choices.push(choice);
		nbChoices = choices.length;
		safeIndex--;
	}
	
    // ajouter la bonne réponse parmis les choix
    choices.splice(((choices.length + 1) * Math.random()) | 0, 0, answer);
    return choices;
};

// const getNonTriviaQuestions = (mode, allCountries, language, chosenDifficultyLevel) => {
// 	const questionType = mode.questionType;
// 	const allAnswers = getAllAnswers(allCountries, questionType.answerProperty, language);
// 	const questions = allCountries.map((c) => {
// 		const question = getCountryValue(c, language, questionType.questionProperty);
// 		const answer = getCountryValue(c, language, questionType.answerProperty);

// 		const choices = getChoices(
// 			c,
// 			answer,
// 			allAnswers,
// 			questionType,
// 			chosenDifficultyLevel
// 		);

// 		return {
// 			country: c.cca3,
// 			question,
// 			answer,
// 			choices,
// 			result: undefined,
// 		};
// 	});
// 	return questions;
// };

const getAllAnswers = (allCountries, answerProperty, language) => {
	return allCountries.reduceRight((cAnswers, c) => cAnswers.concat(getCountryValue(c, language, answerProperty)), []);
};

const getCountryValue = (c, lang, valueName, nbFromList) => {
	let value;
	switch (valueName) {
		case 'name-official':
			value = getCountryOfficial(c, lang);
			break;
		case 'name-common':
			value = getCountryName(c, lang);
			break;
		case 'capital':
			value = c.capital.join(', ');
			break;
		case 'city':
			value = nbFromList === 1 ? getOneRandom(c.cities) : c.cities;
			break;
		case 'cca3':
			value = c.cca3;
			break;
		case 'borders':
			value = nbFromList === 1 ? getOneRandom(c.borders) : c.borders;
			break;
		default:
			value = c[valueName];
			break;
	}
	return value;
}
const getCountryName = (c, lang) => {
	return (lang === "eng" ? c.name.common : c.translations[lang]["common"]);
}
const getCountryOfficial = (c, lang) => {
	return (lang === "eng" ? c.name.official : c.translations[lang]["official"]);
}

const getChoices = (
    country,
    answer,
    answersFrom,
    questionType,
    difficultyLevel
) => {
// 	console.log(answer);
    const choices = [];
    const hardChoices = difficultyLevel === DIFFICULTY_EXPERT ? [getHardAnswer(answer)] : [];
    const indexUsed = [];
    const max = answersFrom.length;

    while (choices.length < NB_CHOICES - 1) {
        const rnd = Math.floor(Math.random() * max);
        if ( indexUsed.indexOf(rnd) >= 0
            || answersFrom[rnd] === ""
            || answer.indexOf(answersFrom[rnd]) >= 0
            || choices.indexOf(answersFrom[rnd]) >= 0
        ) {
            continue;
        }
		if (difficultyLevel === DIFFICULTY_EXPERT && hardChoices.indexOf(getHardAnswer(answersFrom[rnd])) >= 0) {
			continue;
		}
        choices.push(answersFrom[rnd]);
        indexUsed.push(rnd);
		if (difficultyLevel === DIFFICULTY_EXPERT) {
			hardChoices.push(getHardAnswer(answersFrom[rnd]));
		}
		// aussi: choisir seulement parmis ceux de même région si on est en mode WORLD
    }

    if (questionType.key === CAPITAL) {
    	if (difficultyLevel === DIFFICULTY_NORMAL) {
		// on inclut des villes pas rapport qui existent pas de temps en temps
            
    	} else if (difficultyLevel === DIFFICULTY_HARD) {
			// on inclut aussi des villes non capitales de temps en temps
            if (
                country.cities &&
                country.cities.length &&
                Math.random() * 2 < 1
            ) {
                const otherCities = country.cities;
                choices[Math.floor(Math.random() * choices.length)] =
                    getOneRandom(otherCities);
            }
        }
    }

	// DIFFICULTY_EXPERT: s'Assurer que la premère et dernière lettre font en sorte que les choix sont uniques

    // ajouter la bonne réponse parmis les choix
    choices.splice(((choices.length + 1) * Math.random()) | 0, 0, answer);
    return choices;
};

export const getHardAnswer = (answer) => {
	return answer[0] + answer[answer.length - 1];
};

const getOneRandom = (list) => {
	return list && list.length ? list[Math.floor(Math.random() * list.length)] : undefined;
}