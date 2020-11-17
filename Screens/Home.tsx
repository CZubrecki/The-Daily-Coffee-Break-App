import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import TabBar from '../Components/TabBar';
import { View } from 'react-native';
import ExtractionLogs from './ExtractionLogs';

const Tab = createBottomTabNavigator();

export default function Home({ navigation }: any) {
    const [tab, setTab] = useState<string>('Home');
    const onPress = (tab: any) => setTab(tab);

    return (
        <View style={styles.container}>
            {tab === 'ExtractionLogs' ? <ExtractionLogs {...{ navigation }} /> : null}
            <TabBar {...{ onPress }} />
        </View>
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
    }
});