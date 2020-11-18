import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface NotesProps {
}

export default function Notes({ }: NotesProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[{ fontSize: 22, fontWeight: '500', color: '#654321' }]}>Notes</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faPlus} color='#654321' />
                </TouchableOpacity>
            </View>
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
});