import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
    const Icon = require('../Assets/icon.png');
    return (
        <View style={styles.container}>
            <Image source={Icon} />
            <Text style={styles.text}>The Daily Coffee Break</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#75604D'
    },
    text: {
        paddingVertical: '10%',
        fontSize: 32,
        color: '#FFF',
        fontWeight: '700',
    }
})