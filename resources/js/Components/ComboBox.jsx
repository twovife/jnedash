import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowDownUp } from "react-icons/bs";

export default function ComboBox({
    name,
    className,
    options,
    onHandlerChange,
}) {
    const [selected, setSelected] = useState([{ id: "x", name: "" }]);
    const [query, setQuery] = useState("");

    const filteredOptions = (options) => {
        if (query === "") {
            return options;
        } else {
            return options.filter((option) =>
                option.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );
        }
    };

    const onChange = (e) => {
        setSelected(e);
        onHandlerChange(e, name);
    };
    return (
        <div>
            <Combobox name={name} value={selected} onChange={onChange}>
                <div className="relative mt-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    <div className="relative w-full cursor-default">
                        <Combobox.Input
                            required
                            className={
                                `border-gray-300 focus:border-brand-500 focus:ring-brand-500 rounded-md shadow-sm bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 w-full ` +
                                className
                            }
                            displayValue={(option) => option.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsArrowDownUp
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions(options).length === 0 &&
                            query !== "" ? (
                                <Combobox.Option
                                    key={query}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-brand-600 text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={{ id: query, name: query }}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {query}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active
                                                            ? "text-white"
                                                            : "text-brand-600"
                                                    }`}
                                                >
                                                    <AiOutlineCheck
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ) : (
                                filteredOptions(options).map((option) => (
                                    <Combobox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-brand-600 text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate dark:text-gray-200 ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {option.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-brand-600"
                                                        }`}
                                                    >
                                                        <AiOutlineCheck
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
