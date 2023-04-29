import { useState } from "react";

function Test() {
    const [filteredData, setFilteredData] = useState([]);

    const data = [
        { id: 1, nama: "Aziz", kategori: "buah" },
        { id: 2, nama: "Nur", kategori: "buah" },
        { id: 3, nama: "Budi", kategori: "sayuran" },
        { id: 4, nama: "Cici", kategori: "sayuran" },
    ];

    const filterData = (category) => {
        const filtered = data.filter(
            (item) => item.kategori === category || item.kategori === "buah"
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <button onClick={() => filterData("buah")}>Filter Buah</button>
            <button onClick={() => filterData("sayuran")}>
                Filter Sayuran
            </button>
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id}>
                        {item.nama} ({item.kategori})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test;
