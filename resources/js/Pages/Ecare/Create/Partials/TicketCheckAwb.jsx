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
// border-gray-300 focus:border-brand-500 focus:ring-brand-500 rounded-md shadow-sm bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 disabled:bg-black/10 dark:disabled:bg-white/10
