import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./css/coffe.css";

export default function Loading({ show, parentRoot }) {
    const loadingRoot = document.getElementById("loading-root");

    return ReactDOM.createPortal(
        <Transition show={show}>
            <div className="w-full h-screen bg-white/20 fixed top-0 left-0 z-[101] flex justify-center items-center backdrop-blur-[1px]">
                <div className="waterfall">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Transition>,
        loadingRoot
    );
}
