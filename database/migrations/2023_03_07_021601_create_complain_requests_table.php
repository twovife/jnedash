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
            $table->string('comp_status')->nullable();
            $table->string('comp_identiti')->nullable();
            $table->string('comp_name')->nullable();
            $table->string('comp_phone')->nullable();
            $table->string('case_reason')->nullable();
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
