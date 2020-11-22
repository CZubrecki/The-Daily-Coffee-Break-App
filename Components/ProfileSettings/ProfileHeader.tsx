import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ProfileHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 44,
        paddingVertical: 30,
        marginHorizontal: 20,
    },
    text: {
        fontSize: 30,
        fontWeight: '600',
    }
});