import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
    const showPrevButton = currentPage > 1;
    const showNextButton = currentPage < totalPages;

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
                {showPrevButton && (
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="w-2.5 h-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </button>
                    </li>
                )}

                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            disabled={currentPage === pageNumber}
                            className="disabled:bg-gray-500 disabled:text-white flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                {showNextButton && (
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-2.5 h-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </button>
                    </li>
                )}
            </ul>
        </nav>

        // <div className="pagination">
        //     {Array.from({ length: totalPages }).map((_, index) => (
        //         <button
        //             key={index}
        //             onClick={() => onPageChange(index + 1)}
        //             className={currentPage === index + 1 ? "active" : ""}
        //         >
        //             {index + 1}
        //         </button>
        //     ))}
        // </div>
    );
}

export default Pagination;
