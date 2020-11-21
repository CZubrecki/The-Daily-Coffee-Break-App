import { StyleSheet, View, Text, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { Extraction } from '../../Models/Extraction';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ExtractionDetailScreen from '../../Screens/ExtractionDetailScreen';

export interface ListItemProps {
    extractionData: any,
    navigation: any;
    onClose: () => void;
}

export default function ListItem({ extractionData, navigation, onClose }: ListItemProps) {
    const dateFormat = 'h:mm a YYYY MMMM D';
    const extraction: Extraction = extractionData.item;
    const [modalVisible, setModalVisible] = useState(false);

    const onDismiss = async () => {
        await onClose();
        setModalVisible(false)
    };

    return (
        <>
            <Modal animationType="slide" collapsable={true} presentationStyle='formSheet' visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <View style={styles.modal}>
                    <ExtractionDetailScreen {...{ extraction, onDismiss }} />
                </View>
            </Modal>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setModalVisible(true)}
            >
                <View style={styles.content}>
                    <View>
                        <Text style={[{ fontSize: 18, fontWeight: '500' }]}>
                            {extraction.beans}
                        </Text>
                    </View>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <Text style={[{ fontSize: 10, color: '#A6A6A6' }]}>
                            {moment(extraction.extractionDate).format(dateFormat)}
                        </Text>
                    </View>
                </View>
                <View style={styles.chevron}>
                    <FontAwesomeIcon icon={faChevronRight} color={'#75604D'} />
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FFF',
        borderLeftColor: '#75604D',
        borderLeftWidth: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        flexDirection: 'column',
    },
    chevron: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 5,
    }
});