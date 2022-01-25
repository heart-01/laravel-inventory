<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use App\Models\Product;
use Carbon\Carbon;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //ลบข้อมูลเก่าออกไปก่อน
        DB::table('products')->delete();

        $data = [
            [
                'name' => 'Samsung Galaxy S21',
                'slug' => 'samsung-galaxy-s21',
                'description' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam enim exercitationem eum, rerum non blanditiis voluptatem labore quasi incidunt accusamus quisquam eaque repellat, tenetur autem voluptatum odit nulla excepturi atque',
                'price' => '18500.00',
                'image' => 'https://via.placeholder.com/800x600.png/008876?text=samsung',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Tablet S7',
                'slug' => 'tablet-s7',
                'description' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam enim exercitationem eum, rerum non blanditiis voluptatem labore quasi incidunt accusamus quisquam eaque repellat, tenetur autem voluptatum odit nulla excepturi atque',
                'price' => '20000.00',
                'image' => 'https://via.placeholder.com/800x600.png/008876?text=tabletS5',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];
        Product::insert($data);

        //ทำการเรียกตัว ProductFactory ที่จะทำการ Faker ข้อมูลให้
        Product::factory(198)->create();

    }
}
