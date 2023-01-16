import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import React from "react";

const TicketCheckAwb = () => {
    return (
        <>
            <div className="gap-2">
                <InputLabel value={"Masukkan AWB"} />
                <TextInput
                    type="text"
                    name="cnote"
                    className="mt-1 w-full"
                    isFocused={true}
                    required
                />
            </div>
        </>
    );
};

export default TicketCheckAwb;
