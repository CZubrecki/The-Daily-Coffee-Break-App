import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../Components/context';

export default function SignUp() {
    const { register, handleSubmit, setValue } = useForm();

    const { signUp } = useContext(AuthContext);

    const onSubmit = async (data: any) => {
        signUp(data.email, data.password);
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
                        }} />
                </View>
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faLock} style={styles.icon} />
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor="#583A25"
                        style={styles.password}
                        secureTextEntry={true}
                        onChangeText={text => {
                            setValue('password', text);
                        }} />
                </View>
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