<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;


class EditController extends Controller
{
    public function newCreate(Request $request) {
        $videoId = $request->query('id');

        // 'id' の文字数が11でない場合はトップページにリダイレクト
        if (strlen($videoId) !== 11) {
            return Redirect::to('/');
        }

        // 11文字の場合は編集ページを表示
        return view('edit');
    }
}
