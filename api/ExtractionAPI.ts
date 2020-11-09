import AsyncStorage from "@react-native-community/async-storage";
import { Extraction } from "../Models/Extraction";
import * as _ from 'lodash';

const BASE_URL = 'http://35.182.216.111:8080';
const DEV_URL = 'http://localhost:8080';
const EXTRACTION_LOGS = '/extraction-logs';
const UPDATE_EXTRACTION_LOG = '/update-extraction-log';
const GET = 'GET';
const POST = 'POST';

export async function getExtractionLogs(filters?: any): Promise<Extraction[]> {
    const headers = await getHeaders();
    if (_.isNil(headers)) {
        return [];
    }
    return await fetch(`${BASE_URL}${EXTRACTION_LOGS}?rating=${filters?.rating}&weightInFilter=${filters?.weightInFilter}&weightOutFilter=${filters?.weightOutFilter}&extractionFilter=${filters?.extractionFilter}`, {
        method: GET,
        headers,
    }).then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export async function getExtractionLogById(_id: string): Promise<Extraction> {
    const headers = await getHeaders();
    if (_.isNil(headers)) {
        return {} as Extraction;
    }
    return await fetch(`${BASE_URL}${EXTRACTION_LOGS}/${_id}`, {
        method: GET,
        headers,
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export async function updateExtractionLog(id: string, rating?: number, notes?: string): Promise<any> {
    const headers = await getHeaders();
    if (_.isNil(headers)) {
        return null;
    }
    const body = JSON.stringify({
        rating: rating,
        notes: notes,
    });
    return await fetch(`${BASE_URL}${EXTRACTION_LOGS}${UPDATE_EXTRACTION_LOG}/${id}`, {
        method: POST,
        headers,
        body
    }).then((response) => response).catch((error: any) => {
        console.log(error);
    });
}

export async function addExtraction(data: any) {
    const headers = await getHeaders();
    const body = JSON.stringify({
        weightIn: data.weightIn,
        weightOut: data.weightOut,
        extractionTime: data.extractionTime?.toString(),
        grindSize: data.grindSize,
        beans: data.beans,
        shotTemperature: data.shotTemperature,
    });

    return await fetch(`${BASE_URL}${EXTRACTION_LOGS}/add-extraction-log`, {
        method: POST,
        headers,
        body,
    }).catch((error: any) => {
        console.log(error);
    }).then((response) => response);
}

async function getHeaders(): Promise<any> {
    try {
        const token = await AsyncStorage.getItem('token');
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
    } catch (error) {
        console.log(error);
    }
    return null;
}