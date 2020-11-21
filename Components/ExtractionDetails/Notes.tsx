import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

interface NotesProps {
    notes?: string | undefined;
}

export default function Notes({ notes }: NotesProps) {
    const [addNote, setAddNote] = useState(false);
    const addNotes = () => setAddNote(true);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[{ fontSize: 22, fontWeight: '500', color: '#654321' }]}>Notes</Text>
                <TouchableOpacity onPress={addNotes}>
                    <FontAwesomeIcon icon={notes ? faPencilAlt : faPlus} color='#654321' />
                </TouchableOpacity>
            </View>
            { addNote ?
                <View style={styles.notes}>
                    <TextInput style={styles.input} placeholder='Add notes'></TextInput>
                </View>
                : null
            }
        </View>
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
    }
});