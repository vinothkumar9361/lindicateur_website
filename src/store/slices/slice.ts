import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';

import { LoginForAdmin, ValitateOtpForAdmin, GetAdminProfile, UpdateAdminProfile } from '@/store/slices/adminAction';
import {
    GetAllEtablissementListForAdmin, GetEtablissementForAdmin, AddEtablissementForAdmin,
    UpdateEtablissementForAdmin, DeleteEtablissementForAdmin, GetAllEtablissementApprovalForAdmin,
    ApprovedOrUnApprovalEtablissementForAdmin, GetAllEstablishmentProfileName
} from '@/store/slices/adminAction';
import { AddCategoryForAdmin, GetAllCategoryListForAdmin, UpdateCategoryForAdmin, DeleteCategoryForAdmin } from '@/store/slices/adminAction';
import { AddPublicitesForAdmin, GetAllPublicitesListForAdmin, GetPublicitesForAdmin, UpdatePublicitesForAdmin, DeletePublicitesForAdmin, PublishPublicitesForAdmin } from '@/store/slices/adminAction';
import { AddBannersForAdmin, GetAllBannerListForAdmin, GetBannersForAdmin, UpdateBannersForAdmin, DeleteBannersForAdmin, PublishBannersForAdmin } from '@/store/slices/adminAction';

import { SignUpForCustomer, LoginForCustomer, GetCustomerProfile, UpdateCustomerProfile } from '@/store/slices/customerAction';
import { GetAllEtablissementListForCustomer } from '@/store/slices/customerAction';
import { GetAllEstablishmentProfileSearch, GetAllEstablishmentPhoneNumberSearch, GetAllPublicitesList, GetAllPublicitesPhoneNumberSearch, GetAllBannerList, GetAllCategoryList, GetAllCity } from '@/store/slices/customerAction';

import { GetIPAddress, ForgotPassword, ImageUpload, ImageDelete, UpdatePassword, ContactUsForm } from '@/store/slices/commonAction';

interface Headers extends AxiosHeaders {
    authorization?: string;
    'Content-Type': 'application/json';
}

interface LocationData {
    [key: string]: string;
}

interface InitialState {
    Loading: boolean;
    success: string | any | null;
    errors: string | any | null;
    IpAddress: LocationData | null;
    Admin: any | null;
    AdminEtabliselist: any | null;
    AdminEtablise: any | null;
    AdminUnapprovalEtabliselist: any | null;
    AdminCategoryList: any | null;
    AdminCompanyProfilesName: any | null;
    AdminPublicitesList: any | null;
    AdminPublicites: any | null;
    AdminBannersList: any | null;
    AdminBanners: any | null;
    Customer: any | null,
    CustomerEtabliselist: any | null;
    CustomerResearchData: any | null;
    CustomerBannerList: any | null;
    CustomerPublicitesList: any | null;
    CustomerCategoryList: any | null;
    CustomerCityList: any | null;

}

// Initial state
const initialState: InitialState = {
    Loading: false,
    success: null,
    errors: null,
    IpAddress: null,
    Admin: null,
    AdminEtabliselist: null,
    AdminEtablise: null,
    AdminUnapprovalEtabliselist: null,
    AdminCategoryList: null,
    AdminCompanyProfilesName: null,
    AdminPublicitesList: null,
    AdminPublicites: null,
    AdminBannersList: null,
    AdminBanners: null,
    Customer: null,
    CustomerEtabliselist: null,
    CustomerResearchData: null,
    CustomerBannerList: null,
    CustomerPublicitesList: null,
    CustomerCategoryList: null,
    CustomerCityList: null
};

