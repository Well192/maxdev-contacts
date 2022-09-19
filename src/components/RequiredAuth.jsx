import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const RequiredAuth = ({ children }) => {
   
    const isLogin = JSON.parse(localStorage.getItem("logeado"))

    const navigate = useNavigate();
 
    useEffect(() => {
        if (!isLogin?.logeado) return navigate("/maxdev-contacts/");
    }, [ ]);

    return children;
};
