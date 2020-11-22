import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import EditNotesHeader from './EditNotesHeader';

interface AddOrEditNoteProps {
    onDismiss: () => void;
    onComplete: (notes: any) => void;
    notes?: string;
}

export default function AddOrEditNote({ onDismiss, onComplete, notes }: AddOrEditNoteProps) {
    const [updatedNotes, setUpdatedNotes] = useState<string>();

    return (
        <View style={styles.container}>
            <EditNotesHeader {...{ onDismiss, onComplete, updatedNotes }} />
            <View style={styles.textBox}>
                <TextInput
                    style={[{ color: '#676767' }]}
                    defaultValue={notes}
                    multiline={true}
                    maxLength={500}
                    autoFocus={true}
                    onChangeText={text => {
                        setUpdatedNotes(text);
                    }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textBox: {
        marginHorizontal: 15,
        marginVertical: 7,
    }
})