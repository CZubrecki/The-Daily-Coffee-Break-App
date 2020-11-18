import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Tab from './Tab';
import { faHome, faList, faCamera, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';


interface TabBarProps {
    onPress: any,
}

const tabs = [
    {
        name: 'Home',
        icon: faHome,
    },
    {
        name: 'ExtractionLogs',
        icon: faList,
    },
    {
        name: 'Camera',
        icon: faCamera,
    },
    {
        name: 'Search',
        icon: faSearch,
    },
    {
        name: 'Profile',
        icon: faUser,
    },
];

const { width } = Dimensions.get("window");
const height = 84;


export default function TabBar({ onPress }: TabBarProps) {
    return (
        <View style={styles.container}>
            <View style={[StyleSheet.absoluteFill]}>
                <Tab {...{ tabs, onPress }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#75604D',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
});