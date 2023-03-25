import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiOutlineWhatsApp,
} from "react-icons/ai";

const Landing = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Head title="E Care JNE Kediri" />
            <Loading show={loading} />
            <div className="min-h-screen font-roboto relative">
                <div className="flex flex-col lg:flex-row items-center justify-center h-screen max-w-screen-2xl p-6 mx-auto gap-14 text-gray-800">
                    <div className="flex-1 mx-auto w-full">
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
                    <div className="flex-1 w-full">
                        <h1 className="tracking-widest text-lg">
                            Input Your Resi
                        </h1>
                        <div>
                            <TextInput className="w-full text-2xl mt-2" />
                        </div>
                        <PrimaryButton
                            className="mt-2 px-12"
                            title={"Search"}
                        />
                    </div>
                    <div className="mt-60 flex flex-1 lg:hidden justify-between w-full">
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
