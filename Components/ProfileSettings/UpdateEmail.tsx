import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as _ from 'lodash';

interface UpdateEmailProps {
    onDismiss: () => void;
    onComplete: (email: string, password: string) => void;
    email?: string | undefined;
}

const { width } = Dimensions.get('window');

export default function UpdateEmail({ onDismiss, onComplete, email }: UpdateEmailProps) {
    const [updateEmail, setUpdatedEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSubmit = async () => {
        if (!_.isNil(updateEmail) && !_.isNil(password)) {
            await onComplete(updateEmail, password);
            onDismiss();
        }
    }


    return (
        <KeyboardAvoidingView>
            <View style={styles.header}>
                <View style={styles.headerColumn}>
                    <TouchableOpacity onPress={onDismiss}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerColumn}>
                    <Text style={[{ fontSize: 16, fontWeight: '600' }]}>Update Email</Text>
                </View>
                <View style={styles.headerColumn}>
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.textInfo}>
                <Text>Please also enter your password to change your email.</Text>
            </View>
            <View style={styles.textInputs}>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextInput style={styles.input} defaultValue={email} clearButtonMode='always'
                        autoCapitalize="none"
                        keyboardType='email-address'
                        onChangeText={text => {
                            setUpdatedEmail(text)
                        }} />
                </View>
                <View style={[styles.divider]} />
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Password</Text>
                    <TextInput style={styles.input} clearButtonMode='always'
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={text => {
                            setPassword(text)
                        }} />
                </View>
            </View>
            <View style={styles.submitButton}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={[{ fontSize: 20, }]}>Save</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    header: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    headerColumn: {
        width: width / 3,
    },
    divider: {
        borderColor: '#BBBBBB',
        borderWidth: 0.5,
    },
    textInfo: {
        marginVertical: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputs: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#BBBBBB',
        borderRadius: 20,
    },
    field: {
        marginHorizontal: 15,
        marginVertical: 15,
    },
    fieldLabel: {
        fontSize: 12,
    },
    input: {
        paddingVertical: 5,
    },
    submitButton: {
        marginBottom: 36,
        justifyContent: 'flex-end',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    }
});