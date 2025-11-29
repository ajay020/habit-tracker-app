import { I18n } from 'i18n-js';
import de from './de';
import en from './en';
import hi from './hi';

const i18n = new I18n({
    en,
    hi,
    de,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;