<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalAccessTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    //File สำหรับการขอใช้ API เป็นการระบุว่า User ที่มาขอ Token ได้ Token อะไรไป
    public function up()
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable'); //morphs เป็น type ที่ laravel ตั้งขึ้นมาโดยจะสร้างขึ้นมา 2 ฟิลด์ = tokenable_type varchar(255), tokenable_id bigint(20)
            $table->string('name'); //ชื่อที่เราตั้งให้เป็นชื่ออุปกรณ์ที่เข้ามาขอใช้ API
            $table->string('token', 64)->unique(); // เข้ารหัสแบบ sha256
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable(); //เข้าครั้งสุดท้ายเมื่อไหร่
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal_access_tokens');
    }
}
