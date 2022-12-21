import React from "react";
import Swal from "sweetalert2";

export default function SweetAlert() {
    return Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
    });
}
