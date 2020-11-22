import React, { ProfilerProps } from 'react';
import { StyleSheet, View } from 'react-native';
import AccountSettings from '../Components/ProfileSettings/AccountSettings';
import Legal from '../Components/ProfileSettings/Legal';
import ProfileHeader from '../Components/ProfileSettings/ProfileHeader';

interface ProfileProps {
    navigation: any;
}

export default function Profile({ navigation }: ProfileProps) {
    return (
        <View style={styles.container}>
            <ProfileHeader />
            <AccountSettings {...{ navigation }} />
            <Legal />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF7F5',
    }
});