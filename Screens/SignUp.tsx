import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../Components/context';
import { SignUpPayload } from '../Models/Auth';
import * as _ from 'lodash';
import * as Animatible from 'react-native-animatable';
import { Image } from 'react-native';

export default function SignUp({ closeModal }: any) {
    const Icon = require('../Assets/icon.png');
    const { register, handleSubmit, setValue, getValues } = useForm();
    const { signUp } = useContext(AuthContext);

    const onSubmit = async (data: SignUpPayload) => {
        if ((_.isNil(data.email) || _.isNil(data.password)) || (data.email.trim() === '' || data.password.trim() === '')) {
            Alert.alert('There are missing fields');
            return;
        }

        if (checkValidEmail(data.email) && checkValidPassword(data.password)) {
            signUp(data.email, data.password);
        }
    }

    const checkValidEmail = (email: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return email.trim().length !== 0 && reg.test(email);
    }

    const checkValidPassword = (password: string) => (password.trim().length !== 0 && password.trim().length >= 8);

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Icon} />
            </View>
            <View style={styles.form}>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor="#BEBEBE"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={text => {
                        setValue('email', text);
                    }}
                />
                <View style={styles.divider} />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor="#BEBEBE"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={text => {
                        setValue('password', text);
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.signUpText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.existingAccountContainer}>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.existingAccountText}>
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#75604D',
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginVertical: '7%',
        width: '90%',
        borderWidth: 1,
        borderColor: '#BEBEBE',
        borderRadius: 3,
        height: 75,
    },
    divider: {
        borderWidth: .5,
        borderColor: '#BEBEBE',
        height: 1,
    },
    input: {
        height: '50%',
        justifyContent: 'center',
        paddingHorizontal: '3%',
    },
    buttonContainer: {
        width: '90%',
    },
    signUpButton: {
        backgroundColor: '#75604D',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 37.5,
        borderRadius: 5,
    },
    signUpText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFF',
    },
    existingAccountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
    },
    existingAccountText: {
        color: '#75604D',
        fontSize: 18,
    }
});