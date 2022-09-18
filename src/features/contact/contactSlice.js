import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getContacts = createAsyncThunk(
    "get/getContacts",
    async (token) => {
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const response = await fetch(
                "https://hsmxcontacts.herokuapp.com/api/contact/get",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        tokenKey: `Bearer ${accessToken}`,
                    },
                }
            );

            return response.json();
        } catch (error) {}
    }
);

export const createContacts = createAsyncThunk(
    "create/createContacts",
    async ({ newContact, toast }) => {
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const response = await fetch(
                "https://hsmxcontacts.herokuapp.com/api/contact/create",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        tokenKey: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        first_name: newContact.name,
                        telf_number: newContact.phone,
                    }),
                }
            );
            toast.success("Created Successfully !!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return response.json();
        } catch (error) {}
    }
);
export const updateContacts = createAsyncThunk(
    "update/updateContacts",
    async ({ id, updateContact, toast }) => {
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const response = await fetch(
                "https://hsmxcontacts.herokuapp.com/api/contact/update",
                {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        tokenKey: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        id: id,
                        first_name: updateContact.name,
                        telf_number: updateContact.phone,
                    }),
                }
            );

            const data = response.json();
            toast.info("Updated Successfully !!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            if (data)
                return {
                    _id: id,
                    first_name: updateContact.name,
                    telf_number: updateContact.phone,
                };
        } catch (error) {}
    }
);
export const deleteContacts = createAsyncThunk(
    "delete/deleteContacts",
    async ({ id, toast }) => {
        try {
            const { accessToken } = JSON.parse(localStorage.getItem("user"));
            const response = await fetch(
                "https://hsmxcontacts.herokuapp.com/api/contact/delete",
                {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        tokenKey: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        id: id,
                    }),
                }
            );
            toast.info("Deleted Successfully !!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            const data = response.json();
            if (data) return id;
        } catch (error) {}
    }
);

export const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        loading: false,
        contacts: [],
    },
    reducers: {
        resetContacts: (state, action) => {
            localStorage.clear();
            state.contacts = [];
        },
    },
    extraReducers: {
        [getContacts.pending]: (state, action) => {
            state.loading = true;
        },
        [getContacts.fulfilled]: (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
        },
        [getContacts.rejected]: (state, action) => {
            state.loading = false;
        },
        [createContacts.pending]: (state, action) => {
            state.loading = true;
        },
        [createContacts.fulfilled]: (state, action) => {
            state.loading = false;
            state.contacts = [...state.contacts, action.payload];
        },
        [createContacts.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateContacts.pending]: (state, action) => {
            state.loading = true;
        },
        [updateContacts.fulfilled]: (state, action) => {
            state.loading = false;
            const findContact = state.contacts.find(
                (contact) => contact._id == action.payload._id
            );
            state.contacts.splice(
                state.contacts.indexOf(findContact),
                1,
                action.payload
            );
        },
        [updateContacts.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteContacts.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteContacts.fulfilled]: (state, action) => {
            state.loading = false;
            const findContact = state.contacts.find(
                (contact) => contact._id == action.payload
            );
            state.contacts.splice(state.contacts.indexOf(findContact), 1);
        },
        [deleteContacts.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});
export const { resetContacts } = contactSlice.actions;
export default contactSlice.reducer;
