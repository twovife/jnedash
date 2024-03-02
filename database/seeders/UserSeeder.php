<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'aziz nur ihsan',
            'zone' => 1,
            'username' => 'superman',
            'email' => 'azizihsan69@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('4343abab'),
        ]);

        $cs = Permission::create(['name' => 'cs']);
        $super = Role::create(['name' => 'Super Admin']);
        $user->assignRole('Super Admin');
    }
}
