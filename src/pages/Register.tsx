import { View, StyleSheet, Text, ImageBackground, TextInput, Pressable } from "react-native";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import { loginBackground } from '../assets'

export default function Register() {
    const [passwordText, setPasswordText] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');

    return (
        <ImageBackground
            source={{ uri: loginBackground }}
            style={styles.background}
        >
            <View style={styles.container}> 
                <Text style={styles.title}>Registration</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#8AA47C"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#8AA47C"
                    keyboardType="email-address"
                />
                <PasswordInput placeholder={'Password'} value={passwordText} onChangeText={setPasswordText}/>
                <PasswordInput placeholder={'Confirm password'} value={confirmPasswordText} onChangeText={setConfirmPasswordText}/>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
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