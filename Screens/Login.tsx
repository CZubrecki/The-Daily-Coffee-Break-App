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
            <TextInput
                autoCapitalize="none"
                placeholder='email'
                onChangeText={text => {
                    setValue('email', text);
                }} />

            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={text => {
                    setValue('password', text);
                }} />

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}>
                <Text> Save </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}>
                <Text> Sign Up </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6DDC5',
    }
});