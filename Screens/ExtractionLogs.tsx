import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carrossel from '../Components/ExtractionLogs/Carrossel';
import Extractions from '../Components/ExtractionLogs/Extractions';
import SearchFilter from '../Components/ExtractionLogs/SearchFilter';

interface ExtractionLogsProps {
    navigation: any;
}

export default function ExtractionLogs({ navigation }: ExtractionLogsProps) {
    const [filters, setFilters] = useState();
    const [search, setSearch] = useState();
    const applyFilters = (filters: any) => setFilters(filters);
    const applySearch = (search: any) => setSearch(search);

    return (
        <>
            <Carrossel />
            <View style={styles.addExtractionButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ExtractionLog')} style={styles.addExtractionButton}>
                    <Text style={[{ color: '#FFF', fontWeight: '600', fontSize: 16 },]}>Add Extraction</Text>
                </TouchableOpacity>
            </View>
            <SearchFilter {...{ navigation, applyFilters, applySearch }} />
            <View style={styles.recentExtractionTitleContainer}>
                <Text style={styles.recentExtractions}>
                    Recent Extractions
                </Text>
            </View>
            <Extractions {...{ navigation, filters, search }} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    recentExtractionTitleContainer: {
        marginLeft: 10,
    },
    recentExtractions: {
        fontSize: 24,
        fontWeight: '600',
    },
    addExtractionButtonContainer: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#75604D',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 7,
    },
    addExtractionButton: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});