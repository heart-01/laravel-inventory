<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register
    public function register(Request $request) {
        //validate field
        $fields = $request->validate(
            [
                'fullname' => 'required|string',
                'username' => 'required|string|unique:users,username',
                'email'    => 'required|string|unique:users,email', //ให้ unique จากตาราง users เช็คที่ email ห้ามให้ซ้ำ
                'password' => 'required|string|confirmed', //confirmed ให้กรอก pass 2 ครั้ง
                'tel'      => 'required',
                'role'     => 'required|integer',
            ],
            [   
                'fullname.required'    => 'กรุณากรอกชื่อ',
                'username.required'    => 'กรุณากรอกชื่อผู้ใช้งาน',
                'username.unique'    => 'username นี้มีการใช้งานแล้ว',
                'email.required'    => 'กรุณากรอกอีเมลล์',
                'email.unique'    => 'email นี้มีการใช้งานแล้ว',
                'password.required'    => 'กรุณากรอกรหัสผ่าน',
                'password.confirmed'    => 'การยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน',
                'tel.required'    => 'กรุณากรอกเบอร์โทรศัพท์',
            ]
        );

        $user = User::create([
            'fullname' => $fields['fullname'],
            'username' => $fields['username'],
            'email'    => $fields['email'],
            'password' => Hash::make($fields['password']), //เข้ารหัส
            'tel'      => $fields['tel'],
            'role'     => $fields['role'],
        ]);

        //Create token
        $ip        = $_SERVER['REMOTE_ADDR'];
        $device    = $request->userAgent();
        $nameToken = $ip . ' ' . $device;

        $token = $user->createToken($nameToken, ["$user->role"])->plainTextToken; 
        //["$user->role"] เป็นการกำหนดสิทธิ์ให้กับ token abilities สามารถกำหนดให้ได้มากกว่า 1 สิทธิ์ คือ ["$user->role","2","3"]
        //plainTextToken เป็นการแปลงข้อมูลที่เข้ารหัสให้สามารถอ่านได้เป็น text

        $response = [
            'user'  => $user,
            'token' => $token,
        ];

        return response($response, 201); //201 คือ สถานะ api เมื่อได้ token
    }

    // Login
    public function login(Request $request)
    {
        $fields = $request->validate(
            [
                'email'    => 'required|string',
                'password' => 'required|string',
            ],
            [
                'email.required'    => 'กรุณากรอกอีเมลล์',
                'password.required'    => 'กรุณากรอกรหัสผ่าน'
            ]
        );

        // Check email
        $user = User::orWhere('email', $fields['email'])->orWhere('username', $fields['email'])->first();

        // Check passwork
        if (!$user || !Hash::check($fields['password'], $user->password)) //ถ้าข้อมูล user ผิด หรือ ข้อมูลรหัสผ่านผิด //Hash::check จะเช็คข้อมูลที่ป้อนเข้ามากับข้อมูลที่อยู่ใน field ฐานข้อมูล
        {
            return response([
                'message' => 'Invalid login',
            ], 401);
        }
        else
        {
            //Create token
            $ip        = $_SERVER['REMOTE_ADDR'];
            $device    = $request->userAgent();
            $nameToken = $ip . ' ' . $device;

            $token = $user->createToken($nameToken, ["$user->role"])->plainTextToken; //Create token And กำหนดสิทธิ์

            $response = [
                'user'  => $user,
                'token' => $token,
            ];

            return response($response, 201); //201 คือ สถานะ api เมื่อได้ token
        }
    }

    // Logout
    public function logout()
    {
        //ลบ tokens ที่ผู้ใช้ส่งเข้า
        auth()->user()->currentAccessToken()->delete(); //auth()->user() คือ user ได้ผ่านการเข้าสู่ระบบแล้ว //user() คือดึงข้อมูลตาราง user //currentAccessToken()->delete() ลบข้อมูล token

        return [
            'message' => auth()->user(),
        ];
    }
}
