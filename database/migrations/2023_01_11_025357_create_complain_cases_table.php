<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('complain_cases', function (Blueprint $table) {
            $table->id();
            $table->string('category')->nullable();
            $table->string('case')->nullable();
            $table->string('sub_case')->nullable();
            $table->string('zona')->nullable();
            $table->integer('sla')->nullable();
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
        Schema::dropIfExists('complain_cases');
    }
};
