
import React from 'react';
import { useContext } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../context';

export default function Legal() {
    const { logout } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Legal</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={[styles.button]} onPress={logout}>
                <Text style={[styles.buttonText, { color: '#75604D' }]}>Log out</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    header: {
    },
    headerText: {
        fontSize: 12,
        color: '#808080',
        fontWeight: '500',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '300',
        color: '#4F4F4F',
    },
    divider: {
        borderColor: '#BBBBBB',
        borderWidth: 0.5,
    }
});