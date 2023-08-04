import { Link, router, usePage } from "@inertiajs/react";
import { property } from "lodash";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BiSearch, BiSortDown, BiSortUp } from "react-icons/bi";
import { HiOutlineFilter } from "react-icons/hi";
import Loading from "../Loading";
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";

const MyTables = ({ header, link, datefilter = false, ...props }) => {
    const [loading, setLoading] = useState(false);
    const { filters } = usePage().props;
    const [lastFilter, setLastFilter] = useState(filters);
    const [showFilter, setShowFilter] = useState("");

    const [asd, setAsd] = useState({
        startfrom: filters[datefilter] ? filters[datefilter].startfrom : "",
        thru: filters[datefilter] ? filters[datefilter].thru : "",
    });

    const handlerOnDateChange = (e) => {
        setAsd({ ...asd, [e.target.name]: e.target.value });
    };

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

    const filterSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const inputfilter = document.getElementById("filterinput");
        const dataFiter = { [inputfilter.name]: inputfilter.value };
        router.visit(window.location.href, { data: dataFiter });
    };

    const decrementFiter = (key) => {
        setLoading(true);
        const newFilter = lastFilter;
        delete newFilter[key];
        const url = window.location.href.split("?")[0];
        router.visit(url, { data: newFilter });
    };

    const onDateBetweenSubmit = (e) => {
        e.preventDefault();
        router.visit(window.location.href, { data: { [datefilter]: asd } });
    };

    const filterModal = (params, sortparam = false, filterparam = true) => {
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
                        {sortparam ? (
                            <>
                                <Link
                                    as="a"
                                    method="get"
                                    href={window.location.href}
                                    data={{ sort: { 0: params, 1: "asc" } }}
                                    className="text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500"
                                >
                                    <BiSortUp />
                                </Link>
                                <Link
                                    as="a"
                                    method="get"
                                    href={window.location.href}
                                    data={{ sort: { 0: params, 1: "desc" } }}
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
                    <form onSubmit={filterSubmit}>
                        <input
                            disabled={!filterparam}
                            id="filterinput"
                            name={params}
                            className="w-full font-light text-white bg-gray-700 py-2 px-4 disabled:cursor-not-allowed"
                        />
                    </form>
                </div>
            </div>
        );
    };

    const thead = () => {
        return (
            <thead className="text-xs text-gray-700 bg-gray-200 border-b border-b-gray-300 dark:border-b-gray-600 dark:bg-gray-700 dark:text-gray-400">
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
                <Loading show={loading} />
                <div className="inline-block lg:w-72 mb-2">
                    {Object.entries(lastFilter).map(([key, value]) => {
                        if (key != "sort" && key != "page") {
                            if (key != datefilter) {
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
                                            onClick={() => decrementFiter(key)}
                                            className="flex items-center justify-center ml-auto mr-2 focus:border-blue-500 hover:bg-gray-300 p-1 text-xs"
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
            </>
        );
    };

    const paginate = () => {
        const nextPage = link.next_page
            ? new URL(link.next_page).searchParams.get("page")
            : null;
        const prevPage = link.previous_page
            ? new URL(link.previous_page).searchParams.get("page")
            : null;

        return (
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            First
                        </a>
                    </li>
                    {prevPage && (
                        <li>
                            <a
                                href={link.previous_page}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {prevPage}
                            </a>
                        </li>
                    )}

                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            {prevPage
                                ? parseInt(prevPage) + 1
                                : nextPage
                                ? parseInt(nextPage) - 1
                                : 1}
                        </a>
                    </li>

                    {nextPage && (
                        <li>
                            <a
                                href={link.next_page}
                                aria-current="page"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {nextPage}
                            </a>
                        </li>
                    )}

                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Last
                        </a>
                    </li>
                </ul>
            </nav>
        );
    };
    return (
        <div className="relative">
            {datefilter && (
                <form
                    onSubmit={onDateBetweenSubmit}
                    className="flex items-center gap-4 mb-3"
                >
                    <p>Create On</p>
                    <TextInput
                        name="startfrom"
                        onChange={handlerOnDateChange}
                        className="text-xs"
                        type={"date"}
                        value={asd.startfrom}
                    />
                    <p>To</p>
                    <TextInput
                        name="thru"
                        onChange={handlerOnDateChange}
                        className="text-xs"
                        type={"date"}
                        value={asd.thru}
                    />
                    <PrimaryButton
                        title={"submit"}
                        type="submit"
                        padding="px-3 py-2"
                    />
                </form>
            )}
            {lastFilter && filterBlock()}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3 h-[70vh]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {thead()}
                    {props.children}
                </table>
            </div>
            {paginate()}
        </div>
    );
};

export default MyTables;
