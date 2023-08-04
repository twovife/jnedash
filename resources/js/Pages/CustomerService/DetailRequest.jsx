import React from "react";
import Layout from "./Layout";
import { AiFillCopy } from "react-icons/ai";

const DetailRequest = ({ ...props }) => {
    const copyLink = () => {
        const currentPageUrl = window.location.href;
        navigator.clipboard
            .writeText(currentPageUrl)
            .then(() => {
                alert("Setelah ini tempel di WA ya biar gak hilang");
            })
            .catch((error) => {
                console.error("Gagal menyalin link:", error);
            });
    };

    return (
        <Layout header={`Internal Page`}>
            <div className="bg-indigo-500 w-full">
                <div className="mx-auto max-w-5xl p-6">
                    <div className="mb-4 text-4xl text-center text-white font-bold">
                        Laporan anda telah di ajukan
                    </div>
                    <div className="mb-4 text-xl text-center text-white font-bold">
                        Anda dapat melihan perkembangan laporan anda dihalaman
                        ini
                    </div>
                    <div
                        className="mb-4 text-xl text-center text-white font-bold flex items-center justify-center gap-3 underline underline-offset-2 hover:text-blue-900 hover:cursor-pointer"
                        onClick={copyLink}
                    >
                        <span>Klick disini untuk copy Link</span>
                        <span>
                            <AiFillCopy />
                        </span>
                    </div>
                    {/* <InputArea
            name={`case_reason`}
            onChange={onChangeHandler}
            placeholder="input keluhan anda disini"
        /> */}
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-5 text-center">
                <p>Status Laporan Anda :</p>
                {props.data.request_status == "open" ? (
                    <p className="text-blue-500 font-semibold">
                        Laporan Anda Berhasil di buat
                    </p>
                ) : (
                    <p className="text-green-500">
                        Laporan Anda Telah di terima oleh CS Kami
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default DetailRequest;
