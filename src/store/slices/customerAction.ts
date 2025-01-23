import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';

interface Headers extends AxiosHeaders {
    authorization?: string;
    'Content-Type': 'application/json';
}

// Customer SignUp Module
export const SignUpForCustomer = createAsyncThunk(
    'astromind/SignUpForCustomer',
    async (val: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/registerUser`, val);
            if (response.status === 200 || response.status === 201) {
                const { data } = response;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Customer Login Module
export const LoginForCustomer = createAsyncThunk(
    'astromind/LoginForCustomer',
    async (val: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/`, val);
            if (response.status === 200 || response.status === 201) {
                const { data } = response;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Customer Profile Module

export const GetCustomerProfile = createAsyncThunk(
    'astromind/GetCustomerProfile',
    async (val: any, { rejectWithValue }) => {
        const headers = new AxiosHeaders({
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + val,
        });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getSingleUser`, { headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error);
        }
    },
);

export const UpdateCustomerProfile = createAsyncThunk(
    'page/UpdateCustomerProfile',
    async (val: any, { rejectWithValue }) => {
        const headers = {
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/updateUser`, val.userData,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Customer Etablissement Module
export const GetAllEtablissementListForCustomer = createAsyncThunk(
    'lindicateur/GetAllEtablissementListForCustomer',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.search && val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/gellAllCompanyProfileCustomer?search=${val?.search}&alphabetOrder=${val?.sort}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/gellAllCompanyProfileCustomer?search=${val?.search}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/gellAllCompanyProfileCustomer?alphabetOrder=${val?.sort}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/gellAllCompanyProfileCustomer?page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);


export const AddEtablissementForCustomer = createAsyncThunk(
    'lindicateur/AddEtablissementForCustomer',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/my-wallet-transactions/${val?.page}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);


// Contact Module
export const ContactUs = createAsyncThunk(
    'page/ContactUs',
    async (val: any, { rejectWithValue }) => {
        const headers = {
            authorization: val.token,
            'Content-Type': 'application/json',
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/edit-profile`, val.userData,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Search & List Module
