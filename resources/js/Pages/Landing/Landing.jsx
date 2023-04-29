import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiOutlineWhatsApp,
} from "react-icons/ai";
import AlertModal from "./Partials/AlertModal";
import ModalAlert from "@/Components/ModalAlert";
import Checkbox from "@/Components/Checkbox";

const Landing = ({ callers, ...props }) => {
    console.log(props.flash.message);
    const [loading, setLoading] = useState(false);
    const [noAwb, setNoAwb] = useState();
    const [responseAwb, setResponseAwb] = useState({
        status: "",
        data: "",
    });
    const [disabledIt, setDisabledIt] = useState(false);

    const { data, setData, get, post, processing, errors } = useForm({
        cnote: "",
        caller_category: "",
        caller_sub_category: "",
        caller_contact_name: "",
        caller_contact_person: "",
        case_reason: "",
        usenumber: "",
    });

    const [afterSubmit, setAfterSubmit] = useState({
        show: false,
        textAlert: null,
        typeAlert: null,
    });

    useEffect(() => {
        if (props.flash.message) {
            setAfterSubmit({
                show: true,
                textAlert: props.flash.message,
                typeAlert: "success",
            });
        }
        if (props.errors[0]) {
            setAfterSubmit({
                show: true,
                textAlert: props.errors[0],
                typeAlert: "danger",
            });
        }
    }, []);

    const hideAfterSubmit = (e) => {
        setAfterSubmit(false);
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const onClickFindResi = async () => {
        setLoading(true);
        const { data, status } = await axios(route("api.trackingResi"), {
            params: {
                cnote: noAwb,
            },
        })
            .then((data) => data)
            .catch((err) => err.response);

        setLoading(false);
        setResponseAwb({
            data,
            status,
        });

        if (status == 404) {
            setAlertModal({
                show: true,
                textAlert: data,
                typeAlert: "danger",
            });
        } else if (status == 400) {
            setAlertModal({
                show: true,
                textAlert: data,
                typeAlert: "info",
            });
        }
        if (status == 200) {
            setData("cnote", noAwb);
        }
    };

    const callersOptions = callers.map((item) => {
        return {
            id: item.id,
            value: item.id,
            display: `Saya Adalah ${item.caller}`,
        };
    });

    const onCallersChange = (e) => {
        const useMe = document.getElementById("usenumber");
        useMe.checked = false;
        setDisabledIt(false);
        if (e.target.value == 1) {
            setData({
                ...data,
                caller_category: 1,
                caller_sub_category: "Customer",
            });
            useMe.setAttribute("disabled", "disabled");
            useMe.nextElementSibling.innerHTML = "(disabled)";
        } else if (e.target.value == 2) {
            setData({
                ...data,
                caller_category: 2,
                caller_sub_category: "Consignee",
            });
            useMe.removeAttribute("disabled");
            useMe.nextElementSibling.innerHTML = "Pakai Nomor Penerima";
        } else if (e.target.value == 3) {
            setData({
                ...data,
                caller_category: 3,
                caller_sub_category: "Shipper",
            });
            useMe.removeAttribute("disabled");
            useMe.nextElementSibling.innerHTML = "Pakai Nomor Pengirim";
        } else {
            setData({
                ...data,
                caller_category: e.target.value,
                caller_sub_category: "",
            });
            useMe.setAttribute("disabled", "disabled");
            useMe.nextElementSibling.innerHTML = "(disabled)";
        }
    };

    const onCheckBoxChange = (e) => {
        if (e.target.checked) {
            setData({
                ...data,
                caller_contact_name: "",
                caller_contact_person: "",
                usenumber: e.target.checked,
            });
            setDisabledIt(true);
        } else {
            setData({
                ...data,
                caller_contact_name: "",
                caller_contact_person: "",
                usenumber: e.target.checked,
            });
            setDisabledIt(false);
        }
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("customerStore"), {
            preserveState: false,
        });
    };

    const [alertModal, setAlertModal] = useState({
        show: false,
        textAlert: null,
        typeAlert: null,
    });
    const hideAlertModal = (e) => {
        setAlertModal(false);
    };

    return (
        <>
            <Loading show={loading || processing} />
            <ModalAlert alertParams={alertModal} onClose={hideAlertModal} />
            <ModalAlert alertParams={afterSubmit} onClose={hideAfterSubmit} />
            <Head title="E Care JNE Kediri" />
            <Loading show={loading} />
            <div className="min-h-screen font-roboto relative">
                <div className="flex flex-col lg:flex-row items-center justify-center h-screen max-w-screen-2xl mx-auto gap-14 text-gray-800">
                    <div className="flex-1 mx-auto w-full p-6">
                        <div className="text-7xl">Customer Care</div>
                        <div className="text-xl font-light tracking-widest text-gray-600">
                            Complain Form
                        </div>
                        <div className="mt-60 hidden lg:flex justify-between w-full">
                            <div>
                                <span className="font-semibold tracking-widest underline">
                                    Find us :
                                </span>
                                <div className="flex gap-3">
                                    <AiFillFacebook className="text-gray-600 text-3xl hover:text-blue-600 hover:cursor-pointer" />
                                    <AiOutlineWhatsApp className="text-gray-600 text-3xl hover:text-emerald-600 hover:cursor-pointer" />
                                    <AiFillInstagram className="text-gray-600 text-3xl hover:text-rose-600 hover:cursor-pointer" />
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold tracking-widest">
                                    JNE CABANG UTAMA KEDIRI
                                </p>
                                <span className="tracking-widest text-gray-600">
                                    081233302238
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full overflow-hidden">
                        <h1 className="tracking-widest text-lg mb-4 p-6 pb-3">
                            Masukkan Data Complain Anda
                        </h1>

                        <div
                            className={`w-full p-6 pt-3 duration-300 ${
                                responseAwb.status == 200 ? `hidden` : `block`
                            }`}
                        >
                            <div>
                                <InputLabel value={"Masukkan Nomor Resi"} />
                                <TextInput
                                    name="cnote"
                                    className="w-full text-2xl mt-2"
                                    onChange={(e) => setNoAwb(e.target.value)}
                                />
                                <InputError
                                    message={
                                        responseAwb.status == 403
                                            ? responseAwb.data
                                            : null
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                className="mt-2 px-12"
                                onClick={onClickFindResi}
                                title={"Search"}
                            />
                        </div>
                        {responseAwb.data.complainable == false && (
                            <div className="w-full">
                                {complain && <div>detail complain</div>}
                            </div>
                        )}
                        {responseAwb.data.complainable == true && (
                            <div className="w-full p-6">
                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        <div>
                                            <InputLabel
                                                value={"Status Pelapor"}
                                            />
                                            <SelectList
                                                name="caller_category"
                                                options={callersOptions}
                                                className="w-full mt-3"
                                                nullValue={true}
                                                onChange={onCallersChange}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                value={"Reference"}
                                                optional={true}
                                            />
                                            <TextInput
                                                name="caller_sub_category"
                                                className="w-full mt-3"
                                                value={data.caller_sub_category}
                                                onChange={onHandleChange}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                value={
                                                    "Nama yang bisa dihubungi"
                                                }
                                            />
                                            <TextInput
                                                disabled={disabledIt}
                                                required
                                                name="caller_contact_name"
                                                className="w-full mt-3"
                                                value={data.caller_contact_name}
                                                onChange={onHandleChange}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                value={
                                                    "Nomor yang bisa dihubungi"
                                                }
                                            />
                                            <div className="flex items-center">
                                                <div>
                                                    <TextInput
                                                        disabled={disabledIt}
                                                        required
                                                        name="caller_contact_person"
                                                        className="w-full mt-3"
                                                        value={
                                                            data.caller_contact_person
                                                        }
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>

                                                <div className="ml-3">
                                                    <label className="flex items-center">
                                                        <Checkbox
                                                            disabled
                                                            name="usenumber"
                                                            id="usenumber"
                                                            value={
                                                                data.usenumber
                                                            }
                                                            onChange={
                                                                onCheckBoxChange
                                                            }
                                                        />
                                                        <span className="ml-2 text-sm text-gray-600">
                                                            Pakai Nomor Pada
                                                            Resi
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <InputLabel
                                            value={"Problem Kiriman Anda"}
                                        />
                                        <TextInput
                                            name="case_reason"
                                            className="w-full mt-3"
                                            value={data.case_reason}
                                            onChange={onHandleChange}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <PrimaryButton
                                            type={`submit`}
                                            title={`Setuju`}
                                        />
                                    </div>
                                </form>
                                <div className="mt-3 text-sm italic">
                                    <ol>
                                        <li>
                                            1. Pastikan nomor yang tertera dapat
                                            di hubungi.
                                        </li>
                                        <li>
                                            2. Kami akan memberitahukan progres
                                            complain anda melalui nomor yang
                                            tertera diatas.
                                        </li>
                                        <li>
                                            3. Sebelum mencentang{" "}
                                            <b>Pakai nomor pada resi</b>,
                                            pastikan nomor pada resi tertera
                                            dengan benar
                                        </li>
                                        <li>
                                            4. Jelaskan Keluhan anda dengan
                                            padat dan jelas pada kolom Problem
                                            kiriman.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* id, connote_id, caller_category, caller_sub_category, caller_contact_name, caller_contact_person, case_reason, created_at, updated_at */}
                    <div className="mt-60 flex flex-1 lg:hidden justify-between w-full p-6">
                        <div>
                            <span className="font-semibold tracking-widest underline">
                                Find us :
                            </span>
                            <div className="flex gap-3">
                                <AiFillFacebook className="text-gray-600 text-3xl hover:text-blue-600 hover:cursor-pointer" />
                                <AiOutlineWhatsApp className="text-gray-600 text-3xl hover:text-emerald-600 hover:cursor-pointer" />
                                <AiFillInstagram className="text-gray-600 text-3xl hover:text-rose-600 hover:cursor-pointer" />
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold tracking-widest">
                                JNE CABANG UTAMA KEDIRI
                            </p>
                            <span className="tracking-widest text-gray-600">
                                081233302238
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;