// Create the slice
const ReduxSlice = createSlice({
    name: 'lindicateur',
    initialState,
    reducers: {
        errorMessage: (state, action) => {
            state.errors = action.payload.errors;
        },
        successMessage: (state, action) => {
            state.success = action.payload.successess;
        },
        loadingStatus: (state, action) => {
            state.Loading = action.payload.loadingStatus;
        },
    },
    extraReducers: (builder) => {
        builder
            // IP Address
            .addCase(GetIPAddress.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetIPAddress.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.IpAddress = action.payload;
            })
            .addCase(GetIPAddress.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.IpAddress = null;
            })
            // Image Upload 
            .addCase(ImageUpload.pending, (state) => {
                state.Loading = true;
            })
            .addCase(ImageUpload.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(ImageUpload.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Image Upload 
            .addCase(ImageDelete.pending, (state) => {
                state.Loading = true;
            })
            .addCase(ImageDelete.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(ImageDelete.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Update Password 
            .addCase(UpdatePassword.pending, (state) => {
                state.Loading = true;
            })
            .addCase(UpdatePassword.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(UpdatePassword.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Forgot Password 
            .addCase(ForgotPassword.pending, (state) => {
                state.Loading = true;
            })
            .addCase(ForgotPassword.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(ForgotPassword.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Contact Us
            .addCase(ContactUsForm.pending, (state) => {
                state.Loading = true;
            })
            .addCase(ContactUsForm.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(ContactUsForm.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Admin Module
            // Login For Admin
            .addCase(LoginForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(LoginForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(LoginForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Otp Validation
            .addCase(ValitateOtpForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(ValitateOtpForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(ValitateOtpForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get Admin Profile
            .addCase(GetAdminProfile.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAdminProfile.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.Admin = action.payload;
            })
            .addCase(GetAdminProfile.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.Admin = null;
            })

            // Update Admin Profile
            .addCase(UpdateAdminProfile.pending, (state) => {
                state.Loading = true;
            })
            .addCase(UpdateAdminProfile.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(UpdateAdminProfile.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Add Establishment for admin
            .addCase(AddEtablissementForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(AddEtablissementForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(AddEtablissementForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get All Establishment List for admin
            .addCase(GetAllEtablissementListForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllEtablissementListForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminEtabliselist = action.payload;
            })
            .addCase(GetAllEtablissementListForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminEtabliselist = null;
            })

            // Get Establishment for admin
            .addCase(GetEtablissementForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetEtablissementForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminEtablise = action.payload;
            })
            .addCase(GetEtablissementForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminEtablise = null;
            })

            // Update Establishment for admin
            .addCase(UpdateEtablissementForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(UpdateEtablissementForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(UpdateEtablissementForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Delete Establishment for admin
            .addCase(DeleteEtablissementForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(DeleteEtablissementForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(DeleteEtablissementForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get All Unapproval Establishment List for admin
            .addCase(GetAllEtablissementApprovalForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllEtablissementApprovalForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminUnapprovalEtabliselist = action.payload;
            })
            .addCase(GetAllEtablissementApprovalForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminUnapprovalEtabliselist = null;
            })

            // Approved Or Unapproval Establishment for admin
            .addCase(ApprovedOrUnApprovalEtablissementForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(ApprovedOrUnApprovalEtablissementForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(ApprovedOrUnApprovalEtablissementForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get All Establishment Profile Name
            .addCase(GetAllEstablishmentProfileName.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllEstablishmentProfileName.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminCompanyProfilesName = action.payload;
            })
            .addCase(GetAllEstablishmentProfileName.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminUnapprovalEtabliselist = null;
            })

            // Add Category for admin
            .addCase(AddCategoryForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(AddCategoryForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(AddCategoryForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get All Category List for Admin
            .addCase(GetAllCategoryListForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllCategoryListForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminCategoryList = action.payload;
            })
            .addCase(GetAllCategoryListForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminCategoryList = null;
            })

            // Update Category for admin
            .addCase(UpdateCategoryForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(UpdateCategoryForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(UpdateCategoryForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Update Category for admin
            .addCase(DeleteCategoryForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(DeleteCategoryForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(DeleteCategoryForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Add Publicites for admin
            .addCase(AddPublicitesForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(AddPublicitesForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(AddPublicitesForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get All Publicites List for admin
            .addCase(GetAllPublicitesListForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllPublicitesListForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminPublicitesList = action.payload;
            })
            .addCase(GetAllPublicitesListForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminPublicitesList = null;
            })

            // Get Publicites for admin
            .addCase(GetPublicitesForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetPublicitesForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminPublicites = action.payload;
            })
            .addCase(GetPublicitesForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminPublicites = null;
            })

            // Update Publicites for admin
            .addCase(UpdatePublicitesForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(UpdatePublicitesForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(UpdatePublicitesForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Delete Publicites for admin
            .addCase(DeletePublicitesForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(DeletePublicitesForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(DeletePublicitesForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Publish Publicites for admin
            .addCase(PublishPublicitesForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(PublishPublicitesForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(PublishPublicitesForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Add Banners for admin
            .addCase(AddBannersForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(AddBannersForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(AddBannersForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get All Banner List for admin
            .addCase(GetAllBannerListForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllBannerListForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminBannersList = action.payload;
            })
            .addCase(GetAllBannerListForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminBanners = null;
            })

            // Get Banners for admin
            .addCase(GetBannersForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetBannersForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.AdminBanners = action.payload;
            })
            .addCase(GetBannersForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.AdminBanners = null;
            })

            // Update Banner for admin
            .addCase(UpdateBannersForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(UpdateBannersForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(UpdateBannersForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Delete Banner for admin
            .addCase(DeleteBannersForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(DeleteBannersForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(DeleteBannersForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Publish Banner for admin
            .addCase(PublishBannersForAdmin.pending, (state) => {
                state.Loading = true;
            })
            .addCase(PublishBannersForAdmin.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(PublishBannersForAdmin.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Customer Module
            // SignUp for Customer
            .addCase(SignUpForCustomer.pending, (state) => {
                state.Loading = true;
            })
            .addCase(SignUpForCustomer.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(SignUpForCustomer.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // LogIn for Customer
            .addCase(LoginForCustomer.pending, (state) => {
                state.Loading = true;
            })
            .addCase(LoginForCustomer.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(LoginForCustomer.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get Customer Profile
            .addCase(GetCustomerProfile.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetCustomerProfile.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.Customer = action.payload;
            })
            .addCase(GetCustomerProfile.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.Customer = null;
            })

            // Update Customer Profile
            .addCase(UpdateCustomerProfile.pending, (state) => {
                state.Loading = true;
            })
            .addCase(UpdateCustomerProfile.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.success = action.payload;
            })
            .addCase(UpdateCustomerProfile.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.success = null;
            })

            // Get All Establishment List for Customer
            .addCase(GetAllEtablissementListForCustomer.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllEtablissementListForCustomer.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerEtabliselist = action.payload;
            })
            .addCase(GetAllEtablissementListForCustomer.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerEtabliselist = null;
            })

            // Get All Establishment Profile Search
            .addCase(GetAllEstablishmentProfileSearch.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllEstablishmentProfileSearch.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerResearchData = action.payload;
            })
            .addCase(GetAllEstablishmentProfileSearch.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerResearchData = null;
            })

            // Get All Establishment Phone Number Search
            .addCase(GetAllEstablishmentPhoneNumberSearch.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllEstablishmentPhoneNumberSearch.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerResearchData = action.payload;
            })
            .addCase(GetAllEstablishmentPhoneNumberSearch.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerResearchData = null;
            })

            // Get All Publicites List
            .addCase(GetAllPublicitesList.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllPublicitesList.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerPublicitesList = action.payload;
            })
            .addCase(GetAllPublicitesList.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerPublicitesList = null;
            })

            // Get All Publicites Phone Number Search
            .addCase(GetAllPublicitesPhoneNumberSearch.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllPublicitesPhoneNumberSearch.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerPublicitesList = action.payload;
            })
            .addCase(GetAllPublicitesPhoneNumberSearch.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerPublicitesList = null;
            })

            // Get All Banners List
            .addCase(GetAllBannerList.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllBannerList.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerBannerList = action.payload;
            })
            .addCase(GetAllBannerList.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerBannerList = null;
            })

            // Get All Category List
            .addCase(GetAllCategoryList.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllCategoryList.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerCategoryList = action.payload;
            })
            .addCase(GetAllCategoryList.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerCategoryList = null;
            })

            // Get All City List
            .addCase(GetAllCity.pending, (state) => {
                state.Loading = true;
            })
            .addCase(GetAllCity.fulfilled, (state, action) => {
                state.Loading = false;
                state.errors = null;
                state.CustomerCityList = action.payload;
            })
            .addCase(GetAllCity.rejected, (state, action) => {
                state.errors = action.payload;
                state.Loading = false;
                state.CustomerCityList = null;
            })

    },
});

export const { errorMessage, successMessage, loadingStatus } = ReduxSlice.actions;
export default ReduxSlice.reducer;
