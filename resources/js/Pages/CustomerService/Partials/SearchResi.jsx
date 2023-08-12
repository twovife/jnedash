import InputLabel from "@/Components/InputLabel";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchResi = ({ resi, ...props }) => {
    const [connote, setConnote] = useState({
        resi: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const onSearchChangeHandler = (e) => {
        setConnote({ resi: e.target.value });
        setStatus("");
    };

    const onSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const halo = await axios.post(
                route("apiservices.traceconnote.cek-hybrid"),
                connote
            );
            resi(connote.resi);
            setStatus("success");
        } catch {
            setStatus("error");
            resi(null);
        }

        setLoading(false);
    };

    return (
        <div>
            <InputLabel value={`Apakah anda mempunyai resi ?`} />
            <form onSubmit={onSearchSubmit}>
                <label
                    htmlFor="search"
                    className="text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AiOutlineSearch />
                    </div>
                    <input
                        onChange={onSearchChangeHandler}
                        type="search"
                        id="search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading || status ? true : false}
                        className={` ${
                            loading
                                ? `bg-yellow-700 hover:bg-yellow-800`
                                : status === "success"
                                ? `bg-green-700 hover:bg-green-800`
                                : status === "error"
                                ? `bg-red-700 hover:bg-red-800`
                                : `bg-blue-700 hover:bg-blue-800`
                        } text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed`}
                    >
                        {loading
                            ? "Processing"
                            : status === "success"
                            ? "Resi Ditemukan"
                            : status === "error"
                            ? "Resi Tidak Ada"
                            : "Cek"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchResi;
