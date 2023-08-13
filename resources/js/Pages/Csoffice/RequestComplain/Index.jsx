import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import MyTables from "@/Components/Tables/MyTables";
import { AiFillEdit } from "react-icons/ai";
import useFilteredComplains from "@/Hooks/useFilteredComplains";
import Pagination from "@/Components/Pagination";

const Index = ({ auth, ...props }) => {
    const {
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        displayData,
        totalPages,
        handlePageChange,
    } = useFilteredComplains({}, 2);

    useEffect(() => {
        const storedFilter = JSON.parse(localStorage.getItem("reqcomplain"));
        if (Object.keys(storedFilter).length !== 0) {
            setFilters(storedFilter);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("reqcomplain", JSON.stringify(filters));
    }, [filters]);

    const header = [
        {
            title: "Tanggal Reqeust",
            column: "created_at",
            sortable: false,
        },
        {
            title: "Nomor Request",
            column: "no_request",
            sortable: false,
        },
        {
            title: "Nomor Resi",
            column: "awb",
            sortable: false,
        },
        {
            title: "Callers",
            column: "caller_category",
            sortable: false,
        },
        {
            title: "Caller Name",
            column: "caller_contact_name",
            sortable: false,
        },
        {
            title: "Caller CP",
            column: "caller_contact_person",
            sortable: false,
        },
        {
            title: "Status",
            column: "request_status",
            sortable: false,
        },
    ];

    const handleFilters = (data) => {
        setFilters({
            ...filters,
            ...data,
        });
    };

    const decrementFiter = (data) => {
        setFilters(data);
    };

    const tbodyGenerate = () => {
        if (displayData.length === 0) {
            return (
                <>
                    <tbody>
                        <tr>
                            <td colSpan="2">Data Not Found</td>
                        </tr>
                    </tbody>
                </>
            );
        }

        return (
            <tbody>
                {displayData.map((item, index) => (
                    <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        <th className="px-6 py-1">
                            <div className="flex justify-around items-center">
                                {index + 1}
                                <Link
                                    href={route(
                                        "csoffice.complainrequest.generate",
                                        item.id
                                    )}
                                >
                                    <AiFillEdit className="text-blue-500 hover:cursor-pointer" />
                                </Link>
                            </div>
                        </th>
                        {header.map((header, index) => (
                            <td className="px-6 py-1" key={index}>
                                {item[header.column]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <Authenticated
            auth={auth}
            header={
                <>
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-white leading-tight">
                        Customer Service Requests
                    </h2>
                    <Head title="Claim" />
                </>
            }
        >
            <ContentWrap>
                <MyTables
                    header={header}
                    datefilter={"created_at"}
                    editable={true}
                    data={tbodyGenerate()}
                    filters={filters}
                    sendFilter={handleFilters}
                    decrementFiter={decrementFiter}
                ></MyTables>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </ContentWrap>
        </Authenticated>
    );
};

export default Index;
