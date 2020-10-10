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

export default function SignUp() {
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
    const { register, handleSubmit, setValue } = useForm();
    const { signUp } = useContext(AuthContext);

    const onSubmit = async (data: SignUpPayload) => {
        if ((_.isNil(data.email) || _.isNil(data.password)) || _.isNil(data.confirmPassword) ||
            (data.email.trim() === '' || data.password.trim() === '') || data.confirmPassword.trim() === ''
        ) {
            Alert.alert('There are missing fields');
            return;
        }

        if (data.password !== data.confirmPassword) {
            setPasswordsMatch(false);
            return;
        }

        signUp(data.email, data.password);
    }

    const handleValidUser = (email: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.trim().length === 0) {
            setIsValidEmail(true);
        } else if (reg.test(email)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    }

    const handleValidPassword = (password: string) => {
        if (password.trim().length === 0) {
            setIsValidPassword(true);
        } else if (password.trim().length < 8) {
            setIsValidPassword(false);
        }
    }

    useEffect(() => {
        register('email');
        register('password');
        register('confirmPassword');
    }, [register]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faUserCircle} style={styles.icon} />
                    <TextInput
                        placeholderTextColor="#583A25"
                        autoCapitalize="none"
                        placeholder='Email'
                        style={styles.email}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        onChangeText={text => {
                            setValue('email', text);
                        }}
                    />
                </View>
                {isValidEmail ? null :
                    <Animatible.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Email is invalid.</Text>
                    </Animatible.View>
                }
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faLock} style={styles.icon} />
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor="#583A25"
                        style={styles.password}
                        secureTextEntry={true}
                        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                        onChangeText={text => {
                            setValue('password', text);
                        }}
                    />
                </View>
                {isValidPassword ? null :
                    <Animatible.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password is invalid.</Text>
                    </Animatible.View>
                }
                {passwordsMatch ? null :
                    <Animatible.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Passwords do not match.</Text>
                    </Animatible.View>
                }
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faLock} style={styles.icon} />
                    <TextInput
                        placeholder='Confirm Password'
                        placeholderTextColor="#583A25"
                        style={styles.password}
                        secureTextEntry={true}
                        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                        onChangeText={text => {
                            setValue('confirmPassword', text);
                        }}
                    />
                </View>
                {isValidPassword ? null :
                    <Animatible.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password is invalid.</Text>
                    </Animatible.View>
                }
                {passwordsMatch ? null :
                    <Animatible.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Passwords do not match.</Text>
                    </Animatible.View>
                }
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.signInText}> Sign Up </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6DDC5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50%',
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        borderColor: '#583A25',
        height: 35,
        width: 300,
        borderWidth: 1,
        borderRadius: 20,
    },
    email: {
        paddingLeft: 10,
        height: 35,
        width: 300,
    },
    icon: {
        marginLeft: 10,
        color: '#583A25',
    },
    errorMsg: {
        color: 'red',
    },
    password: {
        paddingLeft: 10,
        height: 35,
        width: 300,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    signIn: {
        backgroundColor: '#583A25',
        width: 300,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        color: '#e6ddc5',
        fontSize: 24,
    },
    signUp: {
        color: '#583A25',
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});