<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Connote;
use App\Models\ConnoteReceiver;
use App\Models\ConnoteShipper;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $data = Connote::all();

        foreach ($data as $row) {
            $connote = Connote::find($row->id);
            $shipper = ConnoteShipper::where('connote_id', $row->id)->first();
            $receiver = ConnoteReceiver::where('connote_id', $row->id)->first();
            // $connote->zona = 'asd';
            $connote->origin = $shipper->origin;
            $connote->destination = $receiver->destination;
            $connote->shipper_name = $shipper->shipper_name;
            $connote->shipper_address = $shipper->address;
            $connote->shipper_city = $shipper->city;
            $connote->shipper_phone = $shipper->phone;
            $connote->receiver_name = $receiver->receiver_name;
            $connote->receiver_address = $receiver->address;
            $connote->receiver_city = $receiver->city;
            $connote->receiver_phone = $receiver->phone;
            $connote->save();
        }
    }
}
