import React from 'react';
import { Dimensions, StyleSheet, Text, View, ImageBackground } from 'react-native';
import extraction from '../Assets/extraction.jpg';

const { height, width } = Dimensions.get('window');

export default function LandingPage() {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={extraction}>
                <Text style={styles.title}>Welcome</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        marginTop: 5,
        color: '#FFF',
        transform: [{ rotate: '270deg' }],
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '90deg' }],
        height: width,
        width: height,
    }
})