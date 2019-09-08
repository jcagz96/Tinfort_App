import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';




export default function Main({ navigation }){ 

    

    const [users, setUsers] = useState([]);
    const [state, setState] = useState({})

    

    /*
    useEffect(() => {
        async function loadUsers() {
            const user = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('auth_token');
            const response = await api.get('/players', {
                headers: {
                    user: user,
                    auth_token : token,
                },
        });
            setUsers(response.data);
        }
        loadUsers();
    }, []); */



    async function fetchMyAPI() {
        const user = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('auth_token');

        const response = await api.get('/players', {
            headers: {
                user: user,
                auth_token : token,
            }});
        setUsers(response.data);
      }
  
      useEffect(() => {
        fetchMyAPI();
      }, []);

    console.log(users);

    async function handleLike() {
        const userId = await AsyncStorage.getItem('userId');
        const [ user, ...rest]  = users;                        //pick the first user and the rest

        await api.post(`/players/${user._id}/likes`, null , {
            headers: { user: userId},
        });

        setUsers(rest);
    }

    async function handleDislike() {
        const userId = await AsyncStorage.getItem('userId');
        const [ user, ...rest]  = users;                        //pick the first user and the rest

        await api.post(`/players/${user._id}/dislikes`, null , {
            headers: { user: userId},
        });

        setUsers(rest);
    }

    async function handleLogout(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logo} style={styles.logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                { users.length === 0
                    ? <Text style={styles.empty}>There's no available players</Text>
                    : (
                        users.map((user, index) => (

                            <View key={user.info._id} style={[styles.card, { zIndex: users.length - index }]}>
                            <Image style={styles.avatar} source={{uri : user.info.profilePicUrl}} />
                            <View style={styles.footer}>
                                
                                <Text style={styles.name}>
                                    {user.info.fortniteUsername}
                                </Text>
                                <Text style={styles.plataform}>
                                    {user.info.plataform}
                                </Text>

                                <Table borderStyle={{borderWidth: 1}}>
                                    <Row data={['', 'Solo', 'Duos', 'Squads']} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
                                     <TableWrapper style={styles.wrapper}>
                                        <Col data={['Wins', 'Games', 'Kills']} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                                        <Rows data={[
                                                        [user.stats.solo.soloWins, user.stats.duos.duosWins, user.stats.duos.duosWins],
                                                        [user.stats.solo.soloGames, user.stats.duos.duosGames, user.stats.duos.duosGames],
                                                        [user.stats.solo.soloKills, user.stats.duos.duosKills, user.stats.duos.duosKills],
                                                    ]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                                    </TableWrapper>
                                </Table>

                                
                            </View>
                        </View>
                        ))
                    )
                }
            </View>
            { users.length > 0 && (<View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleDislike} style={styles.button}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLike} style={styles.button}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>)}
            
            
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo : {
        marginTop: 30,
    },
    cardsContainer:{
        flex : 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    avatar: {
        flex: 1,
        height: 300,
        width: 300,
    },
    footer : {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    name : {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    plataform : {
        alignSelf: 'center',
        fontSize: 14,
        marginTop: 5,
        lineHeight: 18,
        marginBottom: 4,
    },
    buttonsContainer : {
        flexDirection: 'row',
        marginBottom: 30,
    },
    empty: {
        alignSelf: 'center',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f1f8ff' },
    row: {  height: 28  },
    text: { textAlign: 'center' },
})