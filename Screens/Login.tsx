import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Text, TextInput, Image, Modal, Button } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../Components/context';
import * as _ from 'lodash';
import { LoginPayload } from '../Models/Auth';
import SignUp from './SignUp';

export default function Login({ navigation }: any) {
    const Icon = require('../Assets/icon.png');
    const { register, handleSubmit, setValue, getValues } = useForm();
    const { login } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = async (data: LoginPayload) => {
        if ((_.isNil(data.email) || _.isNil(data.password)) || (data.email.trim() === '' || data.password.trim() === '')) {
            Alert.alert('Password or email is missing');
            return;
        }

        if (checkValidEmail(data.email) && checkValidPassword(data.password)) {
            login(data.email, data.password);
            return;
        }
    }

    const checkValidEmail = (email: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return email.trim().length !== 0 && reg.test(email);
    }

    const checkValidPassword = (password: string) => (password.trim().length !== 0 && password.trim().length >= 8);

    const closeModal = () => setModalVisible(false);

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    return (
        <>
            <Modal animationType="slide" collapsable={true} presentationStyle='formSheet' visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <SignUp closeModal={closeModal} />
            </Modal>
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Image source={Icon} />
                    </View>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor="#BEBEBE"
                            clearButtonMode="always"
                            autoCapitalize="none"
                            keyboardType='email-address'
                            style={styles.input}
                            onChangeText={text => {
                                setValue('email', text);
                            }}
                        />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.inputContainer}>
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
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => console.log('forgot me')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={[styles.createNewAccountContainer, styles.bottom]}>
                    <View style={styles.orContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#BEBEBE' }}>────────</Text><Text> OR </Text><Text style={{ color: '#BEBEBE' }}>────────</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.createAccount}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.createAccountText}>Create New Account</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
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
        height: '28%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        borderRadius: 3,
        borderColor: '#BEBEBE',
        width: '90%',
        height: 75,
        borderWidth: 1,
        marginVertical: '10%',
    },
    divider: {
        borderWidth: .5,
        borderColor: '#BEBEBE',
        height: 1,
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    input: {
        height: '50%',
        width: '95%',
        justifyContent: 'center',
    },
    loginButton: {
        backgroundColor: '#75604D',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '3%',
        height: 37.5,
        borderRadius: 5,
    },
    loginText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFF'
    },
    forgotPassword: {
        marginVertical: '7%',
    },
    forgotPasswordText: {
        color: '#75604D',
        fontWeight: '600',
        fontSize: 16,
    },
    createNewAccountContainer: {
        width: '90%',
    },
    orContainer: {
        alignItems: 'center',
    },
    createAccount: {
        backgroundColor: 'hsla(34, 44%, 69%, 0.64)',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        marginVertical: '3%',
        height: 37.5,
        borderRadius: 5,
    },
    createAccountText: {
        color: '#75604D',
        fontWeight: '600',
        fontSize: 16,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
});