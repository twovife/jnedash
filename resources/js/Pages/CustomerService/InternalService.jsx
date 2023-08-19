import React, { useState } from "react";
import Layout from "./Layout";
import InputArea from "@/Components/InputArea";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectList from "@/Components/SelectList";
import { router, useForm } from "@inertiajs/react";
import SearchResi from "./Partials/SearchResi";
import PrimaryButton from "@/Components/PrimaryButton";
import ReCAPTCHA from "react-google-recaptcha";
import { Transition } from "@headlessui/react";
import InputError from "@/Components/InputError";

const InternalService = (props) => {
    const [callersCategories, setCallersCategories] = useState();
    const [isValidCapta, setIsValidCapta] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        caller_category: "",
        caller_sub_category: "",
        caller_contact_name: "",
        caller_contact_person: "",
        case_reason: "",
    });

    const callersCategory = props.complain_callers.map((item) => {
        return { id: item.id, value: item.id, display: item.caller };
    });

    const sendingOffice = props.sales_offices.map((item) => {
        return {
            id: item.nomor_debitur,
            value: item.nomor_debitur,
            display: `${
                item.area == 1 ? "Kediri" : item.area == 2 ? "TLG" : "TRG"
            } - ${item.nama_agen}`,
        };
    });

    const onChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onCallerCategoryChange = (e) => {
        if (e.target.value == 4) {
            setData({
                ...data,
                caller_category: e.target.value,
                caller_sub_category: "internal jne",
            });
        } else {
            setData({
                ...data,
                caller_category: e.target.value,
            });
        }
        setCallersCategories(e.target.value);
    };

    const getResi = (params) => {
        if (params) {
            setData("resi", params);
        } else {
            setData("resi", null);
        }
    };

    const renderSubCaller = () => {
        if (callersCategories == 4) {
            return (
                <>
                    <div>&nbsp;</div>
                    <TextInput
                        readOnly
                        className={`w-full block read-only:border-0 read-only:focus:border-0 read-only:focus:ring-0 read-only:border-b-2 read-only:shadow-none read-only:rounded-none read-only:focus:border-b-2 read-only:focus:shadow-none read-only:focus:rounded-none`}
                        value="Internal Jne"
                    />
                    <InputError
                        message={errors.caller_sub_category}
                        className="mt-2"
                    />
                    ;
                </>
            );
        } else if (callersCategories == 5) {
            return (
                <>
                    <InputLabel
                        value="Pilih Sending Office"
                        className={`mb-1`}
                    />
                    <SelectList
                        onChange={onChangeHandler}
                        name="caller_sub_category"
                        value={data.caller_sub_category}
                        nullvalue="true"
                        required
                        className={`block w-full`}
                        options={sendingOffice}
                    />
                    <InputError
                        message={errors.caller_sub_category}
                        className="mt-2"
                    />
                    ;
                </>
            );
        }
    };

    function onChange(value) {
        setIsValidCapta(true);
    }

    const submitPostForm = (e) => {
        e.preventDefault();
        post(route("cs.internalStore"), {
            onError: () => setIsValidCapta(false),
        });
    };
    return (
        <Layout header={`Internal Page`}>
            <div className="bg-indigo-500 w-full">
                <div className="mx-auto max-w-5xl p-6">
                    <div className="mb-4 text-4xl text-center text-white font-bold">
                        Halo, ada yang bisa kami bantu ?
                    </div>
                    <InputArea
                        required
                        name={`case_reason`}
                        onChange={onChangeHandler}
                        placeholder="input keluhan anda disini"
                    />
                    <InputError message={errors.case_reason} className="mt-2" />
                </div>
            </div>
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex gap-3 mb-3">
                    <div className="mb-1 flex-1">
                        <InputLabel value={`Caller`} className={`mb-1`} />
                        <SelectList
                            required
                            className={`block w-full`}
                            onChange={onCallerCategoryChange}
                            nullvalue="true"
                            name={`caller_category`}
                            options={callersCategory}
                            value={data.caller_category}
                        />
                        <InputError
                            message={errors.caller_category}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-1">{renderSubCaller()}</div>
                    <div className="mb-1 flex-1">
                        <InputLabel
                            value={`Nama / Divisi`}
                            className={`mb-1`}
                        />
                        <TextInput
                            required
                            className={`block w-full`}
                            onChange={onChangeHandler}
                            nullvalue="true"
                            name={`caller_contact_name`}
                            value={data.caller_contact_name}
                        />
                        <InputError
                            message={errors.caller_contact_name}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-1 flex-1">
                        <InputLabel
                            value={`Nomor Pelapor`}
                            className={`mb-1`}
                        />
                        <TextInput
                            required
                            className={`block w-full`}
                            onChange={onChangeHandler}
                            nullvalue="true"
                            name={`caller_contact_person`}
                            value={data.caller_contact_person}
                        />
                        <InputError
                            message={errors.caller_contact_person}
                            className="mt-2"
                        />
                    </div>
                </div>
                <SearchResi resi={getResi} />
                <form
                    onSubmit={submitPostForm}
                    className="w-full flex mt-3 justify-end items-center"
                >
                    <Transition
                        show={!isValidCapta}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="relative"
                    >
                        <ReCAPTCHA
                            sitekey={props.reCapta}
                            onChange={onChange}
                        />
                    </Transition>

                    <Transition
                        show={isValidCapta}
                        enter="delay-300 ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="relative"
                    >
                        <PrimaryButton
                            disabled={processing}
                            type="submit"
                            className="ml-auto"
                            title="Submit"
                        />
                    </Transition>
                </form>
            </div>
        </Layout>
    );
};

export default InternalService;
