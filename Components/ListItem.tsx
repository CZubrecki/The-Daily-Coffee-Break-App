import { Platform, StyleSheet, View, Text, StatusBar, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { Extraction } from '../Models/Extraction';

export interface Props {
    extractionData: Extraction,
    navigation: any;
}

export default function ListItem(props: Props) {
    const { id, extractionDate, extractionTime, weightIn, weightOut } = props.extractionData;
    const { navigation } = props;
    const dateFormat = 'h:mm a YYYY MMMM D';


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.push('ExtractionDetails', { _id: id })}>
                <View style={styles.row}>
                    <Text style={styles.date}>{moment(extractionDate).format(dateFormat)}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.title}>{extractionTime}s</Text>
                        <Text style={styles.subTitle}>Extraction Time</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.title}>{weightIn}g</Text>
                        <Text style={styles.subTitle}>Weight In</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.title}>{weightOut}g</Text>
                        <Text style={styles.subTitle}>Weight Out</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f2a14',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        fontSize: 16,
        color: '#e6ddc5',
    },
    item: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 26,
        color: '#e6ddc5',
    },
    subTitle: {
        fontSize: 12,
        color: '#e6ddc5',
    }
});