import { Head } from "@inertiajs/inertia-react";
import dayjs from "dayjs";
import React from "react";

export default function Signature({ data }) {
    return (
        <>
            <Head title="Claim Signature" />
            <div className="relative">
                <div className="w-screen h-screen overflow-hidden">
                    <img
                        src="/stacked-steps-haikei.svg"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center">
                    <div className="max-w-2xl w-full bg-white/30 shadow-lg shadow-white/40 rounded-lg overflow-hidden p-5 backdrop-blur">
                        <h1 className="text-3xl text-center font-bold mb-4">
                            Digital Signature
                        </h1>
                        <p className="text-2xl indent-5 mb-4">
                            Digital Signature ini sebagai pengganti tanda tangan
                            basah dan hanya berlaku untuk Form Pengajuan Caim
                            dengan nomor laporan {data.ticket_id}. Dengan
                            Digital Signature ini saya sebagai pelapor telah
                            menyetujui syarat dan ketentuan yang berlaku pada
                            tanggal{" "}
                            {dayjs(data.created_at).format("DD-MM-YYYY")}.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
