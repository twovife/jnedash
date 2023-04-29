import Modal from "@/Components/Modal";
import React from "react";
import { ImCheckmark, ImInfo, ImWarning } from "react-icons/im";

const ModalAlert = ({ alertParams, onClose }) => {
    const { show, textAlert, typeAlert } = alertParams;
    let icons = "";
    if (typeAlert == "warning") {
        icons = (
            <ImWarning
                className="mx-auto text-7xl my-5 text-yellow-500"
                onClick={onClose}
            />
        );
    } else if (typeAlert == "danger") {
        icons = (
            <ImWarning
                className="mx-auto text-7xl my-5 text-red-500"
                onClick={onClose}
            />
        );
    } else if (typeAlert == "info") {
        icons = (
            <ImInfo
                className="mx-auto text-7xl my-5 text-blue-500"
                onClick={onClose}
            />
        );
    } else if (typeAlert == "success") {
        icons = (
            <ImCheckmark
                className="mx-auto text-7xl my-5 text-green-500"
                onClick={onClose}
            />
        );
    }
    return (
        <Modal show={show} maxWidth={"md"} onClose={onClose}>
            <div className="p-6 text-center">
                <p className={`text-3xl tracking-wider font-semibold`}>
                    {textAlert}
                </p>
                {icons}
            </div>
        </Modal>
    );
};

export default ModalAlert;
