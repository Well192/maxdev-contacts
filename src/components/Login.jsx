import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register, setLogin } from "../features/auth/authSlice";
import Typed from "typed.js";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import portada from "../assets/portada_contacts.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resetContacts } from "../features/contact/contactSlice";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { toast } from "react-toastify";
export const Login = () => {
    const [loginValue, setLoginValue] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const [isRegister, setIsRegister] = useState(false);
    const el = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Contacts", "Notes"],
            startDelay: 300,
            typeSpeed: 200,
            backSpeed: 80,
            backDelay: 50,
            smartBackspace: true,
            loop: true,
            showCursor: true,
        });
        return () => {
            typed.destroy();
        };
    }, []);
    const handleClickShowPassword = () => {
        setLoginValue({
            ...loginValue,
            showPassword: !loginValue.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const emailRegex = /\S+@\S+\.\S+/;
    const handleRegister = () => setIsRegister(true);
    const handleLogin = () => setIsRegister(false);
    const handleSubmit = (e) => {
        if (loginValue.email && loginValue.password) {
            if (!isRegister) {
                if (emailRegex.test(loginValue.email)) {
                    e.preventDefault();
                    dispatch(setLogin());
                    dispatch(resetContacts());
                    dispatch(login({ loginValue, navigate, toast }));
                } else {
                    toast.error("Email invalid !!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            } else {
                if (emailRegex.test(loginValue.email)) {
                    e.preventDefault();
                    dispatch(setLogin());
                    dispatch(resetContacts());
                    dispatch(register({ loginValue, navigate, toast }));
                } else {
                    toast.error("Email invalid !!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            }
        } else {
            toast.info("Por favor completar los campos", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <div
            className="container text-center"
            style={{ padding: "50px", height: "100vh" }}
        >
            <div className="d-sm-flex align-items-center justify-content-between">
                <div className="">
                    <h1>
                        Welcome to your <br />
                        <span className="text-danger" ref={el}></span>
                    </h1>
                    <img
                        src={portada}
                        className="img-fluid w-50 d-none d-sm-block"
                    />
                </div>
                {!isRegister ? (
                    <div className="">
                        <form className="container text-center">
                            <h3>User Login</h3>
                            <div>
                                <FormControl
                                    sx={{ m: 1, width: "30ch" }}
                                    variant="outlined"
                                >
                                    <InputLabel
                                        htmlFor="outlined-start-adornment"
                                        color="success"
                                    >
                                        Email
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-start-adornment"
                                        type="email"
                                        label="Email"
                                        name="email"
                                        required={true}
                                        onChange={handleChange}
                                        color="success"
                                        autoFocus={true}
                                    />
                                </FormControl>
                            </div>
                            <div style={{ marginBottom: "5px" }}>
                                <FormControl
                                    sx={{ m: 1, width: "30ch" }}
                                    variant="outlined"
                                >
                                    <InputLabel
                                        htmlFor="outlined-adornment-password"
                                        color="success"
                                    >
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            loginValue.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        required={true}
                                        value={loginValue.password}
                                        color="success"
                                        name="password"
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {loginValue.showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                            <div className="container text-center">
                                <div
                                    className=""
                                    style={{ marginBottom: "10px" }}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={handleSubmit}
                                        style={{ color: "whitesmoke" }}
                                    >
                                        Login
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        style={{ color: "whitesmoke" }}
                                        onClick={handleRegister}
                                    >
                                        Don't you have an account yet?
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="">
                        <form className="container text-center">
                            <h3>Sign Up</h3>
                            <div>
                                <FormControl
                                    sx={{ m: 1, width: "30ch" }}
                                    variant="outlined"
                                >
                                    <InputLabel
                                        htmlFor="outlined-start-adornment"
                                        color="success"
                                    >
                                        Email
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-start-adornment"
                                        type="email"
                                        label="Email"
                                        name="email"
                                        onChange={handleChange}
                                        color="success"
                                        autoFocus={true}
                                    />
                                </FormControl>
                            </div>
                            <div style={{ marginBottom: "5px" }}>
                                <FormControl
                                    sx={{ m: 1, width: "30ch" }}
                                    variant="outlined"
                                >
                                    <InputLabel
                                        htmlFor="outlined-adornment-password"
                                        color="success"
                                    >
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            loginValue.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={loginValue.password}
                                        color="success"
                                        name="password"
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {loginValue.showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                            <div className="container text-center">
                                <div
                                    className=""
                                    style={{ marginBottom: "10px" }}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={handleSubmit}
                                        style={{ color: "whitesmoke" }}
                                    >
                                        Create Account
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        style={{ color: "whitesmoke" }}
                                        onClick={handleLogin}
                                    >
                                        Already I have an account!
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <footer
                className="fixed-bottom bg-dark"
                style={{ padding: "5px", color: "whitesmoke" }}
            >
                {" "}
                <CopyrightIcon /> Developed by MaxDev
            </footer>
        </div>
    );
};
