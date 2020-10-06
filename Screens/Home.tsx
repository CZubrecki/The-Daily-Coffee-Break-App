import { Platform, StyleSheet, View, Text, StatusBar, FlatList, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListItem from '../Components/ListItem';
import FloatingButton from '../Components/FloatingButton';
import { Extraction } from '../Models/Extraction';

export default function Home({ navigation }: any) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Extraction[]>([]);

    const handleRefresh = () => {
        fetch('http://localhost:8080/extraction-logs')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    const renderItem = ({ item }: any) => (
        <ListItem extractionData={{
            id: item.id,
            weightIn: item.weightIn,
            weightOut: item.weightOut,
            extractionTime: item.extractionTime,
            extractionDate: item.extractionDate,
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
        backgroundColor: '#E6DDC5',
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