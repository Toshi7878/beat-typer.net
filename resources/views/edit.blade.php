<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
    <head>
        @csrf
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>エディター</title>
        @vite(['resources\js\pages\edit\main.js','resources\css\main.css'])
    </head>
    <body>
      <div id="app"></div>
    </body>
</html>
<!DOCTYPE html>