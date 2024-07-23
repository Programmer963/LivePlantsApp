import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from "react-native";

interface PasswordInputProps {
    placeholder: string;
    value: string;
    onChangeText: any;
}

export default function PasswordInput({ placeholder, value, onChangeText }: PasswordInputProps) {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (   
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder={placeholder}
                placeholderTextColor="#8AA47C"
                secureTextEntry={!passwordVisible}
                value={value}
                onChangeText={onChangeText}
            />
            <Pressable 
                onPress={() => {setPasswordVisible(!passwordVisible)}}
            >
                <Ionicons style={styles.icon} name={passwordVisible ? "eye-off" : "eye"} size={24} color="#8AA47C"/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    passwordContainer: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderColor: '#8AA47C',
        borderWidth: 1,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 15,
    },
    icon: {
        paddingHorizontal: 10,
    }
})