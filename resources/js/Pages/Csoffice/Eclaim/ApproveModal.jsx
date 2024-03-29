import ComboBox from "@/Components/ComboBox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { FileInput } from "flowbite-react";
import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function ApproveModal({ params, closeModal }) {
    const { show, id } = params;

    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            claim_approved: "",
            reason: "",
            penyelesaian: "",
            pembebanan: "",
        });

    const { flash } = usePage().props;

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const onHandleImagesChange = (event) => {
        setData(event.target.name, event.target.files[0]);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        post(route("csoffice.claim.approved", id));
    };

    const closedModal = () => {
        closeModal();
        clearErrors();
        reset();
    };

    return (
        <Modal show={show} maxWidth={"md"} onClose={closedModal}>
            <form onSubmit={onSubmitForm} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white text-center">
                    Form Approval Claim
                </h2>

                {flash.message && (
                    <div className="bg-green-300 p-3 mt-4 rounded">
                        data berhasil diubah
                    </div>
                )}

                {errors.message && (
                    <div className="bg-rose-300 p-3 mt-4 rounded">
                        Terjadi Kesalahan, teliti atau refresh halaman dahulu
                    </div>
                )}

                <div className="mt-4 flex flex-col lg:grid-cols-2 justify-center items-center gap-4">
                    <div className="w-full">
                        <InputLabel
                            forInput={"claim_approved"}
                            value={"Approved Claim"}
                        />
                        <CurrencyInput
                            name={"claim_approved"}
                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-md shadow-sm mt-1 block w-full`}
                            id={"claim_approved"}
                            allowDecimals={false}
                            prefix="Rp. "
                            min={1}
                            required
                            onValueChange={onHandleCurencyChange}
                            placeholder={"Inputkan angka tanpa sparator"}
                        />
                        <InputError
                            message={errors.claim_approved}
                            className="mt-2"
                        />
                    </div>
                    <div className="w-full">
                        <InputLabel forInput={"reason"} value={"Reason"} />
                        <TextInput
                            type={"text"}
                            name={"reason"}
                            onChange={onHandleChange}
                            className="block w-full mt-1"
                        />
                        <InputError message={errors.reason} className="mt-2" />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            forInput={"penyelesaian"}
                            value={"Penyelesaian"}
                        />
                        <TextInput
                            type={"text"}
                            name={"penyelesaian"}
                            onChange={onHandleChange}
                            className="block w-full mt-1"
                        />

                        <InputError
                            message={errors.penyelesaian}
                            className="mt-2"
                        />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            forInput={"pembebanan"}
                            value={"Pembebanan"}
                        />
                        <TextInput
                            type={"text"}
                            name={"pembebanan"}
                            onChange={onHandleChange}
                            className="block w-full mt-1"
                        />

                        <InputError
                            message={errors.pembebanan}
                            className="mt-2"
                        />
                    </div>
                    <div id="notaselect" className="w-full">
                        <InputLabel
                            htmlFor="transfer"
                            value="Upload Nota Pembelian"
                        />
                        <FileInput
                            className="mt-1"
                            id="transfer"
                            name="transfer"
                            onChange={onHandleImagesChange}
                        />
                        <InputError message={errors.nota} className="mt-2" />
                    </div>
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        type="submit"
                        theme="success"
                        processing={processing}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
