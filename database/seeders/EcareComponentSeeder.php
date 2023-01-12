<?php

namespace Database\Seeders;

use App\Models\ComplainCaller;
use App\Models\ComplainCase;
use App\Models\ComplainSource;
use App\Models\CsZone;
use App\Models\SalesOffice;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class EcareComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            $sources = [
                [
                    'source' => 'Dashboard',
                    'sub_source' => 'Dashboard'
                ], [
                    'source' => 'Email',
                    'sub_source' => 'Email'
                ], [
                    'source' => 'Gmaps',
                    'sub_source' => 'Gmaps'
                ], [
                    'source' => 'Phone',
                    'sub_source' => 'Phone'
                ], [
                    'source' => 'Sosmed',
                    'sub_source' => 'Facebook'
                ], [
                    'source' => 'Sosmed',
                    'sub_source' => 'Instagram'
                ], [
                    'source' => 'Sosmed',
                    'sub_source' => 'Whatsapp'
                ], [
                    'source' => 'WIC',
                    'sub_source' => 'WIC'
                ],
            ];

            $callers = [
                [
                    'caller' => 'Dashboard'
                ],  [
                    'caller' => 'Consignee'
                ],  [
                    'caller' => 'Shipper'
                ],  [
                    'caller' => 'Internal Jne'
                ],  [
                    'caller' => 'Sending Office'
                ],
            ];

            $agens = json_decode(file_get_contents(storage_path('app\public\agen.json')), true);

            $cases = json_decode(file_get_contents(storage_path('app\public\handlingcasesla.json')), true);

            $zone_codes = json_decode(file_get_contents(storage_path('app\public\zoning.json')), true);


            $complain_source = collect($sources)->each(function ($source) {
                ComplainSource::create($source);
            });

            $complain_caller = collect($callers)->each(function ($caller) {
                ComplainCaller::create($caller);
            });


            $complain_agen = collect($agens)->each(function ($agen) {
                SalesOffice::create([
                    'nama_agen' => $agen['agen'],
                    'nomor_debitur' => $agen['debitur'],
                    'area' => $agen['area'] == "KEDIRI" ? 1 : ($agen['area'] == "TULUNGAGUNG" ? 2 : 3),
                ]);
            });

            $complain_cases = collect($cases)->each(function ($case) {
                ComplainCase::create([
                    'category' => $case['CATEGORY'],
                    'case' => $case['CASE'],
                    'sub_case' => $case['SUB_CASE'],
                    'zona' => $case['ZONA'],
                    'sla' => $case['SLA'],
                ]);
            });

            $cs_zones = collect($zone_codes)->each(function ($zone_code) {
                CsZone::create([
                    'city_code' => $zone_code['city_code'],
                    'city_zone' => $zone_code['city_zone'],
                ]);
            });
        } catch (\Illuminate\Database\QueryException $e) {
            $this->command->error("SQL Error: " . $e->getMessage() . "\n");
        }
    }
}
