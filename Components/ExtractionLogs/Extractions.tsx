import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getExtractionLogs } from '../../Api/ExtractionAPI';
import { Extraction } from '../../Models/Extraction';
import ListItem from './ListItem';
import * as _ from 'lodash';

interface ExtracionsProps {
    navigation: any;
    filters: any;
    search: any;
}

export default function Extractions({ navigation, filters, search }: ExtracionsProps) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [extractions, setExtractions] = useState<Extraction[]>([]);

    const handleRefresh = async () => {
        try {
            const extractions = await getExtractionLogs(filters);
            if (extractions) {
                if (!_.isNil(search)) {
                    searchData(extractions);
                } else {
                    setExtractions(extractions);
                }
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const searchData = (extractions: Extraction[]) => {
        setExtractions(extractions.filter((extraction) => (extraction.beans?.toLowerCase().includes(search.toLowerCase()) || extraction.grindSize?.toLowerCase().includes(search.toLowerCase()))));
    }

    const onClose = async () => await handleRefresh();

    useFocusEffect(
        useCallback(() => {
            handleRefresh();
            return () => {
                setLoading(false);
            };
        }, [isLoading, filters, search])
    );

    useEffect(() => {
        handleRefresh();
    }, [isLoading, filters, search]);


    return (
        <FlatList
            style={styles.container}
            showsVerticalScrollIndicator={false}
            data={extractions}
            renderItem={(extractionData: any) => (
                <ListItem {...{ extractionData, navigation, onClose }} />
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