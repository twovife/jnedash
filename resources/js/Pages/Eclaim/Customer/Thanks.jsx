import React from "react";

export default function Thanks({ awb }) {
    console.log(awb.complainant_email);
    return (
        <>
            <div className="bg-[url('/background.svg')] w-full h-screen bg-cover bg-no-repeat bg-left-top flex items-center flex-row font-roboto fixed top-0 left-0 z-0"></div>
            <div className="relative z-50 w-full h-screen flex flex-col items-center justify-center">
                <div className="text-3xl font-medium px-5 py-2 lg:p-0 text-center">
                    Claim anda sedang di proses.
                </div>
                <div className="text-xl font-medium px-5 py-2 lg:p-0 text-center">
                    Silahkan cek email{" "}
                    <span className="text-blue-500 underline font-semibold">
                        {awb.complainant_email}
                    </span>{" "}
                    untuk mendapatkan update laporan claim anda.
                </div>
            </div>
        </>
    );
}
