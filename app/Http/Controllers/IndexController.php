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
            ->select('id', 'title', 'movie_id')
            ->get()
            ->reverse();

        return view('index', compact('maps'));
    }
}
