import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import Rating from '../Rating';

interface ExtractionDetailsProps {
    weightIn: number | undefined;
    weightOut: number | undefined;
    extractionTime: number | undefined;
    grindSize?: string | undefined;
    shotTemperature?: number | undefined;
}

const { width } = Dimensions.get('window');

export default function ExtractionDetails({ weightIn, weightOut, extractionTime, grindSize, shotTemperature }: ExtractionDetailsProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[{ fontSize: 22, fontWeight: '500', color: '#454545' }]}>Extraction Details</Text>
            </View>
            <View style={[styles.divider]} />
            <View style={styles.weightAndTime}>
                <View style={styles.value}>
                    <Text style={[{ fontSize: 34, color: '#75604D' }]}>{weightIn}g</Text>
                    <Text style={[{ fontSize: 10, color: '#75604D' }]}>Weight In</Text>
                </View>
                <View style={styles.value}>
                    <Text style={[{ fontSize: 34, color: '#75604D' }]}>{weightOut}g</Text>
                    <Text style={[{ fontSize: 10, color: '#75604D' }]}>Weight Out</Text>
                </View>
                <View style={styles.value}>
                    <Text style={[{ fontSize: 34, color: '#75604D' }]}>{extractionTime}s</Text>
                    <Text style={[{ fontSize: 10, color: '#75604D' }]}>Extraction Time</Text>
                </View>
            </View>
            { grindSize ?
                <View style={styles.row}>
                    <Text style={[{ fontSize: 20, color: '#75604D' }]}>Grind Size:</Text>
                    <Text style={[{ fontSize: 20, color: '#75604D' }]}>{grindSize}</Text>
                </View> : null}
            { shotTemperature ?
                <View style={styles.row}>
                    <Text style={[{ fontSize: 20, color: '#75604D' }]}>Shot Temperature:</Text>
                    <Text style={[{ fontSize: 20, color: '#75604D' }]}>{shotTemperature}</Text>
                </View>
                : null}
        </View>
    );
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
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    weightAndTime: {
        marginHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    value: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 3,
    },
    divider: {
        borderWidth: .5,
        borderColor: '#DCDCDC',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

});