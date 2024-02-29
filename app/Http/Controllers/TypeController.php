<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class TypeController extends Controller
{
	//
	public function __invoke(Request $request, $id)
	{
		$map = DB::table('maps')
    		->select('title', 'movie_id','creator_comment')
    		->where('id', $id)
    		->first();

		if (!$map) {
            return redirect()->route('some.route'); // 例えば、存在しない場合のリダイレクト
        }

		$title = $map->title;
		$movie_id = $map->movie_id;
		$creator_comment = $map->creator_comment;
		
		return view('type', compact('title','movie_id','id'));
	}
}
