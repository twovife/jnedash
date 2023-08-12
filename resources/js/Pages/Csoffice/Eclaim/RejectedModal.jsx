import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function RejectedModal({ params, closeModal }) {
    const { show, id } = params;
    const { data, setData, put, processing, errors, clearErrors, reset } =
        useForm({
            reason: "",
        });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("csoffice.claim.rejected", id), {
            preserveScroll: true,
            onFinish: (visit) => {
                closedModal();
            },
        });
    };
    const closedModal = () => {
        closeModal();
        reset();
        clearErrors();
    };

    return (
        <Modal show={show} maxWidth={"md"} onClose={closedModal}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white text-center">
                    Form Penolakan Claim
                </h2>
                <div className="mt-4 flex flex-col lg:grid-cols-2 justify-center items-center gap-4">
                    <div className="w-full">
                        <InputLabel forInput={"reason"} value={"Reason"} />
                        <TextInput
                            className={"block w-full m-1"}
                            name={"reason"}
                            id={"reason"}
                            onChange={onHandleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <PrimaryButton
                        type="submit"
                        theme="warning"
                        disabled={processing}
                        // processing={processing}
                    >
                        Ya, Tolak claim ini
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
