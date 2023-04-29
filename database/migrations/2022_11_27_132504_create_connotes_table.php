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
        Schema::create('connotes', function (Blueprint $table) {
            $table->id();
            $table->string('receiving_no', 255)->nullable();
            $table->string('connote', 255)->nullable();
            $table->dateTime('connote_date')->nullable();
            $table->string('customer', 255)->nullable();
            $table->string('customer_name', 255)->nullable();
            $table->string('goods_type', 255)->nullable();
            $table->string('goods_description', 255)->nullable();
            $table->string('services_code', 255)->nullable();
            $table->string('payment_type', 255)->nullable();
            $table->integer('qty')->nullable();
            $table->integer('weight')->nullable();
            $table->integer('amount')->nullable();
            $table->integer('insurance_value')->nullable();

            $table->string('zona')->nullable();
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();

            $table->string('shipper_name')->nullable();
            $table->string('shipper_address')->nullable();
            $table->string('shipper_city')->nullable();
            $table->string('shipper_phone')->nullable();

            $table->string('receiver_name')->nullable();
            $table->string('receiver_address')->nullable();
            $table->string('receiver_city')->nullable();
            $table->string('receiver_phone')->nullable();

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
        Schema::dropIfExists('connotes');
    }
};
