<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Image; //Laravel Intervention Image
use File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Read all products
        // return Product::orderBy('id', 'desc')->paginate(25);
        return Product::with('user')->orderBy('id', 'desc')->paginate(25);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //เช็คสิทธิ์ว่าเป็น admin ไหม ดึงมาจาก tokenCan คือ ข้อมูลใน ตาราง personal_access_tokens ฟิลด์ abilities
        $user = auth()->user();
        if ($user->tokenCan("1"))
        {
            $request->validate([
                'name'  => 'required | min:5',
                'slug'  => 'required',
                'price' => 'required',
            ]);

            //กำหนดตัวแปรรับค่าจากฟอร์ม
            $data_product = array(
                'name'  => $request->input('name'),
                'description'  => $request->input('description'),
                'slug'  => $request->input('slug'),
                'price' => $request->input('price'),
                'user_id' => $user->id,
            );

            //รับไฟล์ภาพเข้ามา
            $image = $request->file('file');
            
            //เช็คว่าผู้ใช้มีการอัพโหลดภาพเข้ามาหรือไม่
            if(!empty($image))
            {                
                //อัพโหลดรูปภาพ
                //เปลี่ยนชื่อรูปที่ได้
                $file_name = "product_".time().".".$image->getClientOriginalExtension(); //time() จะดึงวันเวลา timestamp  | ดึงนามสกุล file เข้ามาทำงาน โดยใช้ Function getClientOriginalExtension()

                //กำหนดขนาดความกว้างและสูงของภาพที่ต้องการตัด หรือ ย่อรูป
                $imgWidth = 400;
                $imgHeight = 400;
                $folderupload = public_path('/images/products/thumbnail');
                $path = $folderupload."/".$file_name;

                //อัพโหลดเข้าสู่ folder thumbnail
                $img = Image::make($image->getRealPath()); //ดึงข้อมูลรูปจากที่อัพโหลดเข้ามา
                $img->orientate()->fit($imgWidth, $imgHeight, function($constraint){ //$img->orientate() กำหนดว่ารูปที่อัพโหลดเข้ามาให้รูปถ้าเป็นแนวตั้งให้อยู่แนวตั้ง หรือแนวนอนก็ให้อยู่แนวนอนไม่หมุนกลับไปมา | fit() กำหนดขนาดรูป
                    //callback function เมื่อสร้างไฟล์เสร็จแล้วให้ทำงาน
                    $constraint->upsize(); //ปรับขนาดเท่ากับที่เรากำหนดไว้
                }); 
                $img->save($path); //บันทึกรูป
                
                //อัพโหลดภาพต้นฉบับเข้า folder original
                $destinationPath = public_path('/images/products/original');
                $image->move($destinationPath, $file_name); //move เป็น function ของ laravel ในการย้ายรูปลงไปใน folder

                //กำหนด path รูปเพื่อใส่ตารางในฐานข้อมูล
                $data_product['image'] = url('/').'/images/products/thumbnail/'.$file_name; //เพิ่ม key array ชื่อ image | url คือ path หลักเริ่มต้น

            }else{
                $data_product['image'] = url('/').'/images/products/thumbnail/no_img.jpg';
            }
            
            //Create data to table product
            $res = Product::create($data_product);
            
            return response($res, 201);
        }
        else
        {
            return [
                'status' => 'Premission denied to create',
            ];
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = auth()->user();
        if ($user->tokenCan("1"))
        {
            $request->validate([
                'name' => 'required',
                'slug' => 'required',
                'price' => 'required'
            ]);

            $data_product = array(
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'slug' => $request->input('slug'),
                'price' => $request->input('price'),
                'user_id' => $user->id
            );

            $product = Product::find($id);

            // รับภาพเข้ามา
            $image = $request->file('file');

            if (!empty($image)) {
                //ลบรูปเก่าออก
                $oimg = explode("/", $product->image);
                $filename = $oimg[9];
                
                if($filename != 'no_img.jpg')
                {
                    File::delete(public_path() . '/images/products/original/' . $filename);
                    File::delete(public_path() . '/images/products/thumbnail/' . $filename);
                }

                //เพิ่มข้อมูลรูป
                $file_name = "product_" . time() . "." . $image->getClientOriginalExtension();

                $imgwidth = 400;
                $imgHeight = 400;
                $folderupload = public_path('/images/products/thumbnail');
                $path = $folderupload . '/' . $file_name;

                // uploade to folder thumbnail
                $img = Image::make($image->getRealPath());
                $img->orientate()->fit($imgwidth, $imgHeight, function ($constraint) {
                    $constraint->upsize();
                });
                $img->save($path);

                // uploade to folder original
                $destinationPath = public_path('/images/products/original');
                $image->move($destinationPath, $file_name);

                $data_product['image'] = url('/').'/images/products/thumbnail/'.$file_name;

            }

            $product->update($data_product);

            return $product;
        }
        else
        {
            return [
                'status' => 'Premission denied to create',
            ];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = auth()->user();
        if ($user->tokenCan("1"))
        {
            $Product = Product::find($id);
            
            $image = explode("/", $Product->image);
            $filename = $image[9];
            
            if($filename != 'no_img.jpg')
            {
                File::delete(public_path() . '/images/products/original/' . $filename);
                File::delete(public_path() . '/images/products/thumbnail/' . $filename);
            }

            return $Product->delete();

            // return Product::destroy($id);
        }
        else
        {
            return [
                'status' => 'Premission denied to create',
            ];
        }
    }

    /**
     * Search for a name
     * 
     * @param string $keyword
     * @param \Illuminate\Http\Request $Request
     * @return \Illuminate\Http\Response
     */
    public function search($keyword)
    {
        //              with('ชื่อ function ใน Model', 'ชื่อตารางของ Model')
        return Product::with('user')
                        ->where('name', 'like', '%'.$keyword.'%')
                        ->orderBy('id', 'desc')
                        ->paginate(25);
                        
        // SELECT * FORM products INNER JOIN users 
        // ON (products.user_id = users.id) 
        // WHERE products.name LIKE '%sam%'
        // ORDER BY products.id DESC LIMIT 0,25
    }
}
