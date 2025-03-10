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
            authorization: 'Bearer ' + val?.token,
        });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getUser/${val?.userId}`, { headers });
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
                `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/updateUser`, val.updateData,
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileCustomer?search=${val?.search}&alphabetOrder=${val?.sort}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileCustomer?search=${val?.search}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileCustomer?alphabetOrder=${val?.sort}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileCustomer?page=${val?.page}`
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

export const GetAllEstablishmentProfileSearch = createAsyncThunk(
    'lindicateur/GetAllEstablishmentProfileSearch',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        try {
            if (val?.search != "companyName" && val?.search != null && val?.categoryName != "categoryName" && val?.categoryName != null && val?.city != "locationName" && val?.city != null) {
                console.log("testing");

                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUsersSearch?search=${val?.search}&categoryName=${val?.categoryName}&city=${val?.city}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.city != "locationName" && val?.city != null && val?.categoryName != "categoryName" && val?.categoryName != null) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUsersSearch?categoryName=${val?.categoryName}&city=${val?.city}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search != "companyName" && val?.search != null) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUsersSearch?search=${val?.search}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Admin Publicites Module
export const GetAllPublicitesListForCustomer = createAsyncThunk(
    'lindicateur/GetAllPublicitesListForCustomer',
    async (val: any, { rejectWithValue }) => {
        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.search && val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getConnectedUserAdsOnly?search=${val?.search}&alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getConnectedUserAdsOnly?search=${val?.search}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getConnectedUserAdsOnly?alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getConnectedUserAdsOnly`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);


export const GetAllEstablishmentPhoneNumberSearch = createAsyncThunk(
    'lindicateur/GetAllEstablishmentPhoneNumberSearch',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUsersSearchPhoneNumber?phoneNumber=${val?.phoneNumber}`);
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllPublicitesList = createAsyncThunk(
    'lindicateur/GetAllPublicitesList',
    async (val: any, { rejectWithValue }) => {
        try {
            if (val?.search != "companyName" && val?.search != null && val?.categoryName != "categoryName" && val?.categoryName != null && val?.city != "locationName" && val?.city != null) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllAdsCustomer?categoryName=${val?.categoryName}&departmentCode=${val?.city}&companyName=${val?.search}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.categoryName != "categoryName" && val?.categoryName != null && val?.city != "locationName" && val?.city != null) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllAdsCustomer?categoryName=${val?.categoryName}&departmentCode=${val?.city}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search != "companyName" && val?.search != null) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllAdsCustomer?companyName=${val?.search}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllPublicitesPhoneNumberSearch = createAsyncThunk(
    'lindicateur/GetAllPublicitesPhoneNumberSearch',
    async (val: any, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllAdsCustomerPhoneNumber?phoneNumber=${val?.phoneNumber}`);
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllBannerList = createAsyncThunk(
    'lindicateur/GetAllBannerList',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllBannerCustomer`);
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllCategoryList = createAsyncThunk(
    'lindicateur/GetAllCategoryList',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategoryCustomers?type=${val?.type}`);
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllCity = createAsyncThunk(
    'lindicateur/GetAllCity',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        try {
            if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllFranchState?type=${val?.type}&stateName=${val?.search}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllFranchState?type=${val?.type}&stateName=${val?.search}`);
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetPublicitiesData = createAsyncThunk(
    'lindicateur/GetPublicitiesData',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getSingleAdsPage/${val?.id}`);
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
