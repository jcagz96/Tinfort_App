import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

//import api from '../services/api';

export default function Register({ navigation }){

    function handleLoginRoute(){
        console.log("entrou a na função handle login route");

        navigation.navigate('Login');
    }

    return (

        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Name"
                placeholderTextColor="#999"
                style={styles.inputName}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Fortnite username"
                placeholderTextColor="#999"
                style={styles.inputFortniteUsername}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Fortnite email"
                placeholderTextColor="#999"
                style={styles.inputFortniteEmail}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                placeholder="Fortnite password"
                placeholderTextColor="#999"
                style={styles.inputFortnitePassword}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                placeholder="Repeat password"
                placeholderTextColor="#999"
                style={styles.inputFortnitePassword}
            />
            <TouchableOpacity style={styles.buttonRegister}>
                <Text style={styles.buttonTextRegister}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginRoute} style={styles.buttonLogin}>
                <Text style={styles.buttonTextLogin}>Already have an account. Let me Login</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2484ea',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    inputName: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
      },
  
    inputFortniteUsername: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 6,
        paddingHorizontal: 15,
    },
    inputFortniteEmail: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 6,
        paddingHorizontal: 15,
    },
    inputFortnitePassword: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 6,
        paddingHorizontal: 15,
    },
    buttonRegister: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#3d02bd',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTextRegister: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonLogin: {
        height: 46,
        alignSelf: 'stretch',
        borderRadius: 4,
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTextLogin: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },



})