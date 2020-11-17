import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


interface Tab {
    name: string;
    icon: IconDefinition,
}

interface TabProps {
    tabs: Tab[];
    onPress: any;
}

export default function Tab({ tabs, onPress }: TabProps) {
    return (
        <View style={styles.container}>
            {tabs.map(({ name, icon }, key) => (
                <TouchableWithoutFeedback onPress={() => onPress(name)} key={key}>
                    <View style={styles.tab}>
                        <FontAwesomeIcon size={20} icon={icon} style={{ color: '#FFF', }} />
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});