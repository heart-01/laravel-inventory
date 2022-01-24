<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

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
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        if ($user->tokenCan("1"))
        {
            $request->validate(
                [   
                    'name'  => 'required | min:5',
                    'slug'  => 'required',
                    'price' => 'required',
                ],
                [   
                    'name.required'    => 'กรุณากรอกชื่อสินค้า',
                    'name.min'    => 'ชื่อของสินค้าต้องไม่ต่ำกว่า 5 ตัวอักษร',
                    'slug.required'    => 'กรุณากรอก slug',
                    'price.required'    => 'กรุณากรอกราคาสินค้า',
                ]
            );

            return Product::create($request->all());

        }else{
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
            $product = Product::find($id);
            $product->update($request->all());

            return $product;

        }else{
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
            return Product::destroy($id);
        }else{
            return [
                'status' => 'Premission denied to create',
            ];
        }
    }
}
