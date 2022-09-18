import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import {
    deleteContacts,
    updateContacts,
} from "../features/contact/contactSlice";
export const ContactCard = ({ contact, id }) => {
    const [modalShow, setModalShow] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateContact, setUpdateContact] = useState({
        name: " ",
        phone: " ",
    });
    const dispatch = useDispatch();

    const hadleUpdateOrDelete = ({ id, isUpdate }) => {
        if (isUpdate) {
            dispatch(updateContacts({id,updateContact,toast}))
            setModalShow(false);
        } else {
            dispatch(deleteContacts({id,toast}));
            setModalShow(false);
        }
    };

    const handleChange = (e) => {
        setUpdateContact({...updateContact, [e.target.name]: e.target.value})
    };

    const handleShowModal = (isUpdate) => {
        setIsUpdate(isUpdate);
        setModalShow(true);
    };
    const handleCloseModal = () => {
        setModalShow(false);
    };

    useEffect(()=>{
        setUpdateContact({
            name: contact.first_name,
            phone: contact.telf_number
        })
    },[ ])

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{contact?.first_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {contact?.telf_number}
                    </h6>

                    <div className="container text-center">
                        <div className="row">
                            <div className="col-md-6 ms-auto">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    style={{
                                        color: "white",
                                        marginBottom: "5px",
                                    }}
                                    onClick={() => handleShowModal(true)}
                                >
                                    <UpdateOutlinedIcon />
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    style={{ color: "white" }}
                                    onClick={() => handleShowModal(false)}
                                >
                                    <DeleteOutlineOutlinedIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={modalShow}
                onHide={handleCloseModal}
                animation={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isUpdate
                            ? "Quieres actualizar?!..."
                            : "Do you want to delete?"}{" "}
                    </Modal.Title>
                </Modal.Header>
                {isUpdate ? (
                    <Modal.Body>
                        <form className="container text-center">
                            <FormControl
                                sx={{ m: 1, width: "30ch" }}
                                variant="outlined"
                            >
                                <InputLabel
                                    htmlFor="outlined-start-adornment"
                                    color="success"
                                >
                                    Name
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-start-adornment"
                                    type="email"
                                    label="Name"
                                    name="name"
                                    autoFocus={true}
                                    color="success"
                                    value={updateContact.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl
                                sx={{ m: 1, width: "30ch" }}
                                variant="outlined"
                            >
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
                                    label="Phone"
                                    value={updateContact.phone}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </form>
                    </Modal.Body>
                ) : null}
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{ color: "white" }}
                        onClick={handleCloseModal}
                    >
                        {isUpdate ? "Cancel" : "No"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-info"
                        style={{ color: "white" }}
                        onClick={() => hadleUpdateOrDelete({ id, isUpdate })}
                    >
                        {isUpdate ? "Update" : "Yes"}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
