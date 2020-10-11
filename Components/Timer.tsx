import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface Props {
    setExtractionTime: any,
}

export default function Timer(props: Props) {
    const { setExtractionTime } = props;
    const [time, setTime] = useState<number>(0);
    const [localInterval, setLocalInterval] = useState<any>();
    const duration = moment.duration(time);
    const pad = (n: number) => n < 10 ? '0' + n : n;

    const startTime = () => {
        if (localInterval) {
            resetTime();
        }
        const interval = setInterval(() => (setTime(seconds => seconds + 1)), 1000);
        if (interval) {
            setLocalInterval(interval);
        }
    };

    const stopTimer = () => {
        clearInterval(localInterval);
        setExtractionTime(time);
    };

    const resetTime = () => {
        clearInterval(localInterval);
        setTime(0);
    }


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.timerText}>{pad(duration.minutes())}:{pad(duration.milliseconds())}</Text>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    onPress={resetTime}
                    style={styles.button}
                    activeOpacity={0.7}>
                    <View style={styles.buttonBorder}>
                        <Text style={styles.buttonTitle}>Reset</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={startTime}
                    style={styles.button}
                    activeOpacity={0.7}>
                    <View style={styles.buttonBorder}>
                        <Text style={styles.buttonTitle}>Start</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={stopTimer}
                    style={styles.button}
                    activeOpacity={0.7}>
                    <View style={styles.buttonBorder}>
                        <Text style={styles.buttonTitle}>Stop</Text>
                    </View>
                </TouchableOpacity>
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
    },
    timerText: {
        fontSize: 72,
        fontWeight: '200',
        color: '#583A25',
    },
    buttonRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
    },
    button: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#75604d'
    },
    buttonTitle: {
        fontSize: 18,
        color: "#E6DDC5"
    },
    buttonBorder: {
        height: 76,
        width: 76,
        borderRadius: 38,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E6DDC5',
    }
})