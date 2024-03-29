`<?php

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
            Schema::create('complains', function (Blueprint $table) {
                $table->id();
                $table->string('no_ticket')->nullable();
                $table->integer('branch')->nullable();
                $table->integer('complainsource_id')->nullable();
                $table->integer('connote_id')->nullable();
                $table->string('complain_case_id', 400)->nullable();
                $table->enum('zona', ['a', 'b', 'c', 'd'])->nullable();
                $table->string('case_priority')->nullable();
                $table->integer('sla')->nullable();
                $table->date('due_date')->nullable();
                $table->enum('sla_status', ['over', 'ontime'])->nullable();
                $table->integer('claim_propose')->nullable();
                $table->integer('claim_approve')->nullable();
                $table->string('pic_followup', 255)->nullable();
                $table->string('note', 4000)->nullable();
                $table->enum('status', ['open', 'process', 'close'])->nullable();
                $table->string('followup_by', 255)->nullable();
                $table->integer('user_create')->nullable();
                $table->integer('user_closed')->nullable();
                $table->integer('caller_category')->nullable();
                $table->string('caller_sub_category', 255)->nullable();
                $table->string('caller_contact_name', 255)->nullable();
                $table->string('caller_contact_person', 255)->nullable();
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
            Schema::dropIfExists('complains');
        }
    };
