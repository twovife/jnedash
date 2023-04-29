import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import { ImWarning } from "react-icons/im";

const AlertModal = ({
    show,
    onClose,
    textAlert = null,
    typeAlert = "success",
}) => {
    return (
        <Modal show={show} maxWidth={"md"} onClose={onClose}>
            <div className="p-6 text-center">
                <p className="text-3xl tracking-wider font-semibold">
                    {textAlert}
                </p>
                <ImWarning
                    className="mx-auto text-7xl my-5 text-red-500"
                    onClick={onClose}
                />
            </div>
        </Modal>
    );
};

export default AlertModal;
