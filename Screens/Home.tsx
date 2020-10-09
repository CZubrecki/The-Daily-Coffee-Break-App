import { StyleSheet, View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListItem from '../Components/ListItem';
import FloatingButton from '../Components/FloatingButton';
import { Extraction } from '../Models/Extraction';
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({ navigation }: any) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Extraction[]>([]);

    const handleRefresh = async () => {
        const token = await AsyncStorage.getItem('token');
        fetch(`http://35.182.216.111:8080/extraction-logs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }).then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

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