import { faChevronLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as _ from 'lodash';
import React, { useLayoutEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function FilterPage({ navigation, route }: any) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [rating, setRating] = useState<any>();
    const [weightInFilter, setWeightInFilter] = useState<number[]>([0, 50]);
    const [weightOutFilter, setWeightOutFilter] = useState<number[]>([0, 100]);
    const [extractionFilter, setExtractionFilter] = useState<number[]>([0, 100]);
    const submitFilters = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={onBackPressed}>
                    <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: '#E6DDC5' }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={resetFilters}>
                    <Text style={{ color: '#E6DDC5', fontSize: 16 }}>Reset</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    const applyFilters = () => {
        submitFilters({
            rating,
            weightInFilter,
            weightOutFilter,
            extractionFilter,
        });
        navigation.goBack();
    }

    const resetFilters = async () => {
        setRating(undefined);
        setWeightInFilter([0, 50]);
        setWeightOutFilter([0, 100]);
        setExtractionFilter([0, 100]);
    }

    const onBackPressed = () => {
        resetFilters();
        if (_.isNil(rating)) {
            navigation.navigate('Home', {});
        }
    }


    const handleAdd = () => {
        if (_.isNil(rating)) {
            setRating(1);
        }
        if ((rating >= 0 && rating < 5)) {
            setRating(rating + 1);
        }
    }

    const handleSubtract = () => {
        if (_.isNil(rating)) {
            setRating(0);
        }
        if (rating && rating >= 0) {
            setRating(rating - 1);
        }
    }

    const weightInFilterValuesChange = (values: any) => setWeightInFilter(values);
    const weightOutFilterValuesChange = (values: any) => setWeightOutFilter(values);
    const extractionFilterValuesChange = (values: any) => setExtractionFilter(values);


    return (
        <View style={styles.container}>

            <View style={[styles.row, styles.ratingFilterRow]}>
                <View style={[styles.column, styles.ratingColumn]}>
                    <Text style={styles.label}>Rating</Text>
                </View>
                <View style={[styles.column]}>
                    <View style={[styles.row]}>
                        <View style={[styles.column, styles.buttonColumn]}>
                            <TouchableOpacity style={[styles.roundButton, { borderColor: (_.isNil(rating) || rating === 0) ? '#bdbdbd' : '#583A25' }]} onPress={handleSubtract} disabled={_.isNil(rating) || rating === 0}>
                                <FontAwesomeIcon icon={faMinus} style={{ color: (_.isNil(rating) || rating === 0) ? '#bdbdbd' : '#583A25' }}></FontAwesomeIcon>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.column, styles.buttonColumn]}>
                            <Text style={styles.ratingValue}>{rating ? rating : '-'}</Text>
                        </View>
                        <View style={[styles.column, styles.buttonColumn]}>
                            <TouchableOpacity style={[styles.roundButton, { borderColor: rating === 5 ? '#bdbdbd' : '#583A25' }]} onPress={handleAdd} disabled={rating === 5}>
                                <FontAwesomeIcon icon={faPlus} style={{ color: (rating === 5) ? '#bdbdbd' : '#583A25' }}></FontAwesomeIcon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.divider}></View>

            <View style={[styles.row]}>
                <View style={[styles.column, styles.filterColumn]}>
                    <View style={[styles.row, styles.labelRow]}>
                        <Text style={styles.label}>Weight In: {weightInFilter[0] + 'g' + ' - ' + weightInFilter[1] + 'g'}</Text>
                    </View>
                    <View style={[styles.row, styles.sliderRow]}>
                        <MultiSlider
                            selectedStyle={{
                                backgroundColor: '#583A25',
                            }}
                            values={[weightInFilter[0], weightInFilter[1]]}
                            sliderLength={250}
                            onValuesChange={weightInFilterValuesChange}
                            min={0}
                            max={50}
                            step={1}
                            allowOverlap
                            snapped
                        />
                    </View>
                </View>
            </View>

            <View style={styles.divider}></View>
            <View style={[styles.row]}>
                <View style={[styles.column, styles.filterColumn]}>
                    <View style={[styles.row, styles.labelRow]}>
                        <Text style={styles.label}>Weight Out: {weightOutFilter[0] + 'g' + ' - ' + weightOutFilter[1] + 'g'}</Text>
                    </View>
                    <View style={[styles.row, styles.sliderRow]}>
                        <MultiSlider
                            selectedStyle={{
                                backgroundColor: '#583A25',
                            }}
                            values={[weightOutFilter[0], weightOutFilter[1]]}
                            sliderLength={250}
                            onValuesChange={weightOutFilterValuesChange}
                            min={0}
                            max={50}
                            step={1}
                            allowOverlap
                            snapped
                        />
                    </View>
                </View>
            </View>

            <View style={styles.divider}></View>

            <View style={[styles.row]}>
                <View style={[styles.column, styles.filterColumn]}>
                    <View style={[styles.row, styles.labelRow]}>
                        <Text style={styles.label}>Extraction: {extractionFilter[0] + 's' + ' - ' + extractionFilter[1] + 's'}</Text>
                    </View>
                    <View style={[styles.row, styles.sliderRow]}>
                        <MultiSlider
                            selectedStyle={{
                                backgroundColor: '#583A25',
                            }}
                            values={[extractionFilter[0], extractionFilter[1]]}
                            sliderLength={250}
                            onValuesChange={extractionFilterValuesChange}
                            min={0}
                            max={50}
                            step={1}
                            allowOverlap
                            snapped
                        />
                    </View>
                </View>
            </View>

            <View style={styles.divider}></View>

            <View style={[styles.applyButton]}>
                <TouchableOpacity onPress={() => applyFilters()}>
                    <Text style={styles.label}>Apply Filters</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    divider: {
        borderBottomColor: '#bdbdbd',
        borderBottomWidth: 1.5,
        marginHorizontal: '5%',
    },
    ratingFilterRow: {
        width: '100%',
        justifyContent: 'space-between',
        padding: '7%',
    },
    ratingColumn: {
        justifyContent: 'center',
    },
    buttonColumn: {
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    roundButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingValue: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 28,
        color: '#583A25',
    },
    label: {
        fontSize: 22,
        fontFamily: 'Helvetica',
        fontWeight: '300',
        color: '#583A25',
    },
    filterColumn: {
        width: '100%',
        height: 150,
        paddingHorizontal: '5%',
    },
    labelRow: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 75,
    },
    sliderRow: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
    },
    applyButton: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 50
    },
});