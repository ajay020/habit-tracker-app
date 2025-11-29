// stores/languageStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import i18n from '../locales';

type Language = 'en' | 'hi' | 'de';

type LanguageState = {
    language: Language;
    setLanguage: (lang: Language) => void;
    loadLanguage: () => Promise<void>;
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
    language: 'en',

    loadLanguage: async () => {
        const saved = await AsyncStorage.getItem('language');
        if (saved === 'en' || saved === 'hi' || saved === 'de') {
            i18n.locale = saved;
            set({ language: saved });
        }
    },

    setLanguage: (lang) => {
        AsyncStorage.setItem('language', lang);
        i18n.locale = lang;
        set({ language: lang });

        get().loadLanguage()
    },
}));