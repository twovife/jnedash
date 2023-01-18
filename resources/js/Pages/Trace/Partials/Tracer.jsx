import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import React from "react";

const Tracer = () => {
    return (
        <div className="max-w-xl mx-auto">
            <div>
                <InputLabel value={"Masukkan AWB"} />
                <TextInput
                    type="text"
                    name="cnote"
                    className="mt-1 w-full"
                    isFocused={true}
                    required
                />
            </div>
        </div>
    );
};

export default Tracer;
