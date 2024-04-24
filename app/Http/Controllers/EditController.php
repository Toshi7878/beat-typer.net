<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use DB;

class EditController extends Controller
{
    public function newCreate(Request $request)
    {
        $videoId = $request->query('id');

        // 'id' の文字数が11でない場合はトップページにリダイレクト
        if (strlen($videoId) !== 11) {
            return Redirect::to('/');
        }

        // 11文字の場合は編集ページを表示
        return view('edit');
    }

    public function edit(Request $request, $id)
    {
        $map = DB::table('maps')
            ->select('title', 'movie_id', 'creator_comment', 'id')
            ->where('id', $id)
            ->first();

        if (!$map) {
            return redirect()->route('some.route'); // 存在しない場合リダイレクト
        }

        $title = $map->title;
        $movie_id = $map->movie_id;
        $creator_comment = $map->creator_comment;

        return view('edit', compact('title', 'movie_id', 'creator_comment', 'id'));
    }
}
