import AsyncStorage from "@react-native-community/async-storage";
import UpdateEmail from "../Components/ProfileSettings/UpdateEmail";
import { AuthResponse } from "../Models/Auth";

const BASE_URL = 'http://35.182.216.111:8080';
const DEV_URL = 'http://localhost:8080'
const GET = 'GET';
const POST = 'POST';
const TOKEN = 'token';
const EMAIL = 'email';
const ID = 'id';

const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export async function authLogin(email: string, password: string): Promise<AuthResponse> {
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
        method: POST,
        headers: HEADERS,
        body: generateBody(email, password),
    });

    const loginData = await loginResponse.json();

    if (loginData.message) {
        throw (loginData.message);
    }

    if (loginData.user?.token) {
        await AsyncStorage.setItem(TOKEN, loginData.user?.token);
        await AsyncStorage.setItem(EMAIL, loginData.user?.email);
        await AsyncStorage.setItem(ID, loginData.user?.id);
    }
    return loginData;
}

export async function authSignUp(email: string, password: string): Promise<AuthResponse> {
    const signUpResponse = await fetch(`${BASE_URL}/auth/`, {
        method: POST,
        headers: HEADERS,
        body: generateBody(email, password),
    })

    const signUpData = await signUpResponse.json();

    if (signUpData.message) {
        throw (signUpData.message);
    }

    if (signUpData.user?.token) {
        await AsyncStorage.setItem(TOKEN, signUpData.user?.token);
    }
    return signUpData;
}

export async function updateEmail(email: string, updatedEmail: string, password: string): Promise<any> {
    const updateEmailResponse = await fetch(`${BASE_URL}/auth/update-email`, {
        method: POST,
        headers: HEADERS,
        body: {
            email,
            updatedEmail,
            password
        }
    });

    const updateEmail = await updateEmailResponse.json();

    if (updateEmail.message) {
        throw (updateEmail.message);
    }
    return updateEmail;
}

function generateBody(email: string, password: string): string {
    return JSON.stringify({
        email: email,
        password: password,
    });
}