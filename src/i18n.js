import eng from 'assets/locales/eng/translation.json';
import fra from 'assets/locales/fra/translation.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    // .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(
        {
            fallbackLng: 'eng',
            debug: false,
            // ns: [
            //   "translation"
            // ],
            resources: {
                eng: {
                    translation: eng,
                },
                fra: {
                    translation: fra,
                },
                // backend: {
                //     loadPath: "locales/{{lng}}/{{ns}}.json",
                //     parse: function (data) {
                //         console.log(data);
                //         return data;
                //     },
                // }
            },

            // interpolation: {
            //     escapeValue: false, // not needed for react as it escapes by default
            // },
        },
        (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            // console.log('i18n ready', i18n);
            if (i18n.language === 'en' || i18n.language.indexOf('en-') > -1) {
                i18n.changeLanguage('eng');
            } else if (i18n.language === 'fr' || i18n.language.indexOf('fr-') > -1) {
                i18n.changeLanguage('fra');
            }
        }
    );

export default i18n;
