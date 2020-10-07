import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login({ navigation }: any) {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (data: any) => {
        await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })
        }).then((response) => response.json())
            .then(async (responseJson: any) => {
                if (responseJson && responseJson.user?.token) {
                    const token = responseJson.user.token;
                    await AsyncStorage.setItem('token', token);
                }
            }).catch((error: any) => {
                Alert.alert(error);
            }).finally(() => {
            });
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6DDC5',
    }
});