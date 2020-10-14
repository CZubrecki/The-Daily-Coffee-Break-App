import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Extraction } from '../Models/Extraction';
import moment from 'moment';
import * as _ from 'lodash';
import { getExtractionLogById } from '../api/ExtractionAPI';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function determineBrewName(extractionRatio: number): string {
    let espressoType = '';
    switch (true) {
        case (extractionRatio <= 1.5): {
            espressoType = 'Ristretto (1:1 - 1:1.5): A viscous with a heavy body, but lacking in clarity. This tighter brew ratio plays to the strengths of a darker-roasted, low-grown coffee that has chocolatey, caramel characteristics.';
            break;
        }
        case (extractionRatio <= 2): {
            espressoType = 'Normale (1:1.5 - 1:2): The current norm in specialty coffee shops across the US, Europe and Australia trend toward a normale espresso range somewhere between a 1:1.5 or 1:2 ratio.';
            break;
        }
        default: {
            espressoType = 'Lungo (1:3 - 1:4): By extending the brew ratio, the clarity of the coffee increases, body and viscosity decrease, and more individual notes of coffee become evident and easier to pick out';
            break;
        }
    }
    return espressoType;
}

export default function ExtractionDetails({ route }: any) {
    const { _id } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [extraction, setExtraction] = useState<Extraction>();
    const dateFormat = 'h:mm a YYYY MMMM D';
    const extractionRatio = extraction && _.round(extraction.weightOut / extraction.weightIn);

    const loadExtraction = async () => {
        const extractionData = await getExtractionLogById(_id);
        if (extractionData) {
            setExtraction(extractionData);
            setLoading(false);
        }
    };

    const ratings = (rating: number) => {
        const cupsArray = [];
        for (let i = 0; i < rating; i++) {
            cupsArray.push(<FontAwesomeIcon key={i} icon={faCoffee} size={30} style={{ color: '#75604d' }} />);
        }
        return cupsArray;
    }

    useEffect(() => {
        loadExtraction();
    }, [isLoading]);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> :
                <View style={styles.dataContainer}>
                    <Text style={styles.date}>{moment(extraction?.extractionDate).format(dateFormat)}</Text>
                    <View style={styles.dataRow}>
                        {extraction?.beans ? <Text style={styles.beansLabel}>{extraction?.beans}</Text> : null}
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.dataText}>{extraction?.extractionTime}s</Text>
                            <Text style={styles.label}>Extraction Time</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.dataText}>{extraction?.weightIn}g</Text>
                            <Text style={styles.label}>Weight In</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.dataText}>{extraction?.weightOut}g</Text>
                            <Text style={styles.label}>Weight Out</Text>
                        </View>
                    </View>
                    <View style={styles.dataRow}>
                        {extraction?.grindSize ? <Text><Text style={styles.dataLabel}>Grind Size:</Text><Text style={styles.temperatureValue}> {extraction?.grindSize}</Text></Text> : null}
                    </View>
                    <View style={styles.dataRow}>
                        {extraction?.shotTemperature ? <Text><Text style={styles.dataLabel}>Shot Temperature:</Text><Text style={styles.temperatureValue}> {extraction?.shotTemperature}˚C</Text></Text> : null}
                    </View>
                    <View style={styles.extractionRowLabel}>
                        <Text style={styles.dataText}> Extraction Ratio: 1:{extractionRatio}</Text>
                    </View>
                    <View style={styles.extractionRowBorder}>
                        <View style={styles.extractionRow}>
                            <Text style={styles.brewType}>{extractionRatio && determineBrewName(extractionRatio)}</Text>
                        </View>
                    </View>
                    {extraction?.rating ?
                        <>
                            <Text style={styles.dataText}>Rating</Text>
                            <View style={styles.ratingRow}>
                                {ratings(extraction?.rating)}
                            </View>
                        </>
                        : null
                    }
                    <View style={styles.notesBorder}>
                        <View style={styles.notesRow}>
                            {extraction?.notes ? <Text><Text style={styles.dataLabel}>Notes:</Text><Text style={styles.label}> {extraction?.notes}</Text></Text> : null}
                        </View>
                    </View>
                </View>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6DDC5',
    },
    dataContainer: {
    },
    date: {
        fontSize: 20,
        margin: 20,
        color: '#583A25',
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    extractionRowLabel: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20,
    },
    extractionRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    extractionRowBorder: {
        borderWidth: 2,
        borderColor: '#583A25',
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 15,
    },
    beansLabel: {
        color: '#583A25',
        fontSize: 28,
    },
    dataRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 15,
    },
    column: {
        flexDirection: 'column',
        padding: 20,
    },
    dataText: {
        fontSize: 32,
        color: '#583A25',
        textAlign: 'center',
    },
    brewType: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        color: '#583A25',
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        color: '#583A25',
    },
    dataLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#583A25',
    },
    temperatureValue: {
        fontSize: 20,
        fontWeight: '400',
        color: '#583A25',
    },
    notesRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 20,
    },
    notesBorder: {
        borderWidth: 2,
        borderColor: '#583A25',
        borderRadius: 20,
        margin: 10,
    },
    ratingRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 25,
        paddingHorizontal: 80,
        paddingBottom: 20,
    }
});