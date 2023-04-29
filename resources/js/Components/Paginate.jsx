import React from "react";
import { router } from "@inertiajs/react";

const Pagination = ({ ...props }) => {
    const linkPagination = () => {
        const maxPaginate = props.last_page < 5 ? props.last_page - 1 : 4;
        let generateLink = [];
        let startOn;
        if (props.last_page < 5) {
            startOn = 1;
        }
        if (props.current_page <= 3) {
            startOn = 1;
        } else if (props.last_page - props.current_page < 2) {
            startOn = props.last_page - 4;
        } else {
            startOn = props.current_page - 2;
        }

        for (let index = startOn; index <= startOn + maxPaginate; index++) {
            generateLink.push(props.links[index]);
        }
        return generateLink;
    };
    const pagnation = linkPagination();
    return (
        <nav aria-label="Page navigation example" className="text-right">
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <a
                        href={props.first_page_url}
                        className="block px-3 py-2 ml-0 leading-tight text-main-500 bg-white border border-main-300 rounded-l-lg hover:bg-main-100 hover:text-main-700"
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </li>
                {pagnation &&
                    pagnation.map((page) => (
                        <li key={page.label}>
                            <a
                                href={page.url}
                                className={`px-3 py-2 leading-tight ${
                                    page.active
                                        ? `text-main-700 font-semibold bg-main-100`
                                        : `text-main-500 bg-white`
                                }  border border-main-300 hover:bg-main-100 hover:text-main-700`}
                            >
                                {page.label}
                            </a>
                        </li>
                    ))}

                <li>
                    <a
                        href={props.last_page_url}
                        className="block px-3 py-2 leading-tight text-main-500 bg-white border border-main-300 rounded-r-lg hover:bg-main-100 hover:text-main-700"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
