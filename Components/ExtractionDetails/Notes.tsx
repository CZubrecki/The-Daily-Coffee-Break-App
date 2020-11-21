import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AddOrEditNote from './AddOrEditNote';
import { updateExtractionLog } from '../../Api/ExtractionAPI';

interface NotesProps {
    id: string,
    notes?: string | undefined;
}

export default function Notes({ id, notes }: NotesProps) {
    const [localNotes, setLocalNotes] = useState(notes);
    const [modalVisible, setModalVisible] = useState(false);
    const addNotes = () => setModalVisible(true);
    const onDismiss = () => setModalVisible(false);
    const onComplete = async (updatedNotes: string) => {
        setLocalNotes(updatedNotes);
        await updateExtractionLog(id, undefined, updatedNotes);
    }

    return (
        <>
            <Modal animationType="slide" collapsable={true} visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <AddOrEditNote {...{ onDismiss, onComplete, notes }} />
            </Modal>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[{ fontSize: 22, fontWeight: '500', color: '#323232' }]}>Notes</Text>
                    <TouchableOpacity onPress={addNotes}>
                        <FontAwesomeIcon icon={notes ? faPencilAlt : faPlus} color='#75604D' />
                    </TouchableOpacity>
                </View>
                {localNotes ?
                    <View style={styles.notesView}>
                        <Text style={[{ color: '#808080' }]}>{localNotes}</Text>
                    </View> : null
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    divider: {
        borderWidth: 1,
        borderColor: '#DCDCDC',
        height: .5,
    },
    notes: {
        height: 100,
    },
    input: {
        marginHorizontal: 20,
    },
    notesView: {
        marginHorizontal: 20,
        marginVertical: 5,
    }
});