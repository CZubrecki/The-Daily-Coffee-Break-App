import React, { useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';

export interface Props {
    setExtractionTime: any,
}

export default function Timer(props: Props) {
    const { setExtractionTime } = props;
    const [seconds, setSeconds] = useState<number>(0);
    const [localInterval, setLocalInterval] = useState<any>();

    const startTime = () => {
        if (localInterval) {
            clearInterval(localInterval);
        }
        setSeconds(0);
        const interval = setInterval(() => (setSeconds(seconds => seconds + 1)), 1000);
        if (interval) {
            setLocalInterval(interval);
        }
    };

    const stopTimer = () => {
        clearInterval(localInterval);
        setExtractionTime(seconds);
    };


    return (
        <View style={styles.container}>
            <Text>{seconds}</Text>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Button title="Start" onPress={startTime}></Button>
                </View>
                <View style={styles.column}>
                    <Button title="Stop" onPress={stopTimer}></Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    }
})