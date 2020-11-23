import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface EditPersonalInfoHeaderProps {
    navigation: any;
}

export default function EditPersonalInfoHeader({ navigation }: EditPersonalInfoHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faChevronLeft} size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[{ fontWeight: '600' }]}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerText}>
                <Text style={styles.text}>Edit personal info</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        marginVertical: 40,
    },
    text: {
        fontSize: 30,
        fontWeight: '600',
    }
});