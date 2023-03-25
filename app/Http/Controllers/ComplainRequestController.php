<?php

namespace App\Http\Controllers;

use App\Models\ComplainRequest;
use App\Http\Requests\StoreComplainRequestRequest;
use App\Http\Requests\UpdateComplainRequestRequest;
use Inertia\Inertia;

class ComplainRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function customer()
    {
        return Inertia::render('Landing/Landing');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function internal()
    {
        dd('internal page');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreComplainRequestRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreComplainRequestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function show(ComplainRequest $complainRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function edit(ComplainRequest $complainRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateComplainRequestRequest  $request
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateComplainRequestRequest $request, ComplainRequest $complainRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComplainRequest $complainRequest)
    {
        //
    }
}
