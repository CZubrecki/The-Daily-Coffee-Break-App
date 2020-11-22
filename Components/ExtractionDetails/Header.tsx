import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface HeaderProps {
    close: () => void;
}

const { width } = Dimensions.get('window');

export default function Header({ close }: HeaderProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => close()}
                style={styles.button}
            >
                <FontAwesomeIcon icon={faTimes} color={'#75604D'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    }

});