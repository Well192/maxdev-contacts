import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createContacts, getContacts } from "../features/contact/contactSlice";
import { ContactCard } from "./ContactCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { setLogout } from "../features/auth/authSlice";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify"
export const Contacts = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { user, isLogin } = useSelector((state) => state.auth);
    const [modalShow, setModalShow] = useState(false);
    const [newContact, setNewContact] = useState({
        name:" ",
        phone:" ",
    })
    const { contacts } = useSelector((state) => state.contacts );

    useEffect(() => {
        dispatch(getContacts(user?.accessToken));
    }, [user]);

    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/maxdev-contacts/");
    };

    const handleShowModal = () => {
        setModalShow(true);
    };
    const handleCloseModal = () => {
        setModalShow(false);
    };

    const handleChange = (e) => {
        setNewContact({...newContact, [e.target.name]: e.target.value})
    };

    const handleCreateContact =()=>{
        dispatch(createContacts({newContact,toast}))
        setModalShow(false);
    }
 
    return (
        <>
            <nav
                className="navbar navbar-dark bg-dark"
                style={{ marginBottom: "20px" }}
            >
                <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">MaxDev</span>
                    
                    <span className="navbar-brand mb-0 h1 ms-auto">
                        <button
                            type="button"
                            className="btn btn-info"
                            style={{ marginRight: "10px", color: "white" }}
                            onClick={handleShowModal}
                        >
                            Crear
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </span>
                </div>
            </nav>

            <div className="container text-center">
                <h3 style={{ marginBottom: "20px" }}>
                    Welcome to your contacts {user?.email}
                </h3>
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {contacts?.map((contact) => (
                        <div className="col" key={contact._id}>
                            <div className="p-3 border bg-light">
                                <ContactCard contact={contact} id={contact._id}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal  */}

            <Modal
                show={modalShow}
                onHide={handleCloseModal}
                animation={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crea un contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="container text-center">
                <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                    <InputLabel
                        htmlFor="outlined-start-adornment"
                        color="success"
                    >
                        Name
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-start-adornment"
                        type="text"
                        label="Name"
                        name="name"
                        autoFocus={true}
                        onChange={handleChange}
                        color="success"
                        
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        color="success"
                    >
                        Phone
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        color="success"
                        name="phone"
                        type="number"
                        onChange={handleChange}
                        label="Phone"

                    />
                </FormControl>
         
            </form>
                </Modal.Body>
                <Modal.Footer>
                <button
                            type="button"
                            className="btn btn-danger"
                            style={{ color: "white" }}
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    <button
                            type="button"
                            className="btn btn-info"
                            style={{ color: "white" }}
                            onClick={handleCreateContact}
                        >
                            Save
                        </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
