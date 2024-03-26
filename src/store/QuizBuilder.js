import {
    CAPITAL,
    COUNTRY_BY_CAPITAL,
    COUNTRY_BY_FLAG,
    COUNTRY_BY_MAP,
    DIFFICULTY_EXPERT,
    DIFFICULTY_HARD,
    DIFFICULTY_NORMAL,
    FLAG,
    NB_CHOICES,
    NB_QUESTIONS_SHORT,
    NB_QUESTIONS_SHORT_TRIVIA,
    SHORT,
    TRIVIA,
    officials,
    questionTypes,
} from 'data/config';
import countriesData from 'data/countries.json';
import { shuffle } from 'util/util';

export const getQuestions = (language, mode, chosenRegion, chosenDifficultyLevel, chosenIndependantOnly, chosenGameLength) => {
    let allCountries = countriesData;
    let questionCountries = allCountries;

    let capitalChoices = [];
    let capitalChoicesFlat = [];
    let cityChoicesFlat = [];
    let countryChoices = [];
    let countryOfficialChoices = [];
    let cca3Choices = [];
	
    let landlockCountries = [];
    let notLandlockCountries = [];
    let countriesPerNbOfBorders = [];
    let dependentCountries = [];

    if (mode.key === TRIVIA) {
        capitalChoices = getAllAnswers(allCountries, 'capital', language, chosenDifficultyLevel);
        capitalChoicesFlat = getAllAnswers(allCountries, 'capital', language);
        cityChoicesFlat = getAllAnswers(allCountries, 'cities', language);
        countryChoices = getAllAnswers(allCountries, 'name-common', language, chosenDifficultyLevel);
        countryOfficialChoices = getAllAnswers(allCountries, 'name-official', language, chosenDifficultyLevel); // todo langue officiels
        cca3Choices = getAllAnswers(allCountries, 'cca3', language, chosenDifficultyLevel);
		allCountries.forEach(c => {
			if (c.landlocked) {
				landlockCountries.push(c);
			} else {
				notLandlockCountries.push(c);
			}
			if (c.borders) {
				if (!countriesPerNbOfBorders[c.borders.length]) {
					countriesPerNbOfBorders[c.borders.length] = [];
				}
				countriesPerNbOfBorders[c.borders.length].push(c);
			}
			if (!c.independent) {
				dependentCountries.push(c);
			}
		});
		landlockCountries = getAllAnswers(landlockCountries, 'name-common', language);
		notLandlockCountries = getAllAnswers(notLandlockCountries, 'name-common', language);
		dependentCountries = getAllAnswers(dependentCountries, 'name-common', language);
    } else {
        if (chosenIndependantOnly) {
            questionCountries = Object.values(questionCountries).filter((c) => c.independent === true);
        }

        if (chosenRegion !== 'all') {
            questionCountries = questionCountries.filter((c) => c.region === chosenRegion);
        }

        if (mode.key === CAPITAL) {
            capitalChoices = getAllAnswers(questionCountries, 'capital', language, chosenDifficultyLevel);
        } else if (mode.key === COUNTRY_BY_CAPITAL || mode.key === COUNTRY_BY_FLAG || mode.key === COUNTRY_BY_MAP) {
            countryChoices = getAllAnswers(questionCountries, 'name-common', language, chosenDifficultyLevel);
        } else if (mode.key === FLAG) {
            cca3Choices = getAllAnswers(questionCountries, 'cca3', language, chosenDifficultyLevel);
        }
    }

    const availableQuestionTypes = questionTypes.filter((qt) => !qt.disabled);
    let questionType = mode.questionType;
    let question;
    let answer;
    let choices;
    let questionPhraseValues;
    let answerAdditionnalText;

    let subsetCountries;

	if (chosenGameLength === SHORT) {
		questionCountries = shuffle(questionCountries).slice(0, mode.key === TRIVIA ? NB_QUESTIONS_SHORT_TRIVIA : NB_QUESTIONS_SHORT);
	}

    const questions = questionCountries.map((c) => {
        question = undefined;
        answer = undefined;
        choices = undefined;
        questionPhraseValues = [];
        answerAdditionnalText = undefined;

        subsetCountries = undefined;

        let nbTry = 0;

        while (!answer || !choices) {
            question = undefined;
            answer = undefined;
            choices = undefined;
            questionPhraseValues = [];
            answerAdditionnalText = undefined;

            subsetCountries = undefined;

            if (mode.key === TRIVIA) {
                // if (nbTry > 0) {
                //     // for test purpose
                // 	questionType = getOneRandom(availableQuestionTypes);
                // } else {
                //     questionType = availableQuestionTypes.find((qt) => qt.key === 'is_landlocked');
                // }
                questionType = getOneRandom(availableQuestionTypes);
            }

            switch (questionType.key) {
                case 'capital':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, language, answer, capitalChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;
                case 'country_capital':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, language, answer, countryChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;
                case 'is_capital':
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer ? getChoices(c, language, answer, cityChoicesFlat, questionType, DIFFICULTY_NORMAL) : undefined;
                    break;
                case 'not_capital':
                    answer = getCountryValue(c, language, 'cities', 1);
                    choices = answer
                        ? getChoices(c, language, answer, capitalChoicesFlat, questionType, DIFFICULTY_NORMAL)
                        : undefined;
                    break;

                case 'flag':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, language, answer, cca3Choices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;
                case 'country_flag':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, language, answer, countryChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;

                case 'country_map':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, language, answer, countryChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;

                case 'name_official':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = getNameOfficialChoices(c, undefined, language);
                    break;
                case 'name_official_good':
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = getNameOfficialChoices(c, allCountries, language, answer);
                    break;
                case 'name_official_wrong':
                    answer = getNameOfficialAnswer(c, language);
                    choices = answer
                        ? getChoices(c, language, answer, countryOfficialChoices, questionType, chosenDifficultyLevel)
                        : undefined;
					answerAdditionnalText = getCountryValue(c, language, 'name-official');
                    break;

                case 'share_border':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    if (c.borders.length >= 2) {
                        answer = getOneRandom(c.borders);
                    }
                    if (answer) {
                        const newAnswer = allCountries.find((c) => c.cca3 === answer);
                        answer = newAnswer;
                    }
                    if (answer && c) {
                        choices = getCountriesNotBorder(c, answer, allCountries, language);
                        answer = getCountryValue(answer, language, 'name-common');
                    }
                    break;
                case 'share_no_border':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    if (c.borders.length >= 3) {
                        answer = getCountriesNotBorder(c, c, allCountries, language);
                        choices = shuffle(c.borders)
                            .slice(0, 3)
                            .map((b) =>
                                getCountryValue(
                                    allCountries.find((c) => c.cca3 === b),
                                    language,
                                    'name-common'
                                )
                            );
                        choices.splice(((choices.length + 1) * Math.random()) | 0, 0, answer);
                    }
                    break;
                case 'has_n_border':
                    subsetCountries = allCountries
                        .filter(
                            (_c) =>
                                _c.borders.length !== c.borders.length &&
                                _c.borders.length >= c.borders.length - 2 &&
                                _c.borders.length <= c.borders.length + 2
                        )
                        .map((c) => getCountryValue(c, language, 'name-common'));
                    if (subsetCountries.length >= 3) {
                        answer = getCountryValue(c, language, questionType.answerProperty);
                        choices = answer
                            ? getChoices(c, language, answer, subsetCountries, questionType, DIFFICULTY_NORMAL)
                            : undefined;
                        questionPhraseValues = [c.borders.length, c.borders.length >= 2 ? 's' : ''];
                        answerAdditionnalText = c.borders
                            .map((b) =>
                                getCountryValue(
                                    allCountries.find((c) => c.cca3 === b),
                                    language,
                                    'name-common'
                                )
                            )
                            .join(', ');
                    }
                    break;
                case 'is_landlocked':
                case 'is_not_landlocked':
					questionType = questionTypes.find(qt => qt.key === (c.landlocked ? 'is_landlocked' : 'is_not_landlocked'));
                    const answersFrom = c.landlocked ? notLandlockCountries : landlockCountries;
					answer = getCountryValue(c, language, questionType.answerProperty);
					choices = answer
						? getChoices(c, language, answer, answersFrom, questionType, DIFFICULTY_NORMAL)
						: undefined;
                    break;
            }
            // console.log(c.name.common, answer, choices, questionType.key, c.borders);

			if (mode.key !== TRIVIA) {
				break;
			}

            if (!answer || !choices) {
                nbTry++;
            }
        }

        return {
            result: undefined,
            country: c.cca3,
            questionTypeKey: questionType.key,
            question,
            answer,
            choices,
            questionPhraseValues,
            answerAdditionnalText,
        };
    }).filter(q => q.answer !== undefined && q.choices !== undefined);

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
	if (!country || !answer) {
		console.trace();
	}

    const allBorders = shuffle([...new Set([...country.borders, ...answer.borders])]);

    while (nbChoices < NB_CHOICES - 1 && i < allBorders.length) {
        countryBorder = allCountries.find((c) => c.cca3 === allBorders[i]);
		if (!countryBorder) {
			console.log(country);
			console.trace();
			continue;
		}
        countryWithoutBorder = shuffle(countryBorder.borders).find(
            (b) => !country.borders.includes(b) && !choices_cca3.includes(b) && b !== country.cca3
        );
        if (countryWithoutBorder) {
            countryWithoutBorder = allCountries.find((c) => c.cca3 === countryWithoutBorder);
            countryWithoutBorderCommonName = getCountryValue(countryWithoutBorder, language, 'name-common');

            if (onlyOne) {
                return countryWithoutBorderCommonName;
            }
			if (countryWithoutBorderCommonName === "") {
				continue;
			}
            choices.push(countryWithoutBorderCommonName);
            choices_cca3.push(countryWithoutBorder.cca3);
            nbChoices = choices.length;
        }
        i++;
    }

    if (nbChoices < NB_CHOICES - 1) {
        return undefined;
    }

    // ajouter la bonne réponse parmis les choix
    choices.splice(((choices.length + 1) * Math.random()) | 0, 0, getCountryValue(answer, language, 'name-common'));
    return choices;
};

