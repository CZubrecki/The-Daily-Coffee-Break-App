import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { IconFill } from "@ant-design/icons-react-native";

export default function FloatingButton({ style }: any) {
    return (
        <View style={[styles.container, style]}>
            <TouchableHighlight onPress={() => console.log('ere')}>
                <Animated.View style={[styles.button, styles.menu]}>
                    <Text>+</Text>
                </Animated.View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#C3936F',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
    },
    menu: {
        backgroundColor: '#C3936F',
        fontSize: 1000,
    }
});