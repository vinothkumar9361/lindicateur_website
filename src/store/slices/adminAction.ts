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

export const GetAllEstablishmentProfileName = createAsyncThunk(
    'lindicateur/GetAllEstablishmentProfileName',
    async (val: any, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/customer/getAllCompanyNames`);
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetEstablishmentProfileReport = createAsyncThunk(
    'lindicateur/GetEstablishmentProfileReport',
    async (val: any, { rejectWithValue }) => {
        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/export/exportCompanyProfile/${val?.id}`, { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const ImportEstablishmentProfile = createAsyncThunk(
    'lindicateur/ImportEstablishmentProfile',
    async (val: any, { rejectWithValue }) => {
        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'multipart/form-data',
        })

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/import/importCompanyProfile`, val.fileData, { headers: headers });
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?page=${val?.page}&type=${val?.type}&categoryName=${val?.search}&alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.search) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?page=${val?.page}&type=${val?.type}&categoryName=${val?.search}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else if (val?.sort) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?page=${val?.page}&type=${val?.type}&alphabetOrder=${val?.sort}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/gellAllCategory?page=${val?.page}&type=${val?.type}`, { headers: headers });
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

// CMS
export const UpdateLegalsOrCGVContent = createAsyncThunk(
    'lindicateur/UpdateLegalsOrCGVContent',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/updateLegalPage`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const UpdateBannerImage = createAsyncThunk(
    'lindicateur/UpdateBannerImage',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'multipart/form-data',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/updateBannerSection`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);


//Nos secteurs
export const AddSecteursForAdmin = createAsyncThunk(
    'lindicateur/AddSecteursForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'multipart/form-data',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/createServiceSection`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const GetAllSecteursListForAdmin = createAsyncThunk(
    'lindicateur/GetAllSecteursListForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            // authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            if (val?.type === "admin") {
                if (val?.search && val?.sort) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/getAllServiceSection?page=${val?.page}&type=${val?.type}&sectorTitle=${val?.search}&alphabetOrder=${val?.sort}`, { headers: headers });
                    if (response.status === 200 || response.status === 201) {
                        return response;
                    }
                }
                else if (val?.search) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/getAllServiceSection?page=${val?.page}&type=${val?.type}&sectorTitle=${val?.search}`, { headers: headers });
                    if (response.status === 200 || response.status === 201) {
                        return response;
                    }
                }
                else if (val?.sort) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/getAllServiceSection?page=${val?.page}&type=${val?.type}&alphabetOrder=${val?.sort}`, { headers: headers });
                    if (response.status === 200 || response.status === 201) {
                        return response;
                    }
                }
                else {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/getAllServiceSection?page=${val?.page}&type=${val?.type}`, { headers: headers });
                    if (response.status === 200 || response.status === 201) {
                        return response;
                    }
                }
            }
            else {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/getAllServiceSection?type=${val?.type}`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
            }


        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const UpdateSecteursForAdmin = createAsyncThunk(
    'lindicateur/UpdateSecteursForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/updateServiceSection`, val?.updateData
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const DeleteSecteursForAdmin = createAsyncThunk(
    'lindicateur/DeleteSecteursForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val?.token,
            'Content-Type': 'application/json',
        })
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/cms/deleteServiceSection/${val?.id}`
                , { headers: headers });
            if (response.status === 200 || response.status === 201) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);


// Department Code
export const GetAllDepartmentCodeForAdmin = createAsyncThunk(
    'lindicateur/GetAllDepartmentCodeForAdmin',
    async (val: any, { rejectWithValue }) => {
        console.log(val);

        const headers = new AxiosHeaders({
            authorization: 'Bearer ' + val.token,
            'Content-Type': 'application/json',
        })
        try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/departmentcode/getAllDepartmentCode?type=website`, { headers: headers });
                if (response.status === 200 || response.status === 201) {
                    return response;
                }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);