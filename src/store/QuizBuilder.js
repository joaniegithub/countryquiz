
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

export const getQuestions = (language, mode, chosenRegion, chosenDifficultyLevel, chosenIndependantOnly) => {
	let allCountries = countriesData;

	let capitalChoices = [];
	let countryChoices = [];
	let countryOfficialChoices = [];
	let flagChoices = [];

    if (chosenIndependantOnly) {
        allCountries = Object.values(countriesData).filter(
            (c) => c.independent === true
        );
    }

	allCountries =
		chosenRegion === 'all'
			? allCountries
			: allCountries.filter(
					(c) => c.region === chosenRegion
				);

	if (mode.key === TRIVIA) {
		capitalChoices = getAllAnswers(allCountries, 'capital', language);
		countryChoices = getAllAnswers(allCountries, 'name-common', language);
		countryOfficialChoices = getAllAnswers(allCountries, 'name-official', 'eng'); // todo langue officiels
		flagChoices = getAllAnswers(allCountries, 'cca3', language);
	}
	if (mode.key === CAPITAL) {
		capitalChoices = getAllAnswers(allCountries, 'capital', language);
	}
	if (mode.key === COUNTRY_BY_CAPITAL || mode.key === COUNTRY_BY_FLAG) {
		countryChoices = getAllAnswers(allCountries, 'name-common', language);
	}

	const nbQuestionTypes = questionTypes.length;
	let questionType = mode.questionType;

	const questions = allCountries.map((c) => {
		
		let question;
		let answer;
		let choices;

		if (mode.key === TRIVIA) {
			questionType = questionTypes[Math.floor(Math.random()*nbQuestionTypes)];
		}

		switch (questionType.key) {
			case 'capital':
				question = getCountryValue(c, language, questionType.questionProperty);
				answer = getCountryValue(c, language, questionType.answerProperty);
				choices = getChoices(c, answer, capitalChoices, questionType, chosenDifficultyLevel);
			break;
			case 'country_capital':
				question = getCountryValue(c, language, questionType.questionProperty);
				answer = getCountryValue(c, language, questionType.answerProperty);
				choices = getChoices(c, answer, countryChoices, questionType, chosenDifficultyLevel);
			break;
			case 'country_flag':
				question = getCountryValue(c, language, questionType.questionProperty);
				answer = getCountryValue(c, language, questionType.answerProperty);
				choices = getChoices(c, answer, countryChoices, questionType, chosenDifficultyLevel);
			break;
			case 'name_official':
				question = c.name.common;
				answer = c.name.official;
				choices = getNameOfficialQuestion(c, language, chosenDifficultyLevel);
			break;
			// case 'name_official_wrong':
			// 	question = questionType.questionProperty;
			// 	answer = c.name.official;
			// 	choices = getNameOfficialWrongQuestion(c, countryOfficialChoices, language, chosenDifficultyLevel);
			// break;
		}

		return {
			country: c.cca3,
			question,
			answer,
			choices,
			result: undefined,
		};
	});
	return questions;
};

const getNameOfficialWrongQuestion = (country, language, chosenDifficultyLevel, countryOfficialChoices) => {

}
const getNameOfficialQuestion = (country, language, chosenDifficultyLevel) => {
	// English only
	const answer = country.name.official;
	const commonName = country.name.common;

	const choices = [];
	let safeIndex = 100;
	let nbChoices = 0;
	let term;
	while (nbChoices < NB_CHOICES-1 && safeIndex > 0) {
		
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

		const choice = term[Math.floor(Math.random() * term.length)].replace("___", commonName);
		
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

const getCountryValue = (c, lang, valueName) => {
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
		case 'cca3':
			value = c.cca3;
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
	// console.log(answer);
    const choices = [];
    const hardChoices = [getHardAnswer(answer)];
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
			// console.log(hardChoices);
			// console.log(answersFrom[rnd]);
			continue;
		}
        choices.push(answersFrom[rnd]);
        indexUsed.push(rnd);
		hardChoices.push(getHardAnswer(answersFrom[rnd]));
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
                    otherCities[Math.floor(Math.random() * otherCities.length)];
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