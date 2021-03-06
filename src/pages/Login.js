import React, { useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, View, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { API_URL } from 'react-native-dotenv';


import api from '../services/api';

import logo from '../assets/logo.png';


export default function Login({ navigation }){

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        async function loadLogin() {
            const userId = await AsyncStorage.getItem('userId');
            if(userId){
                navigation.navigate('Main', { mensagem: "login bem sucedido, parabéns", userId : userId});
            }

        }
        loadLogin();
    }, [navigation]);

    

    async function handleLogin(){
        const response = await api.post('/login', {
            email: user,
            password: password,
        });
        console.log('Bem-vindo, ', response.data.name);
        
        if (!response.data.error){

            
            await AsyncStorage.setItem('auth_token', response.headers['auth_token']);
            await AsyncStorage.setItem('userId', response.data._id);


            navigation.navigate('Main', { mensagem: "login bem sucedido, parabéns", userId : response.data._id, auth_token : response.headers['auth_token']});
        }
        else {
            console.log(`O login falhou`);
        }
    }

    function handleRegisterRoute(){
        console.log("entrou a na função handle register");
        navigation.navigate('Register');
    }




    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >

            <Image source={logo}/>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#999"
                style={styles.input2}
                value={password}
                onChangeText={setPassword}
            />



            <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
                <Text style={styles.buttonTextLogin}>Sign in</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={handleRegisterRoute} style={styles.buttonRegister}>
                <Text style={styles.buttonTextRegister}>Don't have an account. Register</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cfcf45',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    input: {
      height: 46,
      alignSelf: 'stretch',
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 4,
      marginTop: 20,
      paddingHorizontal: 15,
    },

    input2: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 6,
        paddingHorizontal: 15,
      },

    buttonLogin: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#3d02bd',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTextLogin: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonRegister: {
        height: 46,
        alignSelf: 'stretch',
        borderRadius: 4,
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTextRegister: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
