import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native'
import { Text, View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from '../Components/Timer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { addExtraction } from '../api/ExtractionAPI';

interface Cup {
    isSelected: boolean;
    color: string;
}

export default function ExtractionLog({ navigation }: any) {
    const { register, handleSubmit, setValue } = useForm();
    const [cups, setCups] = useState<Cup[]>([]);

    const onSubmit = async (data: any) => {
        let rating: number = 0;
        cups.forEach(cup => {
            if (cup.isSelected) {
                rating += 1;
            }
        });
        const result = await addExtraction(data, rating);
        if (result) {
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        setCups(initalizeCups());
        register('weightIn');
        register('weightOut');
        register('extractionTime');
        register('grindSize');
    }, [register]);

    const initalizeCups = () => {
        const cupsData: Cup[] = [];
        for (let i = 0; i < 5; i++) {
            cupsData.push({
                isSelected: false,
                color: '#b8ad99',
            });
        }
        return cupsData;
    }

    const setExtractionTime = (seconds: any) => {
        setValue('extractionTime', seconds);
    };

    const handleStateChange = (index: number) => {
        const data = [...cups];
        if (index === 0 || (index > 0 && data[index - 1].isSelected)) {
            data[index] = {
                ...data[index],
                isSelected: !data[index].isSelected,
                color: !data[index].isSelected ? '#75604d' : '#b8ad99',
            };
        }
        setCups(data);
        return cups;
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                                style={styles.grindSize}
                                onChangeText={text => {
                                    setValue('grindSize', text);
                                }} />
                            <Text style={styles.label}>Grind Size</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.row}>
                <Timer setExtractionTime={setExtractionTime} />
            </View>
            <View style={styles.ratingRow}>
                {cups.map((cup, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        onPress={() => handleStateChange(index)}>
                        <FontAwesomeIcon icon={faCoffee} size={30} style={{ color: cup.color }} />
                    </TouchableOpacity>))}
            </View>
            <Text style={styles.label}>Rating</Text>
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
        borderRadius: 15,
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
    ratingRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 100,
        paddingHorizontal: 80,
    },
    grindSize: {
        width: 300,
        height: 40,
        borderColor: '#583A25',
        borderWidth: 2,
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 24,
        color: '#583A25',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    submitButton: {
        backgroundColor: '#75604d',
        width: 300,
        height: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#e6ddc5',
        fontSize: 24,
    }
});