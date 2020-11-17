import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Card from '../Card';

const data = [
    {},
    {},
    {},
];

export default function Carrossel() {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToStart={true}
                decelerationRate='fast'
                data={data}
                renderItem={({ item }) => (
                    <Card />
                )}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    }
});