import { Link } from "@react-navigation/native";
import { View, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity, Pressable } from "react-native";

export default function Login() {
    return (
        <ImageBackground
            source={{ uri: 'https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/858/c500/4d0ca2ab-9a5f-4c6e-b94e-8fe0766f7882.jpeg' }}
            style={styles.background}
        >
            <View style={styles.container}> 
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#8AA47C"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#8AA47C"
                    secureTextEntry={true}
                />
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.link}>Forgot Password?</Text>
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
        marginBottom: 10,
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