import { faChevronLeft, faChevronUp, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from "react-native";

export default function FloatingButton({ navigation, open, applyFilters, filters }: any) {
    const animation = new Animated.Value(0);
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"],
                })
            }
        ]
    }
    const filterStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80],
                })
            }
        ]
    }
    const addStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -140],
                })
            }
        ]
    }

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;
        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true,
        }).start();
        open = !open;
    }


    return (
        <View style={[styles.container]}>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('ExtractionLog')}>
                <Animated.View style={[styles.button, styles.secondary, addStyle]}>
                    <FontAwesomeIcon icon={faPlus} size={20} color='#583A25' />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('FilterPage', { applyFilters, ...filters })}>
                <Animated.View style={[styles.button, styles.secondary, filterStyle]}>
                    <FontAwesomeIcon icon={faFilter} size={20} color='#583A25' />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>
                    <FontAwesomeIcon icon={faPlus} size={24} color='#FFF'></FontAwesomeIcon>
                </Animated.View>
            </TouchableWithoutFeedback>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 25,
        marginHorizontal: 20,
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#75604d',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    },
    menu: {
        backgroundColor: '#583A25',
    },
    secondary: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
    }
});