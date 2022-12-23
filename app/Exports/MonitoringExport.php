<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class MonitoringExport implements FromCollection, WithHeadings, WithColumnFormatting
{
    public $claim;
    use Exportable;
    /**
     * @return \Illuminate\Support\Collection
     */
    public function __construct($claim)
    {
        $this->claim = $claim;
    }

    public function headings(): array
    {
        return [
            "Tanggal Ticketing",
            "Nomor Ticket",
            "Nomor Resi",
            "Origin",
            "Destination",
            "Service",
            "Shipper",
            "Shipper Telp",
            "Cnee",
            "Cnee Telp",
            "Pelapor",
            "Pelapor Telp",
            "Pelapor Email",
            "Case",
            "Good Description",
            "Nilai Barang",
            "Packing Kayu",
            "PIC Packing",
            "Penawaran Packing",
            "Asuransi",
            "Penawaran Asuransi",
            "Claim Propose",
            "Claim Approve",
            "Penyelesaian",
            "Pembebanan",
            "SLA",
            "Status SLA",
            "Status Claim",
            "Tanggal Processed",
            "PIC Processed",
            "Tanggal Closed",
            "PIC Closed",
            "ID Card",
            "Buku Rekening",
            "Nota",
            "Bukti TF",
        ];
    }

    public function collection()
    {
        return $this->claim;
    }

    public function columnFormats(): array
    {
        return [
            'C' => NumberFormat::FORMAT_TEXT,
            'H' => NumberFormat::FORMAT_TEXT,
            'J' => NumberFormat::FORMAT_TEXT,
            'L' => NumberFormat::FORMAT_TEXT,
        ];
    }
}
