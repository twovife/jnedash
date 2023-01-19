import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import axios from "axios";

import React, { useState } from "react";

const Tracer = () => {
    const [values, setValues] = useState({
        cnote: "",
    });

    const [responses, setResponses] = useState();

    const handleChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    };

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
            <form onSubmit={handleOnSubmit}>
                <div className="max-w-xl mx-auto flex w-full items-end gap-3">
                    <div className="flex-[3]">
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
                    <div className="flex-1">
                        <PrimaryButton
                            theme={"success"}
                            title={"Check"}
                            type={"submit"}
                            className={"text-lg"}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Tracer;
