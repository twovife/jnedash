import { Textarea } from "flowbite-react";
import React, { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function InputArea(
    {
        type = "text",
        name,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        row = "3",
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <Textarea
                type={type}
                name={name}
                value={value}
                rows={row}
                className={
                    `border-gray-300 focus:border-brand-500 focus:ring-brand-500 rounded-md shadow-sm bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 disabled:rounded-none disabled:border-0 disabled:border-b disabled:bg-gradient-to-t disabled:from-black/5 disabled:to-white dark:disabled:bg-white/10 ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                {...props}
            />
        </div>
    );
});
