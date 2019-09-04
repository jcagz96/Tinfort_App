import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, Text, StyleSheet } from 'react-native';



export default function Main({ navigation }){


    const [valor, setValor] = useState('');


    useEffect(() => {
        AsyncStorage.getItem('auth_token').then(auth_token => {
            if (auth_token){
                setValor(auth_token);
            }
        })
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Text>Tela Main</Text>
            <Text>{navigation.getParam('mensagem')}</Text>
            <Text>{valor}</Text>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})
