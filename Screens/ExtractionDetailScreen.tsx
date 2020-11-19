import React from 'react';
import { Extraction } from '../Models/Extraction';
import Header from '../Components/ExtractionDetails/Header';
import ExtractionDetails from '../Components/ExtractionDetails/ExtractionDetails';
import Notes from '../Components/ExtractionDetails/Notes';
import Overview from '../Components/ExtractionDetails/Overview';

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