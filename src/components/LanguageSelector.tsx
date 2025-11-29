import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from '../hooks/userTranslation';
import { useLanguageStore } from '../lib/languageStore';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'de', name: 'Deutsch' },
];

type LanguageSelectorProps = {
    visible: boolean;
    onClose: (visible: boolean) => void;
};

export function LanguageSelector(
    { visible, onClose }: LanguageSelectorProps
) {
    const { language, setLanguage } = useLanguageStore();
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => onClose(false)}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <View className="w-11/12  p-4 bg-background dark:bg-background-dark rounded-2xl">
                    <Text className="text-lg font-semibold mb-2 dark:text-white">
                        {t('settings.language')}
                    </Text>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            onPress={() => {
                                setLanguage(lang.code as any);
                                onClose(false);
                            }}
                            className={`flex flex-row justify-between items-center p-3 rounded-lg mb-2 ${language === lang.code
                                ? 'bg-card dark:bg-card-dark'
                                : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                        >
                            <Text
                                className={
                                    language === lang.code
                                        ? 'text-text dark:text-text-dark font-semibold'
                                        : 'text-text dark:text-text-dark'
                                }
                            >
                                {lang.name}
                            </Text>
                            <Text className='text-text dark:text-text-dark text-2xl'>
                                {language === lang.code ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        onPress={() => onClose(false)}
                        className="mt-4 p-3 rounded-xl bg-error dark:bg-error-dark"
                    >
                        <Text className="text-center  dark:text-text-dark font-medium">
                            {t('common.cancel')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}