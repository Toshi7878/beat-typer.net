<?php

namespace App\Http\Controllers;

use App\Models\Map;
use Illuminate\Http\Request;
use DB;

class PostMapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'movie_id' => 'required|ascii|min:11|max:11',
            'creator_comment' => 'max:255'
        ]);

        $map = new Map();
        $map->title = $request->input('title');
        $map->movie_id = $request->input('movie_id');
        $map->creator_comment = $request->input('creator_comment');
        $map->creator_id = $request->input('creator_id');
        $map->line_data = json_encode($request->input('line_data'));
        $map->updated_at = now();
        $map->created_at = now();
        $result = $map->save();
    
        return $result;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Map $map)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Map $map)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Map $map)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Map $map)
    {
        //
    }
}
