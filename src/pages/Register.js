import React, { useState } from 'react';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import uploadLogo from '../assets/upload.png';

//import api from '../services/api';

export default function Register({ navigation }){

    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [plataform, setPlataform] = useState('')


    const [avatar, setAvatar] = useState(null);


    function handleLoginRoute(){
        console.log("entrou a na função handle login route");

        navigation.navigate('Login');
    }

    async function handlePhotoUpload(){

        await ImagePicker.showImagePicker({noData: true, mediaType:'photo'}, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };

              setAvatar(response);
            }
          });



        /*
        let formdata = new FormData();
        formdata.append('file', );
        formdata.append('name', );
        formdata.append('fortniteUsername', );
        formdata.append('password', );
        formdata.append('email', );
        formdata.append('plataform', );*/
    }

    async function handleRegister(){
        console.log(`avatar: ${avatar}    ,   name: ${name}   ,  fortniteusername: ${user}   email: ${email}   \n
        password1: ${password}  ,  password2: ${repeatPassword} ,  plataforma: ${plataform}`);


        var errors = {}

        if(password !== repeatPassword){
            errors['errorPassword'] = "Diferent password";
        }

        console.log(errors);

        
        let formdata = new FormData();
        formdata.append('file', {
            uri: avatar.uri,
            name: `profilePic_${user}_${avatar.fileName}`,
            type: avatar.type,
            timestamp: avatar.timestamp,
            height: avatar.height,
            width: avatar.width,
            fileSize: avatar.fileSize,
            path: avatar.path,
            isVertical: avatar.isVertical,
        });
        formdata.append('name', name);
        formdata.append('fortniteUsername', user);
        formdata.append('password', password);
        formdata.append('email', email);
        formdata.append('plataform', plataform);

        await axios({
            method: 'post',
            url: `${API_URL}/register`,
            data: formdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                console.log("----->", response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

        navigation.navigate('Login');
            
    }

    return (

        <View style={styles.container}>
            { avatar === null &&
            <TouchableOpacity onPress={handlePhotoUpload}>
                <Image style={styles.uploadIcon} source={uploadLogo}/>
            </TouchableOpacity>
            }
                
            {
                avatar && (
                    <TouchableOpacity onPress={handlePhotoUpload}>
                        <Image source={{uri : avatar.uri}} style={styles.avatarImage}/>
                    </TouchableOpacity>
                )
            }

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Name"
                placeholderTextColor="#999"
                style={styles.inputName}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Fortnite username"
                placeholderTextColor="#999"
                style={styles.inputFortniteUsername}
                value={user}
                onChangeText={setUser}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Fortnite email"
                placeholderTextColor="#999"
                style={styles.inputFortniteEmail}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                placeholder="Fortnite password"
                placeholderTextColor="#999"
                style={styles.inputFortnitePassword}
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                placeholder="Repeat password"
                placeholderTextColor="#999"
                style={styles.inputFortnitePassword}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
            />

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="plataform"
                placeholderTextColor="#999"
                style={styles.inputName}
                value={plataform}
                onChangeText={setPlataform}
            />
            <TouchableOpacity onPress={handleRegister} style={styles.buttonRegister}>
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
        marginTop: 10,
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

    uploadIcon: {
        width: 120,
        height: 120,
    },

    avatarImage : {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#FFF',
        marginVertical:10,
    },




})