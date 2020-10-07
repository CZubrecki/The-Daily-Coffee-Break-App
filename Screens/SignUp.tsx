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
