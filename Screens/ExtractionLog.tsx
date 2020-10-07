import React, { useEffect, useState } from 'react';
import { Text, View, Alert, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function ExtractionLog({ navigation }: any) {

    const onSubmit = async (data: any) => {
        const token = await AsyncStorage.getItem('token');
        await fetch('http://localhost:8080/extraction-logs/add-extraction-log', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                weightIn: data.weightIn,
                weightOut: data.weightOut,
                extractionTime: data.extractionTime
            })
        }).catch((error: any) => {
            Alert.alert(error);
        }).finally(() => {
            navigation.navigate('Home');
            return;
        });
    }

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register('weightIn');
        register('weightOut');
        register('extractionTime');
    }, [register]);

    return (
        <View style={styles.container}>
            <View style={styles.fields}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.inputField}
                            onChangeText={text => {
                                setValue('weightIn', text);
                            }} />
                        <Text style={styles.label}>Weight In</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.inputField}
                            onChangeText={text => {
                                setValue('weightOut', text);
                            }} />
                        <Text style={styles.label}>Weight Out</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.inputField}
                            onChangeText={text => {
                                setValue('extractionTime', text);
                            }} />
                        <Text style={styles.label}>Extraction Time</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.submitButtonText}> Save </Text>
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
    fields: {
        marginTop: '25%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        margin: 25,
        alignItems: 'center',
    },
    inputAndLabel: {
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    inputField: {
        borderColor: '#583A25',
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 24,
        width: 60,
        height: 60,
        color: '#583A25',
        textAlign: 'center',
    },
    label: {
        fontSize: 20,
        color: '#583A25',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    submitButton: {
        backgroundColor: '#583A25',
        width: 300,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#e6ddc5',
        fontSize: 24,
    }
});