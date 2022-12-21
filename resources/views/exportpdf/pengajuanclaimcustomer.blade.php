<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Document</title>

    <style>
        * {
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
        }

        html {
            font-size: 18px;
        }

        p {
            margin: .6rem;
        }
    </style>
</head>

<body>
    <div style="text-align: center;margin-bottom: 3rem;">
        <img src="https://www.jne.co.id/frontend/images/material/logo.jpg" width="200px">
        <div
            style="margin-top: 1rem;font-size: 1.2rem;font-weight: bold;text-decoration: underline;text-transform: uppercase;">
            Form Pengajuan Claim
        </div>
    </div>
    <div style="position: relative">
        <p>No. Ref : {{ $claim->ticket_id }}<span style="position: absolute;right: 0;top: 0;">Kediri,
                {{ $claim->created_at->format('d-m-Y') }}</span>
        </p>
        <p>Kepada Yth,<br>
            PT. TIKI Jalur Nugraha Eka Kurir</p>
        <p>
            Dengan Hormat,<br>
            Saya yang bertanda tangan dibawah ini :
        </p>
        <div style="margin-left: 1rem;">
            <p style="position: relative">Nama <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant }}</span>
            </p>
            <p style="position: relative">Alamat <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant_addr }}</span>
            </p>
            <p style="position: relative">Telp <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant_number }}</span>
            </p>
            <p style="position: relative">No. KTP/SIM <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant_number }}</span>
            </p>
            <p style="position: relative">Email <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;">{{ $claim->complainant_email }}</span>
            </p>
        </div>
        <p>Telah melakukan pengiriman dengan data-data sebagai berikut :</p>
        <div style="margin-left: 1rem;">
            <p style="position: relative">Nomor AWB <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->cnote->connote }}</span>
            </p>
            <p style="position: relative">Tanggal Kirim <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $claim->cnote->connote_date)->format('d-m-Y') }}</span>
            </p>
            <p style="position: relative">Penerima <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->cnote->receiver->receiver_name }}</span>
            </p>
            <p style="position: relative">Alamat Tujuan<span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;">{{ $claim->cnote->receiver->city }}</span>
            </p>
            <p style="position: relative">Telp <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">'********'
                    {{ substr($claim->cnote->receiver->phone, -4) }}</span>
            </p>
            <p style="position: relative">Service <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->cnote->services_code }}</span>
            </p>
            <p>Bahwa kiriman saya tersebut : <b>{{ $claim->case }}</b></p>
            <p style="position: relative">Asuransi <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->asuransi }}</span>
            </p>
            <p style="position: relative">Packing Kayu <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->packing }}</span>
            </p>
            <p style="position: relative">Dipacking Oleh <span
                    style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->packer == 'internal' ? 'JNE' : 'Customer' }}</span>
            </p>
            <p><b>Apabila kiriman tidak dipacking kayu / tidak diasuransi,</b></p>
            <p style="position: relative">Apakah kiriman ditawarkan packing kayu <span
                    style="position: absolute;top: 0;left: 35%;">:</span><span
                    style="position: absolute;top: 0;left: 40%;text-transform: uppercase;">{{ $claim->penawaran_packing }}</span>
            </p>
            <p style="position: relative">Apakah kiriman ditawarkan asuransi <span
                    style="position: absolute;top: 0;left: 35%;">:</span><span
                    style="position: absolute;top: 0;left: 40%;text-transform: uppercase;">{{ $claim->penawaran_asuransi }}</span>
            </p>
        </div>
        <p>Oleh karena itu saya mengajukan klaim ganti rugi sebesar :
            <strong> Rp.{{ number_format($claim->claim_propose, 2, ',', '.') }}</strong>
        </p>
        <p>Mohon untuk dapat ditransfer ke,</p>
        <div style="margin-left: 1rem;">
            <p style="position: relative">Nama Bank <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant_bank_name }}</span>
            </p>
            <p style="position: relative">Cabang <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant_bank_branch }}</span>
            </p>
            <p style="position: relative">Nomor Rekening <span
                    style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant_bank_number }}</span>
            </p>
            <p style="position: relative">Atas Nama <span style="position: absolute;top: 0;left: 15%;">:</span><span
                    style="position: absolute;top: 0;left: 20%;text-transform: uppercase;">{{ $claim->complainant_bank_username }}</span>
            </p>
        </div>
        <p>Demikian surat pengajuan klaim ini disampaikan agar menjadi bahan pertimbangan dalam proses penyelesaian
            ganti rugi sesuai dengan ketentuan dan persyaratan pengiriman via JNE. Surat klaim ini saya buat dengan
            sebenarnya, apabila dikemudian hari terdapat kekeliruan menjadi tanggung jawab saya, Atas perhatian dan
            kerjasamanya saya ucapkan terimakasih.</p>

        <div style="position: relative;width: 100%;">
            <div style="top: 0;right: 0;position: absolute;text-align: center">
                <p>Hormat Saya</p>
                <img style="margin-top: 10px;margin-bottom: 10px;"
                    src="data:image/png;base64, {!! base64_encode(
                        QrCode::format('svg')->size(150)->generate(route('eclaim.signature', $claim->signature)),
                    ) !!} ">
                <p style="text-transform: uppercase;">( {{ $claim->complainant }} )</p>
            </div>
        </div>
    </div>
</body>

</html>
