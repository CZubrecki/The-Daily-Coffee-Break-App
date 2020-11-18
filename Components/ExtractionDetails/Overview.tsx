import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Rating from '../Rating';

interface OverviewProps {
    beans?: string;
    extractionDate: Date;
    rating?: number;
}

export default function Overview({ beans, extractionDate, rating }: OverviewProps) {
    const ratingUpdated = () => { };
    const dateFormat = 'h:mm a YYYY MMMM D';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[{ fontSize: 28, fontWeight: '500', color: '#654321' }]}>{beans}</Text>
                <Text style={[{ fontSize: 12, fontWeight: '500', color: '#B3B3B3' }]}>{moment(extractionDate).format(dateFormat)}</Text>
            </View>
            <View style={[styles.divider, { borderWidth: .75, borderColor: '#654321' }]} />
            <View style={styles.rating}>
                <Rating {...{ ratingCallback: ratingUpdated, ratingProp: rating }} />
            </View>
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
    divider: {
        borderWidth: 2,
        borderColor: '#DCDCDC',
        height: .5,
    },
    header: {
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    rating: {
        paddingVertical: 20,
    }
});