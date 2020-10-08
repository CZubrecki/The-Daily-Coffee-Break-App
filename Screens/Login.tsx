import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../Components/context';

export default function Login({ navigation }: any) {
    const { register, handleSubmit, setValue } = useForm();

    const { login } = useContext(AuthContext);

    const onSubmit = async (data: any) => {
        login(data.email, data.password);
    }

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.row}>
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
                    <Text style={styles.signInText}> Save </Text>
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
        paddingTop: '125%',
    },
    row: {
        flexDirection: 'row',
        margin: 10,
    },
    email: {
        borderColor: '#583A25',
        height: 35,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
    },
    password: {
        borderColor: '#583A25',
        height: 35,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
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
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        color: '#e6ddc5',
        fontSize: 24,
    },
    signUp: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});