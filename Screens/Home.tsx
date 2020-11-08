import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ListItem from '../Components/ListItem';
import { Extraction } from '../Models/Extraction';
import { getExtractionLogs } from '../Api/ExtractionAPI';
import { useFocusEffect } from '@react-navigation/native';
import FloatingButton from '../Components/FloatingButton';

export default function Home({ navigation }: any) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Extraction[]>([]);
    const [filters, setFilters] = useState();

    const handleRefresh = async () => {
        try {
            const extractions = await getExtractionLogs(filters);
            if (extractions) {
                setData(extractions);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            handleRefresh();
            return () => {
                setLoading(false);
            };
        }, [isLoading, filters])
    );

    useEffect(() => {
        handleRefresh();
    }, [isLoading]);

    const applyFilters = (filters: any) => setFilters(filters);

    const renderItem = ({ item }: any) => (
        <ListItem extractionData={{
            id: item.id,
            weightIn: item.weightIn,
            weightOut: item.weightOut,
            extractionTime: item.extractionTime,
            extractionDate: item.extractionDate,
            grindSize: '',
        }} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : data.length === 0 ?
                <View style={styles.noData}>
                    <Text style={styles.noDataText}>No Extractions</Text>
                    <FloatingButton open={false} navigation={navigation} applyFilters={applyFilters} filters={filters} />
                </View>
                :
                <>
                    <View style={styles.list}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item: any) => item.id}
                            refreshing={isLoading}
                            onRefresh={handleRefresh}
                        />
                        <FloatingButton open={false} navigation={navigation} applyFilters={applyFilters} />
                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    noData: {
        flex: 1,
        textAlign: 'center',
        alignContent: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 32,
        color: '#583A25'
    }
});