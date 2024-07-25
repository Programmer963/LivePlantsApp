import React from "react";
import { View, StyleSheet, Text, ImageBackground, TextInput, Pressable, Alert } from "react-native";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import { loginBackground } from '../assets'
import { useAuth } from "../context/AuthContext";

export default function Register({ navigation }: any) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { register } = useAuth();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    const handleRegister = () => {
        console.log('register')
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            Alert.alert('Ошибка', 'Все поля обязательны для заполнения.');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Ошибка', 'Неверный формат электронной почты.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Ошибка', 'Пароли не совпадают.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Ошибка', 'Пароль должен содержать не менее 6 символов.');
            return;
        }

        register({ firstName, lastName, email, password })
            .then(() => navigation.navigate('Login'))
            .catch(error => Alert.alert('Ошибка', 'Не удалось зарегистрироваться. Попробуйте снова.'));
    }

    return (
        <ImageBackground
            source={{ uri: loginBackground }}
            style={styles.background}
        >
            <View style={styles.container}> 
                <Text style={styles.title}>Registration</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                    placeholderTextColor="#8AA47C"
                />
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                    placeholderTextColor="#8AA47C"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="#8AA47C"
                    keyboardType="email-address"
                />
                <PasswordInput placeholder={'Password'} value={password} onChangeText={setPassword}/>
                <PasswordInput placeholder={'Confirm password'} value={confirmPassword} onChangeText={setConfirmPassword}/>
                <Pressable style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
                <Pressable onPress={() => {navigation.navigate("Login")}}>
                    <Text style={styles.link}>Go back</Text>
                </Pressable>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 32,
        color: '#3C7A42',
        marginBottom: 20,
        fontWeight: 600,
    },
    input: {
        width: '100%',
        height: 35,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderColor: '#8AA47C',
        borderWidth: 1,
    },
    button: {
        width: '100%',
        height: 35,
        backgroundColor: '#3C7A42',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 600
    },
    link: {
        color: '#3C7A42',
        marginTop: 10,
    }
})