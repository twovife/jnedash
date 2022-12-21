<div style="background-color: white;padding: 20px;width: 100%;">
    <div style="margin-left: auto;margin-right: auto;width: 70%;color: black;">
        <div style="padding-top: 5px;padding-bottom: 5px;width: 100%;text-align: center;">
            <img src="https://www.jne.co.id/frontend/images/material/logo.jpg" alt="jne" srcset="jne" width="100px">
        </div>
        <h2 style="color: black">Claim Approved</h2>
        <p style="color: black">Claim anda dengan detail :<br>
            Nomor Ticketing : {{ $claim->ticket_id }}<br>
            Ticketing Date : {{ $claim->created_at->format('d-m-Y') }}
        </p>
        <p>Telah disetujui dan telah dilakukan transfer ke : <br>
            Nomor Rekening : {{ $claim->complainant_bank_number }}<br>
            Atas Nama : {{ $claim->complainant_bank_username }}
        </p>
        <p style="margin-bottom: 30px;">Terimakasih atas masukan dan kerjasama anda selama proses claim berjalan, kami
            akan selalu memperbaiki kinerja kami dari masukan yang telah anda berikan.
        </p>


        <div style="color: gray;background: whitesmoke;font-size: 0.5rem">
            <div>CS Kediri Call Center : (0354) 695167.</div>
            <div>CS Kediri Whatsapp : 081515791098.</div>
            <div>Alamat: Jl. Adi Sucipto No.38, Banjaran, Kec. Kota, Kediri, Jawa Timur 64129.</div>
        </div>
    </div>
</div>
