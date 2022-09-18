import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
export const RequiredAuth = ({children})=>{
    
    const { isLogin } = useSelector((state) => ({ ...state.auth }));
    
    const navigate = useNavigate()

    useEffect(()=>{

        if (!isLogin) return navigate("/");
    }, [ ])
    
    return children

}