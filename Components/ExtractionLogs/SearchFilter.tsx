import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

interface SearchFilterProps {
    navigation: any;
    applyFilters: (filers: any) => void;
    applySearch: (search: any) => void;
    filters?: any;
}

const { width } = Dimensions.get('window');

export default function SearchFilter({ navigation, applyFilters, applySearch, filters }: SearchFilterProps) {
    const [search, setSearch] = useState<string>('');

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.filterContainer} onPress={() => navigation.navigate('FilterPage', { applyFilters, filters })}>
                    <FontAwesomeIcon icon={faSlidersH} color='#FFF' size={22} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} color='#A6A6A6' size={22} />
                <TextInput
                    placeholder='Search'
                    placeholderTextColor='#A6A6A6'
                    style={styles.searchInput}
                    returnKeyType='search'
                    clearButtonMode="while-editing"
                    onChange={(event) => {
                        setSearch(event.nativeEvent.text)
                    }}
                    onSubmitEditing={() => applySearch(search)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        marginTop: 60,
        height: 40,
    },
    filterContainer: {
        backgroundColor: '#75604D',
        height: '100%',
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        height: '100%',
        marginRight: 20,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    searchIcon: {
        marginHorizontal: 10,
        paddingLeft: 10,
    },
    searchInput: {
        width: '100%',
        marginHorizontal: 5,
    },
});