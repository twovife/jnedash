import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
    AiOutlineLoading3Quarters,
    AiOutlineCloseCircle,
    AiFillCheckCircle,
} from "react-icons/ai";
import FormInput from "./FormInput";

export default function CheckAwb() {
    let typingTimer;
    const [waitCnote, setWaitCnote] = useState(1);
    const [isAwb, setIsAwb] = useState(false);
    const [response, setResponse] = useState();
    const { data, setData, post, processing, errors, progress } = useForm();

    const cnoteRef = useRef();

    const onHandleCnoteChange = (e) => {
        e.preventDefault();
        setWaitCnote(2);
        clearInterval(typingTimer);
        const cnote = cnoteRef.current.value;
        typingTimer = setTimeout(() => {
            axios
                .get(route("api.eclaim.checkawb"), {
                    params: {
                        nomor_resi: cnote,
                    },
                })
                .then((data) => {
                    setWaitCnote(200);
                    setResponse(data.data.data);
                    setData({
                        cnote: cnoteRef.current.value,
                    });
                    cnoteRef.current.disabled = true;
                    e.target.disabled = true;
                    e.target.innerHTML = "Verified";
                    setIsAwb(true);
                })
                .catch((err) => {
                    setWaitCnote(err.request.status);
                    setIsAwb(false);
                });
        }, 500);
    };

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

    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-5">
                <div className="max-w-xl">
                    <InputLabel
                        value={
                            !isAwb
                                ? "Masukkan nomor resi anda"
                                : "Nomor Resi Anda"
                        }
                        forInput={"cnote"}
                    />
                    <div className="grid grid-cols-12 gap-2">
                        <div className="relative col-span-10">
                            <TextInput
                                type="text"
                                name="cnote"
                                ref={cnoteRef}
                                className="mt-1 w-full"
                                isFocused={true}
                                required
                            />
                            <span className="absolute top-1/2 -translate-y-1/2 right-5">
                                {(() => {
                                    if (waitCnote == 2) {
                                        return (
                                            <div className="flex gap-1 items-center text-gray-500">
                                                <span>Checking</span>
                                                <AiOutlineLoading3Quarters className="animate-spin font-bold text-lg" />
                                            </div>
                                        );
                                    }
                                    if (waitCnote > 399) {
                                        return (
                                            <div className="flex gap-1 items-center text-red-500">
                                                <span>Invalid</span>
                                                <AiOutlineCloseCircle className="font-bold text-lg" />
                                            </div>
                                        );
                                    }
                                    if (waitCnote == 200) {
                                        return (
                                            <div className="flex gap-1 items-center text-green-500 ">
                                                <span>Correnct</span>
                                                <AiFillCheckCircle className="font-bold text-lg" />
                                            </div>
                                        );
                                    }
                                })()}
                            </span>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <PrimaryButton
                                type="button"
                                className="flex items-center whitespace-nowrap"
                                theme="base"
                                onClick={onHandleCnoteChange}
                                disabled={isAwb}
                            >
                                Cek Resi
                            </PrimaryButton>
                        </div>
                    </div>
                    {(() => {
                        if (waitCnote == 404) {
                            return (
                                <InputError
                                    message={"Nomor resi tidak ditemukan !!"}
                                    className="mt-2"
                                />
                            );
                        }
                        if (waitCnote == 400) {
                            return (
                                <InputError
                                    message={
                                        "Nomor resi diluar service area Kediri, Mohon hubingi Customer Service JNE Kediri"
                                    }
                                    className="mt-2"
                                />
                            );
                        }
                        if (waitCnote == 409) {
                            return (
                                <InputError
                                    message={"Nomor resi telah terdaftar !!"}
                                    className="mt-2"
                                />
                            );
                        }
                    })()}
                </div>
            </div>

            {isAwb && (
                <>
                    <FormInput
                        onHandleSubmit={onHandleSubmit}
                        onHandleChange={onHandleChange}
                        onHandleCurencyChange={onHandleCurencyChange}
                        onHandleImagesChange={onHandleImagesChange}
                        processing={processing}
                        errors={errors}
                        response={response}
                        data={data}
                    />
                </>
            )}

            <Loading show={processing} />
        </>
    );
}
