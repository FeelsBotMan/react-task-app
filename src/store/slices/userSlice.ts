import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: "",
    id: "",
    displayName: "",
    photoURL: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
        },
        clearUser: (state) => {
            state.email = "";
            state.id = "";
            state.displayName = "";
            state.photoURL = "";
        },
    },
})

export const userReducer = userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
