<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class IndexController extends Controller
{
    //
    public function __invoke(Request $request)
    {
        $maps = DB::table('maps')
            ->pluck('title', 'movie_id');


        return view('index', compact('maps'));
    }
}
