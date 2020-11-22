import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as _ from 'lodash';

interface EditNotesHeaserProps {
    onDismiss: () => void
    onComplete: (notes: any) => void;
    updatedNotes: string | undefined;
}

export default function EditNotesHeader({ onDismiss, onComplete, updatedNotes }: EditNotesHeaserProps) {
    const submit = () => {
        if (!_.isNil(updatedNotes)) {
            onComplete(updatedNotes);
        }
        onDismiss();
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onDismiss}>
                    <Text style={[styles.text, { fontWeight: '400' }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={submit}>
                    <Text style={[styles.text]}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#75604D',
        height: 80,
        justifyContent: 'center',
    },
    buttonRow: {
        marginHorizontal: 20,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFF'
    }
});