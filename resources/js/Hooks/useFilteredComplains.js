import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

function useFilteredComplains(initialFilters, itemsPerPage) {
    const props = usePage().props;
    const [filters, setFilters] = useState(initialFilters);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredComplains = props.responses.filter((item) => {
        for (const key in filters) {
            const paramValue = filters[key]?.toLowerCase(); // Mengubah nilai parameter menjadi huruf kecil
            const itemValue = item[key]?.toLowerCase(); // Mengubah nilai properti dalam item menjadi huruf kecil

            if (
                typeof itemValue === "string" &&
                !itemValue.includes(paramValue)
            ) {
                return false;
            }
        }

        return true;
    });

    const totalPages = Math.ceil(filteredComplains.length / itemsPerPage);

    const displayData = filteredComplains.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return {
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        displayData,
        totalPages,
        handlePageChange,
    };
}

export default useFilteredComplains;
