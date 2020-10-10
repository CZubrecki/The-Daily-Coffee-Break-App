import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../Components/context';
import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import * as Animatible from 'react-native-animatable';
import * as _ from 'lodash';

interface SignIn {
    email: string;
    password: string;
}

export default function Login({ navigation }: any) {
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const { register, handleSubmit, setValue } = useForm();

    const { login } = useContext(AuthContext);

    const onSubmit = async (data: SignIn) => {
        if ((_.isNil(data.email) || _.isNil(data.password)) || (data.email.trim() === '' || data.password.trim() === '')) {
            Alert.alert('Password or email is missing');
            return;
        }

        if (isValidEmail && isValidPassword) {
            login(data.email, data.password);
            return;
        }
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
                        onChangeText={text => {
                            setValue('email', text);
                        }}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                        onChangeText={text => {
                            setValue('password', text);
                        }}
                        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                    />
                </View>
                {isValidPassword ? null :
                    <Animatible.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password is invalid.</Text>
                    </Animatible.View>
                }
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.signInText}> Login In </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signUp}
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUp}> Sign Up </Text>
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
    errorMsg: {
        color: 'red',
    },
    icon: {
        marginLeft: 10,
        color: '#583A25',
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