<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
	<head>
		@csrf
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>BeatTyper</title>
		@vite(['resources\js\pages\index\main.ts', 'resources\css\main.css'])

		<script>
			//bladeからvueに渡せる方法があるならそっちにする
			window.maps = @json($maps);
		</script>
	</head>
	<body>
		<div id="app">
		</div>
	</body>
</html>
<!DOCTYPE html>