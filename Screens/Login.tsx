import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../Components/context';
import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons'

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
        paddingTop: '135%',
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
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});