import { useLanguageStore } from '../lib/languageStore';
import i18n from '../locales';

export function useTranslation() {
    // This subscribes to language changes and triggers re-renders
    const language = useLanguageStore((s) => s.language);

    const t = (key: string, params?: object) => {
        return i18n.t(key, { locale: language, ...params });
    };

    return { t, language };
}