import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';

import { LoginForAdmin, ValitateOtpForAdmin, GetAdminProfile, UpdateAdminProfile } from '@/store/slices/adminAction';
import {
    GetAllEtablissementListForAdmin, GetEtablissementForAdmin, AddEtablissementForAdmin,
    UpdateEtablissementForAdmin, DeleteEtablissementForAdmin, GetAllEtablissementApprovalForAdmin
} from '@/store/slices/adminAction';
import { AddCategoryForAdmin, GetAllCategoryListForAdmin, UpdateCategoryForAdmin } from '@/store/slices/adminAction';
import { AddPublicitesForAdmin, GetAllPublicitesListForAdmin, GetPublicitesForAdmin, UpdatePublicitesForAdmin, DeletePublicitesForAdmin, PublishPublicitesForAdmin } from '@/store/slices/adminAction';

import { SignUpForCustomer, LoginForCustomer, GetCustomerProfile, UpdateCustomerProfile } from '@/store/slices/customerAction';
import { GetAllEtablissementListForCustomer } from '@/store/slices/customerAction';

interface Headers extends AxiosHeaders {
    authorization?: string;
    'Content-Type': 'application/json';
}


interface InitialState {
    Loading: boolean;
    success: string | any | null;
    errors: string | any | null;
    Admin: any | null;
    AdminEtabliselist: any | null;
    AdminEtablise: any | null;
    AdminUnapprovalEtabliselist: any | null;
    AdminCategoryList: any | null;
    AdminPublicitesList: any | null;
    AdminPublicites: any | null;
    Customer: any | null,
    CustomerEtabliselist: any | null;

}

// Initial state
const initialState: InitialState = {
    Loading: false,
    success: null,
    errors: null,
    Admin: null,
    AdminEtabliselist: null,
    AdminEtablise: null,
    AdminUnapprovalEtabliselist: null,
    AdminCategoryList: null,
    AdminPublicitesList: null,
    AdminPublicites: null,
    Customer: null,
    CustomerEtabliselist: null
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

    },
});

export const { errorMessage, successMessage, loadingStatus } = ReduxSlice.actions;
export default ReduxSlice.reducer;
