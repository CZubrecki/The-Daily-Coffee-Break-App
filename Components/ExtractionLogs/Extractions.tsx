import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { getExtractionLogs } from '../../Api/ExtractionAPI';
import { Extraction } from '../../Models/Extraction';
import ListItem from '../ListItem';

interface ExtracionsProps {
    navigation: any;
    filters: any;
}

export default function Extractions({ navigation, filters }: ExtracionsProps) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [extractions, setExtractions] = useState<Extraction[]>([]);

    const handleRefresh = async () => {
        try {
            const extractions = await getExtractionLogs(filters);
            if (extractions) {
                setExtractions(extractions);
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
    }, [isLoading, filters]);


    return (
        <FlatList
            style={styles.container}
            showsVerticalScrollIndicator={false}
            data={extractions}
            renderItem={(extractionData: any) => (
                <ListItem {...{ extractionData, navigation }} />
            )}
            keyExtractor={(extraction: Extraction) => extraction.id}
            refreshing={isLoading}
            onRefresh={handleRefresh}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    }
});