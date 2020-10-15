import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Timer from '../Components/Timer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { addExtraction } from '../api/ExtractionAPI';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Cup {
    isSelected: boolean;
    color: string;
}

export default function ExtractionLog({ navigation }: any) {
    const { register, handleSubmit, setValue } = useForm();
    const [cups, setCups] = useState<Cup[]>([]);
    const [rating, setRating] = useState<number>(0);

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
        register('beans');
        register('shotTemperature');
        register('notes');
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
        let data = [...cups];

        if (index === (rating - 1)) {
            data = clearRatings(data);
            updateRating(data);
            setCups(data);
            return;
        }

        if ((index === 0 && rating === 1)) {
            data[index] = {
                ...data[index],
                isSelected: !data[index].isSelected,
                color: !data[index].isSelected ? '#75604d' : '#b8ad99',
            };
            updateRating(data);
            setCups(data);
            return data;
        }

        if (index === 0 && rating === 0) {
            data[index] = {
                ...data[index],
                isSelected: !data[index].isSelected,
                color: !data[index].isSelected ? '#75604d' : '#b8ad99',
            };
            updateRating(data);
            setCups(data);
            return data;
        }

        if ((index < rating)) {
            data = clearRatings(data);
        }

        for (let i = 0; i <= index; i++) {
            data[i] = {
                ...data[index],
                isSelected: !data[index].isSelected,
                color: !data[index].isSelected ? '#75604d' : '#b8ad99',
            }
        }

        updateRating(data);
        setCups(data);
        return data;
    };

    const clearRatings = (data: Cup[]): Cup[] => {
        for (let i = 0; i < data.length; i++) {
            data[i] = {
                ...data[i],
                isSelected: false,
                color: '#b8ad99',
            }
        }
        return data;
    }

    const updateRating = (data: Cup[]) => {
        let totalSelected = 0;
        data.forEach(cup => {
            if (cup.isSelected) {
                totalSelected++;
            }
        });
        setRating(totalSelected);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                                            setValue('beans', text);
                                        }} />
                                    <Text style={styles.label}>Beans</Text>
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
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <TextInput
                                        style={styles.grindSize}
                                        keyboardType='numeric'
                                        onChangeText={text => {
                                            setValue('shotTemperature', text);
                                        }} />
                                    <Text style={styles.label}>Shot Temperature</Text>
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
                    <View>
                        <View style={styles.notesContainer}>
                            <TextInput
                                placeholder='Notes...'
                                style={styles.notes}
                                maxLength={150}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={text => {
                                    setValue('notes', text);
                                }} />
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
            </ScrollView>
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
        alignItems: 'center',
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        marginTop: 20,
        marginHorizontal: 20,
        alignItems: 'center',
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
        marginTop: 20,
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
    notesContainer: {
        marginTop: 25,
        width: 300,
        height: 105,
        borderColor: '#583A25',
        borderWidth: 2,
        borderRadius: 15,
    },
    notes: {
        margin: 10,
        width: 295,
        height: 100,
        fontSize: 12,
        color: '#583A25',
    },
    bottom: {
        paddingTop: 50,
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