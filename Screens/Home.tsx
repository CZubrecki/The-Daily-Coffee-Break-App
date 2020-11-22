import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import TabBar from '../Components/TabBar';
import { View } from 'react-native';
import ExtractionLogs from './ExtractionLogs';
import ComingSoon from './ComingSoon';
import Profile from './Profile';
import LandingPage from './LandingPage';

export default function Home({ navigation }: any) {
    const [tab, setTab] = useState<string>('Home');
    const onPress = (tab: any) => setTab(tab);

    return (
        <View style={styles.container}>
            {tab === 'Home' ? <LandingPage /> : null}
            {tab === 'ExtractionLogs' ? <ExtractionLogs {...{ navigation }} /> : null}
            {tab === 'Camera' ? <ComingSoon /> : null}
            {tab === 'Search' ? <ComingSoon /> : null}
            {tab === 'Profile' ? <Profile {...{ navigation }} /> : null}
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