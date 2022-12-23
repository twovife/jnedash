import { Transition } from "@headlessui/react";
import React from "react";
import "./css/coffe.css";

export default function MiniLoading({ show }) {
    return (
        <Transition show={show}>
            <div className="w-full h-full bg-white/20 absolute top-0 left-0 z-50 flex justify-center items-center backdrop-blur-[1px]">
                <div className="waterfall">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Transition>
    );
}
