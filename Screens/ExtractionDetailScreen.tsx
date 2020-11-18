import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Modal, Alert, TextInput, KeyboardAvoidingView } from "react-native";
import { Extraction } from '../Models/Extraction';
import moment from 'moment';
import * as _ from 'lodash';
import { getExtractionLogById } from '../Api/ExtractionAPI';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faEdit } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Rating from '../Components/Rating';
import { useForm } from 'react-hook-form';
import { updateExtractionLog } from '../Api/ExtractionAPI';
import Header from '../Components/ExtractionDetails/Header';
import ExtractionDetails from '../Components/ExtractionDetails/ExtractionDetails';
import Notes from '../Components/ExtractionDetails/Notes';
import Overview from '../Components/ExtractionDetails/Overview';

function determineBrewName(extractionRatio: number): any {
    let espressoType = {
        title: '',
        body: '',
    };
    switch (true) {
        case (extractionRatio <= 1.5): {
            espressoType = {
                title: 'Ristretto (1:1 - 1:1.5):',
                body: 'A viscous with a heavy body, but lacking in clarity. This tighter brew ratio plays to the strengths of a darker-roasted, low-grown coffee that has chocolatey, caramel characteristics.'
            };
            break;
        }
        case (extractionRatio <= 2): {
            espressoType = {
                title: 'Normale (1:1.5 - 1:2):',
                body: 'The current norm in specialty coffee shops across the US, Europe and Australia trend toward a normale espresso range somewhere between a 1:1.5 or 1:2 ratio.'
            };
            break;
        }
        default: {
            espressoType = {
                title: 'Lungo (1:3 - 1:4):',
                body: 'By extending the brew ratio, the clarity of the coffee increases, body and viscosity decrease, and more individual notes of coffee become evident and easier to pick out',
            };
            break;
        }
    }
    return espressoType;
}

interface ExtractionDetailScreenProps {
    extraction: Extraction;
    onDismiss: () => void;
}

export default function ExtractionDetailScreen({ extraction, onDismiss }: ExtractionDetailScreenProps) {
    return (
        <>
            <Header {...{ close: onDismiss }} />
            <Overview {...{ beans: extraction.beans, extractionDate: extraction.extractionDate, rating: extraction.rating }} />
            <ExtractionDetails {...
                {
                    weightIn: extraction.weightIn,
                    weightOut: extraction.weightOut,
                    extractionTime: extraction.extractionTime,
                    grindSize: extraction.grindSize,
                    shotTemperature: extraction.shotTemperature,
                }}
            />
            <Notes />
        </>
    );
}