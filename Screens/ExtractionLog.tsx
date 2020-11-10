import React, { useEffect, } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native'
import { useForm } from "react-hook-form";
import Timer from '../Components/Timer';
import { addExtraction } from '../Api/ExtractionAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ExtractionLogProps {
    closeModal: () => void,
}

export default function ExtractionLog({ closeModal }: ExtractionLogProps) {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (data: any) => {
        const result = await addExtraction(data);
        if (result) {
            closeModal();
        }
    }

    useEffect(() => {
        register('weightIn');
        register('weightOut');
        register('extractionTime');
        register('grindSize');
        register('beans');
        register('shotTemperature');
    }, [register]);

    const setExtractionTime = (seconds: any) => {
        setValue('extractionTime', seconds);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.form, { marginTop: 40 }]}>
                <View style={styles.input}>
                    <View style={[styles.row, { justifyContent: 'space-between' }]}>
                        <Text style={styles.formLabel}>Beans</Text>
                        <Text style={styles.formLabel}>(Optional)</Text>
                    </View>
                    <TextInput
                        style={[styles.inputContainer, styles.largeInput]}
                        returnKeyType='done'
                        clearButtonMode='always'
                        onChangeText={text => {
                            setValue('beans', text);
                        }} />
                </View>
                <View style={styles.input}>
                    <View style={[styles.row, { justifyContent: 'space-between' }]}>
                        <Text style={styles.formLabel}>Grind Size</Text>
                        <Text style={styles.formLabel}>(Optional)</Text>
                    </View>
                    <TextInput
                        style={[styles.inputContainer, styles.largeInput]}
                        returnKeyType='done'
                        clearButtonMode='always'
                        onChangeText={text => {
                            setValue('grindSize', text);
                        }} />
                </View>
                <View style={[styles.input]}>
                    <View style={[styles.row, { justifyContent: 'space-between' }]}>
                        <Text style={styles.formLabel}>Weight In</Text>
                    </View>
                    <TextInput
                        style={[styles.inputContainer, styles.largeInput]}
                        returnKeyType='done'
                        keyboardType='numeric'
                        clearButtonMode='always'
                        onChangeText={text => {
                            setValue('weightIn', text);
                        }} />
                </View>
                <View style={[styles.input]}>
                    <View style={[styles.row, { justifyContent: 'space-between' }]}>
                        <Text style={styles.formLabel}>Shot Temperature</Text>
                        <Text style={styles.formLabel}>(Optional)</Text>
                    </View>
                    <TextInput
                        style={[styles.inputContainer, styles.largeInput]}
                        returnKeyType='done'
                        keyboardType='numeric'
                        clearButtonMode='always'
                        onChangeText={text => {
                            setValue('shotTemperature', text);
                        }} />
                </View>
            </View>
            <View style={styles.timer}>
                <Timer setExtractionTime={setExtractionTime} />
            </View>
            <View style={styles.form}>
                <View style={[styles.input]}>
                    <View style={styles.row}>
                        <Text style={styles.formLabel}>Weight Out</Text>
                    </View>
                    <TextInput
                        style={[styles.inputContainer, styles.largeInput]}
                        returnKeyType='done'
                        keyboardType='numeric'
                        onChangeText={text => {
                            setValue('weightOut', text);
                        }} />
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.submitButtonText}>Add Extraction</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={closeModal}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    form: {
        width: '90%',
    },
    input: {
        height: 50,
        marginVertical: 5,
    },
    formLabel: {
        color: '#583A25',
        fontSize: 14,
        fontFamily: 'Helvetica',
        fontWeight: '300',
    },
    row: {
        flexDirection: 'row',
    },
    inputContainer: {
        borderColor: '#D3D3D3',
        borderWidth: 1.5,
        backgroundColor: '#FFF',
        borderRadius: 4,
    },
    largeInput: {
        height: '65%',
        paddingHorizontal: '2%',
    },
    smallInput: {
        height: '75%',
        paddingHorizontal: '2%',
    },
    timer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    bottom: {
        width: '100%',
    },
    addButton: {
        backgroundColor: '#75604D',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '3%',
        marginHorizontal: '2%',
        height: 37.5,
        borderRadius: 5,
    },
    submitButtonText: {
        fontFamily: 'Helvetica',
        fontWeight: '300',
        fontSize: 16,
        color: '#FFF'
    },
    cancelText: {
        color: '#75604D',
        fontWeight: '600',
        fontSize: 16,
    },
    cancelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
    },
});