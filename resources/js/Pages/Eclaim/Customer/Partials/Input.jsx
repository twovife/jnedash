import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";
import dayjs from "dayjs";
import { FileInput } from "flowbite-react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Input({ responses, loading }) {
    const [onPacking, setOnPacking] = useState();
    const [showApproval, setShowApproval] = useState(false);
    const [enableSubmit, setEnableSubmit] = useState(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        cnote: responses.connote,
    });

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

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route("eclaim.store"));
    };

    const onHandlePacking = (e) => {
        if (e.target.value == "yes") {
            setOnPacking(true);
        } else if (e.target.value == "no") {
            setOnPacking(false);
        } else {
            setOnPacking(null);
        }
        onHandleChange(e);
    };

    const showModal = (e) => {
        e.preventDefault();
        document.getElementById("approval").checked = false;
        setShowApproval(true);
        setEnableSubmit(true);
    };

    const submitModal = () => {
        setShowApproval(false);
        setEnableSubmit(false);
        document.getElementById("approval").checked = true;
    };
    const rejectModal = () => {
        setShowApproval(false);
        setEnableSubmit(true);
        document.getElementById("approval").checked = false;
    };
    return (
        <>
            <form onSubmit={onHandleSubmit}>
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <InputLabel value={"Penerima"} />
                        <TextInput
                            disabled
                            value={responses.receiver_name}
                            className={`block w-full mt-1`}
                        />
                    </div>
                    <div>
                        <InputLabel value={"Telp"} />
                        <TextInput
                            disabled
                            value={responses.receiver_phone}
                            className={`block w-full mt-1`}
                        />
                    </div>
                    <div>
                        <InputLabel value={"Date Input"} />
                        <TextInput
                            disabled
                            value={dayjs(responses.date_input).format(
                                "DD-MM-YYYY hh:mm"
                            )}
                            className={`block w-full mt-1`}
                        />
                    </div>
                    <div>
                        <InputLabel value={"Service"} />
                        <TextInput
                            disabled
                            value={responses.service}
                            className={`block w-full mt-1`}
                        />
                    </div>
                    <div className="col-span-2">
                        <InputLabel value={"Alamat"} />
                        <TextInput
                            disabled
                            value={responses.receiver_dest}
                            className={`block w-full mt-1`}
                        />
                    </div>
                    <div>
                        <InputLabel value={"Isi Kiriman"} />
                        <TextInput
                            disabled
                            value={responses.isi_kiriman}
                            className={`block w-full mt-1`}
                        />
                    </div>
                </div>
                <hr className="my-5" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <InputLabel value={"Kendala"} forInput={"case"} />
                        <SelectList
                            name="case"
                            className="mt-1 block w-full"
                            required
                            onChange={onHandleChange}
                            options={[
                                {
                                    id: 1,
                                    value: "",
                                    display: "Pilih Salah Satu",
                                },
                                {
                                    id: 2,
                                    value: "MISSING",
                                    display: "MISSING",
                                },
                                {
                                    id: 3,
                                    value: "DESTROY",
                                    display: "DESTROY",
                                },
                                {
                                    id: 4,
                                    value: "FAIL",
                                    display: "TERLAMBAT / GAGAL",
                                },
                                {
                                    id: 5,
                                    value: "LAINNYA",
                                    display: "LAINNYA",
                                },
                            ]}
                        />
                        <InputError message={errors.case} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel value={"Asuransi"} forInput={"cnee"} />
                        <TextInput
                            id={"cnee"}
                            className="mt-1 block w-full uppercase"
                            type={"text"}
                            value={responses.asuransi}
                            disabled
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Apakah Ditawarkan Asuransi"}
                            forInput={"penawaran_asuransi"}
                        />
                        <SelectList
                            name="penawaran_asuransi"
                            id="penawaran_asuransi"
                            className="mt-1 block w-full"
                            required
                            disabled={responses.asuransi == "no" ? false : true}
                            onChange={onHandleChange}
                            options={[
                                {
                                    id: 1,
                                    value: "",
                                    display: "Pilih Salah Satu",
                                },
                                {
                                    id: 2,
                                    value: "no",
                                    display: "Tidak",
                                },
                                {
                                    id: 3,
                                    value: "yes",
                                    display: "Iya",
                                },
                            ]}
                        />
                        <InputError
                            message={errors.penawaran_asuransi}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Packing Kayu"}
                            forInput={"packing"}
                        />
                        <SelectList
                            name="packing"
                            id="packing"
                            className="mt-1 block w-full"
                            required
                            onChange={onHandlePacking}
                            options={[
                                {
                                    id: 1,
                                    value: "",
                                    display: "Pilih Salah Satu",
                                },
                                {
                                    id: 2,
                                    value: "yes",
                                    display: "Yes",
                                },
                                {
                                    id: 3,
                                    value: "no",
                                    display: "No",
                                },
                            ]}
                        />
                        <InputError message={errors.packing} className="mt-2" />
                    </div>
                    {onPacking == null ? null : onPacking ? (
                        <div>
                            <InputLabel
                                value={"Di Packing Oleh Pihak"}
                                forInput={"packer"}
                            />
                            <SelectList
                                name="packer"
                                id="packer"
                                className="mt-1 block w-full"
                                required
                                onChange={onHandleChange}
                                options={[
                                    {
                                        id: 1,
                                        value: "",
                                        display: "Pilih Salah Satu",
                                    },
                                    {
                                        id: 2,
                                        value: "internal",
                                        display: "JNE",
                                    },
                                    {
                                        id: 3,
                                        value: "eksternal",
                                        display: "Packing Sendiri",
                                    },
                                ]}
                            />
                            <InputError
                                message={errors.penawaran_asuransi}
                                className="mt-2"
                            />
                        </div>
                    ) : (
                        <div>
                            <InputLabel
                                value={"Apakah Ditawarkan Packing Kayu"}
                                forInput={"penawaran_packing"}
                            />
                            <SelectList
                                name="penawaran_packing"
                                id="penawaran_packing"
                                className="mt-1 block w-full"
                                required
                                onChange={onHandleChange}
                                options={[
                                    {
                                        id: 1,
                                        value: "",
                                        display: "Pilih Salah Satu",
                                    },
                                    {
                                        id: 2,
                                        value: "no",
                                        display: "Tidak",
                                    },
                                    {
                                        id: 3,
                                        value: "yes",
                                        display: "Iya",
                                    },
                                ]}
                            />
                            <InputError
                                message={errors.penawaran_asuransi}
                                className="mt-2"
                            />
                        </div>
                    )}
                </div>
                <hr className="my-5" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <InputLabel
                            value={"Nama Sesuai KTP"}
                            forInput={"complainant"}
                        />
                        <TextInput
                            name={"complainant"}
                            className="mt-1 block w-full"
                            required
                            value={responses.complainant}
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Telephone / WA"}
                            forInput={"complainant_number"}
                        />
                        <TextInput
                            name={"complainant_number"}
                            className="mt-1 block w-full"
                            required
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant_number}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Email"}
                            forInput={"complainant_email"}
                        />
                        <TextInput
                            name={"complainant_email"}
                            className="mt-1 block w-full"
                            required
                            onChange={onHandleChange}
                            type={"email"}
                        />
                        <InputError
                            message={errors.complainant_email}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Alamat"}
                            forInput={"complainant_addr"}
                        />
                        <TextInput
                            name={"complainant_addr"}
                            className="mt-1 block w-full"
                            required
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant_addr}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Pengajuan Claim"}
                            forInput={"claim_propose"}
                        />
                        <CurrencyInput
                            name={"claim_propose"}
                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm mt-1 block w-full`}
                            id={"claim_propose"}
                            allowDecimals={false}
                            prefix="Rp. "
                            min={1}
                            required
                            onValueChange={onHandleCurencyChange}
                            placeholder={"Inputkan angka tanpa sparator"}
                        />
                        <InputError
                            message={errors.claim_propose}
                            className="mt-2"
                        />
                    </div>
                </div>
                <hr className="my-5" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <InputLabel
                            value={"Nomor KTP / SIM"}
                            forInput={"complainant_idcard_number"}
                        />
                        <TextInput
                            name={"complainant_idcard_number"}
                            id={"complainant_idcard_number"}
                            className="mt-1 block w-full"
                            required
                            value={responses.complainant}
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant}
                            className="mt-2"
                        />
                    </div>
                    <div id="ktpselect">
                        <InputLabel htmlFor="ktp" value="Upload KTP / SIM" />
                        <FileInput
                            className="mt-1"
                            id="ktp"
                            name="ktp"
                            onChange={onHandleImagesChange}
                            required
                        />
                        <InputError message={errors.ktp} className="mt-2" />
                    </div>
                </div>
                <hr className="my-5" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <InputLabel
                            value={"Nomor Rekening"}
                            forInput={"complainant_bank_number"}
                        />
                        <TextInput
                            name={"complainant_bank_number"}
                            id={"complainant_bank_number"}
                            className="mt-1 block w-full"
                            required
                            value={responses.complainant}
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Nama Bank"}
                            forInput={"complainant_bank_name"}
                        />
                        <TextInput
                            name={"complainant_bank_name"}
                            id={"complainant_bank_name"}
                            className="mt-1 block w-full"
                            required
                            value={responses.complainant}
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Cabang"}
                            forInput={"complainant_bank_branch"}
                        />
                        <TextInput
                            name={"complainant_bank_branch"}
                            id={"complainant_bank_branch"}
                            className="mt-1 block w-full"
                            required
                            value={responses.complainant}
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            value={"Atas Nama"}
                            forInput={"complainant_bank_username"}
                        />
                        <TextInput
                            name={"complainant_bank_username"}
                            id={"complainant_bank_username"}
                            className="mt-1 block w-full"
                            required
                            value={responses.complainant}
                            onChange={onHandleChange}
                            type={"text"}
                        />
                        <InputError
                            message={errors.complainant}
                            className="mt-2"
                        />
                    </div>
                    <div id="rekeningselect" className="lg:col-start-2">
                        <InputLabel
                            htmlFor="rekening"
                            value="Upload Buku Tabungan"
                        />
                        <FileInput
                            className="mt-1"
                            id="rekening"
                            name="rekening"
                            onChange={onHandleImagesChange}
                            required
                        />
                        <InputError
                            message={errors.rekening}
                            className="mt-2"
                        />
                    </div>
                </div>
                <hr className="my-5" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div id="notaselect" className="lg:col-start-2">
                        <InputLabel
                            htmlFor="nota"
                            value="Upload Nota Pembelian"
                        />
                        <FileInput
                            className="mt-1"
                            id="nota"
                            name="nota"
                            onChange={onHandleImagesChange}
                        />
                        <InputError message={errors.nota} className="mt-2" />
                    </div>
                </div>
                <hr className="my-5" />
                <div className="mt-3 flex justify-between items-center">
                    <label className="flex items-center">
                        <Checkbox
                            id={"approval"}
                            name="approval"
                            onClick={showModal}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Saya Setuju dengan syarat dan Ketentuan berlaku
                        </span>
                    </label>

                    <PrimaryButton
                        theme={"base"}
                        type="submit"
                        disabled={enableSubmit}
                    >
                        Submit Claim
                    </PrimaryButton>
                </div>
            </form>

            <Modal
                show={showApproval}
                maxWidth={"md"}
                onClose={rejectModal}
                closeable={processing ? false : true}
            >
                <div className="p-5">
                    <div className="text-center">
                        Syarat dan Ketentuan Claim
                    </div>
                    <div className="max-h-52 overflow-auto px-5 shadow mt-5 text-sm">
                        <ul className="list-inside list-decimal space-y-2">
                            <p>Syarat dan Ketentuan</p>
                            <li>AWB dan barang ini adalah milik saya.</li>
                            <li>
                                Data yang saya input adalah data yang falid dan
                                tidak ada yang direkayasa.
                            </li>
                            <li>
                                Tidak adanya paksaan untuk input data pada form
                                ini
                            </li>
                            <li>
                                Telah menyerahkan dokumen berupa KTP/SIM, Buku
                                rekening, dan Nota penjualan kepada pihak JNE
                                untuk dijadikan lampiran dalam proses claim.
                            </li>
                            <li>
                                Menyetujui penggunaan Signatur Digital sebagai
                                tanda persetujuan yang sah untuk menggantikan
                                Tanda Tangan Basah untuk pengajuan claim.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-5">
                        <div className="flex justify-end gap-2 items-center mt-3">
                            <PrimaryButton
                                theme={"base"}
                                type="button"
                                onClick={submitModal}
                            >
                                Submit Claim
                            </PrimaryButton>
                            <PrimaryButton
                                theme={"secondary"}
                                onClick={rejectModal}
                                type={"button"}
                            >
                                Cancel
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
