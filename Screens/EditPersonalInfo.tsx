import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EditPersonalInfoHeader from '../Components/ProfileSettings/EditPersonalInfoHeader';
import UpdateEmail from '../Components/ProfileSettings/UpdateEmail';
import { updateEmail } from '../Api/AuthApi';

interface EditPersonalInfoProps {
    navigation: any,
}

export default function EditPersonalInfo({ navigation }: EditPersonalInfoProps) {
    const [email, setEmail] = useState<string>();
    const [displayModal, setDisplayModal] = useState<boolean>(false);

    useEffect(() => {
        getEmail();
    }, [email]);

    const getEmail = async () => {
        const localEmail = await AsyncStorage.getItem('email');
        if (localEmail) {
            setEmail(localEmail);
        }
    }

    const onDismiss = () => setDisplayModal(false);

    const onComplete = async (updatedEmail: string, password: string) => {
        if (email) {
            const result = await updateEmail(email, updatedEmail, password);
            if (result) {
                setEmail(updatedEmail);
            }
        }
    };


    return (
        <>
            <Modal animationType="slide" collapsable={true} presentationStyle='formSheet' visible={displayModal} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <UpdateEmail {...{ onDismiss, onComplete, email }} />
            </Modal>
            <View style={styles.container}>
                <EditPersonalInfoHeader {...{ navigation }} />
                <TouchableOpacity style={styles.button} onPress={() => setDisplayModal(true)}>
                    <View style={styles.headerWithButton}>
                        <Text style={[{ fontSize: 16, color: '#4F4F4F' }]}>Email</Text>
                        <Text style={[{ fontSize: 16, color: '#75604D' }]}>Edit</Text>
                    </View>
                    <View style={styles.email}>
                        <Text style={[{ fontSize: 12, color: '#4F4F4F' }]}>{email}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.divider} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    button: {
        paddingVertical: 10,
    },
    headerWithButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    email: {
        paddingVertical: 10,
    },
    divider: {
        borderColor: '#BBBBBB',
        borderWidth: 0.5,
    }
});