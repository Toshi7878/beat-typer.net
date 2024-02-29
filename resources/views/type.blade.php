<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
	<head>
		@csrf
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>{{$title}}</title>
		@vite(['resources\js\pages\type\main.js','resources\css\main.css'])
		<script>
			//bladeからvueに渡せる方法があるならそっちにする
			window.movieId = @json($movie_id);
			window.mapId = @json($id);
		</script>
	</head>
	<body>
		<div id="app">
		</div>
	</body>
</html>
<!DOCTYPE html>