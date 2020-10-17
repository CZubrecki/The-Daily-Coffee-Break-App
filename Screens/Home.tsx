import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ListItem from '../Components/ListItem';
import { Extraction } from '../Models/Extraction';
import { getExtractionLogs } from '../Api/ExtractionAPI';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Home({ navigation, route }: any) {
    console.log(route?.params);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Extraction[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('FilterPage',)}>
                    <FontAwesomeIcon icon={faFilter} size={20}></FontAwesomeIcon>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const handleRefresh = async () => {
        const extractions = await getExtractionLogs();
        if (extractions) {
            setData(extractions);
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            handleRefresh();
            return () => {
                setLoading(false);
            };
        }, [isLoading])
    );

    useEffect(() => {
        handleRefresh();
    }, [isLoading]);

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
                    <Text style={styles.noDataText}>No Extractions Logged</Text>
                </View>
                :
                <View style={styles.list}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id}
                        refreshing={isLoading}
                        onRefresh={handleRefresh}

                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#75604d',
    },
    list: {
        minWidth: '100%',
        minHeight: '100%',
    },
    noData: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 32,
        color: '#583A25'
    }
});