const getNameOfficialAnswer = (country, language) => {
    const officialName = getCountryValue(country, language, 'name-official');
    const commonName = getCountryValue(country, language, 'name-common');
    let term;
    let choice;
    while (!choice) {
        if (Math.random() * 3 < 1) {
            if (country.borders.length === 0) {
                // noBorders
                if (officialName.indexOf('Island') > -1) {
                    continue; // there is already the term in the name
                }
				// term = commonName.indexOf(' and ') > 0 ? officials[language].noBordersMany : officials[language].noBorders;
				term = officials[language].noBordersMany;
            } else if (!country.independent) {
                // dependant
                term = officials[language].dependant;
            }
            continue;
        } else {
            term = officials[language].usuals;
        }
        choice = getOneRandom(term).replace('___', commonName);
		if (language === 'fra') {
    		const translations = getCountryValue(country, language, 'translations');
        	choice = choice.replace('<art>', translations.pronoun || "de ").replace('<adv>', country.demonyms[language]['f'].toLowerCase());
		}
    }
    return choice;
};

const getNameOfficialChoices = (country, allCountries, language, _answer) => {
    // English only

    let countryUsed = country;
    let answer = _answer ?? getCountryValue(country, language, 'name-official');
    let commonName = getCountryValue(country, language, 'name-common');

    const choices = [];
    let safeIndex = 100;
    let nbChoices = 0;
    let term;
    let usuals = allCountries ? officials[language].usuals.filter((u) => u !== '___') : officials[language].usuals;

    while (nbChoices < NB_CHOICES - 1 && safeIndex > 0) {
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
            if (Math.random() * 3 < 1) {
                if (country.borders.length === 0) {
                    // noBorders
                    if (answer.indexOf('Island') > -1) {
                        continue; // there is already the term in the name
                    }
                    // term = commonName.indexOf(' and ') > 0 ? officials[language].noBordersMany : officials[language].noBorders;
                    term = officials[language].noBordersMany;
                } else if (!country.independent) {
                    // dependant
                    term = officials[language].dependant;
                }
                continue;
            } else {
                term = usuals;
            }
        } else if (nbChoices === 1) {
            if (Math.random() * 5 < 4) {
                term = usuals;
            } else {
                term = officials[language].rare;
            }
        } else if (nbChoices === 2) {
            if (Math.random() * 5 < 4) {
                term = officials[language].rare;
                if (Math.random() * 2 < 1) {
                    // todo: (here 1/2 if in the rightRegion, choose region bound
                }
            } else {
                term = officials[language].unique;
            }
        } else {
            term = usuals;
        }

        let choice = getOneRandom(term).replace('___', commonName);
		if (language === 'fra') {
    		const translations = getCountryValue(country, language, 'translations');
        	choice = choice.replace('<art>', translations.pronoun || "de ").replace('<adv>', country.demonyms[language]['f'].toLowerCase());
		}

        if (choice === answer || choices.indexOf(choice) > -1 || choice === "") {
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

const getAllAnswers = (allCountries, answerProperty, language, difficultyLevel) => {
	if (difficultyLevel === DIFFICULTY_HARD) {
		const answers = {};
		let val;
		let reg;
		let subreg;
		allCountries.forEach(c => {
			reg = c.region;
			subreg = c.subregion ?? c.region;
			val = getCountryValue(c, language, answerProperty);
			if (!val || val === "") {
				return;
			}
			if (!answers[reg]) {
				answers[reg] = {};
			}
			if (!answers[reg][subreg]) {
				if (subreg === reg) {
					answers[reg] = [];
				} else {
					answers[reg][subreg] = [];
				}
			}
			answers[reg][subreg].push(...(Array.isArray(val) ? val : [val]));
		});

		return answers;
	}
    return allCountries.reduceRight((cAnswers, c) => cAnswers.concat(getCountryValue(c, language, answerProperty)), []);
};

const getCountryValue = (c, lang, valueName, nbFromList) => {
    let value;
    switch (valueName) {
        case 'translations':
            value = getCountryTranslations(c, lang);
            break;
        case 'name-official':
            value = getCountryOfficial(c, lang);
            break;
        case 'name-common':
            value = getCountryName(c, lang);
            break;
        case 'capital':
            value = c.capital.map(capital => capital[lang]).join(', ');
            break;
        case 'cities':
			let cities = c.cities?.map(city => city[lang]);
            value = nbFromList === 1 ? getOneRandom(cities) : cities;
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
};
const getCountryName = (c, lang) => {
	if (!c) {
        console.trace();
		return;
	}
    return lang === 'eng' ? c.name.common : c.translations[lang]['common'];
};
const getCountryTranslations = (c, lang) => {
    return lang === 'eng' ? c.name : c.translations[lang];
};
const getCountryOfficial = (c, lang) => {
    return lang === 'eng' ? c.name.official : c.translations[lang]['official'];
};

const getChoices = (country, language, answer, answersPerRegions, questionType, difficultyLevel) => {
    const choices = [];
    const hardChoices = difficultyLevel === DIFFICULTY_EXPERT ? [getHardAnswer(answer)] : [];
    const indexUsed = [];
	let answersFrom = answersPerRegions;

	if (difficultyLevel === DIFFICULTY_HARD) {
		let answersFromRegion = answersPerRegions[country.region][country.subregion];
		if (answersFromRegion.length < 7) {
			let allFromRegion = [];
			Object.keys(answersPerRegions[country.region]).forEach((reg) => {
				if(reg !== country.subregion) {
					allFromRegion = allFromRegion.concat(answersPerRegions[country.region][reg]);
				}
			}, []);
			if (country.region === "Antarctic") {
				Object.keys(answersPerRegions["Oceania"]).forEach((reg) => {
					allFromRegion = allFromRegion.concat(answersPerRegions["Oceania"][reg]);
				}, []);
			}
			answersFrom = answersFromRegion.concat(shuffle(allFromRegion).slice(0, 7-answersFromRegion.length));
		} else {
			answersFrom = answersFromRegion;
		}
	}
    const max = answersFrom.length;

    while (choices.length < NB_CHOICES - 1) {
        const rnd = Math.floor(Math.random() * max);
        if (
            indexUsed.indexOf(rnd) >= 0 ||
            answersFrom[rnd] === '' ||
            answer.indexOf(answersFrom[rnd]) >= 0 ||
            choices.indexOf(answersFrom[rnd]) >= 0 ||
			answersFrom[rnd] === ""
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
        if (difficultyLevel === DIFFICULTY_HARD) {
            // on inclut aussi des villes non capitales de temps en temps
            if (country.cities && country.cities.length && Math.random() * 2 < 1) {
                const otherCity = getCountryValue(country, language, 'cities', 1);
				if (otherCity && otherCity !== "") {
                	choices[Math.floor(Math.random() * choices.length)] = otherCity;
				}
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
};
