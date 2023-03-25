import React from "react";

export default function SelectList({
    name,
    value,
    className,
    required,
    handleChange,
    options,
    nullValue,
    ...props
}) {
    return (
        <div className="flex flex-col items-start">
            <select
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200 disabled:bg-black/10 dark:disabled:bg-white/10 ` +
                    className
                }
                required={required}
                {...props}
            >
                {options ? (
                    <>
                        {nullValue ? (
                            <option value={""}>Pilih Salah Satu</option>
                        ) : null}
                        {options.map((opt) => (
                            <option
                                key={opt.id}
                                value={opt.value}
                                selected={opt.selected}
                            >
                                {opt.display}
                            </option>
                        ))}
                    </>
                ) : (
                    <option value={""}>Pilih Salah Satu</option>
                )}
            </select>
        </div>
    );
}
