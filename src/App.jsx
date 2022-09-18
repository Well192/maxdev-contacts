import { Login } from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { Contacts } from "./components/Contacts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./features/auth/authSlice";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { RequiredAuth } from "./components/RequiredAuth";
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        dispatch(setUser(user));
    });

    return (
        <BrowserRouter>
            <ToastContainer autoClose={1500} />
            <Routes>
                <Route path="/maxdev-contacts" element={<Login />} />
                <Route
                    path="/maxdev-contacts/contacts"
                    element={<RequiredAuth><Contacts /></RequiredAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
