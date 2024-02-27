import {
    CAPITAL,
    COUNTRY_BY_CAPITAL,
    COUNTRY_BY_FLAG, // gameModes,
    DIFFICULTY_EXPERT,
    DIFFICULTY_HARD,
    DIFFICULTY_NORMAL,
    NB_CHOICES,
    TRIVIA,
    officials,
    questionTypes,
} from 'data/config';
import countriesData from 'data/countries.json';
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
            allCountries = Object.values(countriesData).filter((c) => c.independent === true);
        }

        if (chosenRegion !== 'all') {
            allCountries = allCountries.filter((c) => c.region === chosenRegion);
        }

        if (mode.key === CAPITAL) {
            capitalChoices = getAllAnswers(allCountries, 'capital', language);
        } else if (mode.key === COUNTRY_BY_CAPITAL || mode.key === COUNTRY_BY_FLAG) {
            countryChoices = getAllAnswers(allCountries, 'name-common', language);
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

    const questions = allCountries.map((c) => {
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
                    questionType = getOneRandom(availableQuestionTypes);
                // } else {
                //     questionType = availableQuestionTypes.find((qt) => qt.key === 'has_n_border');
                // }
            }

            switch (questionType.key) {
                case 'capital':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, answer, capitalChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;
                case 'country_capital':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, answer, countryChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;
                case 'is_capital':
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer ? getChoices(c, answer, cityChoices, questionType, DIFFICULTY_NORMAL) : undefined;
                    break;
                case 'not_capital':
                    answer = getCountryValue(c, language, 'city', 1);
                    choices = answer
                        ? getChoices(c, answer, capitalChoices, questionType, DIFFICULTY_NORMAL)
                        : undefined;
                    break;

                // case 'flag':
                case 'country_flag':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    answer = getCountryValue(c, language, questionType.answerProperty);
                    choices = answer
                        ? getChoices(c, answer, countryChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;

                case 'name_official':
                    question = c.name.common;
                    answer = c.name.official;
                    choices = getNameOfficialChoices(c, undefined, language);
                    break;
                case 'name_official_good':
                    answer = c.name.official;
                    choices = getNameOfficialChoices(c, allCountries, language, answer);
                    break;
                case 'name_official_wrong':
                    answer = getNameOfficialAnswer(c, language);
                    choices = answer
                        ? getChoices(c, answer, countryOfficialChoices, questionType, chosenDifficultyLevel)
                        : undefined;
                    break;

                case 'share_border':
                    question = getCountryValue(c, language, questionType.questionProperty);
                    if (c.borders.length >= 2) {
                        answer = getOneRandom(c.borders);
                    }
                    if (answer) {
                        answer = allCountries.find((c) => c.cca3 === answer);
                    }
                    choices = answer ? getCountriesNotBorder(c, answer, allCountries, language) : undefined;
                    if (answer) {
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
                            ? getChoices(c, answer, subsetCountries, questionType, DIFFICULTY_NORMAL)
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
            }
            // console.log(answer, choices, questionType.key, c.borders);

            if (!answer || !choices) {
                nbTry++;
            }
        }

        return {
            result: undefined,
            country: c.cca3,
            questionType,
            question,
            answer,
            choices,
            questionPhraseValues,
            answerAdditionnalText,
        };
    });

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

    while (nbChoices < NB_CHOICES - 1 && i < allBorders.length) {
        countryBorder = allCountries.find((c) => c.cca3 === allBorders[i]);
        countryWithoutBorder = shuffle(countryBorder.borders).find(
            (b) => !country.borders.includes(b) && !choices_cca3.includes(b) && b !== country.cca3
        );
        if (countryWithoutBorder) {
            countryWithoutBorder = allCountries.find((c) => c.cca3 === countryWithoutBorder);
            countryWithoutBorderCommonName = getCountryValue(countryWithoutBorder, language, 'name-common');

            if (onlyOne) {
                return countryWithoutBorderCommonName;
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
    const officialName = country.name.official;
    const commonName = country.name.common;
    let term;
    let choice;
    while (!choice) {
        if (Math.random() * 3 < 1) {
            if (country.borders.length === 0) {
                // noBorders
                if (officialName.indexOf('Island') > -1) {
                    continue; // there is already the term in the name
                }
                term = commonName.indexOf(' and ') > 0 ? officials.noBordersMany : officials.noBorders;
            } else if (!country.independent) {
                // dependant
                term = officials.dependant;
            }
            continue;
        } else {
            term = officials.usuals;
        }
        choice = getOneRandom(term).replace('___', commonName);
    }
    return choice;
};

const getNameOfficialChoices = (country, allCountries, language, _answer) => {
    // English only

    let countryUsed = country;
    let answer = _answer ?? countryUsed.name.official;
    let commonName = countryUsed.name.common;

    const choices = [];
    let safeIndex = 100;
    let nbChoices = 0;
    let term;

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
                    term = commonName.indexOf(' and ') > 0 ? officials.noBordersMany : officials.noBorders;
                } else if (!country.independent) {
                    // dependant
                    term = officials.dependant;
                }
                continue;
            } else {
                term = officials.usuals;
            }
        } else if (nbChoices === 1) {
            if (Math.random() * 5 < 4) {
                term = officials.usuals;
            } else {
                term = officials.rare;
            }
        } else if (nbChoices === 2) {
            if (Math.random() * 5 < 4) {
                term = officials.rare;
                if (Math.random() * 2 < 1) {
                    // todo: (here 1/2 if in the rightRegion, choose region bound
                }
            } else {
                term = officials.unique;
            }
        } else {
            term = officials.usuals;
        }

        const choice = getOneRandom(term).replace('___', commonName);

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
};
const getCountryName = (c, lang) => {
    return lang === 'eng' ? c.name.common : c.translations[lang]['common'];
};
const getCountryOfficial = (c, lang) => {
    return lang === 'eng' ? c.name.official : c.translations[lang]['official'];
};

const getChoices = (country, answer, answersFrom, questionType, difficultyLevel) => {
    const choices = [];
    const hardChoices = difficultyLevel === DIFFICULTY_EXPERT ? [getHardAnswer(answer)] : [];
    const indexUsed = [];
    const max = answersFrom.length;

    while (choices.length < NB_CHOICES - 1) {
        const rnd = Math.floor(Math.random() * max);
        if (
            indexUsed.indexOf(rnd) >= 0 ||
            answersFrom[rnd] === '' ||
            answer.indexOf(answersFrom[rnd]) >= 0 ||
            choices.indexOf(answersFrom[rnd]) >= 0
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
            if (country.cities && country.cities.length && Math.random() * 2 < 1) {
                const otherCities = country.cities;
                choices[Math.floor(Math.random() * choices.length)] = getOneRandom(otherCities);
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
