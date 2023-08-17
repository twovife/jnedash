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

    //  calibrated
    public function up()
    {
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->integer('connote_id');
            $table->integer('source')->nullable();
            $table->string('ticket_id', 255)->nullable();
            $table->string('case', 255)->nullable();
            $table->string('complainant', 255)->nullable();
            $table->string('complainant_addr', 255)->nullable();
            $table->string('complainant_email', 255)->nullable();
            $table->string('complainant_number', 255)->nullable();
            $table->string('complainant_idcard', 255)->nullable();
            $table->string('complainant_idcard_number', 255)->nullable();
            $table->string('complainant_bank', 255)->nullable();
            $table->string('complainant_bank_number', 255)->nullable();
            $table->string('complainant_bank_name', 255)->nullable();
            $table->string('complainant_bank_branch', 255)->nullable();
            $table->string('complainant_bank_username', 255)->nullable();
            $table->string('complainant_nota', 255)->nullable();
            $table->string('complainant_resi', 255)->nullable();
            $table->enum('packing', ['yes', 'no'])->nullable();
            $table->enum('packer', ['internal', 'eksternal'])->nullable();
            $table->enum('penawaran_packing', ['yes', 'no'])->nullable();
            $table->enum('asuransi', ['yes', 'no'])->nullable();
            $table->enum('penawaran_asuransi', ['yes', 'no'])->nullable();
            $table->integer('claim_propose')->nullable();
            $table->integer('claim_approved')->nullable();
            $table->enum('status', ['open', 'processed', 'rejected', 'approved'])->nullable();
            $table->string('reason', 255)->nullable();
            $table->string('penyelesaian', 255)->nullable();
            $table->string('pembebanan', 255)->nullable();
            $table->integer('processed_by')->nullable();
            $table->integer('closed_by')->nullable();
            $table->date('sla')->nullable();
            $table->enum('status_sla', ['sla', 'over sla'])->nullable();
            $table->date('processed_at')->nullable();
            $table->date('closed_at')->nullable();
            $table->string('transfer_nota', 255)->nullable();
            $table->string('signature', 255)->nullable();
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
        Schema::dropIfExists('claims');
    }
};
