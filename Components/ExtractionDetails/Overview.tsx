import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { updateExtractionLog } from '../../Api/ExtractionAPI';
import Rating from '../Rating';

interface OverviewProps {
    id: string;
    beans?: string;
    extractionDate: Date;
    rating?: number;
}

export default function Overview({ id, beans, extractionDate, rating }: OverviewProps) {
    const dateFormat = 'h:mm a YYYY MMMM D';
    const [displaySaveButton, setDisplaySaveButton] = useState(false);
    const [updatedRating, setUpdatedRating] = useState();
    const ratingUpdated = async (newRating: any) => {
        if (newRating !== rating) {
            setDisplaySaveButton(true);
            setUpdatedRating(newRating);
        }
    };

    const onSubmit = async () => {
        await updateExtractionLog(id, updatedRating);
        setDisplaySaveButton(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[{ fontSize: 28, fontWeight: '500', color: '#454545' }]}>{beans}</Text>
                <Text style={[{ fontSize: 12, fontWeight: '500', color: '#B3B3B3' }]}>{moment(extractionDate).format(dateFormat)}</Text>
            </View>
            <View style={[styles.divider]} />
            <View style={styles.rating}>
                <Rating {...{ ratingCallback: ratingUpdated, ratingProp: rating }} />
            </View>
            {displaySaveButton ?
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onSubmit()}>
                        <Text style={[{ fontSize: 24, color: '#FFF' }]}>Save Rating</Text>
                    </TouchableOpacity>
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
    divider: {
        borderWidth: .5,
        borderColor: '#DCDCDC',
    },
    header: {
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    rating: {
        paddingVertical: 20,
    },
    buttonContainer: {
        backgroundColor: '#75604D',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    }
});