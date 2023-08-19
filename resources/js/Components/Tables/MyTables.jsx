import { Link, router, usePage } from "@inertiajs/react";
import { filter, property } from "lodash";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BiSearch, BiSortDown, BiSortUp } from "react-icons/bi";
import { HiOutlineFilter } from "react-icons/hi";
import Loading from "../Loading";
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";

const MyTables = ({
    header,
    link,
    datefilter = false,
    data,
    filters,
    sendFilter,
    decrementFiter,
    ...props
}) => {
    const [showFilter, setShowFilter] = useState("");

    const { serverFilters } = usePage().props;
    console.log(serverFilters);
    const [filterServer, setFilterServer] = useState({ ...serverFilters });
    const onFilterSaverChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "connote") {
            setFilterServer({
                ...filterServer,
                [name]: value,
            });
        } else {
            const section = name.split(".")[0]; // 'created_at' or 'connote'
            setFilterServer({
                ...filterServer,
                [section]: {
                    ...filterServer[section],
                    [name.split(".")[1]]: value,
                },
            });
        }
    };

    console.log(filterServer);
    const thisonclick = (params) => {
        setShowFilter(params);
    };

    useEffect(() => {
        const log = (e) => {
            if (e.target.tagName == "TH") {
                thisonclick(e.target.getAttribute("data-item"));
            } else {
                thisonclick("");
            }
        };
        window.addEventListener("click", log);
        return () => {
            window.removeEventListener("click", log);
        };
    });

    const onFilterSubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById("filterinput");
        sendFilter({ [input.name]: input.value });
    };

    const removeFilter = (key) => {
        const newFilter = { ...filters };
        delete newFilter[key];
        decrementFiter(newFilter);
    };

    const filterModal = (column, sortable = true, filterable = true) => {
        return (
            <div
                className="absolute h-full text-white -bottom-full left-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gray-900">
                    <div className="flex justify-end items-center text-2xl">
                        <div className="text-sm font-light px-4 py-2 mr-4">
                            Filters
                        </div>
                        {sortable ? (
                            <>
                                <Link
                                    as="a"
                                    method="get"
                                    className="text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500"
                                >
                                    <BiSortUp />
                                </Link>
                                <Link
                                    as="a"
                                    method="get"
                                    className="text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500"
                                >
                                    <BiSortDown />
                                </Link>
                            </>
                        ) : (
                            <>
                                <button
                                    disabled
                                    className="text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500 disabled:cursor-not-allowed"
                                >
                                    <BiSortUp />
                                </button>
                                <button
                                    disabled
                                    className="text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500 disabled:cursor-not-allowed"
                                >
                                    <BiSortDown />
                                </button>
                            </>
                        )}
                    </div>
                    <form onSubmit={onFilterSubmit}>
                        <input
                            disabled={!filterable}
                            id="filterinput"
                            name={column}
                            className="w-full font-light text-white bg-gray-700 py-2 px-4 disabled:cursor-not-allowed"
                        />
                    </form>
                </div>
            </div>
        );
    };

    const thead = () => {
        return (
            <thead className="text-xs text-gray-700 bg-gray-200 border-b border-b-gray-300 dark:border-b-gray-600 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr className="text-center">
                    <th className="px-6 py-1">No</th>
                    {header.map((item, index) => (
                        <th
                            key={index}
                            scope="col"
                            data-item={item.column}
                            className={`border-l border-l-gray-300 dark:border-l-gray-600 hover:cursor-pointer relative py-3 px-6 whitespace-nowrap ${
                                showFilter == item.column
                                    ? `bg-gray-900 text-white`
                                    : `bg-transparent`
                            }`}
                        >
                            {item.title}
                            {showFilter == item.column &&
                                filterModal(
                                    item.column,
                                    item.sortable,
                                    item.filterable
                                )}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const filterBlock = () => {
        return (
            <>
                <div className="inline-block lg:w-72 mb-2">
                    {Object.entries(filters).map(([key, value]) => {
                        const titleName = header.find(
                            (obj) => obj.column == key
                        ).title;
                        return (
                            <div
                                key={key}
                                className="flex justify-start items-center gap-3 border hover:bg-green-100 mb-1"
                            >
                                <div className="p-1.5 bg-green-400 text-white text-xl">
                                    <HiOutlineFilter />
                                </div>
                                <p className="text-sm text-blue-500">
                                    {titleName} = {value}
                                </p>
                                <button
                                    onClick={() => removeFilter(key)}
                                    className="flex items-center justify-center ml-auto mr-2 focus:border-blue-500 hover:bg-gray-300 p-1 text-xs"
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    const onDateBetweenSubmit = (e) => {
        e.preventDefault();
        router.visit(window.location.href, { data: filterServer });
    };

    return (
        <div className="relative mb-3">
            <div></div>
            {datefilter && (
                <form
                    className="flex items-center gap-4 mb-3"
                    onSubmit={onDateBetweenSubmit}
                >
                    <p>Create On</p>
                    <TextInput
                        name={`${datefilter}.startfrom`}
                        className="text-xs"
                        type={"date"}
                        onChange={onFilterSaverChangeHandler}
                        value={filterServer[datefilter]?.startfrom || ""}
                    />
                    <p>To</p>
                    <TextInput
                        name={`${datefilter}.thru`}
                        className="text-xs"
                        type={"date"}
                        onChange={onFilterSaverChangeHandler}
                        value={filterServer[datefilter]?.thru || ""}
                    />
                    <TextInput
                        name={`connote`}
                        className="text-xs"
                        placeholder={"awb"}
                        type={"text"}
                        onChange={onFilterSaverChangeHandler}
                        value={filterServer.connote || ""}
                    />
                    <PrimaryButton
                        title={"submit"}
                        type="submit"
                        padding="px-3 py-2"
                    />
                </form>
            )}
            {filterBlock()}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3 h-[70vh]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 relative">
                    {thead()}
                    {data}
                </table>
            </div>
        </div>
    );
};

export default MyTables;
