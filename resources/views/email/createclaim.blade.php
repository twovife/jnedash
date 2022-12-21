<div style="background-color: white;padding: 20px;width: 100%;">
    <div style="margin-left: auto;margin-right: auto;width: 70%;color: black;">
        <div style="padding-top: 5px;padding-bottom: 5px;width: 100%;text-align: center;">
            <img src="https://www.jne.co.id/frontend/images/material/logo.jpg" alt="jne" srcset="jne" width="100px">
        </div>
        <h2 style="color: black">Claim Sedang Di Proses</h2>
        <p style="color: black">Anda telah melakukan claim dengan nomor ticketing : <b>{{ $claim['ticket_id'] }}</b>.</p>
        <p style="margin-bottom: 30px;">Saat ini team JNE Kediri sedang melakukan investigasi mengenai kiriman
            anda, kami akan
            melakukan
            proses investigasi ini secepat mungkin, terimakasih sudah setia memberikan waktu untuk memaksimalkan proses
            claim kami, selanjutnya kami akan mengabari anda melalui email ini 😊.</p>
        <div style="width: 100%;text-align: center; margin-bottom: 30px;">
            <a role="button" href={{ route('eclaim.clientpdf', $claim['ticket_id']) }}
                style="border: none;padding: 10px;color: white;font-weight: bold;background-color: #0A81D1;border-radius: 10px;text-decoration: none;">Download
                Claim</a>
        </div>
        <p>Silahkan Download bukti claim yang kami sediakan dengan cara click tombol di
            atas.</p>
        <small style="margin-bottom: 50px">NB: Silahkan Hubungi CS Kami jika anda tidak merasa melakukan claim
            tersebut.</small>
        <div style="color: gray;background: whitesmoke;font-size: 0.5rem">
            <div>CS Kediri Call Center : (0354) 695167.</div>
            <div>CS Kediri Whatsapp : 081515791098.</div>
            <div>Alamat: Jl. Adi Sucipto No.38, Banjaran, Kec. Kota, Kediri, Jawa Timur 64129.</div>
        </div>
    </div>
</div>
