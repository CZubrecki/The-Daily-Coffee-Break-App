import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AccountSettingsProps {
    navigation: any;
}

export default function AccountSettings({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Account Settings</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditPersonalInfo')}>
                <Text style={styles.buttonText}>Peronsal information</Text>
                <FontAwesomeIcon icon={faUser} color={'#4F4F4F'} size={24} />
            </TouchableOpacity>
            <View style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
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