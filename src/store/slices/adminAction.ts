import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';

interface Headers extends AxiosHeaders {
    authorization?: string;
    'Content-Type': 'application/json';
}

// Admin Login Module
export const LoginForAdmin = createAsyncThunk(
    'astromind/LoginForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

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

export const ValitateOtpForAdmin = createAsyncThunk(
    'astromind/ValitateOtpForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + val?.token,
        });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/validateOTP`, val?.otp,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);


// Admin Profile Module

export const GetAdminProfile = createAsyncThunk(
    'astromind/GetAdminProfile',
    async (val: any, { rejectWithValue }) => {
        const headers = new AxiosHeaders({
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + val,
        });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getSingleAdminUser`, { headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error);
        }
    },
);

export const UpdateAdminProfile = createAsyncThunk(
    'page/UpdateAdminProfile',
    async (val: any, { rejectWithValue }) => {
        const headers = {
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/updateAdmin`, val.updateData,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Admin Etablissement Module
export const AddEtablissementForAdmin = createAsyncThunk(
    'lindicateur/AddEtablissementForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/addCompanyProfile`, val?.data,
                { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllEtablissementListForAdmin = createAsyncThunk(
    'lindicateur/GetAllEtablissementListForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfile?search=${val?.search}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfile?alphabetOrder=${val?.sort}&page=${val?.page}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfile?page=${val?.page}`
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

export const GetEtablissementForAdmin = createAsyncThunk(
    'lindicateur/GetEtablissementForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getSingleCompanyProfile/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllEtablissementApprovalForAdmin = createAsyncThunk(
    'lindicateur/GetAllEtablissementApprovalForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.search && val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUnApproval?search=${val?.search}&isApproved=false&alphabetOrder=${val?.sort}&page=${val?.page}&limit=${val?.pageLimit}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUnApproval?search=${val?.search}&isApproved=false&page=${val?.page}&limit=${val?.pageLimit}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUnApproval?&isApproved=false&alphabetOrder=${val?.sort}&page=${val?.page}&limit=${val?.pageLimit}`
                    , { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyProfileUnApproval?isApproved=false&alphabetOrder=ASC&page=${val?.page}&limit=${val?.pageLimit}`
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

export const UpdateEtablissementForAdmin = createAsyncThunk(
    'lindicateur/UpdateEtablissementForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/updateCompanyProfile`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const DeleteEtablissementForAdmin = createAsyncThunk(
    'lindicateur/DeleteEtablissementForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/deleteCompanyProfile/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const ApprovedOrUnApprovalEtablissementForAdmin = createAsyncThunk(
    'lindicateur/ApprovedOrUnApprovalEtablissementForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/assignCompanyApproval`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Admin Publicites Module
export const GetAllPublicitesListForAdmin = createAsyncThunk(
    'lindicateur/GetAllPublicitesListForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.search && val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllAds?search=${val?.search}&alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllAds?search=${val?.search}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllAds?alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllAds`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const AddPublicitesForAdmin = createAsyncThunk(
    'lindicateur/AddPublicitesForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/addAds`, val?.publicitesData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetPublicitesForAdmin = createAsyncThunk(
    'lindicateur/GetPublicitesForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getSingleAds/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const UpdatePublicitesForAdmin = createAsyncThunk(
    'lindicateur/UpdatePublicitesForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/updateAds`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const DeletePublicitesForAdmin = createAsyncThunk(
    'lindicateur/DeletePublicitesForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/deleteAds/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const PublishPublicitesForAdmin = createAsyncThunk(
    'lindicateur/PublishPublicitesForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/publishAds`, val?.publishData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Admin Banners Module
export const GetAllBannerListForAdmin = createAsyncThunk(
    'lindicateur/GetAllBannerListForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.search && val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllBanner?search=${val?.search}&alphabetOrder=${val?.sort}&page=${val?.page}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllBanner?search=${val?.search}&page=${val?.page}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllBanner?alphabetOrder=${val?.sort}&page=${val?.page}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getAllBanner?page=${val?.page}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const AddBannersForAdmin = createAsyncThunk(
    'lindicateur/AddBannersForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/addBanner`, val?.bannerData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetBannersForAdmin = createAsyncThunk(
    'lindicateur/GetBannersForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/getSingleBanner/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const UpdateBannersForAdmin = createAsyncThunk(
    'lindicateur/UpdateBannersForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/updateBanner`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const DeleteBannersForAdmin = createAsyncThunk(
    'lindicateur/DeleteBannersForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/deleteBanner/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const PublishBannersForAdmin = createAsyncThunk(
    'lindicateur/PublishBannersForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/publishBanners`, val?.publishData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// Admin Category Module
export const AddCategoryForAdmin = createAsyncThunk(
    'lindicateur/AddCategoryForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/addCategory`, val?.category
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllCategoryListForAdmin = createAsyncThunk(
    'lindicateur/GetAllCategoryListForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.search && val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?type=${val?.type}&search=${val?.search}&alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?type=${val?.type}&search=${val?.search}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?type=${val?.type}&alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?type=${val?.type}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const UpdateCategoryForAdmin = createAsyncThunk(
    'lindicateur/UpdateCategoryForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/updateCategory`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const DeleteCategoryForAdmin = createAsyncThunk(
    'lindicateur/DeleteCategoryForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/deleteCategory/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
