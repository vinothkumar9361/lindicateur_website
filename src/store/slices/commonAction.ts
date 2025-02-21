import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';

interface Headers extends AxiosHeaders {
    authorization?: string;
    'Content-Type': 'application/json';
}

interface LocationData {
    [key: string]: string;
}

export const GetIPAddress = createAsyncThunk<LocationData, void, { rejectValue: string }>(
    'astromind/GetIPAddress',
    async (_, { rejectWithValue }) => {
        try {
            // const headers: Headers = {
            //   'Content-Type': 'application/json',
            // };

            const headers = new AxiosHeaders({
                'Content-Type': 'application/json',
            });

            const response = await axios.get(`https://ipinfo.io/json?token=b585b8e9810566`, { headers })
            if (response?.status == 200 || response.status == 201) {
                const { data } = response
                return data;
            }
        } catch (error) {
            return rejectWithValue('');
        }
    }
)


export const UpdatePassword = createAsyncThunk(
    'page/UpdatePassword',
    async (val: any, { rejectWithValue }) => {
        const headers = {
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/password/changepassword`, val.updateData,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const ForgotPassword = createAsyncThunk(
    'page/ForgotPassword',
    async (val: any, { rejectWithValue }) => {
        const headers = {
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/password/forgotpassword`, val.updateData,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Image Upload
export const ImageUpload = createAsyncThunk(
    'astromind/ImageUpload',
    async (val: any, { rejectWithValue }) => {
        console.log(val);
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/uploadImage`, val.imageData,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                const { data } = response;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

//Multiple Image Upload
export const MultipleImageUpload = createAsyncThunk(
    'astromind/MultipleImageUpload',
    async (val: any, { rejectWithValue }) => {
        console.log(val);
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/photo/uploadPhotos`, val.photosData,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                const { data } = response;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Image Delete
export const ImageDelete = createAsyncThunk(
    'astromind/ImageDelete',
    async (val: any, { rejectWithValue }) => {
        console.log(val);
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/deleteImage/${val?.id}`,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                const { data } = response;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Image Upload
export const ContactUsForm = createAsyncThunk(
    'astromind/ContactUsForm',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/contact/createContact`, val.contactData);
            if (response.status === 200 || response.status === 201) {
                const { data } = response;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);