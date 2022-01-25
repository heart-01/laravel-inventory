<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //ลบข้อมูลเก่าออกไปก่อน
        DB::table('users')->delete();

        //row ที่ 1
        $data = [
            'fullname' => 'Siwat Jomewattana',
            'username' => 'iamsiwat',
            'email' => 's1104300051612@gmail.com',
            'password' => Hash::make('123456'),
            'tel' => '0871548602',
            'avatar' => 'https://via.placeholder.com/400x400.png/005429?text=udses',
            'role' => '1',
            'remember_token' => 'XBWyeaiest',
        ];
        User::create($data);

        //เรียกตัว Userfactory ที่จะทำการ Faker ข้อมุล
        User::factory(99)->create();
    }
}
