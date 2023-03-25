import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LinkButton from "@/Components/LinkButton";
import TextInput from "@/Components/TextInput";
import axios from "axios";

import React, { useState } from "react";

const Tracer = () => {
    const [values, setValues] = useState({
        cnote: "",
    });

    const handleChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    };

    const [responses, setResponses] = useState();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        axios
            .get(route("api.tracking"), {
                params: values,
            })
            .then((responses) => {
                setResponses({
                    detail: responses.data.detail,
                    shipper: responses.data.shipper,
                    receiver: responses.data.receiver,
                });
            })
            .catch((err) => {
                setResponses(null);
            });
    };

    return (
        <div>
            {responses ? (
                <div className="max-w-xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-semibold">Detail Awb</h1>
                        <div className="flex">
                            <div className="flex-1">Tanggal Input</div>
                            <div className="flex-[2]">
                                {responses.detail.connote_date}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Nomor Resi</div>
                            <div className="flex-[2]">
                                {responses.detail.connote}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Deskripsi Barang</div>
                            <div className="flex-[2]">
                                {responses.detail.goods_description}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Pengirim</div>
                            <div className="flex-[2]">
                                {responses.shipper.shipper_name}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Origin</div>
                            <div className="flex-[2]">
                                {responses.shipper.origin}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Penerima</div>
                            <div className="flex-[2]">
                                {responses.receiver.receiver_name}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Destinasi</div>
                            <div className="flex-[2]">
                                {responses.receiver.destination}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Alamat</div>
                            <div className="flex-[2]">
                                {responses.receiver.city}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">Zona</div>
                            <div className="flex-[2]">
                                {responses.receiver.zona}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end gap-2">
                        <PrimaryButton
                            theme={"secondary"}
                            title={"Create Claim"}
                            disabled
                        />
                        <LinkButton
                            theme={"primary"}
                            title={"Create Cs Ticket"}
                            type={"a"}
                            method={"get"}
                            data={values}
                            href={route("ecare.create")}
                        />
                    </div>
                </div>
            ) : (
                <form onSubmit={handleOnSubmit}>
                    <div className="max-w-xl mx-auto">
                        <div>
                            <InputLabel value={"Masukkan AWB"} />
                            <TextInput
                                onChange={handleChange}
                                type="text"
                                name="cnote"
                                className="mt-1 w-full"
                                isFocused={true}
                                required
                            />
                        </div>
                        <div className="flex gap-2 justify-end mt-2">
                            <PrimaryButton
                                theme={"success"}
                                title={"Check"}
                                type={"submit"}
                            />
                            <LinkButton
                                theme={"success"}
                                title={"Tanpa Resi"}
                                type={"a"}
                                method={"get"}
                                href={route("ecare.create")}
                            />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Tracer;
