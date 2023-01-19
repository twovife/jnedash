import InputError from "@/Components/InputError";
import Loading from "@/Components/Loading";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";
import Input from "./Partials/Input";

export default function Claim({ errors, ...props }) {
    const [params, setParams] = useState();
    const [statusData, setStatusData] = useState({
        _status: "",
        _message: "",
    });
    const [data, setData] = useState();
    const [isAwb, setIsAwb] = useState(false);
    const [loading, setLoading] = useState(false);

    const onResiChange = (e) => {
        setParams(e.target.value);
        setStatusData({
            _status: "",
            _message: "",
        });
    };

    const onResiSubmit = (e) => {
        setLoading(true);
        axios
            .get(route("api.eclaim.checkawb"), {
                params: {
                    nomor_resi: params,
                },
            })
            .then((data) => {
                setIsAwb(true);
                setStatusData(200);
                setData(data.data.data);
                setStatusData({
                    _status: data.status,
                    _message: data.statusText,
                });
                setLoading(false);
            })
            .catch((err) => {
                setIsAwb(false);
                console.log(err);
                setStatusData({
                    _status: err.response.status,
                    _message: err.response.data.message,
                });
                setLoading(false);
            });
    };

    return (
        <>
            <Head title="E Claim JNE Kediri" />
            <Loading show={loading} />
            <div className="bg-[url('/background.svg')] w-full h-screen bg-cover bg-no-repeat bg-center flex items-center flex-row font-roboto fixed top-0 left-0 z-0"></div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-xl mx-auto w-full p-5 bg-gray-700/5 rounded-lg shadow-xl relative z-10 m-5 mb-10">
                    <h2 className="text-xl font-semibold text-gray-700">
                        INPUT RESI
                    </h2>
                    <div>
                        <div className="flex gap-2">
                            <input
                                onChange={onResiChange}
                                type="text"
                                name="nomor_resi"
                                disabled={isAwb}
                                className={`w-full focus:outline-none focus:ring-0 focus:border-brand-500 ${
                                    statusData._status == ""
                                        ? `border rounded`
                                        : statusData._status == 200
                                        ? `border-green-500  disabled:bg-green-100 border border-t-0 border-x-0`
                                        : `border-secondary-500 border rounded`
                                }`}
                            />
                            <button
                                onClick={onResiSubmit}
                                className={`border px-5 py-2 text-white font-medium tracking-widest bg-brand-500 rounded hover:bg-brand-600 focus:bg-brand-700 ${
                                    isAwb && `hidden`
                                }`}
                            >
                                Search
                            </button>
                        </div>
                        <InputError
                            message={errors.cnote}
                            className={`mt-2 text-xs`}
                        />
                        {statusData._status == 200 ||
                        statusData._status == "" ? null : (
                            <InputError
                                message={statusData._message}
                                className={`mt-2 text-xs`}
                            />
                        )}
                    </div>
                    {isAwb && <Input responses={data} loading={loading} />}
                </div>
            </div>
        </>
    );
}
