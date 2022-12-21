import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Toast } from "flowbite-react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Transition } from "@headlessui/react";

export default function Toasts({ flash }) {
    const { _error, _info, _success, _warning } = flash;
    let [classes, setClasses] = useState(
        `bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200`
    );
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (_success) {
            setClasses(
                `bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200`
            );

            setTimeout(() => {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            }, 500);

            setMessage(_success);
        } else if (_error) {
            setClasses(
                `bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200`
            );

            setTimeout(() => {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            }, 500);

            setMessage(_error);
        } else if (_warning) {
            setClasses(
                `bg-red-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200`
            );

            setTimeout(() => {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            }, 500);

            setMessage(_warning);
        } else if (_info) {
            setClasses(
                `bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200`
            );

            setTimeout(() => {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            }, 500);

            setMessage(_info);
        }
    }, [flash]);

    const modalRoot = document.getElementById("toast-root");
    return ReactDOM.createPortal(
        <Transition show={show}>
            <Transition.Child
                enterFrom={`opacity-0`}
                enterTo={`opacity-100`}
                enter={`duration-300`}
                leaveFrom={`opacity-100`}
                leaveTo={`opacity-0`}
                leave={`duration-300`}
            >
                <Toast className="absolute flex justify-center items-center top-10 translate-x-1/2 right-1/2 max-w-xs">
                    <div
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${classes}`}
                    >
                        <BsFillInfoCircleFill className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {message ?? "Display message here"}
                    </div>
                    <Toast.Toggle className="flex items-center justify-center" />
                </Toast>
            </Transition.Child>
        </Transition>,
        modalRoot
    );
}
