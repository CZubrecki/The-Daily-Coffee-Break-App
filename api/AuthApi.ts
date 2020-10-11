import AsyncStorage from "@react-native-community/async-storage";
import { AuthResponse } from "../Models/Auth";

const BASE_URL = 'http://35.182.216.111:8080';
const GET = 'GET';
const POST = 'POST';
const TOKEN = 'token';

const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export async function authLogin(email: string, password: string): Promise<AuthResponse> {
    return await fetch(`${BASE_URL}/auth/login`, {
        method: POST,
        headers: HEADERS,
        body: generateBody(email, password),
    }).then((response) => response.json())
        .then(async (responseJson: any) => {
            if (responseJson.message) {
                throw (responseJson.message);
            }
            if (responseJson && responseJson.user?.token) {
                try {
                    await AsyncStorage.setItem(TOKEN, responseJson.user.token);
                    return responseJson;
                } catch (error) {
                    console.log(error);
                }
            }
        });
}

export async function authSignUp(email: string, password: string): Promise<AuthResponse> {
    return await fetch('http://35.182.216.111:8080/auth/', {
        method: POST,
        headers: HEADERS,
        body: generateBody(email, password),
    }).then((response) => response.json())
        .then(async (responseJson: any) => {
            if (responseJson && responseJson.user?.token) {
                try {
                    await AsyncStorage.setItem(TOKEN, responseJson.user.token);
                    return responseJson;
                } catch (error) {
                    console.log(error);
                }
            }
        });
}

function generateBody(email: string, password: string): string {
    return JSON.stringify({
        email: email,
        password: password,
    });
}