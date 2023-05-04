import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import { filter, toUpper } from "lodash";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";

const ComplainRequestTables = ({ datas, filters }) => {
    const [dataFilter, setDataFilter] = useState({ ...filters });
    const filterObject = Object.keys(dataFilter);

    const addFilter = (e) => {
        const targetData = e.target.getAttribute("data-id");
        document.getElementById("searchLabels").innerHTML = toUpper(targetData);
        document.getElementById("search").setAttribute("name", targetData);
        document.getElementById("search").focus();
    };

    const removeThisThumb = (e, filterKey, value) => {
        const buttonElemen = e.target.closest("button");
        const parentOfButton = buttonElemen.parentNode;
        parentOfButton.style.opacity = 0.5;
        const newData = dataFilter[filterKey].filter((_, index) => _ !== value);
        const data = {
            ...dataFilter,
            [filterKey]: newData,
        };
        router.get(route("ecare.requestComplain"), { data });
    };

    const badges = filterObject.map((filterKey) => {
        const values = dataFilter[filterKey];
        const badge = values.map((value) => {
            return (
                <span className="inline-flex items-center px-3 py-1.5 mr-2 font-medium text-brand-800 bg-brand-100 rounded dark:bg-brand-900 dark:text-brand-300 border border-black/10">
                    {filterKey == "find" ? null : `${toUpper(filterKey)} = `}{" "}
                    {value}
                    <button
                        onClick={(e) => removeThisThumb(e, filterKey, value)}
                        type="button"
                        className="inline-flex items-center p-0.5 ml-2 text-sm text-brand-400 bg-transparent rounded-sm hover:bg-brand-200 hover:text-brand-900 dark:hover:bg-brand-800 dark:hover:text-brand-300"
                        data-dismiss-target="#badge-dismiss-default"
                        aria-label="Remove"
                    >
                        <GrClose />
                    </button>
                </span>
            );
        });
        return badge;
    });

    const submitSearch = (e) => {
        e.preventDefault();
        const domName = document.getElementById("search").name;
        console.log(domName);
        const domValue = document.getElementById("search").value;
        let data;

        if (dataFilter[domName] == null) {
            data = {
                ...dataFilter,
                [domName]: [domValue],
            };
        } else {
            data = {
                ...dataFilter,
                [domName]: [...dataFilter[domName], domValue],
            };
        }

        router.get(route("ecare.requestComplain"), { data });
    };

    return (
        <div className="relative shadow-md sm:rounded-lg mb-3">
            <div className="pb-4 bg-white dark:bg-gray-900 p-3">
                <form onSubmit={submitSearch} className="w-1/3">
                    <div className="flex">
                        <label
                            htmlFor="search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <button
                            id="searchLabels"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            type="button"
                        >
                            All
                        </button>

                        <div className="relative w-full">
                            <input
                                type="search"
                                id="search"
                                name="find"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Search Mockups, Logos, Design Templates..."
                            />
                            <button
                                type="submit"
                                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="p-2 h-auto flex gap-2">{badges}</div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                data-id="no_request"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Nomor Request
                            </th>
                            <th
                                scope="col"
                                data-id="tanggal_request"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Tanggal Request
                            </th>
                            <th
                                scope="col"
                                data-id="connote"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Nomor AWB
                            </th>
                            <th
                                scope="col"
                                data-id="origin"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Origin
                            </th>
                            <th
                                scope="col"
                                data-id="destination"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Destination
                            </th>
                            <th
                                scope="col"
                                data-id="caller"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Caller
                            </th>
                            <th
                                scope="col"
                                data-id="caller_name"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Caller Name
                            </th>
                            <th
                                scope="col"
                                data-id="caller_cp"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Caller CP
                            </th>
                            <th
                                scope="col"
                                data-id="case_reason"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Case Reason
                            </th>
                            <th
                                scope="col"
                                data-id="request_status"
                                onClick={addFilter}
                                className="whitespace-nowrap hover:bg-gray-200 hover:cursor-pointer text-center py-3 px-6"
                            >
                                Status Request
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((item, key) => (
                            <tr
                                key={key}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                            >
                                <td className="px-6 py-4">{item.no_request}</td>
                                <td className="px-6 py-4">
                                    {dayjs(item.created_at).format(
                                        "DD-MM-YYYY"
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {item.cnote.connote}
                                </td>
                                <td className="px-6 py-4">
                                    {item.cnote.origin}
                                </td>
                                <td className="px-6 py-4">
                                    {item.cnote.destination}
                                </td>
                                <td className="px-6 py-4">
                                    {item.callers.caller}
                                </td>
                                <td className="px-6 py-4">
                                    {item.caller_contact_name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.caller_contact_person}
                                </td>
                                <td className="px-6 py-4">
                                    {item.case_reason}
                                </td>
                                <td className="px-6 py-4">
                                    {item.request_status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplainRequestTables;
