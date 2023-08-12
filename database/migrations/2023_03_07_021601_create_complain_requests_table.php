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
        Schema::create('complain_requests', function (Blueprint $table) {
            $table->id();
            $table->integer('connote_id')->nullable();
            $table->string('no_request', 255)->nullable();
            $table->string('caller_category')->nullable();
            $table->string('caller_sub_category')->nullable();
            $table->string('caller_contact_name')->nullable();
            $table->string('caller_contact_person')->nullable();
            $table->string('case_reason')->nullable();
            $table->string('request_status')->nullable();
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
        Schema::dropIfExists('complain_requests');
    }
};
