import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const login = createAsyncThunk(
    "auth/login",
    async ({ loginValue, navigate, toast },{rejectWithValue}) => {
        try {
            const response = await fetch(
                "https://hsmxcontacts.herokuapp.com/api/user/auth/login",
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: loginValue.email,
                        password: loginValue.password,
                    }),
                }
            );
            const data = await response.json()
            if(data?.message) throw data
            navigate("/maxdev-contacts/contacts/");
            return data;
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            return rejectWithValue(error)
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ loginValue, navigate, toast },{rejectWithValue}) => {
        try {
            const response = await fetch(
                "https://hsmxcontacts.herokuapp.com/api/user/auth/registro",
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: loginValue.email,
                        password: loginValue.password,
                    }),
                }
            );
            const data = await response.json()
            if(data?.message) throw data
            toast.info("Account created Successfully !!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            navigate("/maxdev-contacts/contacts/");
            return response.json();
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            return rejectWithValue(error)
        }
    }
);
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false,
        isLogin: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLogin = true
        },
        setLogout: (state, action)=>{
            localStorage.clear()
            state.user = null
            state.isLogin = false
        },
        setLogin: (state, action)=>{
            state.isLogin = true
            
        }
        
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("user", JSON.stringify({ ...action.payload }));
            localStorage.setItem("logeado",JSON.stringify({logeado:true}))
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("user", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { setUser, setLogout,setLogin } = authSlice.actions;

export default authSlice.reducer;
