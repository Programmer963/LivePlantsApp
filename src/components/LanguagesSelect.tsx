import React from 'react';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';

export default function LanguagesSelect() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string | undefined) => {
        i18n.changeLanguage(language);
    };

    return (
        <View style={styles.header}>
            <Picker
                selectedValue={i18n.language}
                style={styles.picker}
                onValueChange={(itemValue) => changeLanguage(itemValue)}
            >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Русский" value="ru" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
header: {
    marginRight: 10,
},
picker: {
    borderWidth: 0,
},
});