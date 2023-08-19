<?php

namespace Database\Seeders;

use App\Models\ComplainSource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SourceSeeder extends Seeder
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
            $picis = json_decode(file_get_contents(storage_path('source.json')), true);

            $complain_agen = collect($picis)->each(function ($pic) {
                ComplainSource::create([
                    'source' => $pic['source'],
                    'sub_source' => $pic['sub_source'],
                ]);
            });
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
