<?php

namespace Database\Seeders;

use App\Models\ComplainFollowUp;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FollowupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            DB::beginTransaction();
            $picis = json_decode(file_get_contents(storage_path('agen.json')), true);

            $complain_agen = collect($picis)->each(function ($pic) {
                ComplainFollowUp::create([
                    'name' => $pic['name'],
                ]);
            });
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
