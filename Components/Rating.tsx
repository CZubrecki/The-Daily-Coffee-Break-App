import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export interface Cup {
    isSelected: boolean;
    color: string;
}

export interface Props {
    propRating?: number,
    ratingCallback: (rating: any) => void,
}

export default function Rating({ propRating, ratingCallback }: Props) {
    const [rating, setRating] = useState(propRating || 0);
    const [cups, setCups] = useState<Cup[]>([]);

    useEffect(() => {
        setCups(initalizeCups());
    }, []);

    const initalizeCups = () => {
        const cupsData: Cup[] = [];
        if (rating > 0) {
            for (let i = 0; i < rating; i++) {
                cupsData.push({
                    isSelected: true,
                    color: '#75604d',
                });
            }
        }

        for (let i = 0; i < (5 - rating); i++) {
            cupsData.push({
                isSelected: false,
                color: '#b8ad99',
            });
        }
        return cupsData;
    }

    const handleStateChange = (index: number) => {
        let data = [...cups];

        if (index === (rating - 1)) {
            data = clearRatings(data);
            updateRating(data);
            setCups(data);
            return;
        }

        if ((index === 0 && rating === 1)) {
            data[index] = {
                ...data[index],
                isSelected: !data[index].isSelected,
                color: !data[index].isSelected ? '#75604d' : '#b8ad99',
            };
            updateRating(data);
            setCups(data);
            return data;
        }

        if (index === 0 && rating === 0) {
            data[index] = {
                ...data[index],
                isSelected: !data[index].isSelected,
                color: !data[index].isSelected ? '#75604d' : '#b8ad99',
            };
            updateRating(data);
            setCups(data);
            return data;
        }

        if ((index < rating)) {
            data = clearRatings(data);
        }

        for (let i = 0; i <= index; i++) {
            data[i] = {
                ...data[index],
                isSelected: !data[index].isSelected,
                color: !data[index].isSelected ? '#75604d' : '#b8ad99',
            }
        }

        updateRating(data);
        setCups(data);
        return data;
    };

    const clearRatings = (data: Cup[]): Cup[] => {
        for (let i = 0; i < data.length; i++) {
            data[i] = {
                ...data[i],
                isSelected: false,
                color: '#b8ad99',
            }
        }
        return data;
    }

    const updateRating = (data: Cup[]) => {
        let totalSelected = 0;
        data.forEach(cup => {
            if (cup.isSelected) {
                totalSelected++;
            }
        });
        ratingCallback(totalSelected);
        setRating(totalSelected);
    };


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {cups.map((cup, index) => (
                    <View style={styles.column} key={index}>
                        <TouchableOpacity
                            style={styles.cup}
                            activeOpacity={1}
                            onPress={() => handleStateChange(index)}>
                            <FontAwesomeIcon icon={faCoffee} size={30} style={{ color: cup.color }} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    cup: {
    },
});