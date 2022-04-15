<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $primaryKey = 'id';

    protected $fillable = [ //ระบุว่าจะให้ฟิลไหนสามารถอ่านเขียนข้อมูลได้
        'name', 'slug', 'description', 'price', 'image', 'user_id'
    ];

    /**
     * Relationship to Users
     * สินค้าแต่ละชิ้นขึ้นอยู่กับผู้ใช้งานที่สร้างขึ้น 1 คน
     */
    public function user()
    {
        // SELECT column_name(s)
        // FROM products
        // INNER JOIN users
        // ON products.id = users.id;

        return $this->belongsTo('App\Models\User', 'user_id')->select(['id', 'fullname', 'avatar']); //$this->belongsTo('ชื่อ Model ที่ต้องการ join', 'ชื่อฟิลด์ที่ต้องการ join id แต่ถ้าในกรณีที่ชื่อฟิลด์เป็นคำว่า id อยู่แล้วก็ไม่ต้องใส่ก็ได้') 
        // return $this->belongsTo('App\Models\User', 'user_id')->select(['id', 'fullname', 'avatar'])->where('id', 2);
    }
}
