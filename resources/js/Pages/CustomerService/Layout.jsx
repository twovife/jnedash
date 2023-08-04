import React from "react";

const Layout = ({ header, children, ...props }) => {
    return (
        <>
            <div className="p-6 flex justify-between mx-auto max-w-5xl">
                <h1 className="text-xl font-semibold text-indigo-600">
                    Pusat Bantuan
                </h1>
                <div className="font-semibold">{header}</div>
            </div>
            <main>{children}</main>
        </>
    );
};

export default Layout;
