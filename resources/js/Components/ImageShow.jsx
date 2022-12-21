import { Transition } from "@headlessui/react";
import React from "react";

export default function ImageShow({ imgs, show, onClosed }) {
    return (
        <Transition
            show={show}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            enter="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            leave="duration-200"
            className={`fixed z-50 top-0 right-0 w-full h-screen`}
            onClick={onClosed}
        >
            <div className="w-full h-screen bg-white/50 flex justify-center items-center backdrop-blur-[1px]">
                {imgs ? (
                    <img
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-2xl rounded-lg shadow shadow-black/50"
                        src={`/storage/${imgs}`}
                        alt="image"
                    />
                ) : (
                    <div className="text-black font-black text-2xl dark:text-white">
                        NO IMAGE
                    </div>
                )}
            </div>
        </Transition>
    );
}
